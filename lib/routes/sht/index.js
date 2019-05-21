const axios = require('@/utils/axios');
const cheerio = require('cheerio');

const host = 'https://www.sehuatang.net/';

module.exports = async (ctx) => {
    const subforumid = `forum-${ctx.params.subforumid}-1.html`;
    const link = `${host}${subforumid}`;
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);

    const list = $('#threadlisttableid tbody')
        .slice(1, 21)
        .filter(function() {
            // 去除置顶帖子和分割线
            const threadID = $(this).attr('id');
            return threadID !== 'separatorline' && !threadID.startsWith('stickthread');
        })
        .map(function() {
            const info = {
                title:
                    '[' +
                    $(this)
                        .find('th em a')
                        .text() +
                    '] ' +
                    $(this)
                        .find('a.xst')
                        .text(),
                link: $(this)
                    .find('a.xst')
                    .attr('href'),
                date: $(this)
                    .find('td.by')
                    .find('em span span')
                    .attr('title'),
            };
            return info;
        })
        .get();

    const out = await Promise.all(
        list.map(async (info) => {
            const title = info.title;
            const date = info.date;
            const itemUrl = host + info.link;

            const cache = await ctx.cache.get(itemUrl);
            if (cache) {
                return Promise.resolve(JSON.parse(cache));
            }

            const response = await axios.get(itemUrl);

            const $ = cheerio.load(response.data);
            const postMessage = $("td[id^='postmessage']").slice(0, 1);
            const images = $(postMessage).find('img');
            for (let k = 0; k < images.length; k++) {
                if (!$(images[k]).attr('file') || $(images[k]).attr('file') === 'undefined') {
                    $(images[k]).replaceWith('');
                } else {
                    $(images[k]).replaceWith(`<img src="${$(images[k]).attr('file')}" referrerpolicy="no-referrer" />`);
                }
            }
            const description = postMessage.html();
            const enclosureUrl = postMessage.find('div.blockcode li').text();

            const single = {
                title: title,
                link: itemUrl,
                description: description,
                pubDate: new Date(date).toUTCString(),
                enclosure_url: enclosureUrl,
                enclosure_type: 'application/x-bittorrent',
            };
            ctx.cache.set(itemUrl, JSON.stringify(single));
            return Promise.resolve(single);
        })
    );

    ctx.state.data = {
        title: `色花堂 - ${$('#pt > div:nth-child(1) > a:last-child').text()}`,
        link: link,
        item: out,
    };
};
