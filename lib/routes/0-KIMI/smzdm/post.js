const got = require('@/utils/got');
const cheerio = require('cheerio');
// const util = require('./utils');

module.exports = async (ctx) => {
    const type = ctx.params.type;
    const apiurl = `https://post.smzdm.com/home/json_more/?filter=${type}`;
    const suburl = type === 'all' ? '' : 'tab/' + type;
    const url = `https://post.smzdm.com/${suburl}`;

    // 从接口获取文章信息
    const apiresp = await got.get(apiurl);
    const data = apiresp.data.data;

    /*
    const filterkey = new Array("个护化妆","运动户外","母婴用品","日用百货","汽车消费",
                                "服饰鞋包","旅游出行","运动户外","图书杂志","音像制品",
                                "礼品钟表","文化娱乐","办公设备","电子书刊","房产置业",
                                "图书音像","家用电器");
    let filterurl = new Array(); */
    const reservekey = new Array(
        '网络存储',
        '路由器',
        '手机软件',
        '办公软件',
        '服务软件',
        '充电器',
        '服务器',
        '智能家居',
        '鼠标',
        '键盘',
        '音响',
        '散热器',
        '电脑电源',
        '垃圾处理器',
        '洗碗机',
        '净水设备',
        '空气净化器',
        '厨房用品',
        '卫浴用品',
        '家用五金'
    );
    const reserveurl = new Array();

    const result = await Promise.all(
        data.map(async (item) => {
            const title = item.article_title;
            const itemUrl = item.article_url;
            const author = item.article_author_name;
            const pubDate = new Date(item.article_time_sort * 1000).toUTCString();
            // 获取文章头图
            let article_img = item.article_img_url;
            article_img = '<img referrerpolicy="no-referrer" src="' + article_img.replace('_c350', '_fo710') + '" /><br />';

            // 从缓存获取内容。
            const cache = await ctx.cache.get(itemUrl);
            if (cache) {
                return Promise.resolve(JSON.parse(cache));
            }

            const response = await got.get(itemUrl);
            const $ = cheerio.load(response.data);
            $('article > .item-name').remove();
            $('article > .recommend-tab').remove();
            $('article > input').remove();
            $('article > .the-end').remove();

            // 获取文章分类
            const type = $('.crumbs-cate span')
                .eq(1)
                .text()
                .trim();
            const subtype = $('.crumbs-cate span')
                .eq(2)
                .text()
                .trim();
            const subsubtype = $('.crumbs-cate span')
                .eq(3)
                .text()
                .trim();

            // 替换评测文章中的data-original为src避免图片无法显示
            let description = $('article')
                .html()
                .replace(/data-original/g, 'src');

            // 文章内容设置为头图加正文
            description = article_img + description;

            // 列表上提取到的信息
            const single = {
                // title: '[' + type + '-' + subtype + '-' + subsubtype +'] ' + title,
                title: '[' + type + '-' + subtype + '] ' + title,
                link: itemUrl,
                description: description,
                pubDate: pubDate,
                author: author,
                guid: itemUrl,
            };

            ctx.cache.set(itemUrl, JSON.stringify(single), 24 * 60 * 60);

            /* 过滤一级分类
            if(filterkey.includes(type)){
                filterurl.push(itemUrl);
            } */

            // 保留三级分类
            if (reservekey.includes(subsubtype)) {
                reserveurl.push(itemUrl);
            }
            return Promise.resolve(single);
        })
    );

    /*
    const out =result.filter(function(item){
        if(filterurl.includes(item.link)){
            return false;
        }else{
            //console.log(item.title)
            return true;
        }
    }); */
    const out = result.filter(function(item) {
        if (reserveurl.includes(item.link)) {
            return true;
        } else {
            // console.log(item.title);
            return false;
        }
    });

    // 从页面获取标题及描述
    const pageresp = await got.get(url);
    const $ = cheerio.load(pageresp.data);
    const title = $('title')
        .text()
        .split('_')[0];
    const description = $('meta[name="description"]').attr('content');

    ctx.state.data = {
        title: title,
        link: url,
        description: description,
        allowEmpty: true,
        item: out,
    };
};
