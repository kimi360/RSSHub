const got = require('@/utils/got');
const cheerio = require('cheerio');
const date = require('@/utils/date');

module.exports = async (ctx) => {
    const type = ctx.params.type;
    const url = `https://post.smzdm.com/fenlei/${type}/`;
    const response = await got.get(url);

    const $ = cheerio.load(response.data);
    const title = $('div.crumbs.nav-crumbs').text().split('>').pop().trim();

    const list = $('div.list.post-list')
        .slice(0, 20)
        .map(function () {
            const info = {
                title: $(this).find('h2.item-name a').text(),
                link: $(this).find('h2.item-name a').attr('href'),
                pubdate: $(this).find('span.time').text(),
            };
            return info;
        })
        .get();

    const out = await Promise.all(
        list.map(async (info) => {
            const title = info.title;
            const pubdate = info.pubdate;
            const itemUrl = info.link;

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

            // 获取文章头图
            let article_img = $('.detailed_banner img').attr('src');
            article_img = '<img referrerpolicy="no-referrer" src="' + article_img + '" /><br />';

            // 获取文章分类
            const type = $('.crumbs-cate span').eq(1).text().trim();
            const subtype = $('.crumbs-cate span').eq(2).text().trim();

            // 替换评测文章中的data-original为src避免图片无法显示
            let description = $('article')
                .html()
                .replace(/data-original/g, 'src');

            // 文章内容设置为头图加正文
            description = article_img + description;

            const single = {
                title: '[' + type + '-' + subtype + '] ' + title,
                link: itemUrl,
                description: description,
                pubDate: date(pubdate),
            };
            ctx.cache.set(itemUrl, JSON.stringify(single));
            return Promise.resolve(single);
        })
    );

    ctx.state.data = {
        title: `什么值得买 - ${title}`,
        link: url,
        item: out,
    };
};
