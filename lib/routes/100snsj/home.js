const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const url = require('url');
const entities = require('html-entities').XmlEntities;

module.exports = async (ctx) => {
    const tid = ctx.params.tid;
    const apiurl = `https://www.100.com.tw/api/web/v1/articles/list?cate_id=${tid}&pagesize=10`;
    const host = 'https://www.100.com.tw/article/';

    const apiresp = await axios.get(apiurl);
    const list = apiresp.data.data.list.data;

    const result = await Promise.all(
        list.map(async (item) => {
            const title = item.title;
            const itemUrl = url.resolve(host, item.id.toString());

            // 从缓存获取内容。
            const cache = await ctx.cache.get(itemUrl);
            if (cache) {
                return Promise.resolve(JSON.parse(cache));
            }

            // 获取文章详情
            const response = await axios.get(itemUrl);
            const $ = cheerio.load(response.data);
            const article_info = entities.decode($('.info').html());
            const author = /作者：(.*?)<\/span>/.exec(article_info)[1];
            const pubDate = new Date(/\d{4}-\d{2}-\d{2}/.exec(article_info)[0] + ' GMT+8').toUTCString();
            const article_img = '<img referrerpolicy="no-referrer" src="' + $('.article > .articleImg').attr('src') + '" /><br />';
            const description = article_img + $('.articleEdit').html();

            // 列表上提取到的信息
            const single = {
                title: title,
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

    ctx.state.data = {
        title: '100室内设计',
        link: host + 'cate-id/' + `${tid}`,
        description: '100室内设计',
        item: result,
    };
};
