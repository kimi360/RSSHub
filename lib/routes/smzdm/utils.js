const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const url = require('url');

async function load(link,type) {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    if (type==0)
    {
        //处理日期
        const date =new Date($('.recommend_tab span[class="grey"]').text().replace(/[\r\n]/g,"").trim());
        const timeZone = 8;
        const serverOffset = date.getTimezoneOffset() / 60;
        const pubDate = new Date(date.getTime() - 60 * 60 * 1000 * (timeZone + serverOffset)).toUTCString();
        const description = $('div[itemprop="description"]').html();
        const author =$('a[itemprop="name"]').text();
        return { description,pubDate,author };
    }else
    {
        //处理日期
        const date =new Date($('article span[class="lrTime"]').text().replace(/[\r\n]/g,"").trim());
        const timeZone = 8;
        const serverOffset = date.getTimezoneOffset() / 60;
        const pubDate = new Date(date.getTime() - 60 * 60 * 1000 * (timeZone + serverOffset)).toUTCString();
        const description = $('div[class="myEvaluation article_meta article_meta_nowrap"]').html();
        const author =$('span[class="user-avatar"]').text();
        return { description,pubDate,author };
    }

}

async function loadtest(link) {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    //处理日期
    const description = $('div[itemprop="description"]').html();
    return { description };
}

const ProcessFeed = async (list, caches) => {
    return await Promise.all(
        list.map(async (item) => {
            const $ = cheerio.load(item);
            const $title = $('a');
            // 还原相对链接为绝对链接
            const itemUrl = $title.attr('href');

            // 列表上提取到的信息
            const single = {
                title: $title.text(),
                link: itemUrl,
                // author: $('.nickname').text(),
                guid: itemUrl,
            };
            //普通文章type为0，众测文章type为1
            const posttype = $('span[class="z-type-yellow"]').length;
            
            // 使用tryGet方法从缓存获取内容。
            // 当缓存中无法获取到链接内容的时候，则使用load方法加载文章内容。
            const other = await caches.tryGet(itemUrl, async () => await load(itemUrl,posttype));
            // 合并解析后的结果集作为该篇文章最终的输出结果
            return Promise.resolve(Object.assign({}, single, other));
        })
    );
};

module.exports = {
    ProcessFeed,
};
