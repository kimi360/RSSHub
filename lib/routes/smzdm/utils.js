const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const url = require('url');

async function load(link,type) {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    if (type)
    {
        //获取文章详情
        $('.user_list').remove()
        const description = $('.content .article_meta').html();
        return { description };
    }else
    {
        //获取文章详情
        const description = $('div[itemprop="description"]').html();
        return { description };
    }

}

const ProcessFeed = async (list, caches) => {
    return await Promise.all(
        list.map(async (item) => {
            const title = item.article_title;
            const itemUrl = item.article_url;
            const author = item.article_author_name;
            const pubDate =new Date(item.article_time_sort * 1000).toUTCString();
            const isPingce = item.article_pingce

            // 列表上提取到的信息
            const single = {
                title: title,
                link: itemUrl,
                pubDate: pubDate,
                author: author,
                guid: itemUrl,
            };

            // 使用tryGet方法从缓存获取内容。
            // 当缓存中无法获取到链接内容的时候，则使用load方法加载文章内容。
            const other = await caches.tryGet(itemUrl, async () => await load(itemUrl,isPingce));
            // 合并解析后的结果集作为该篇文章最终的输出结果
            return Promise.resolve(Object.assign({}, single, other));
        })
    );
};

module.exports = {
    ProcessFeed,
};
