const axios = require('../../utils/axios');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const api_url = 'https://sspai.com/api/v1/articles?offset=0&limit=20&type=recommend_to_home&sort=recommend_to_home_at&include_total=false';
    const resp = await axios({
        method: 'get',
        url: api_url,
    });
    const data = resp.data.list;
    const items = await Promise.all(
        data.map(async (item) => {
            const link = `https://sspai.com/post/${item.id}`;
            let description = '';

            const key = `sspai: ${item.id}`;
            const value = await ctx.cache.get(key);

            if (value) {
                description = value;
            } else {
                const response = await axios({ method: 'get', url: link });
                const $ = cheerio.load(response.data);
                description = $('.content').html();
                ctx.cache.set(key, description, 24 * 60 * 60);
            }

            return {
                title: item.title.trim(),
                description: description,
                link: link,
                pubDate: new Date(item.released_at * 1000).toUTCString(),
                author: item.author.nickname,
            };
        })
    );

    ctx.state.data = {
        title: '少数派',
        link: 'https://sspai.com',
        description: '少数派致力于更好地运用数字产品或科学方法，帮助用户提升工作效率和生活品质',
        item: items,
    };
};
