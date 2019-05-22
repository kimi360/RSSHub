const axios = require('../../utils/axios');
const cheerio = require('cheerio');
// const util = require('./utils');

module.exports = async (ctx) => {
    const type = ctx.params.type;
    const apiurl = `https://post.smzdm.com/home/json_more/?filter=${type}`;
    const suburl = type === 'all' ? '' : '/tab' + type;
    const url = `https://post.smzdm.com/${suburl}`;

    // 从接口获取文章信息
    const apiresp = await axios.get(apiurl);
    const data = apiresp.data.data;

    /*     const filtertype = new Array("shuma");
    let filterlist;
    let i;
    for (i in filtertype) {
        const felterapi = `https://post.smzdm.com/home/json_more/?filter=${filtertype[i]}`;
        const felterresp = await axios.get(felterapi);
        const felterlist = felterresp.data.data;
        console.log(data);
        console.log(felterlist);
        filterdata = data.filter( function( el ) {
            return felterlist.indexOf( el ) < 0;
            //return !felterlist.includes( el );
        } );
        console.log(filterdata)
    }
    console.log(data);
    const filterdata = data.filter(function(item){
        if(item.article_title.match(/基金|显卡|华为/)){
            return false;
        }
        console.log(item.article_title);
        return true;
    });
    console.log(filterdata); */

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

            const response = await axios.get(itemUrl);
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

            // 替换评测文章中的data-original为src避免图片无法显示
            let description = $('article')
                .html()
                .replace(/data-original/g, 'src');

            // 文章内容设置为头图加正文
            description = article_img + description;

            // 列表上提取到的信息
            const single = {
                title: '[' + type + '-' + subtype + '] ' + title,
                link: itemUrl,
                description: description,
                pubDate: pubDate,
                author: author,
                guid: itemUrl,
            };

            ctx.cache.set(itemUrl, JSON.stringify(single), 24 * 60 * 60);
            return Promise.resolve(single);
        })
    );

    // 从页面获取标题及描述
    const pageresp = await axios.get(url);
    const $ = cheerio.load(pageresp.data);
    const title = $('title')
        .text()
        .split('_')[0];
    const description = $('meta[name="description"]').attr('content');

    ctx.state.data = {
        title: title,
        link: url,
        description: description,
        item: result,
    };
};
