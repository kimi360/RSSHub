const axios = require('../../utils/axios');
const cheerio = require('cheerio');
const util = require('./utils');

module.exports = async (ctx) => {
    const type = ctx.params.type;
    //从接口获取文章信息
    const apiurl = `https://post.smzdm.com/home/json_more/?filter=${type}`;
    const url= `https://post.smzdm.com/tab/${type}`;

    const apiresp = await axios({
        method: 'get',
        url: apiurl,
        headers: {
            Referer: url,
        },
    });
    const data = apiresp.data.data;
    const result = await util.ProcessFeed(data, ctx.cache);

    //从页面获取标题及描述
    const pageresp = await axios({
        method: 'get',
        url: url,
        headers: {
            Referer: url,
        },
    });
    const $ = cheerio.load(pageresp.data);
    const title = $('title').text().split('_')[0];
    const description = $('meta[name="description"]').attr('content');

    ctx.state.data = {
        title: title,
        link: url,
        description: description,
        item: result,
    };
};