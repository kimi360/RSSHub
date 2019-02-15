const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const util = require('./utils');

module.exports = async (ctx) => {
    const url = `https://post.smzdm.com/`;
    const response = await axios({
        method: 'get',
        url: url,
        headers: {
            Referer: url,
        },
    });

    const $ = cheerio.load(response.data);
    const list = $('#feed-main-list .z-feed-title').get();
 
    const result = await util.ProcessFeed(list, ctx.cache);

    ctx.state.data = {
        title: $('title')
            .text()
            .split('|')[0],
        link: url,
        description: $('meta[name="description"]').attr('content'),
        item: result,
    };
};