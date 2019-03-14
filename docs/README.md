---
sidebar: auto
---

<p align="center">
    <img src="https://i.imgur.com/NZpRScX.png" alt="RSSHub" width="100">
</p>
<h1 align="center" class="logo">RSSHub</h1>

> 🍰 万物皆可 RSS

[![telegram](https://img.shields.io/badge/chat-telegram-brightgreen.svg?style=flat-square)](https://t.me/rsshub)
[![build status](https://img.shields.io/travis/DIYgod/RSSHub/master.svg?style=flat-square)](https://travis-ci.org/DIYgod/RSSHub)
[![Test coverage](https://img.shields.io/codecov/c/github/DIYgod/RSSHub.svg?style=flat-square)](https://codecov.io/github/DIYgod/RSSHub?branch=master)

RSSHub 是一个轻量、易于扩展的 RSS 生成器, 可以给任何奇奇怪怪的内容生成 RSS 订阅源

[Telegram 群](https://t.me/rsshub)

# 指南

## 鸣谢

### Special Sponsors

| <a href="https://rixcloud.app/rsshub" target="_blank"><img width="240px" src="https://i.imgur.com/qRP0eMg.png"></a> |
| :-----------------------------------------------------------------------------------------------------------------: |


### Sponsors

| [Eternal Proxy](https://proxy.eternalstudio.cn/?from=rsshub) | [Liuyang](https://github.com/lingllting) | [Sayori Studio](https://t.me/SayoriStudio) | 匿名 | [Sion Kazama](https://blog.sion.moe) |
| :----------------------------------------------------------: | :--------------------------------------: | :----------------------------------------: | :--: | :----------------------------------: |


[![](https://opencollective.com/static/images/become_sponsor.svg)](https://docs.rsshub.app/support/)

### Contributors

[![](https://opencollective.com/RSSHub/contributors.svg?width=740)](https://github.com/DIYgod/RSSHub/graphs/contributors)

Logo designed by [sheldonrrr](https://dribbble.com/sheldonrrr)

## 常见问题

**Q: RSSHub 是怎么工作的？**

**A:** 请求路由时，RSSHub 会按照给定规则请求源站数据，然后以 RSS 格式输出；如果在设定缓存时间内重新请求路由，则会直接返回缓存内容，不请求源站；再加一点点魔法。

**Q: 演示地址可以用么？**

**A:** 演示地址为 [rsshub.app](https://rsshub.app), 缓存时间 10 分钟, 可以随意使用。部分网站反爬策略严格，可能无法确保可用性，自建可以提高稳定性。

**Q: 文档滚动好卡啊！**

**A:** 因为文档内容太多了，以后可能考虑拆分。

**Q: 没有我想订阅的网站怎么办嘤嘤嘤 QAQ**

**A:** 如果你会写 JavaScript，请按照[规则](/joinus/#%E6%8F%90%E4%BA%A4%E6%96%B0%E7%9A%84-rss-%E5%86%85%E5%AE%B9)提交 pull request，否则按照要求[提交 issue](https://github.com/DIYgod/RSSHub/issues/new?template=rss_request_zh.md)，然后等待有缘人完成你的需求，也可以考虑[赞助项目](/support)或附上一张你自己的女装照来获得更快的 issue 响应速度。

**Q: 可以推荐一下好用的 RSS 阅读器么？**

**A:** 最强组合：[Tiny Tiny RSS](https://github.com/HenryQW/docker-ttrss-plugins) + Reeder。

**Q: 我怎么才能知道 RSSHub 更新了哪些路由？**

**A:** 可以使用 RSS 订阅[RSSHub 有新路由啦](#rsshub)。

## 通用参数

::: tip 提示

所有通用参数可以使用 `&` 连接组合使用, 效果叠加

:::

### 内容过滤

可以使用以下 URL query 过滤内容, 支持正则

filter 选出想要的内容

-   filter: 过滤标题和描述

-   filter_title: 过滤标题

-   filter_description: 过滤描述

-   filter_author: 过滤作者

举例: <https://rsshub.app/bilibili/user/coin/2267573?filter=微小微|赤九玖|暴走大事件>

filterout 去掉不要的内容

-   filterout: 过滤标题和描述

-   filterout_title: 过滤标题

-   filterout_description: 过滤描述

-   filterout_author: 过滤作者

举例: <https://rsshub.app/bilibili/user/coin/2267573?filterout=微小微|赤九玖|暴走大事件>

### 条数限制

可以使用 limit 参数限制最大条数, 主要用于排行榜类 RSS

举例: bilibili 排行榜前 10 <https://rsshub.app/bilibili/ranking/0/3?limit=10>

### 输出 Telegram 即时预览链接

可以输出 Telegram 可识别的即时预览链接, 主要用于文章类 RSS

Telegram 即时预览模式需要在官网制作页面处理模板，请前往[官网](https://instantview.telegram.org/)了解更多

-   tgiv: 模板 hash，可从模板制作页面分享出来的链接末尾获取（`&rhash=`后面跟着的字符串）

举例: <https://rsshub.app/novel/biquge/94_94525?tgiv=bd3c42818a7f7e>

### 输出格式

RSSHub 同时支持 RSS 2.0 和 Atom 输出格式, 在路由末尾添加 `.rss` 或 `.atom` 即可请求对应输出格式, 缺省为 RSS 2.0

举例:

-   缺省 RSS 2.0 - <https://rsshub.app/jianshu/home>
-   RSS 2.0 - <https://rsshub.app/jianshu/home.rss>
-   Atom - <https://rsshub.app/jianshu/home.atom>
-   和 filter 或其他 URL query 一起使用 <https://rsshub.app/bilibili/user/coin/2267573.atom?filter=微小微|赤九玖|暴走大事件>

## API 接口

::: warning 注意
API 仍处于开发状态中,  并可能会有改动. 欢迎提供建议！
:::

RSSHub 提供下列 API 接口:

### 可用公共路由列表

::: tip 提示
`protected_router.js`下的路由**不会被**包含在此 API 返回的结果当中.
:::

举例: <https://rsshub.app/api/routes/bilibili>

路由: `/api/routes/:name?`

参数:

-   name, 路由一级名称, 对应 [https://github.com/DIYgod/RSSHub/tree/master/routes](https://github.com/DIYgod/RSSHub/tree/master/routes) 中的文件夹名称. 可选, **缺省则返回所有可用路由**.

成功请求将会返回 HTTP 状态码 `200 OK` 与 JSON 结果, 格式如下:

```js
{
    "status": "success",
    "data": {
        "bilibili": {
            "routes": [
                "/bilibili/user/video/:uid",
                "/bilibili/user/article/:uid",
                "/bilibili/user/fav/:uid",
                "/bilibili/user/coin/:uid",
                "/bilibili/user/dynamic/:uid",
                "/bilibili/user/followers/:uid",
                "/bilibili/user/followings/:uid",
                "/bilibili/user/channel/:uid/:cid",
                "/bilibili/partion/:tid",
                "/bilibili/partion/ranking/:tid/:days?",
                "/bilibili/bangumi/:seasonid",
                "/bilibili/video/page/:aid",
                "/bilibili/video/reply/:aid",
                "/bilibili/link/news/:product",
                "/bilibili/live/room/:roomID",
                "/bilibili/live/search/:key/:order",
                "/bilibili/live/area/:areaID/:order",
                "/bilibili/fav/:uid/:fid",
                "/bilibili/blackboard",
                "/bilibili/mall/new",
                "/bilibili/mall/ip/:id",
                "/bilibili/ranking/:rid?/:day?",
                "/bilibili/topic/:topic"
            ]
        }
    },
    "message": "request returned 22 routes"
}
```

若无符合请求路由, 请求将会返回 HTTP 状态码 `204 No Content`.

## 社交媒体

### bilibili

<route name="番剧" author="DIYgod" example="/bilibili/bangumi/media/9192" path="/bilibili/bangumi/media/:mediaid" :paramsDesc="['番剧媒体 id, 番剧主页 URL 中获取']"/>

<route name="UP 主投稿" author="DIYgod" example="/bilibili/user/video/2267573" path="/bilibili/user/video/:uid" :paramsDesc="['用户 id, 可在 UP 主主页中找到']"/>

<route name="UP 主专栏" author="lengthmin" example="/bilibili/user/article/334958638" path="/bilibili/user/article/:uid" :paramsDesc="['用户 id, 可在 UP 主主页中找到']"/>

<route name="UP 主动态" author="DIYgod" example="/bilibili/user/dynamic/2267573" path="/bilibili/user/dynamic/:uid" :paramsDesc="['用户 id, 可在 UP 主主页中找到']"/>

<route name="UP 主频道" author="HenryQW" example="/bilibili/user/channel/142821407/49017" path="/bilibili/user/channel/:uid/:cid" :paramsDesc="['用户 id, 可在 UP 主主页中找到', '频道 id, 可在频道的 URL 中找到']"/>

<route name="UP 主默认收藏夹" author="DIYgod" example="/bilibili/user/fav/2267573" path="/bilibili/user/fav/:uid" :paramsDesc="['用户 id, 可在 UP 主主页中找到']"/>

<route name="UP 主非默认收藏夹" author="Qixingchen" example="/bilibili/fav/756508/50948568" path="/bilibili/fav/:uid/:fid" :paramsDesc="['用户 id, 可在 UP 主主页中找到', '收藏夹 ID, 可在收藏夹的 URL 中找到, 默认收藏夹建议使用 UP 主默认收藏夹功能']"/>

<route name="UP 主投币视频" author="DIYgod" example="/bilibili/user/coin/2267573" path="/bilibili/user/coin/:uid" :paramsDesc="['用户 id, 可在 UP 主主页中找到']"/>

<route name="UP 主粉丝" author="Qixingchen" example="/bilibili/user/followers/2267573" path="/bilibili/user/followers/:uid" :paramsDesc="['用户 id, 可在 UP 主主页中找到']"/>

<route name="UP 主关注用户" author="Qixingchen" example="/bilibili/user/followings/2267573" path="/bilibili/user/followings/:uid" :paramsDesc="['用户 id, 可在 UP 主主页中找到']"/>

<route name="分区视频" author="DIYgod" example="/bilibili/partion/33" path="/bilibili/partion/:tid" :paramsDesc="['分区 id']">

动画

| MAD·AMV | MMD·3D | 短片·手书·配音 | 综合 |
| ------- | ------ | -------------- | ---- |
| 24      | 25     | 47             | 27   |

番剧

| 连载动画 | 完结动画 | 资讯 | 官方延伸 |
| -------- | -------- | ---- | -------- |
| 33       | 32       | 51   | 152      |

国创

| 国产动画 | 国产原创相关 | 布袋戏 | 资讯 |
| -------- | ------------ | ------ | ---- |
| 153      | 168          | 169    | 170  |

音乐

| 原创音乐 | 翻唱 | VOCALOID·UTAU | 演奏 | 三次元音乐 | OP/ED/OST | 音乐选集 |
| -------- | ---- | ------------- | ---- | ---------- | --------- | -------- |
| 28       | 31   | 30            | 59   | 29         | 54        | 130      |

舞蹈

| 宅舞 | 三次元舞蹈 | 舞蹈教程 |
| ---- | ---------- | -------- |
| 20   | 154        | 156      |

游戏

| 单机游戏 | 电子竞技 | 手机游戏 | 网络游戏 | 桌游棋牌 | GMV | 音游 | Mugen |
| -------- | -------- | -------- | -------- | -------- | --- | ---- | ----- |
| 17       | 171      | 172      | 65       | 173      | 121 | 136  | 19    |

科技

| 趣味科普人文 | 野生技术协会 | 演讲·公开课 | 星海 | 数码 | 机械 | 汽车 |
| ------------ | ------------ | ----------- | ---- | ---- | ---- | ---- |
| 124          | 122          | 39          | 96   | 95   | 98   | 176  |

生活

| 搞笑 | 日常 | 美食圈 | 动物圈 | 手工 | 绘画 | ASMR | 运动 | 其他 |
| ---- | ---- | ------ | ------ | ---- | ---- | ---- | ---- | ---- |
| 138  | 21   | 76     | 75     | 161  | 162  | 175  | 163  | 174  |

鬼畜

| 鬼畜调教 | 音 MAD | 人力 VOCALOID | 教程演示 |
| -------- | ------ | ------------- | -------- |
| 22       | 26     | 126           | 127      |

时尚

| 美妆 | 服饰 | 健身 | 资讯 |
| ---- | ---- | ---- | ---- |
| 157  | 158  | 164  | 159  |

广告

| 广告 |
| ---- |
| 166  |

娱乐

| 综艺 | 明星 | Korea 相关 |
| ---- | ---- | ---------- |
| 71   | 137  | 131        |

影视

| 影视杂谈 | 影视剪辑 | 短片 | 预告·资讯 | 特摄 |
| -------- | -------- | ---- | --------- | ---- |
| 182      | 183      | 85   | 184       | 86   |

纪录片

| 全部 | 人文·历史 | 科学·探索·自然 | 军事 | 社会·美食·旅行 |
| ---- | --------- | -------------- | ---- | -------------- |
| 177  | 37        | 178            | 179  | 180            |

电影

| 全部 | 华语电影 | 欧美电影 | 日本电影 | 其他国家 |
| ---- | -------- | -------- | -------- | -------- |
| 23   | 147      | 145      | 146      | 83       |

电视剧

| 全部 | 国产剧 | 海外剧 |
| ---- | ------ | ------ |
| 11   | 185    | 187    |

</route>

<route name="分区视频排行榜" author="lengthmin" example="/bilibili/partion/ranking/171/3" path="/bilibili/partion/ranking/:tid/:days?" :paramsDesc="['分区 id, 见上方表格', '缺省为 7, 指最近多少天内的热度排序']"/>

<route name="视频选集列表" author="sxzz" example="/bilibili/video/page/39732828" path="/bilibili/video/page/:aid" :paramsDesc="['可在视频页 URL 中找到']"/>

<route name="视频评论" author="Qixingchen" example="/bilibili/video/reply/21669336" path="/bilibili/video/reply/:aid" :paramsDesc="['可在视频页 URL 中找到']"/>

<route name="视频弹幕" author="Qixingchen" example="/bilibili/video/danmaku/21669336/1" path="/bilibili/video/danmaku/:aid/:pid?" :paramsDesc="['视频AV号,可在视频页 URL 中找到','分P号,不填默认为1']"/>

<route name="link 公告" author="Qixingchen" example="/bilibili/link/news/live" path="/bilibili/link/news/:product" :paramsDesc="['公告分类, 包括 直播:live 小视频:vc 相簿:wh']"/>

#### 直播开播 <Author uid="Qixingchen"/>

见 [#哔哩哔哩直播](#哔哩哔哩直播)

#### 直播搜索 <Author uid="Qixingchen"/>

见 [#哔哩哔哩直播](#哔哩哔哩直播)

#### 直播分区 <Author uid="Qixingchen"/>

见 [#哔哩哔哩直播](#哔哩哔哩直播)

<route name="主站话题列表" author="Qixingchen" example="/bilibili/blackboard" path="/bilibili/blackboard" />

<route name="会员购新品上架" author="DIYgod" example="/bilibili/mall/new" path="/bilibili/mall/new" />

<route name="会员购作品" author="DIYgod" example="/bilibili/mall/ip/1_5883" path="/bilibili/mall/ip/:id" :paramsDesc="['作品 id, 可在作品列表页 URL 中找到']"/>

<route name="排行榜" author="DIYgod" example="/bilibili/ranking/0/3" path="/bilibili/ranking/:tid/:days?" :paramsDesc="['排行榜分区 id, 默认 0', '时间跨度, 可为 1 3 7 30']">

| 全站 | 动画 | 国创相关 | 音乐 | 舞蹈 | 游戏 | 科技 | 生活 | 鬼畜 | 时尚 | 娱乐 | 影视 |
| ---- | ---- | -------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0    | 1    | 168      | 3    | 129  | 4    | 36   | 160  | 119  | 155  | 5    | 181  |

</route>

<route name="话题(频道/标签)" author="Qixingchen" example="/bilibili/topic/2233" path="/bilibili/topic/2233" :paramsDesc="['话题名(又称频道名或标签) 例如 2233 或 COSPLAY']"/>

<route name="歌单" author="LogicJake" example="/bilibili/audio/10624" path="/bilibili/audio/10624" :paramsDesc="['歌单 id, 可在歌单页 URL 中找到']"/>

### 微博

<route name="博主（方案1）" author="DIYgod" example="/weibo/user/1195230310" path="/weibo/user/:uid" :paramsDesc="['用户 id, 博主主页打开控制台执行 `$CONFIG.oid` 获取']" crawlerBadge="1"/>

::: warning 注意

上述方案 1 获取 V+ 付费博主会有数据缺失, 所以这里提供方案 2 , 这种方式的缺点是描述不如上面的完善, 建议优先选择第一种方案

:::

<route name="博主（方案2）" author="DIYgod" example="/weibo/user2/1195230310" path="/weibo/user2/:uid" :paramsDesc="['用户 id, 博主主页打开控制台执行 `$CONFIG.oid` 获取']"/>

<route name="关键词" author="DIYgod" example="/weibo/keyword/DIYgod" path="/weibo/keyword/:keyword" :paramsDesc="['你想订阅的微博关键词']" crawlerBadge="1"/>

<route name="热搜榜" author="xyqfer" example="/weibo/search/hot" path="/weibo/search/hot" crawlerBadge="1"/>

### 贴吧

<route name="帖子列表" author="u3u" example="/tieba/forum/女图" path="/tieba/forum/:kw" :paramsDesc="['吧名']"/>

<route name="精品帖子" author="u3u" example="/tieba/forum/good/女图" path="/tieba/forum/good/:kw/:cid?" :paramsDesc="['吧名', '精品分类, 如果不传 `cid` 则获取全部分类']"/>

<route name="帖子动态" author="u3u" example="/tieba/post/5853240586" path="/tieba/post/:id" :paramsDesc="['帖子 ID']"/>

<route name="楼主动态" author="u3u" example="/tieba/post/lz/5853240586" path="/tieba/post/lz/:id" :paramsDesc="['帖子 ID']"/>

### 即刻

::: warning 注意

即刻主题较为复杂, 部分主题可能出现不适配的情况. 如出现上述情况请[提 Issue](https://github.com/DIYgod/RSSHub/issues).

:::

<route name="主题-精选" author="DIYgod" example="/jike/topic/54dffb40e4b0f57466e675f0" path="/jike/topic/:id" :paramsDesc="['主题 id, 可在即刻 web 端主题页或 APP 分享出来的主题页 URL 中找到']"/>

::: tip 提示

部分主题如 `一觉醒来发生了什么: 553870e8e4b0cafb0a1bef68` 提供纯文字内容, <a href="#/jike/topic/text/:id">主题-纯文字 /jike/topic/text/:id</a> 可能会提供更好的体验.

:::

<route name="主题-广场" author="DIYgod" example="/jike/topic/square/54dffb40e4b0f57466e675f0" path="/jike/topic/square/:id" :paramsDesc="['主题 id, 可在即刻 web 端主题页或 APP 分享出来的主题页 URL 中找到']"/>

<route name="主题-纯文字" author="HenryQW" example="/jike/topic/text/553870e8e4b0cafb0a1bef68" path="/jike/topic/text/:id" :paramsDesc="['主题 id, 可在即刻 web 端主题页或 APP 分享出来的主题页 URL 中找到']"/>

<route name="用户动态" author="DIYgod" example="/jike/user/82D23B32-CF36-4C59-AD6F-D05E3552CBF3" path="/jike/user/:id" :paramsDesc="['用户 id, 可在即刻 web 端用户页 URL 中找到']"/>

<route name="即刻小报" author="Andiedie" example="/jike/daily" path="/jike/daily"/>

### 微信

::: tip 提示

公众号直接抓取困难, 故目前提供即刻和瓦斯两种间接抓取方案, 请自行选择

:::

<route name="公众号（即刻来源）" author="DIYgod" example="/jike/topic/584b8ac671a288001154a115" path="/jike/topic/:id" :paramsDesc="['参考 [即刻-主题-精选](#/jike/topic/:id)']"/>

<route name="公众号（瓦斯来源）" author="DIYgod" example="/wechat/wasi/5b575db858e5c4583338db11" path="/wechat/wasi/:id" :paramsDesc="['瓦斯公众号 id, 可在[瓦斯](https://w.qnmlgb.tech/wx)搜索公众号, 打开公众号页, 在 URL 中找到 id']"/>

<route name="公众号（ wemp.app 来源）" author="HenryQW" example="/wechat/wemp/36836fbe-bdec-4758-8967-7cc82722952d" path="/wechat/wemp/:id" :paramsDesc="['wemp 公众号 id, 可在搜索引擎使用 `site:wemp.app` 搜索公众号（例如: 人民日报 site:wemp.app), 打开公众号页, 在 URL 中找到 id']"/>

<route name="公众号（传送门来源）" author="HenryQW" example="/wechat/csm/huxiu_com" path="/wechat/csm/:id" :paramsDesc="['公众号 id, 打开公众号页, 在 URL 中找到 id']"/>

<route name="公众平台系统公告栏目" author="xyqfer" example="/wechat/announce" path="/wechat/announce" />

<route name="小程序插件" author="xyqfer" example="/wechat/miniprogram/plugins" path="/wechat/miniprogram/plugins" />

### 简书

<route name="首页" author="DIYgod HenryQW" example="/jianshu/home" path="/jianshu/home"/>

<route name="热门" author="DIYgod HenryQW" example="/jianshu/trending/weekly" path="/jianshu/trending/:timeframe" :paramsDesc="['按周 `weekly` 或 按月 `monthly`']"/>

<route name="专题" author="DIYgod HenryQW" example="/jianshu/collection/xYuZYD" path="/jianshu/collection/:id" :paramsDesc="['专题 id, 可在专题页 URL 中找到']"/>

<route name="作者" author="DIYgod HenryQW" example="/jianshu/user/yZq3ZV" path="/jianshu/user/:id" :paramsDesc="['作者 id, 可在作者主页 URL 中找到']"/>

### 知乎

<route name="收藏夹" author="huruji" example="/zhihu/collection/26444956" path="/zhihu/collection/:id" :paramsDesc="['收藏夹 id, 可在收藏夹页面 URL 中找到']" crawlerBadge="1"/>

<route name="用户动态" author="DIYgod" example="/zhihu/people/activities/diygod" path="/zhihu/people/activities/:id" :paramsDesc="['作者 id, 可在用户主页 URL 中找到']" crawlerBadge="1"/>

<route name="用户回答" author="DIYgod" example="/zhihu/people/answers/diygod" path="/zhihu/people/answers/:id" :paramsDesc="['作者 id, 可在用户主页 URL 中找到']" crawlerBadge="1"/>

<route name="专栏" author="DIYgod" example="/zhihu/zhuanlan/googledevelopers" path="/zhihu/zhuanlan/:id" :paramsDesc="['专栏 id, 可在专栏主页 URL 中找到']" crawlerBadge="1"/>

<route name="知乎日报" author="DHPO" example="/zhihu/daily" path="/zhihu/daily" crawlerBadge="1"/>

<route name="知乎热榜" author="DIYgod" example="/zhihu/hotlist" path="/zhihu/hotlist" crawlerBadge="1"/>

<route name="知乎想法热榜" author="xyqfer" example="/zhihu/pin/hotlist" path="/zhihu/pin/hotlist" crawlerBadge="1"/>

<route name="问题" author="xyqfer" example="/zhihu/question/59895982" path="/zhihu/question/:questionId" :paramsDesc="['问题 id']" crawlerBadge="1"/>

<route name="话题" author="xyqfer" example="/zhihu/topic/19828946" path="/zhihu/topic/:topicId" :paramsDesc="['话题 id']" crawlerBadge="1"/>

<route name="用户想法" author="xyqfer" example="/zhihu/people/pins/kan-dan-45" path="/zhihu/people/pins/:id" :paramsDesc="['作者 id, 可在用户主页 URL 中找到']" crawlerBadge="1"/>

<route name="知乎书店-新书" author="xyqfer" example="/zhihu/bookstore/newest" path="/zhihu/bookstore/newest" crawlerBadge="1"/>

<route name="知乎想法-24小时新闻汇总" author="xyqfer" example="/zhihu/pin/daily" path="/zhihu/pin/daily" crawlerBadge="1"/>

### pixiv

<route name="用户收藏" author="EYHN" example="/pixiv/user/bookmarks/15288095" path="/pixiv/user/bookmarks/:id" :paramsDesc="['用户 id, 可在用户主页 URL 中找到']"/>

<route name="用户动态" author="DIYgod" example="/pixiv/user/11" path="/pixiv/user/:id" :paramsDesc="['用户 id, 可在用户主页 URL 中找到']"/>

<route name="排行榜" author="EYHN" example="/pixiv/ranking/week" path="/pixiv/ranking/:mode/:date?" :paramsDesc="['排行榜类型' ,'日期, 取值形如 `2018-4-25`']">

| pixiv 日排行 | pixiv 周排行 | pixiv 月排行 | pixiv 受男性欢迎排行 | pixiv 受女性欢迎排行 | pixiv 原创作品排行 | pixiv 新人排行 |
| ------------ | ------------ | ------------ | -------------------- | -------------------- | ------------------ | -------------- |
| day          | week         | month        | day_male             | day_female           | week_original      | week_rookie    |

| pixiv R-18 日排行 | pixiv R-18 受男性欢迎排行 | pixiv R-18 受女性欢迎排行 | pixiv R-18 周排行 | pixiv R-18G 排行 |
| ----------------- | ------------------------- | ------------------------- | ----------------- | ---------------- |
| day_r18           | day_male_r18              | day_female_r18            | week_r18          | week_r18g        |

</route>

<route name="关键词" author="DIYgod" example="/pixiv/search/麻衣/popular" path="/pixiv/search/:keyword/:order?" :paramsDesc="['关键词', '排序方式，popular 按热门度排序，空或其他任意值按时间排序']"/>

### 豆瓣

<route name="正在上映的电影" author="DIYgod" example="/douban/movie/playing" path="/douban/movie/playing"/>

<route name="正在上映的高分电影" author="DIYgod" example="/douban/movie/playing/7.5/杭州" path="/douban/movie/playing/:score/:city?" :paramsDesc="['返回大于等于这个分数的电影', '城市的中文名, 可选, 默认北京']"/>

<route name="即将上映的电影" author="DIYgod" example="/douban/movie/later" path="/douban/movie/later"/>

<route name="北美票房榜" author="DIYgod" example="/douban/movie/ustop" path="/douban/movie/ustop"/>

<route name="豆瓣小组" author="DIYgod" example="/douban/group/camera" path="/douban/group/:groupid" :paramsDesc="['豆瓣小组的 id']"/>

<route name="浏览发现" author="clarkzsd" example="/douban/explore" path="/douban/explore"/>

<route name="浏览发现分栏目" author="LogicJake" example="/douban/explore/column/2" path="/douban/explore_column/:id" :paramsDesc="['分栏目id']"/>

<route name="新书速递" author="fengkx" example="/douban/book/latest" path="douban/book/latest"/>

<route name="最新增加的音乐" author="fengkx xyqfer" example="/douban/music/latest/chinese" path="/douban/music/latest/:area?" :paramsDesc="['区域类型，默认全部']">

| 华语    | 欧美    | 日韩        |
| ------- | ------- | ----------- |
| chinese | western | japankorean |

</route>

<route name="热门同城活动" author="xyqfer" example="/douban/event/hot/118172" path="/douban/event/hot/:locationId" :paramsDesc="['位置 id, [同城首页](https://www.douban.com/location)打开控制台执行 `window.__loc_id__` 获取']"/>

<route name="商务印书馆新书速递" author="xyqfer" example="/douban/commercialpress/latest" path="/douban/commercialpress/latest"/>

<route name="豆瓣书店" author="xyqfer" example="/douban/bookstore" path="/douban/bookstore"/>

<route name="热门图书排行" author="xyqfer" example="/douban/book/rank/fiction" path="/douban/book/rank/:type" :paramsDesc="['图书类型']">

| 虚构    | 非虚构     |
| ------- | ---------- |
| fiction | nonfiction |

</route>

<route name="豆列" author="LogicJake" example="/douban/doulist/37716774" path="douban/doulist/:id" :paramsDesc="['豆列id']"/>

<route name="用户广播" author="alfredcai" example="/douban/people/62759792/status" path="douban/people/:userid/status" :paramsDesc="['整数型用户 id']">

::: tip 提示

-   **目前只支持整数型 id**
-   字母型的 id，可以通过头像图片链接来找到其整数型 id，图片命名规则`ul[userid]-*.jpg`
-   例如：用户 id: `MovieL`他的头像图片链接：`https://img1.doubanio.com/icon/ul1128221-98.jpg`他的整数型 id: `1128221`

:::

</route>

<route name="话题" author="LogicJake" example="/douban/topic/48823" path="/douban/topic/:id/:sort?" :paramsDesc="['话题id','排序方式，hot或new，默认为new']"/>

### Disqus

<route name="评论" author="DIYgod" example="/disqus/posts/diygod-me" path="/disqus/posts/:forum" :paramsDesc="['网站的 disqus name']"/>

### Twitter

<route name="用户" author="DIYgod" example="/twitter/user/DIYgod" path="/twitter/user/:id" :paramsDesc="['用户 twitter 名']"/>

<route name="列表" author="xyqfer" example="/twitter/list/ladyleet/javascript" path="/twitter/list/:id/:name" :paramsDesc="['用户 twitter 名', 'list 名称']"/>

<route name="Likes" author="xyqfer" example="/twitter/likes/DIYgod" path="/twitter/likes/:id" :paramsDesc="['用户 twitter 名']"/>

### Instagram

<route name="用户" author="DIYgod" example="/instagram/user/diygod" path="/instagram/user/:id" :paramsDesc="['用户 id']"/>

### Youtube

<route name="用户" author="DIYgod" example="/youtube/user/JFlaMusic/" path="/youtube/user/:username/:embed?" :paramsDesc="['用户名', '默认为开启内嵌视频, 任意值为关闭']"/>

<route name="频道" author="DIYgod" example="/youtube/channel/UCDwDMPOZfxVV0x_dz0eQ8KQ" path="/youtube/channel/:id/:embed?" :paramsDesc="['频道 id', '默认为开启内嵌视频, 任意值为关闭']"/>

<route name="播放列表" author="HenryQW" example="/youtube/playlist/PLqQ1RwlxOgeLTJ1f3fNMSwhjVgaWKo_9Z" path="/youtube/playlist/:id/:embed?" :paramsDesc="['播放列表 id', '默认为开启内嵌视频, 任意值为关闭']"/>

### Dribbble

<route name="流行" author="DIYgod" example="/dribbble/popular/week" path="/dribbble/popular/:timeframe?" :paramsDesc="['时间维度, 支持 week month year ever']"/>

<route name="用户（团队" author="DIYgod" example="/dribbble/user/google" path="/dribbble/user/:name" :paramsDesc="['用户名, 可在该用户主页 URL 中找到']"/>

<route name="关键词" author="DIYgod" example="/dribbble/keyword/player" path="/dribbble/keyword/:keyword" :paramsDesc="['想要订阅的关键词']"/>

### Telegram

<route name="频道" author="DIYgod" example="/telegram/channel/awesomeDIYgod" path="/telegram/channel/:username" :paramsDesc="['频道 username']">

::: tip 提示

订阅要求: 将机器人 [@RSSHub_bot](https://t.me/RSSHub_bot) 加为频道管理员, 然后发一条消息后才可正常获取数据

如果是私有频道，`username`请传入频道`id`(比如`-1001001234567`)，具体获取可参考[这里](https://stackoverflow.com/questions/33858927/how-to-obtain-the-chat-id-of-a-private-telegram-channel)

:::

</route>

<route name="贴纸包" author="DIYgod" example="/telegram/stickerpack/DIYgod" path="/telegram/stickerpack/:name" :paramsDesc="['贴纸包 id, 可在分享贴纸获得的 URL 中找到']"/>

### 抖音

<route name="用户动态" author="DIYgod" example="/douyin/user/93610979153" path="/douyin/user/:id" :paramsDesc="['用户 id, 可在 分享出去获得的用户主页 URL 中找到']"/>

<route name="喜欢的视频" author="xyqfer" example="/douyin/like/93610979153" path="/douyin/like/:id" :paramsDesc="['用户 id, 可在 分享出去获得的用户主页 URL 中找到']"/>

### 美拍

<route name="用户动态" author="ihewro" example="/meipai/user/56537299" path="/meipai/user/:id" :paramsDesc="['用户 id, 可在 分享出去获得的用户主页 URL 中找到']"/>

### 雪球

<route name="用户动态" author="imlonghao" example="/xueqiu/user/8152922548" path="/xueqiu/user/:id/:type?" :paramsDesc="['用户 id, 可在用户主页 URL 中找到', '动态的类型, 不填则默认全部']">

| 原发布 | 长文 | 问答 | 热门 | 交易 |
| ------ | ---- | ---- | ---- | ---- |
| 0      | 2    | 4    | 9    | 11   |

</route>

<route name="用户收藏动态" author="imlonghao" example="/xueqiu/favorite/8152922548" path="/xueqiu/favorite/:id" :paramsDesc="['用户 id, 可在用户主页 URL 中找到']"/>

<route name="用户自选动态" author="hillerliao" example="/xueqiu/user_stock/1247347556" path="/xueqiu/user_stock/:id" :paramsDesc="['用户 id, 可在用户主页 URL 中找到']"/>

<route name="基金净值更新" author="HenryQW" example="/xueqiu/fund/040008" path="/xueqiu/fund/:id" :paramsDesc="['基金代码, 可在基金主页 URL 中找到. 此路由的数据为场外基金 (`F`开头)']"/>

<route name="股票信息" author="YuYang" example="/xueqiu/stock_info/SZ000002" path="/xueqiu/stock_info/:id/:type?" :paramsDesc="['股票代码（需要带上交易所）', '动态的类型, 不填则为股票公告']">

| 公告         | 新闻 | 研报     |
| ------------ | ---- | -------- |
| announcement | news | research |

</route>

### 龙腾网

<route name="转译网贴" author="sgqy" example="/ltaaa" path="/ltaaa/:type?" :paramsDesc="['热门类型.']">

| 最新 | 每周 | 每月  | 全年 |
| ---- | ---- | ----- | ---- |
| (空) | week | month | year |

</route>

### NGA

<route name="分区帖子" author="xyqfer" example="/nga/forum/485" path="/nga/forum/:fid"  :paramsDesc="['分区 id, 可在分区主页 URL 找到']"/>

<route name="帖子" author="xyqfer" example="/nga/post/15939161" path="/nga/post/:tid"  :paramsDesc="['帖子 id, 可在帖子 URL 找到']"/>

### Facebook

<route name="粉絲專頁" author="maple3142" example="/facebook/page/SonetPCR" path="/facebook/page/:id" :paramsDesc="['專頁 id']"/>

### 币乎

<route name="用户动态" author="LogicJake" example="/bihu/activaties/1478342200" path="/bihu/activaties/:id" :paramsDesc="['用户 id']"/>

### 虎扑

<route name="虎扑BBS论坛" author="LogicJake" example="/hupu/bbs/bxj/2" path="/hupu/bbs/:id/:order?" :paramsDesc="['板块id，可在板块 URL 找到', '排序方式，1最新回帖（默认），2最新发帖，3精华帖']"/>

### Dcard

<route name="首頁帖子" author="DIYgod" example="/dcard/posts/popular" path="/dcard/posts/:type?" :paramsDesc="['排序，popular 熱門；latest 最新，默認為 latest']"/>

<route name="板塊帖子" author="HenryQW" example="/dcard/funny/popular" path="/dcard/:section/:type?" :paramsDesc="['板塊名稱，URL 中獲得', '排序，popular 熱門；latest 最新，默認為 latest']"/>

### 好奇心日报

<route name="分类" author="WenhuWee" example="/qdaily/category/5" path="/qdaily/category/:id" :paramsDesc="['分类id，可在分类URL找到']"/>

<route name="栏目" author="WenhuWee" example="/qdaily/column/59" path="/qdaily/column/:id" :paramsDesc="['栏目id，可在栏目URL找到']"/>

## 编程

### 掘金

<route name="分类" author="DIYgod" example="/juejin/category/frontend" path="/juejin/category/:category" :paramsDesc="['分类名']">

| 前端     | Android | iOS | 后端    | 设计   | 产品    | 工具资源 | 阅读    | 人工智能 |
| -------- | ------- | --- | ------- | ------ | ------- | -------- | ------- | -------- |
| frontend | android | ios | backend | design | product | freebie  | article | ai       |

</route>

<route name="标签" author="isheng5" example="/juejin/tag/架构" path="/juejin/tag/:tag" :paramsDesc="['标签名, 可在标签 URL 中找到']"/>

<route name="热门" author="moaix" example="/juejin/trending/ios/monthly" path="/juejin/trending/:category/:type" :paramsDesc="['分类名', '类型']">

| category | 标签     |
| -------- | -------- |
| android  | Android  |
| frontend | 前端     |
| ios      | iOS      |
| backend  | 后端     |
| design   | 设计     |
| product  | 产品     |
| freebie  | 工具资源 |
| article  | 阅读     |
| ai       | 人工智能 |
| devops   | 运维     |
| all      | 全部     |

| type       | 类型     |
| ---------- | -------- |
| weekly     | 本周最热 |
| monthly    | 本月最热 |
| historical | 历史最热 |

</route>

<route name="小册" author="xyqfer" example="/juejin/books" path="/juejin/books"/>

> 掘金小册需要付费订阅, RSS 仅做更新提醒, 不含付费内容.

<route name="沸点" author="xyqfer" example="/juejin/pins" path="/juejin/pins"/>

<route name="专栏" author="Maecenas" example="/juejin/posts/56852b2460b2a099cdc1d133" path="/juejin/posts/:id" :paramsDesc="['用户 id, 可在用户页 URL 中找到']"/>

### Dockone

<route name="周报" author="csi0n" example="/dockone/weekly" path="/dockone/weekly"/>

### 开发者头条

<route name="今天头条" author="jjeejj" example="/toutiao/today" path="/toutiao/today"/>

<route name="独家号" author="jjeejj" example="/toutiao/user/140544" path="/toutiao/user/:id" :paramsDesc="['独家号 id, 可在对应独家号页 URL 中找到']"/>

### 众成翻译

<route name="首页" author="SirM2z" example="/zcfy" path="/zcfy/index"/>

<route name="热门" author="SirM2z" example="/zcfy/hot" path="/zcfy/hot"/>

### V2EX

<route name="最热/最新主题" author="WhiteWorld" example="/v2ex/topics/latest" path="/v2ex/topics/:type" :paramsDesc="['hot 或 latest']"/>

### GitHub

::: tip 提示

GitHub 官方也提供了一些 RSS:

-   仓库 releases: https://github.com/:owner/:repo/releases.atom
-   仓库 commits: https://github.com/:owner/:repo/commits.atom
-   用户动态: https://github.com/:user.atom
-   专属动态: https://github.com/:user.private.atom?token=:secret (登录后在[仪表盘页面](https://github.com)找到 **Subscribe to your news feed** 字样即可)

:::

<route name="用户仓库" author="DIYgod" example="/github/repos/DIYgod" path="/github/repos/:user" :paramsDesc="['用户名']"/>

<route name="Trending" author="DIYgod" example="/github/trending/daily/javascript" path="/github/trending/:since/:language?" :paramsDesc="['时间跨度, 可在 [Trending 页](https://github.com/trending/javascript?since=monthly) URL 中找到, 可选 daily weekly monthly', '语言, 可在 [Trending 页](https://github.com/trending/javascript?since=monthly) URL 中找到']"/>

<route name="仓库 Issue" author="HenryQW" example="/github/issue/DIYgod/RSSHub" path="/github/issue/:user/:repo" :paramsDesc="['用户名', '仓库名']"/>

<route name="仓库 Pull Requests" author="hashman" example="/github/pull/DIYgod/RSSHub" path="/github/pull/:user/:repo" :paramsDesc="['用户名', '仓库名']"/>

<route name="用户" author="HenryQW" example="/github/user/followers/HenryQW" path="/github/user/followers/:user" :paramsDesc="['用户名']"/>

<route name="仓库 Stars" author="HenryQW" example="/github/stars/DIYgod/RSSHub" path="/github/stars/:user/:repo" :paramsDesc="['用户名', '仓库名']"/>

<route name="搜索结果" author="LogicJake" example="/github/search/RSSHub/bestmatch/desc" path="/github/search/:query/:sort?/:order?" :paramsDesc="['搜索关键词', '排序选项（默认为bestmatch）','排序顺序，desc和asc（默认desc降序）']"/>

| 排序选项           | sort      |
| ------------------ | --------- |
| 最佳匹配           | bestmatch |
| 根据 star 数量排序 | stars     |
| 根据 fork 数量排序 | forks     |
| 根据更新时间排序   | updated   |

### 开源中国

<route name="资讯" author="tgly307" example="/oschina/news" path="/oschina/news"/>

### GitLab

<route name="Explore" author="imlonghao" example="/gitlab/explore/trending" path="/gitlab/explore/:type" :paramsDesc="['分类']">

| Trending | Most stars | All |
| -------- | ---------- | --- |
| trending | starred    | all |

</route>

### 极客时间

<route name="专栏文章" author="fengchang" example="/geektime/column/48" path="/geektime/column/:cid" :paramsDesc="['专栏 id, 可从[全部专栏](https://time.geekbang.org/paid-content)进入专栏介绍页, 在 URL 中找到']"/>

> 极客时间专栏需要付费订阅, RSS 仅做更新提醒, 不含付费内容.

### 安全客

::: tip 提示

官方提供了混合的主页资讯 RSS: https://api.anquanke.com/data/v1/rss

:::

<route name="最新漏洞列表" author="qwertyuiop6" example="/aqk/vul" path="/aqk/vul"/>

<route name="分类订阅" author="qwertyuiop6" example="/aqk/week" path="/aqk/:category" :paramsDesc="['分类订阅']">

| 360 网络安全周报 | 活动     | 知识      | 资讯 | 招聘 |
| ---------------- | -------- | --------- | ---- | ---- |
| week             | activity | knowledge | news | job  |

</route>

### LinkedKeeper

<route name="博文" author="imlonghao" example="/linkedkeeper/sub/1" path="/linkedkeeper/:type/:id?" :paramsDesc="['博文分类, 为 URL 中 `.action` 的文件名', '分区或标签的 ID, 对应 URL 中的 `sid` 或 `tid`']"/>

### 看雪

<route name="论坛" author="renzhexigua" example="/pediy/topic/android/digest" path="/pediy/topic/:category?/:type?" :paramsDesc="['版块, 缺省为`all`', '类型, 缺省为`latest`']"/>

| 版块         | category   |
| ------------ | ---------- |
| 智能设备     | iot        |
| 区块链安全   | blockchain |
| Android 安全 | android    |
| iOS 安全     | ios        |
| 软件逆向     | re         |
| 编程技术     | coding     |
| 加壳脱壳     | unpack     |
| 密码算法     | crypto     |
| 二进制漏洞   | vuln       |
| CrackMe      | crackme    |
| Pwn          | pwn        |
| WEB 安全     | web        |
| 全站         | all        |

| 类型     | type   |
| -------- | ------ |
| 最新主题 | latest |
| 精华主题 | digest |

### 腾讯游戏开发者社区

::: warning 注意

有部分输出全文带有未进行样式处理的代码内容，显示效果不佳，建议跳转原文阅读

:::

<route name="分类" author="xyqfer" example="/gameinstitute/community/hot" path="/gameinstitute/community/:tag?" :paramsDesc="['标签名称，默认为热门']">

| 热门 | 策划 | 程序    | 技术前沿 | 音频  | 项目管理 | 游戏运营 | 游戏测试 |
| ---- | ---- | ------- | -------- | ----- | -------- | -------- | -------- |
| hot  | plan | program | tech     | audio | project  | yunying  | test     |

</route>

### 知晓程序

<route name="文章" author="HenryQW" example="/miniapp/article/cloud" path="/miniapp/article/:category" :paramsDesc="['分类名称']">

| 全部 | 小程序资讯 | 知晓云 | 小程序推荐     | 榜单 | 晓组织 | 新能力     | 小程序问答 |
| ---- | ---------- | ------ | -------------- | ---- | ------ | ---------- | ---------- |
| all  | news       | cloud  | recommendation | rank | group  | capability | qa         |

</route>

<route name="小程序商店-最新" author="xyqfer" example="/miniapp/store/newest" path="/miniapp/store/newest"/>

### 技术头条

<route name="最新分享" author="xyqfer" example="/blogread/newest" path="/blogread/newest"/>

### GitChat

<route name="最新" author="xyqfer" example="/gitchat/newest" path="/gitchat/newest"/>

> GitChat 需要付费订阅, RSS 仅做更新提醒, 不含付费内容.

### Gitea

<route name="博客" author="cnzgray" example="/gitea/blog" path="/gitea/blog">

> gitea 博客一般发布最新的 release 信息，路由选择用 blog 名称主要因为其地址名为 blog，而非 changlog，慎重起见还是用 blog 命名。

</route>

### TesterHome

<route name="最新发布" author="xyqfer" example="/testerhome/newest" path="/testerhome/newest"/>

### Linux Patchwork

<route name="Patch Comments" author="ysc3839" example="/patchwork.kernel.org/comments/10723629" path="/patchwork.kernel.org/comments/:id" :paramsDesc="['Patch ID']"/>

### LeetCode

<route name="文章" author="LogicJake" example="/leetcode/articles" path="/leetcode/articles"/>

### segmentfault

<route name="频道" author="LogicJake" example="/segmentfault/channel/frontend" path="/segmentfault/channel/:name" :paramsDesc="['频道名称，在频道 URL 可以找到']"/>

### 牛客网

<route name="讨论区" author="LogicJake" example="/nowcoder/discuss/2/4" path="/nowcoder/discuss/:type/:order" :paramsDesc="['讨论区分区id 在 URL 中可以找到', '排序方式']">

| 最新回复 | 最新发表 | 最新 | 精华 |
| -------- | -------- | ---- | ---- |
| 0        | 3        | 1    | 4    |

</route>

## 直播

### 哔哩哔哩直播

<route name="直播开播" author="Qixingchen" example="/bilibili/live/room/3" path="/bilibili/live/room/:roomID" :paramsDesc="['房间号, 可在直播间 URL 中找到, 长短号均可']"/>

<route name="直播搜索" author="Qixingchen" example="/bilibili/live/search/编程/online" path="/bilibili/live/search/:key/:order" :paramsDesc="['搜索关键字', '排序方式, live_time 开播时间, online 人气']"/>

<route name="直播分区" author="Qixingchen" example="/bilibili/live/area/143/online" path="/bilibili/live/area/:areaID/:order" :paramsDesc="['分区 ID 分区增删较多, 可通过 [分区列表](https://api.live.bilibili.com/room/v1/Area/getList) 查询', '排序方式, live_time 开播时间, online 人气']">

::: warning 注意

由于接口未提供开播时间, 如果直播间未更换标题与分区, 将视为一次. 如果直播间更换分区与标题, 将视为另一项

:::

</route>

### 斗鱼直播

<route name="直播间开播" author="DIYgod" example="/douyu/room/24422" path="/douyu/room/:id" :paramsDesc="['直播间 id, 可在主播直播间页 URL 中找到']"/>

### 熊猫直播

<route name="直播间开播下播" author="DIYgod" example="/panda/room/10300" path="/panda/room/:id" :paramsDesc="['直播间 id, 可在主播直播间页 URL 中找到']"/>

### 虎牙直播

<route name="直播间开播" author="SettingDust xyqfer" example="/huya/live/edmunddzhang" path="/huya/live/:id" :paramsDesc="['直播间id或主播名(有一些id是名字，如上)']"/>

### kingkong 直播

<route name="直播间开播" author="LogicJake" example="/kingkong/room/2133342" path="/kingkong/room/:id" :paramsDesc="['直播间 id, 可在主播直播间页 URL 中找到']"/>

## 音视频

### bilibili

见 [#bilibili](#bilibili)

### Youtube

见 [#youtube](#youtube)

### 抖音

见 [#抖音](#抖音)

### 网易云音乐

<route name="歌单歌曲" author="DIYgod" example="/ncm/playlist/35798529" path="/ncm/playlist/:id" :paramsDesc="['歌单 id, 可在歌单页 URL 中找到']"/>

<route name="用户歌单" author="DIYgod" example="/ncm/user/playlist/45441555" path="/ncm/user/playlist/:uid" :paramsDesc="['用户 uid, 可在用户主页 URL 中找到']"/>

<route name="歌手专辑" author="metowolf" example="/ncm/artist/2116" path="/ncm/artist/:id" :paramsDesc="[' 歌手 id, 可在歌手详情页 URL 中找到']"/>

<route name="电台节目" author="magic-akari" example="/ncm/djradio/347317067" path="/ncm/djradio/:id" :paramsDesc="['节目 id, 可在电台节目页 URL 中找到']"/>

### 爱奇艺

<route name="动漫" author="ranpox" example="/iqiyi/dongman/a_19rrh1sifx" path="/iqiyi/dongman/:id" :paramsDesc="['动漫 id, 可在该动漫主页 URL 中找到(不包括`.html`)']"/>

### 腾讯视频

<route name="播放列表" author="Andiedie" example="/tencentvideo/playlist/jx7g4sm320sqm7i" path="/tencentvideo/playlist/:id" :paramsDesc="['播放列表 ID，可以在 URL 中找到']" />

### 喜马拉雅

<route name="专辑(支持泛用型播客订阅)" author="lengthmin jjeejj" example="/ximalaya/album/299146" path="/ximalaya/album/:id/:all?" :paramsDesc="['专辑 id, 可在对应专辑页面的 URL 中找到','是否需要获取全部节目，默认不获取，填入该字段则视为获取']">

::: warning 注意
专辑 id 是跟在**分类拼音**后的那个 id, 不要输成某集的 id 了

**付费内容不可收听，但可使用非播客软件(例如 Inoreader)获取更新**

目前支持泛用型播客订阅的[输出格式](https://docs.rsshub.app/#输出格式)中标明的格式只有 rss 支持, 也就是说你**只能使用**以下类型的链接来订阅播客:

-   https://rsshub.app/ximalaya/album/*
-   https://rsshub.app/ximalaya/album/*.rss

:::

</route>

### EZTV

::: tip 提示

网站提供了全部种子的 RSS: https://eztv.ag/ezrss.xml

:::

<route name="Lookup Torrents by IMDB ID" author="Songkeys" example="/eztv/torrents/6048596" path="/eztv/torrents/:imdb_id" :paramsDesc="['想搜寻的 show 的种子所对应的 IMDB ID, 可在 [IMDB](https://www.imdb.com) 官网找到']"/>

### 草榴社区

<route name="分区帖子" author="zhboner" example="/t66y/20/2" path="/t66y/:id/:type?" :paramsDesc="['分区 id, 可在分区页 URL 中找到', '类型 id, 可在分区类型过滤后的 URL 中找到']">

> 注意：并非所有的分区都有子类型，可以参考成人文学交流区的[古典武侠]这一子类型。

| 亚洲无码原创区 | 亚洲有码原创区 | 欧美原创区 | 动漫原创区 | 国产原创区 |
| -------------- | -------------- | ---------- | ---------- | ---------- |
| 2              | 15             | 4          | 5          | 25         |

| 中字原创区 | 转帖交流区 | HTTP 下载区 | 在线成人区 |
| ---------- | ---------- | ----------- | ---------- |
| 26         | 27         | 21          | 22         |

| 技术讨论区 | 新时代的我们 | 达盖尔的旗帜 | 成人文学交流 |
| ---------- | ------------ | ------------ | ------------ |
| 7          | 8            | 16           | 20           |

</route>

<route name="帖子跟踪" author="cnzgray" example="/t66y/post/3286088" path="/t66y/post/:tid" :paramsDesc="['帖子 id, 可在帖子 URL 中找到']">

::: tip 提示

帖子 id 查找办法:

打开想跟踪的帖子，比如：http://t66y.com/htm_data/20/1811/3286088.html。其中`3286088`就是帖子id。

:::

</route>

### sexinsex

<route name="分区帖子" author="cnzgray" example="/sexinsex/230/634" path="/sexinsex/:id/:type?" :paramsDesc="['分区 id, 可在分区页 URL 中找到', '类型 id, 可在分区类型过滤后的 URL 中找到']">

> 注意：并非所有的分区都有子类型，可以参考亚洲成人有码原创区的[字幕]这一子类型。

| 亚洲成人无码原创区 | 亚洲成人有码原创区 | 欧美无码原创区 | 欧美无码区 | 亚洲有码薄码区 |
| ------------------ | ------------------ | -------------- | ---------- | -------------- |
| 143                | 230                | 229            | 77         | 58             |

</route>

### 电影首发站

<route name="电影" author="epirus" example="/dysfz" path="/dysfz"/>

### 电影天堂

<route name="新片精品" author="imgss" example="/dytt" path="/dytt"/>

### rs05 人生 05 电影

<route name="rs05电影列表" author="monner-henster" example="/rs05/rs05" path="/rs05/rs05"/>

### 优酷

<route name="频道" author="xyqfer" example="/youku/channel/UNTg3MTM3OTcy" path="/youku/channel/:channelId/:embed?" :paramsDesc="['频道 id', '默认为开启内嵌视频, 任意值为关闭']"/>

### AcFun

<route name="番剧" author="xyqfer" example="/acfun/bangumi/5022158" path="/acfun/bangumi/:id" :paramsDesc="['番剧 id']"/>

::: tip 提示

番剧 id 不包含开头的 aa。
例如：http://www.acfun.cn/bangumi/aa5022158 的番剧 id 是 5022158，不包括开头的 aa。

:::

### 字幕组（ZiMuZu.tv）

::: tip 提示

跟官方提供的 RSS 相比：官方使用了不规范的 magnet 字段，无法被 BT 客户端识别并自动下载，其他数据相同

:::

<route name="影视" author="DIYgod" example="/zimuzu/resource/37031" path="/zimuzu/resource/:id?" :paramsDesc="['影视 id，对应影视的 URL 中找到，为空时输出最近更新']"/>

### Sankaku Complex

<route name="Post" author="xyqfer" example="/sankakucomplex/post" path="/sankakucomplex/post"/>

### 高清电台

<route name="最新电影" author="Songkeys" example="/gaoqing/latest" path="/gaoqing/latest"/>

### JavBus

<route name="首页" author="MegrezZhu CoderTonyChan" example="/javbus/home" path="/javbus/home"/>

<route name="分类" author="MegrezZhu CoderTonyChan" example="/javbus/genre/7g" path="/javbus/genre/:gid" :paramsDesc="['分类id，详见[网站里](https://www.javbus.com/genre)的链接']" />

<route name="演员" author="MegrezZhu CoderTonyChan" example="/javbus/star/2jv" path="/javbus/star/:sid" :paramsDesc="['演员id，详见[网站里](https://www.javbus.com/actresses)的链接']" />

<route name="首页/步兵" author="MegrezZhu CoderTonyChan" example="/javbus/uncensored/home" path="/javbus/uncensored/home"/>

<route name="分类/步兵" author="MegrezZhu CoderTonyChan" example="/javbus/uncensored/genre/1bc" path="/javbus/uncensored/genre/:gid" :paramsDesc="['分类id，详见[网站里](https://www.javbus.com/uncensored/genre)的链接']" />

<route name="演员/步兵" author="MegrezZhu CoderTonyChan" example="/javbus/uncensored/star/b5b" path="/javbus/uncensored/star/:sid" :paramsDesc="['演员id，详见[网站里](https://www.javbus.com/uncensored/actresses)的链接']" />

<route name="首页/欧陆风云" author="MegrezZhu CoderTonyChan" example="/javbus/western/home" path="/javbus/western/home"/>

<route name="分类/欧陆风云" author="MegrezZhu CoderTonyChan" example="/javbus/western/genre/86" path="/javbus/western/genre/:gid" :paramsDesc="['分类id，详见[网站里](https://www.javbus.work/genre)的链接']" />

<route name="演员/欧陆风云" author="MegrezZhu CoderTonyChan" example="/javbus/western/star/4hv" path="/javbus/western/star/:sid" :paramsDesc="['演员id，详见[网站里](https://www.javbus.work/actresses)的链接']" />

### Mp4Ba

**类型参考这里**
| 1 | 2 | 3 | 4 |
| - | - | - | - |
| 电影 | 连续剧 | 综艺 | 动画 |

| 5      | 6      | 7      | 8      | 9      |
| ------ | ------ | ------ | ------ | ------ |
| 动作片 | 喜剧片 | 爱情片 | 科幻片 | 恐怖片 |

| 10     | 11     | 12     | 13     | 14     | 15     |
| ------ | ------ | ------ | ------ | ------ | ------ |
| 剧情片 | 战争片 | 国产剧 | 港台剧 | 日韩剧 | 欧美剧 |

<route name="资源" author="SettingDust"  example="/mp4ba/1" path="/mp4ba/:param" :paramsDesc="['类型/关键字']"/>

## 图片

### 妹子图

<route name="首页（最新）" author="gee1k xyqfer" example="/mzitu/home" path="/mzitu/home/:type?" :paramsDesc="['类型，默认最新，可选`hot`最热']"/>

<route name="分类" author="gee1k xyqfer" example="/mzitu/category/xinggan" path="/mzitu/category/:category" :paramsDesc="['分类名']">

| 性感妹子 | 日本妹子 | 台湾妹子 | 清纯妹子 |
| -------- | -------- | -------- | -------- |
| xinggan  | japan    | taiwan   | mm       |

</route>

<route name="所有专题" author="gee1k xyqfer" example="/mzitu/tags" path="/mzitu/tags"/>

<route name="专题详情" author="gee1k xyqfer" example="/mzitu/tag/shishen" path="/mzitu/tag/:tag" :paramsDesc="['专题名, 可在专题页 URL 中找到']"/>

<route name="详情" author="gee1k xyqfer" example="/mzitu/post/129452" path="/mzitu/post/:id" :paramsDesc="['详情 id, 可在详情页 URL 中找到']"/>

### 不羞涩

<route name="分类" author="kba977" example="/dbmv" path="/dbmv/:category?" :paramsDesc="['分类 id - 若不填该参数, 默认所有']">

| 大胸妹 | 小翘臀 | 黑丝袜 | 美腿控 | 有颜值 | 大杂烩 |
| ------ | ------ | ------ | ------ | ------ | ------ |
| 2      | 6      | 7      | 3      | 4      | 5      |

</route>

### 煎蛋

<route name="无聊图" author="Xuanwo xyqfer" example="/jandan/pic" path="/jandan/:sub_model" :paramsDesc="['煎蛋板块名称']"/>

| 无聊图 | 无聊图热榜 | 4 小时热榜 |
| ------ | ---------- | ---------- |
| pic    | top        | top-4h     |

<route name="妹子图" author="kobemtl xyqfer" example="/jandan/ooxx" path="/jandan/:sub_model" :paramsDesc="['煎蛋板块名称']"/>

| 妹子图 | 妹子图热榜 |
| ------ | ---------- |
| ooxx   | top-ooxx   |

### 喷嚏

<route name="图卦" author="tgly307" example="/dapenti/tugua" path="/dapenti/tugua"/>

<route name="主题" author="xyqfer" example="/dapenti/subject/184" path="/dapenti/subject/:id" :paramsDesc="['主题 id']"/>

### Konachan Anime Wallpapers

::: tip 提示

-   tags 可以在 [konachan](https://konachan.com/post) 选好后, 复制其 URL 中 tags= 后的参数
-   路由可选 `/konachan` 或 `/konachan.com` 或 `/konachan.net`, 其中前两者相同, `.net` 是全年龄健康的壁纸 ♡
-   网站提供了 Posts 订阅: https://konachan.com/post/piclens?tags=[tags]

:::

<route name="Popular Recent Posts" author="magic-akari" example="/konachan/post/popular_recent" path="/konachan/post/popular_recent/:period?" :paramsDesc="['默认过去 24 小时']">

举例:

-   过去 24 小时:<https://rsshub.app/konachan/post/popular_recent/1d>
-   过去一周:<https://rsshub.app/konachan/post/popular_recent/1w>
-   过去一月:<https://rsshub.app/konachan/post/popular_recent/1m>
-   过去一年:<https://rsshub.app/konachan/post/popular_recent/1y>

</route>

### yande.re

::: tip 提示

-   网站提供了 Posts 订阅: https://yande.re/post/piclens?tags=[tags]

:::

<route name="Popular Recent Posts" author="magic-akari" example="/yande.re/post/popular_recent" path="/yande.re/post/popular_recent/:period?" :paramsDesc="['默认过去 24 小时']">

举例:

-   过去 24 小时:<https://rsshub.app/yande.re/post/popular_recent/1d>
-   过去一周:<https://rsshub.app/yande.re/post/popular_recent/1w>
-   过去一月:<https://rsshub.app/yande.re/post/popular_recent/1m>
-   过去一年:<https://rsshub.app/yande.re/post/popular_recent/1y>

</route>

### Awesome Pigtails

<route name="最新图片" author="Chingyat" example="/pigtails" path="/pigtails/index"/>

### Tits Guru

<route name="Home" author="MegrezZhu" example="/tits-guru/home" path="/tits-guru/home"/>
<route name="Daily Best" author="MegrezZhu" example="/tits-guru/daily" path="/tits-guru/daily"/>
<route name="Models" author="MegrezZhu" example="/tits-guru/model/mila-azul" path="/tits-guru/model/:name" :paramsDesc="['指定模特名字，详见[这里](https://tits-guru.com/models)']"/>
<route name="Categories" author="MegrezZhu" example="/tits-guru/category/bikini" path="/tits-guru/category/:type" :paramsDesc="['指定类别，详见[这里](https://tits-guru.com/categories)']"/>

### nHentai

<route name="分类筛选" author="MegrezZhu" example="/nhentai/language/chinese" path="/nhentai/:key/:keyword/:mode?" :paramsDesc="['筛选条件，可选: parody, character, tag, artist, group, language, category','筛选值', '模式，`simple`为仅封面，`detail`会包括本子每一页，但对服务器负载大。默认为`simple`']" />
<route name="高级搜索" author="MegrezZhu" example="/nhentai/search/language%3Ajapanese+-scat+-yaoi+-guro+-%22mosaic+censorship%22" path="/nhentai/search/:keyword/:mode?" :paramsDesc="['用于搜索的关键词。可在原网站搜索后复制 q= 后面的内容，也可直接输入，但空格等特殊符号是否会转换取决于浏览器和阅读器的实现。用法详见[官网](https://nhentai.net/info/)', '模式，`simple`为仅封面，`detail`会包括本子每一页，但对服务器负载大。默认为`simple`']" />

## 二次元

### bilibili

见 [#bilibili](#bilibili)

### Bangumi

<route name="放送列表" author="magic-akari" example="/bangumi/calendar/today" path="/bangumi/calendar/today"/>

<route name="条目的章节" author="SettingDust" example="/bangumi/subject/240038" path="/bangumi/subject/ep/:id" :paramsDesc="['条目 id, 在条目页面的地址栏查看']"/>

<route name="条目的吐槽箱" author="ylc395" example="/bangumi/subject/214265/comments?minLength=100" path="/bangumi/subject/:id/comments" :paramsDesc="['条目 id, 在条目页面的地址栏查看. minLength: 以查询字符串（query string）的形式指定. 用于过滤掉内容长度小于指定值的吐槽']"/>

<route name="条目的评论" author="ylc395" example="/bangumi/subject/214265/blogs" path="/bangumi/subject/:id/blogs" :paramsDesc="['条目 id, 在条目页面的地址栏查看']"/>

<route name="条目的讨论" author="ylc395" example="/bangumi/subject/214265/topics" path="/bangumi/subject/:id/topics" :paramsDesc="['条目 id, 在条目页面的地址栏查看']"/>

<route name="现实人物的新作品" author="ylc395" example="/bangumi/person/32943" path="/bangumi/person/:id" :paramsDesc="['人物 id, 在人物页面的地址栏查看']"/>

<route name="小组话题的新回复" author="ylc395" example="/bangumi/topic/24657" path="/bangumi/topic/:id" :paramsDesc="['话题 id, 在话题页面地址栏查看']"/>

<route name="小组话题" author="SettingDust" example="/bangumi/group/boring" path="/bangumi/group/:id" :paramsDesc="['小组 id, 在小组页面地址栏查看']"/>

### 忧郁的 loli

<route name="文章" author="DIYgod" example="/mmgal" path="/mmgal"/>

### 看漫画

<route name="漫画更新" author="MegrezZhu" path="/manhuagui/comic/:id" example="/manhuagui/comic/22942" :paramsDesc="['漫画ID']"/>

### 動畫狂

<route name="漫画更新" author="KellyHwong" path="/cartoonmad/comic/:id" example="/cartoonmad/comic/5827" :paramsDesc="['漫画ID']"/>

### Anime1

<route name="動畫" author="maple3142" example="/anime1/anime/2018年秋季/哥布林殺手" path="/anime1/anime/:time/:name" :paramsDesc="['时间', '动画名称']">

时间和动画名称请自己从网址取得: <https://anime1.me/category/2018年秋季/刀劍神域-alicization>

</route>

<route name="搜尋" author="maple3142" example="/anime1/search/兔女郎學姊" path="/anime1/search/:keyword" :paramsDesc="['关键字']"/>

### 動畫瘋

<route name="最後更新" author="maple3142" example="/anigamer/new_anime" path="/anigamer/new_anime"/>

<route name="動畫" author="maple3142" example="/anigamer/anime/90003" path="/anigamer/anime/:sn" :paramsDesc="['動畫 sn']"/>

### Animen 动漫平台

<route name="news" author="LogicJake" example="/animen/news/zx" path="/animen/news/:type" :paramsDesc="['板块类型']">

| 最新 | 焦点 | 动画 | 漫画 | 游戏 | 小说 | 真人版 | 活动 | 音乐 | 访谈 | 其他 | 新闻稿 | 懒人包 | 公告 |
| ---- | ---- | ---- | ---- | ---- | ---- | ------ | ---- | ---- | ---- | ---- | ------ | ------ | ---- |
| zx   | jd   | dh   | mh   | yx   | xs   | zrb    | hd   | yy   | ft   | qt   | xwg    | lrb    | gg   |

</route>

### Vol.moe

<route name="vol" author="CoderTonyChan" example="/vol/finsh" path="/vol/:mode?" :paramsDesc="['模式']">

| 连载   | 完结  |
| ------ | ----- |
| serial | finsh |

</route>

### ebb.io

<route name="ebb" author="Tsuki" example="/ebb" path="/ebb"/>

## 程序更新

### RSSHub

<route name="有新路由啦" author="DIYgod" example="/rsshub/rss" path="/rsshub/rss"/>

### MIUI

<route name="MIUI 新版本发布" author="Indexyz" example="/miui/aries" path="/miui/:device/:type?/:region?" :paramsDesc="['设备的 `codename` 例如 小米 2s 为 `aries`. 国际版的 `codename` 一般以 `_global` 结尾. 可查阅 MIUI 线刷包下载页面', '类型, 可选参数', '地区, 默认为 `cn`']">

| 类型   | type    |
| ------ | ------- |
| 稳定版 | release |
| 开发版 | dev     |

| 地区   | region |
| ------ | ------ |
| 国内版 | cn     |
| 国际版 | global |

</route>

### Firefox

<route name="新版本发布" author="fengkx" example="/firefox/release/desktop" path="/firefox/release/:platform" :paramsDesc="['操作平台']">

| 桌面    | Android | Beta | Nightly | Android Beta | ESR           |
| ------- | ------- | ---- | ------- | ------------ | ------------- |
| desktop | android | beta | nightly | android-beta | organizations |

</route>

### Thunderbird

<route name="更新日志" author="garywill" example="/thunderbird/release" path="/thunderbird/release"/>

### 腾讯云移动直播 SDK

<route name="更新日志" author="cielpy" example="/qcloud/mlvb/changelog" path="/qcloud/mlvb/changelog"/>

### Bugly SDK

<route name="更新日志" author="cielpy" example="/bugly/changelog/1" path="/bugly/changelog/:platform" :paramsDesc="['平台类型, 必选, 1 为 Android, 2 为 iOS']"/>

### fir.im 应用

<route name="更新" author="cielpy" example="/fir/update/xcz" path="/fir/update/:id" :paramsDesc="['fir app id, 必选, 如 fir 生成的链接地址为 https://fir.im/xcz, 则 id 为 `xcz`']"/>

### Nvidia Web Driver

<route name="更新日志" author="cielpy" example="/nvidia/webdriverupdate" path="/nvidia/webdriverupdate"/>

### App Store/Mac App Store

<route name="应用更新" author="HenryQW" example="/appstore/update/cn/id444934666" path="/appstore/update/:country/:id" :paramsDesc="['App Store 国家, 如 QQ 的链接为 https://itunes.apple.com/cn/app/qq/id444934666?mt=8, 则 country 为 `cn`', 'App Store app id, 如 QQ 的链接为 https://itunes.apple.com/cn/app/qq/id444934666?mt=8, 则 id 为 `id444934666`']"/>

<route name="价格更新（限免）" author="HenryQW" example="/appstore/price/cn/mac/id1152443474" path="/appstore/price/:country/:type/:id" :paramsDesc="['App Store 国家, 如 Squash 的链接为 https://itunes.apple.com/cn/app/id1152443474, 则 country 为 `cn`', 'App 类型, `iOS` 或 `mac`', 'App Store app id, 必选, 如 Squash 的链接为 https://itunes.apple.com/cn/app/id1152443474, 则 id 为 `id115244347`']"/>

<route name="内购价格更新（限免）" author="HenryQW" example="/appstore/iap/cn/id953286746" path="/appstore/iap/:country/:id" :paramsDesc="['App Store 国家, 必选, 如 Darkroom – Photo Editor 的链接为 https://itunes.apple.com/cn/app/id953286746, 则 country 为 `cn`', 'App Store app id, 必选, 如 Darkroom – Photo Editor 的链接为 https://itunes.apple.com/cn/app/id953286746, 则 id 为 `id953286746`']"/>

<route name="每日精品限免 / 促销应用（鲜面连线 by AppSo）" author="Andiedie" example="/appstore/xianmian" path="/appstore/xianmian"/>

### F-Droid

<route name="App更新" author="garywill" example="/fdroid/apprelease/com.termux" path="/fdroid/apprelease/:app" :paramsDesc="['App包名']" />

### Greasy Fork

<route name="脚本更新" author="imlonghao" example="/greasyfork/zh-CN/bilibili.com" path="/greasyfork/:language/:domain?" :paramsDesc="['语言, 可在网站右上角找到, `all` 为所有语言', '按脚本生效域名过滤, 可选']"/>

### Minecraft CurseForge

<route name="Mod 更新" author="Indexyz" example="/curseforge/files/jei" path="/curseforge/files/:project" :paramsDesc="['项目的短名或者 `Project ID`. 项目的短名可以在地址栏获取到, 例如地址为 `https://minecraft.curseforge.com/projects/non-update`, 短名就为 `non-update`. `Project ID` 可在 `Overview` 中的 `About This Project` 中找到']"/>

### xclient.info

<route name="应用更新" author="DIYgod" example="/xclient/app/sketch" path="/xclient/app/:name" :paramsDesc="['应用名, 可在应用页 URL 中找到']"/>

### Typora

<route name="Changelog" author="cnzgray" example="/typora/changelog" path="/typora/changelog"/>

### Apkpure

<route name="Versions" author="maple3142" example="/apkpure/versions/jp/jp.co.craftegg.band" path="/apkpure/versions/:region/:pkg" :paramsDesc="['區域代號', 'package name']"/>

### Docker Hub

<route name="镜像有新 Build" author="HenryQW" example="/dockerhub/build/wangqiru/ttrss" path="/dockerhub/build/:owner/:image/:tag?" :paramsDesc="['镜像作者', '镜像名称', '镜像标签，默认 latest']"/>

### Xiaomi.eu

<route name="ROM Releases" author="maple3142" example="/xiaomieu/releases" path="/xiaomieu/releases"/>

## 大学通知

### 上海海事大学

<route name="学术讲座" author="simonsmh" example="/shmtu/events" path="/universities/shmtu/events"/>

<route name="通知公告" author="simonsmh" example="/shmtu/notes" path="/universities/shmtu/notes"/>

<route name="教务信息" author="simonsmh" example="/shmtu/jwc/1" path="/universities/shmtu/jwc/:type" :paramsDesc="['1 为教务新闻, 2 为教务公告']"/>

### 西南科技大学

<route name="教务处新闻" author="lengthmin" example="/swust/jwc/news" path="/universities/swust/jwc/news"/>

<route name="教务处通知" author="lengthmin" example="/swust/jwc/notice/1" path="/universities/swust/jwc/notice/:type?" :paramsDesc="['分区 type,缺省为 1, 详见下方表格']">

| 创新创业教育 | 学生学业 | 建设与改革 | 教学质量保障 | 教学运行 | 教师教学 |
| ------------ | -------- | ---------- | ------------ | -------- | -------- |
| 1            | 2        | 3          | 4            | 5        | 6        |

</route>

<route name="计科学院通知" author="lengthmin" example="/swust/cs/1" path="/universities/swust/cs/:type?" :paramsDesc="['分区 type, 缺省为 1, 详见下方表格']">

| 新闻动态 | 学术动态 | 通知公告 | 教研动态 |
| -------- | -------- | -------- | -------- |
| 1        | 2        | 3        | 4        |

</route>

### 北京大学

<route name="信科公告通知" author="Ir1d" example="/pku/eecs/0" path="/universities/pku/eecs/:type" :paramsDesc="['分区 type, 可在网页 URL 中找到']">

| 全部 | 学院通知 | 人事通知 | 教务通知 | 学工通知 | 科研通知 | 财务通知 | 工会通知 | 院友通知 |
| ---- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 0    | 1        | 2        | 6        | 8        | 7        | 5        | 3        | 4        |

</route>

### 华南师范大学

<route name="教务处通知" author="fengkx" example="/scnu/jw" path="/universities/scnu/jw"/>

<route name="图书馆通知" author="fengkx" example="/scnu/library" path="/universities/scnu/library"/>

<route name="计算机学院竞赛通知" author="fengkx" example="/scnu/cs/match" path="/universities/scnu/cs/match"/>

### 江南大学

<route name="教务处通知" author="Chingyat" example="/ju/jwc/all" path="/universities/ju/jwc/:type?" :paramsDesc="['默认为 `all`']">

| all  | tzgg     | ksap     | wjgg     | tmgz     | djks     | xjgl     | bysj     | syjs     |
| ---- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 全部 | 通知公告 | 考试安排 | 违纪公告 | 推免工作 | 等级考试 | 学籍管理 | 毕业设计 | 实验教学 |

| sjcx     | xkjs     | yjszj      | jxgg     | zyjs     | kcjs     | jcjs     | jxcg     | xsbg     |
| -------- | -------- | ---------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 实践创新 | 学科竞赛 | 研究生助教 | 教学改革 | 专业建设 | 课程建设 | 教材建设 | 教学成果 | 学术报告 |

</route>

### 大连工业大学

<route name="教务处新闻" author="xu42" example="/dpu/jiaowu/news/2" path="/universities/dpu/jiaowu/news/:type?" :paramsDesc="['默认为 `2`']">

| 新闻动态 | 通知公告 | 教务文件 |
| -------- | -------- | -------- |
| 2        | 3        | 4        |

</route>

<route name="网络服务新闻" author="xu42" example="/dpu/wlfw/news/2" path="/universities/dpu/wlfw/news/:type?" :paramsDesc="['默认为 `1`']">

| 新闻动态 | 通知公告 |
| -------- | -------- |
| 1        | 2        |

</route>

### 东南大学

<route name="信息科学与工程学院学术活动" author="HenryQW" example="/seu/radio/academic" path="/universities/seu/radio/academic"/>

<route name="研究生招生网通知公告" author="Chingyat" example="/seu/yzb/1" path="/universities/seu/yzb/:type" :paramsDesc="['1 为硕士招生, 2 为博士招生, 3 为港澳台及中外合作办学']"/>

<route name="东南大学计算机技术与工程学院" author="LogicJake" example="/seu/cse/xyxw" path="/universities/seu/cse/:type?" :paramsDesc="['分类名(默认为xyxw)']"/>

| 学院新闻 | 通知公告 | 教务信息 | 就业信息 | 学工事务 |
| -------- | -------- | -------- | -------- | -------- |
| xyxw     | tzgg     | jwxx     | jyxx     | xgsw     |

### 南京航空航天大学

<route name="教务通知" author="arcosx" example="/nuaa/jwc/all" path="/universities/nuaa/jwc/:type" :paramsDesc="['分类名']">

| 全部 | 教学服务 | 教学建设 | 学生培养 | 教学资源 |
| ---- | -------- | -------- | -------- | -------- |
| all  | jxfw     | jxjs     | xspy     | jxzy     |

</route>

<route name="计算机科学与技术学院" author="LogicJake" example="/nuaa/cs/kydt" path="/universities/nuaa/cs/:type?" :paramsDesc="['分类名']"/>

| 通知公告 | 新闻动态 | 科研动态 | 教学动态 | 学生工作 | 招生信息 | 就业信息 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| tzgg     | xwdt     | kydt     | jxdt     | xsgz     | zsxx     | jyxx     |

<route name="研究生院" author="junfengP" example="/nuaa/yjsy/latest" path="/universities/nuaa/yjsy/:type?" :paramsDesc="['分类名']"/>

| 最近动态 | 研院新闻 | 上级文件 | 管理文件 | 信息服务 |
| -------- | -------- | -------- | -------- | -------- |
| latest   | yyxw     | sjwj     | glwj     | xxfw     |

### 哈尔滨工业大学

<route name="哈尔滨工业大学教务处通知公告" author="lty96117" example="/hit/jwc" path="/universities/hit/jwc"/>

<route name="今日哈工大" author="ranpox" example="/hit/today/10" path="/universities/hit/today/:category" :paramsDesc="['分类编号，`10`为公告公示，`11`为新闻快讯，同时支持详细分类，使用方法见下']"/>

::: tip 提示
今日哈工大的文章分为公告公示和新闻快讯，每个页面右侧列出了更详细的分类，其编号为每个 URL 路径的最后一个数字。
例如会议讲座的路径为`/taxonomy/term/10/25`，则可以通过`/hit/today/25`订阅该详细类别。
:::

::: warning 注意
部分文章需要经过统一身份认证后才能阅读全文。
:::

### 上海科技大学

<route name="信息科技与技术学院活动" author="HenryQW" example="/shanghaitech/sist/activity" path="/universities/shanghaitech/sist/activity"/>

### 上海交通大学

<route name="电子信息与电气工程学院学术动态" author="HenryQW" example="/sjtu/seiee/academic" path="/universities/sjtu/seiee/academic"/>

<route name="电子信息与电气工程学院本科教务办 -- 分专业" author="SkyZH" example="/sjtu/seiee/bjwb/major_select" path="/universities/sjtu/seiee/bjwb/major_select"/>

<route name="电子信息与电气工程学院本科教务办 -- 转专业" author="SkyZH" example="/sjtu/seiee/bjwb/major_transfer" path="/universities/sjtu/seiee/bjwb/major_transfer"/>

<route name="电子信息与电气工程学院本科教务办 -- 交换交流" author="SkyZH" example="/sjtu/seiee/bjwb/abroad" path="/universities/sjtu/seiee/bjwb/abroad"/>

<route name="电子信息与电气工程学院本科教务办 -- 直升研究生" author="SkyZH" example="/sjtu/seiee/bjwb/postgraduate" path="/universities/sjtu/seiee/bjwb/postgraduate"/>

<route name="电子信息与电气工程学院本科教务办 -- 国际办学" author="SkyZH" example="/sjtu/seiee/bjwb/international" path="/universities/sjtu/seiee/bjwb/international"/>

<route name="研究生通知公告" author="mzr1996" example="/sjtu/gs/tzgg/pyxx" path="/universities/sjtu/gs/tzgg/:type?" :paramsDesc="['默认列举所有通知公告']">

| 通知公告 | 工作信息 | 招生信息 | 培养信息 | 学位学科 | 国际交流 | 创新工程 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 空       | gzxx     | xwxx1    | pyxx     | xwxx     | gjjl     | cxgc     |

</route>

<route name="电子信息与电气工程学院学生工作办公室" author="Polynomia" example="/sjtu/seiee/xsb/news" path="/universities/sjtu/seiee/xsb/:type?" :paramsDesc="['默认列举所有通知公告']">

| 信息通告 | 奖学金      | 助学金       | 讲座活动 | 党团活动 | 新闻发布 |
| -------- | ----------- | ------------ | -------- | -------- | -------- |
| 空       | scholarship | financialAid | lecture  | activity | news     |

</route>

### 中国科学院

<route name="上海微系统与信息技术研究所学术活动" author="HenryQW" example="/cas/sim/academic" path="/universities/cas/sim/academic"/>

### 南京邮电大学

<route name="教务处通知与新闻" author="shaoye" example="/njupt/jwc/notice" path="/universities/njupt/jwc/:type?" :paramsDesc="['默认为 `notice`']">

| 通知公告 | 教务快讯 |
| -------- | -------- |
| notice   | news     |

</route>

### 南昌航空大学

<route name="教务处公告与新闻" author="Sg4Dylan" example="/nchu/jwc/notice" path="/universities/nchu/jwc/:type?" :paramsDesc="['默认为 `notice`']">

| 教务公告 | 教务新闻 |
| -------- | -------- |
| notice   | news     |

</route>

### 哈尔滨工程大学

<route name="本科生院工作通知" author="XYenon" example="/heu/ugs/news/jwc/jxap" path="/universities/heu/ugs/news/:author?/:category?" :paramsDesc="['发布部门, 默认为 `gztz`', '分类, 默认为 `all`']">

author 列表：

| 教务处 | 实践教学与交流处 | 教育评估处 | 专业建设处 | 国家大学生文化素质基地 | 教师教学发展中心 | 综合办公室 | 工作通知 |
| ------ | ---------------- | ---------- | ---------- | ---------------------- | ---------------- | ---------- | -------- |
| jwc    | sjjxyjlzx        | jypgc      | zyjsc      | gjdxswhszjd            | jsjxfzzx         | zhbgs      | gztz     |

category 列表：

`all` 为全部

教务处：

| 教学安排 | 考试管理 | 学籍管理 | 外语统考 | 成绩管理 |
| -------- | -------- | -------- | -------- | -------- |
| jxap     | ksgl     | xjgl     | wytk     | cjgl     |

实践教学与交流处：

| 实验教学 | 实验室建设 | 校外实习 | 学位论文 | 课程设计 | 创新创业 | 校际交流 |
| -------- | ---------- | -------- | -------- | -------- | -------- | -------- |
| syjx     | sysjs      | xwsx     | xwlw     | kcsj     | cxcy     | xjjl     |

教育评估处：

| 教学研究与教学成果 | 质量监控 |
| ------------------ | -------- |
| jxyjyjxcg          | zljk     |

专业建设处：

| 专业与教材建设 | 陈赓实验班 | 教学名师与优秀主讲教师 | 课程建设 | 双语教学 |
| -------------- | ---------- | ---------------------- | -------- | -------- |
| zyyjcjs        | cgsyb      | jxmsyyxzjjs            | kcjs     | syjx     |

国家大学生文化素质基地：无

教师教学发展中心：

| 教师培训 |
| -------- |
| jspx     |

综合办公室：

| 联系课程 |
| -------- |
| lxkc     |

工作通知：无

</route>

### 重庆大学

<route name="教务网通知公告" author="El-Chiang" example="/cqu/jwc/announcement" path="/universities/cqu/jwc/announcement"/>

### 南京信息工程大学

::: tip 提示

路由地址全部按照 **学校官网域名和栏目编号** 设计

使用方法：

以[南信大信息公告栏](https://bulletin.nuist.edu.cn)为例，点开任意一个栏目

获得 URL 中的**分域名**和**栏目编号（可选）**：https://`bulletin`.nuist.edu.cn/`791`/list.htm

将其替换到 RSS 路由地址中即可：

https://rsshub.app/**nuist**/`bulletin` 或 https://rsshub.app/**nuist**/`bulletin`/`791`

:::

<route name="南信大信息公告栏" author="gylidian" example="/nuist/bulletin/791" path="/universities/nuist/bulletin/:category?" :paramsDesc="['默认为 `791`']">

| 全部 | 文件公告 | 学术报告 | 招标信息 | 会议通知 | 党政事务 | 组织人事 |
| ---- | -------- | -------- | -------- | -------- | -------- | -------- |
| 791  | 792      | xsbgw    | 779      | 780      | 781      | 782      |

| 科研信息 | 招生就业 | 教学考试 | 专题讲座 | 校园活动 | 学院动态 | 其他 |
| -------- | -------- | -------- | -------- | -------- | -------- | ---- |
| 783      | 784      | 785      | 786      | 788      | 789      | qt   |

::: warning 注意

全文内容需使用 校园网或[VPN](http://vpn.nuist.edu.cn) 获取

:::

</route>

<route name="NUIST CS（南信大计软院）" author="gylidian" example="/nuist/scs/2242" path="/universities/nuist/scs/:category?" :paramsDesc="['默认为 `2242`']">

| 学院新闻 | 学生工作 | 通知公告 | 教务通知 | 科研动态 | 招生就业 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 2242     | 2237     | 2245     | 2246     | 2243     | 2244     |

</route>

<route name="南信大本科教学信息网" author="gylidian" example="/nuist/jwc/1" path="/universities/nuist/jwc/:category?" :paramsDesc="['默认为 `1`']">

| 通知公告 | 教学新闻 | 规章制度 | 教学研究 | 教务管理 | 考试中心 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 1        | 2        | 4        | 5        | 6        | 7        |

| 教材建设 | 实践教学 | 三百工程 | 创新创业 | 规章制度 | 业务办理 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 8        | 9        | 56       | 60       | 62       | 43       |

</route>

<route name="南信大研究生院学科建设处" author="gylidian" example="/nuist/yjs/11" path="/universities/nuist/yjs/:category?" :paramsDesc="['默认为 `11`']">

| 招生工作 | 培养工作 | 学位工作 | 学生工作 | 就业工作 | 国际合作 | 文件下载 | 工作动态 | 通知公告 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 3        | 4        | 5        | 6        | 7        | 8        | 9        | 10       | 11       |

</route>

<route name="南信大学生工作处" author="gylidian" example="/nuist/xgc" path="/universities/nuist/xgc"/>

<route name="NUIST ESE（南信大环科院）" author="gylidian" example="/nuist/sese/11" path="/universities/nuist/sese/:category?" :paramsDesc="['默认为 `11`']">

| 通知公告 | 新闻快讯 | 学术动态 | 学生工作 | 研究生教育 | 本科教育 |
| -------- | -------- | -------- | -------- | ---------- | -------- |
| 11       | 10       | 12       | 6        | 4          | 3        |

</route>

<route name="NUIST AS（南信大大气科学学院）" author="gylidian" example="/nuist/cas/12" path="/universities/nuist/cas/:category?" :paramsDesc="['默认为 `12`']">

| 信息公告 | 新闻快讯 | 科学研究 | 网上公示 | 本科教育 | 研究生教育 |
| -------- | -------- | -------- | -------- | -------- | ---------- |
| 12       | 11       | 3        | 110      | 4        | 5          |

</route>

<route name="南京信息工程大学图书馆" author="gylidian" example="/nuist/lib" path="/universities/nuist/library/lib">

::: tip 提示

学校图书馆官网提供了[新书通报](http://lib2.nuist.edu.cn/newbook/newbook_cls_browse.php)的订阅

由于图书馆通知频率过低(故只提供 3 条)，有待将其和 **网络信息中心**、**基建处**、**总务处** 等的通知整合起来

:::

</route>

### 成都信息工程大学

<route name="成信新闻网" author="kimika" example="/cuit/cxxww/1" path="/universities/cuit/cxxww/:type?" :paramsDesc="['默认为 `1`']">

| 综合新闻 | 信息公告 | 焦点新闻 | 学术动态 | 工作交流 | 媒体成信 | 更名专题 | 文化活动 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1        | 2        | 3        | 4        | 5        | 7        | 9        | 10       |

</route>

### 重庆科技学院

<route name="教务处公告" author="binarization" example="/cqust/jw/notify" path="/universities/cqust/jw/:type?" :paramsDesc="['可选, 默认为 `notify`']">

| 通知公告 | 教务快讯 |
| -------- | -------- |
| notify   | news     |

</route>

<route name="图书馆公告" author="binarization" example="/cqust/lib/news" path="/universities/cqust/lib/:type?" :paramsDesc="['可选, 默认为 `news`']">

| 本馆公告 |
| -------- |
| news     |

</route>

### 常州大学

<route name="教务处" author="richardchien" example="/cczu/jwc/1425" path="/universities/cczu/jwc/:category?" :paramsDesc="['可选, 默认为 `all`']">

| 全部 | 通知公告 | 教务新闻 | 各类活动与系列讲座 | 本科教学工程 | 他山之石 | 信息快递 |
| ---- | -------- | -------- | ------------------ | ------------ | -------- | -------- |
| all  | 1425     | 1437     | 1485               | 1487         | 1442     | 1445     |

</route>

<route name="新闻网" author="richardchien" example="/cczu/news/6620" path="/universities/cczu/news/:category?" :paramsDesc="['可选, 默认为 `all`']">

| 全部 | 常大要闻 | 校园快讯 | 媒体常大 | 时事热点 | 高教动态 | 网上橱窗 | 新媒常大 |
| ---- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| all  | 6620     | 6621     | 6687     | 6628     | 6629     | 6640     | 6645     |

</route>

### 南京理工大学

<route name="南京理工大学教务处" author="MilkShakeYoung" example="/njust/jwc/1" path="/universities/njust/jwc/:type" :paramsDesc="['1 为教师通知, 2 为学生通知, 3 为新闻，4 为学院动态']">

| 教师通知 | 学生通知 | 新闻 | 学院动态 |
| -------- | -------- | ---- | -------- |
| 1        | 2        | 3    | 4        |

</route>

<route name="南京理工大学财务处" author="MilkShakeYoung" example="/njust/cwc/1" path="/universities/njust/cwc/:type" :paramsDesc="['1 为新闻及通知, 2 为办事指南']">

| 新闻及通知 | 办事指南 |
| ---------- | -------- |
| 1          | 2        |

</route>

<route name="南京理工大学研究生院" author="MilkShakeYoung" example="/njust/gs/1" path="/universities/njust/gs/:type" :paramsDesc="['1 为通知公告, 2 为学术公告']">

| 通知公告 | 学术公告 |
| -------- | -------- |
| 1        | 2        |

</route>

### 四川旅游学院

<route name="信息与工程学院动态公告列表" author="talenHuang" example="/sctu/xgxy" path="/universities/sctu/information-engineer-faculty/index">

</route>

<route name="信息与工程学院公告详情" author="talenHuang" example="/sctu/xgxy/652" path="/universities/sctu/information-engineer-faculty/context/:id" :paramsDesc="['文章id']">

</route>

<route name="教务处" author="talenHuang" example="/sctu/jwc/13" path="/universities/sctu/jwc/index:type?" :paramsDesc="['可选参数, 默认为 `13`']">

| 教务通知 | 信息公告 |
| -------- | -------- |
| 13       | 14       |

</route>

<route name="教务处通告详情" author="talenHuang" example="/sctu/jwc/13/645" path="/universities/sctu/jwc/context/:type/:id" :paramsDesc="['通知类型','文章id']">

</route>

### 电子科技大学

<route name="教务处" author="achjqz" example="/uestc/jwc/student" path="/universities/uestc/jwc/:type?" :paramsDesc="['默认为 `important`']">

| 重要公告  | 学生事务公告 | 教师事务公告 |
| --------- | ------------ | ------------ |
| important | student      | teacher      |

</route>

<route name="新闻中心" author="achjqz" example="/uestc/news/culture" path="/universities/uestc/news/:type?" :paramsDesc="['默认为 `announcement`']">

| 学术    | 文化    | 公告         | 校内通知     |
| ------- | ------- | ------------ | ------------ |
| academy | culture | announcement | notification |

</route>

### 昆明理工大学

<route name="教务处" author="geekrainy" example="/kmust/jwc/notify" path="/universities/kmust/jwc/:type?" :paramsDesc="['默认为 `notify`']">

| 教务通知 | 教务新闻 |
| -------- | -------- |
| notify   | news     |

</route>

<route name="宣讲会" author="geekrainy" example="/kmust/job/careers/inner" path="/universities/kmust/job/careers/:type?" :paramsDesc="['默认为 `inner`']">

| 校内宣讲会 | 校外宣讲会 |
| ---------- | ---------- |
| inner      | outer      |

</route>

<route name="双选会" author="geekrainy" example="/kmust/job/jobfairs" path="/universities/kmust/job/jobfairs" />

### 华中科技大学

<route name="人工智能和自动化学院通知" author="RayHY" example="/hust/aia/notice/0" path="/universities/hust/aia/notice/:type?" :paramsDesc="['分区 type, 默认为最新通知 可在网页 HTML中找到']">

| 最新 | 行政 | 人事 | 科研 | 讲座 | 本科生 | 研究生 | 学工 |
| ---- | ---- | ---- | ---- | ---- | ------ | ------ | ---- |
| 0    | 1    | 2    | 3    | 4    | 5      | 6      | 7    |

</route>

<route name="人工智能和自动化学院新闻" author="RayHY" example="/hust/aia/news" path="/universities/hust/aia/news" />

### 山东大学

<route name="研究生院学术活动" author="Ji4n1ng" example="/sdu/grad/academic" path="/universities/sdu/grad/academic" />

<route name="软件学院通知" author="Ji4n1ng" example="/sdu/sc/0" path="/universities/sdu/sc/:type?" :paramsDesc="['默认为 `0`']">

| 学院公告 | 学术报告 | 新闻动态 |
| -------- | -------- | -------- |
| 0        | 1        | 2        |

</route>

<route name="材料科学与工程学院通知" author="Ji4n1ng" example="/sdu/cmse/0" path="/universities/sdu/cmse/:type?" :paramsDesc="['默认为 `0`']">

| 通知公告 | 学院新闻 | 本科生教育 | 研究生教育 | 学术动态 |
| -------- | -------- | ---------- | ---------- | -------- |
| 0        | 1        | 2          | 3          | 4        |

</route>

<route name="机械工程学院通知" author="Ji4n1ng" example="/sdu/mech/0" path="/universities/sdu/mech/:type?" :paramsDesc="['默认为 `0`']">

| 通知公告 | 院所新闻 | 教学信息 | 学术动态 | 学院简报 |
| -------- | -------- | -------- | -------- | -------- |
| 0        | 1        | 2        | 3        | 4        |

</route>

<route name="能源与动力工程学院通知" author="Ji4n1ng" example="/sdu/epe/0" path="/universities/sdu/epe/:type?" :paramsDesc="['默认为 `0`']">

| 学院动态 | 通知公告 | 学术论坛 |
| -------- | -------- | -------- |
| 0        | 1        | 2        |

</route>

### 大连大学

<route name="教务处信息" author="SettingDust" example="/dlu/jiaowu/news" path="/universities/dlu/jiaowu/news">
</route>

### 西安电子科技大学

<route name="教务处" author="ShadowySpirits" example="/xidian/jwc/xxfb" path="/xidian/jwc/:category?" :paramsDesc="['通知类别,默认为全部']">

::: warning 注意

全文内容需使用校园网或 VPN 获取
:::

| 全部 | 信息发布 | 通知公告 | 教务信息 | 教学研究 | 教学实践 | 招生信息 | 质量监控 |
| :--: | :------: | :------: | :------: | :------: | :------: | :------: | :------: |
| all  |   xxfb   |   tzgg   |   jwxx   |   jxyj   |   jxsj   |   zsxx   |   zljk   |

</route>

### 东莞理工学院

<route name="教务处通知" author="AnyMoe" example="/dgut/jwc/" path="/universities/dgut/jwc/:type?" :paramsDesc="['默认为 `2`']">

| 教务公告 | 教学信息 |
| -------- | -------- |
| 1        | 2        |

</route>

<route name="学工部动态" author="AnyMoe" example="/dgut/xsc/" path="/universities/dgut/xsc/:type?" :paramsDesc="['默认为 `2`']">

| 学工动态 | 通知公告 | 网上公示 |
| -------- | -------- | -------- |
| 1        | 2        | 4        |

</route>

### 上海大学

<route name="上海大学教务处通知公告" author="tuxinghuan" example="/shu/jwc/notice" path="/university/shu/jwc/:type?" :paramsDesc="['消息类型,默认为`notice`']">

| 通知通告 | 新闻 |
| -------- | ---- |
| notice   | news |

</route>

### 同济大学

 <route name="同济大学软件学院通知" author="sgqy" example="/tju/sse/xwdt" path="/tju/sse/:type?" :paramsDesc="['通知类型. 默认为 `xwdt`']">

| 本科生通知 | 研究生通知 | 教工通知 | 全体通知 | 学院通知 | 学院新闻 | 学院活动 |
| ---------- | ---------- | -------- | -------- | -------- | -------- | -------- |
| bkstz      | yjstz      | jgtz     | qttz     | xwdt     | xyxw     | xyhd     |

注意: `qttz` 与 `xwdt` 在原网站等价.

 </route>

### 华南理工大学

<route name="教务处新闻动态" author="KeNorizon" example="/scut/jwc/1" path="/scut/jwc/:category?" :paramsDesc="['新闻动态分类, 可选, 默认为 `1`']">

| 教务通知 | 交流交换 | 新闻动态 | 媒体关注 | 学院通知 |
| -------- | -------- | -------- | -------- | -------- |
| 1        | 2        | 3        | 4        | 5        |

</route>

### 中山大学

<route name="数据科学与计算机学院动态" author="MegrezZhu" example="/sysu/sdcs" path="/sysu/sdcs" />

### 中国药科大学

<route name="中国药科大学" author="kba977" example="/cpu/home" path="/cpu/:type" :paramsDesc="['分类, 见下表']">

| 首页 | 教务处 | 研究生院 |
| ---- | ------ | -------- |
| home | jwc    | yjsy     |

</route>

### 温州商学院

<route name="温州商学院" author="howel52" example="/wzbc/notice" path="/wzbc/:type" :paramsDesc="['分类, 见下表']">

| 校园新闻 | 媒体商院 | 通知公告 | 人才招聘 | 行事历  | 招标公告 | 学术动态 |
| -------- | -------- | -------- | -------- | ------- | -------- | -------- |
| news     | media    | notice   | jobs     | workday | tender   | activity |

</route>

### 河南大学

<route name="河南大学" author="CasterWx" example="/henu/xszl" path="/henu/:type" :paramsDesc="['分类, 见下表']">

| 学生专栏 | 教师专栏 | 新闻公告 | 院部动态 | 高教前沿 |
| -------- | -------- | -------- | -------- | -------- |
| xszl     | jszl     | xwgg     | ybdt     | gjqy     |

</route>

### 南开大学

<route name="南开大学教务处" author="zhongweili" example="/nku/jwc/1" path="/universities/nku/jwc/:type" :paramsDesc="['分区 type, 可在网页 URL 中找到']">

| 通知公告 | 新闻动态 |
| -------- | -------- |
| 1        | 2        |

</route>

### 北京航空航天大学

<route name="北京航空航天大学" author="AlanDecode" example="/buaa/news/zonghe" path="/buaa/news/:type" :paramsDesc="['新闻版块']">

| 综合新闻 | 信息公告 | 学术文化     | 校园风采 | 科教在线 | 媒体北航 | 专题新闻 | 北航人物 |
| -------- | -------- | ------------ | -------- | -------- | -------- | -------- | -------- |
| zonghe   | gonggao  | xueshuwenhua | fengcai  | kejiao   | meiti    | zhuanti  | renwu    |

</route>

## 传统媒体

### 央视新闻

<route name="专题" author="idealclover xyqfer" example="/cctv/world" path="/cctv/:category" :paramsDesc="['分类名']">

| 国内  | 国际  | 视频  | 科技 | 社会    | 法律 | 娱乐 | 每周质量报告 |
| ----- | ----- | ----- | ---- | ------- | ---- | ---- | ------------ |
| china | world | video | tech | society | law  | ent  | mzzlbg       |

</route>

### 财新网

> 网站部分内容需要付费订阅, RSS 仅做更新提醒, 不含付费内容.

<route name="新闻分类" author="idealclover" example="/caixin/finance/regulation" path="/caixin/:column/:category" :paramsDesc="['栏目名', '栏目下的子分类名']">

Column 列表:

| 经济    | 金融    | 政经  | 环科    | 世界          | 观点网  | 文化    | 周刊   |
| ------- | ------- | ----- | ------- | ------------- | ------- | ------- | ------ |
| economy | finance | china | science | international | opinion | culture | weekly |

以金融板块为例的 category 列表: （其余 column 以类似方式寻找）

| 监管       | 银行 | 证券基金 | 信托保险        | 投资       | 创新       | 市场   |
| ---------- | ---- | -------- | --------------- | ---------- | ---------- | ------ |
| regulation | bank | stock    | insurance_trust | investment | innovation | market |

Category 列表:

| 封面报道   | 开卷  | 社论      | 时事            | 编辑寄语    | 经济    | 金融    | 商业     | 环境与科技             | 民生    | 副刊   |
| ---------- | ----- | --------- | --------------- | ----------- | ------- | ------- | -------- | ---------------------- | ------- | ------ |
| coverstory | first | editorial | current_affairs | editor_desk | economy | finance | business | environment_technology | cwcivil | column |

</route>

### 南方周末

<route name="新闻分类" author="ranpox" example="/infzm/5" path="/infzm/:id" :paramsDesc="['南方周末内容分区 id, 可在该内容分区的 URL 中找到(即http://www.infzm.com/contents/:id), 注意 contents 为内容分区, content 为文章页, 添加前请留意.']">

下面给出部分参考:

| 全站 | 新闻 | 经济 | 文化 | 评论 | 图片 | 生活 | 时政 | 社会 | 科技 | 绿色 | 头条 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0    | 5    | 6    | 7    | 8    | 9    | 10   | 11   | 12   | 13   | 1374 | 2553 |

</route>

### 纽约时报

<route name="官方 RSS" author="HenryQW" example="/nytimes/dual" path="/nytimes/index/:lang?" :paramsDesc="['语言, 缺省中文']">

通过提取文章全文，以提供比官方源更佳的阅读体验。

| 默认中文 | 中英对照 | 英文 |
| -------- | -------- | ---- |
| (空)     | dual     | en   |

</route>

<route name="每日简报" author="xyqfer" example="/nytimes/morning_post" path="/nytimes/morning_post"/>

### 新京报

<route name="栏目" author="DIYgod" example="/bjnews/realtime" path="/bjnews/:category" :paramsDesc="['新京报的栏目名, 点击对应栏目后在地址栏找到']"/>

### 界面新闻

<route name="栏目" author="WenhuWee" example="/jiemian/list/79" path="/jiemian/list/:category" :paramsDesc="['对应栏目后在地址栏找到']"/>

### 澎湃新闻

<route name="首页头条" author="HenryQW" example="/thepaper/featured" path="/thepaper/featured"/>

<route name="频道" author="xyqfer" example="/thepaper/channel/27224" path="/thepaper/channel/:id" :paramsDesc="['频道 id']"/>

### 联合早报

<route name="即时新闻" author="lengthmin" example="/zaobao/realtime/china" path="/zaobao/realtime/:type?" :paramsDesc="['分类, 缺省为中港台']">

| 中港台 | 新加坡    | 国际  | 财经     |
| ------ | --------- | ----- | -------- |
| china  | singapore | world | zfinance |

</route>

<route name="新闻" author="lengthmin" example="/zaobao/znews/greater-china" path="/zaobao/znews/:type?" :paramsDesc="['分类, 缺省为中港台']">

| 中港台        | 新加坡    | 东南亚 | 国际          | 体育   |
| ------------- | --------- | ------ | ------------- | ------ |
| greater-china | singapore | sea    | international | sports |

</route>

### NHK

<route name="News Web Easy" author="Andiedie" example="/nhk/news_web_easy" path="/nhk/news_web_easy"/>

### BBC

<route name="BBC" author="HenryQW" example="/bbc/chinese" path="/bbc/:channel?" :paramsDesc="['频道, 缺省为热门']">

通过提取文章全文, 以提供比官方源更佳的阅读体验.

支持大部分频道, 频道名称见[官方频道 RSS](https://www.bbc.co.uk/news/10628494).

-   频道为单一路径, 如 https://feeds.bbci.co.uk/news/`business`/rss.xml 则为 `/bbc/business`.
-   频道包含多重路径, 如 https://feeds.bbci.co.uk/news/`world/asia`/rss.xml 则替换 `/` 为 `-` `/bbc/world-asia`.
-   例外: BBC 中文网为 `/bbc/chinese`.

</route>

### FT 中文网

<route name="FT 中文网" author="HenryQW xyqfer" example="/ft/chinese/hotstoryby7day" path="/ft/:language/:channel?" :paramsDesc="['语言，简体`chinese`，繁体`traditional`', '频道, 缺省为每日更新']">

::: tip 提示

-   不支持付费文章.
-   由于未知原因 FT 中文网的 SSL 证书不被信任 (参见[SSL Labs 报告](https://www.ssllabs.com/ssltest/analyze.html?d=www.ftchinese.com&latest)), 所有文章通过 http 协议获取.

:::

通过提取文章全文, 以提供比官方源更佳的阅读体验.

支持所有频道, 频道名称见[官方频道 RSS](http://www.ftchinese.com/channel/rss.html).

-   频道为单一路径, 如 http://www.ftchinese.com/rss/`news` 则为 `/ft/chinese/news`.
-   频道包含多重路径, 如 http://www.ftchinese.com/rss/`column/007000002` 则替换 `/` 为 `-` `/ft/chinese/column-007000002`.

</route>

### 卫报 The Guardian

通过提取文章全文，以提供比官方源更佳的阅读体验。

<route name="Editorial" author="HenryQW" example="/guardian/editorial" path="/guardian/editorial"/>

<route name="China" author="Polynomia" example="/guardian/china" path="/guardian/china"/>

### 多维新闻网

<route name="要闻" author="HenryQW" example="/dwnews/yaowen/global" path="/dwnews/yaowen/:region?" :paramsDesc="['要闻地区，默认`全部`，可选地区如下']">

| 全部   | 国际   | 中国  | 香港     | 台湾   |
| ------ | ------ | ----- | -------- | ------ |
| yaowen | global | china | hongkong | taiwan |

</route>

<route name="新闻排行榜" author="HenryQW" example="/dwnews/rank/photo/7" path="/dwnews/rank/:type/:range" :paramsDesc="['榜单类型，`news`为普通新闻，`photo`为图集新闻','榜单范围（天），`1` 或 `7`']"/>

### Solidot

<route name="最新消息" author="sgqy" example="/solidot/linux" path="/solidot/:type?" :paramsDesc="['消息类型. 默认为 www. 在网站上方选择后复制子域名即可']">

::: tip 提示

Solidot 提供的 feed:

-   https://www.solidot.org/index.rss

:::

| 全部 | 创业    | Linux | 科学    | 科技       | 移动   | 苹果  | 硬件     | 软件     | 安全     | 游戏  | 书籍  | ask | idle | 博客 | 云计算 |
| ---- | ------- | ----- | ------- | ---------- | ------ | ----- | -------- | -------- | -------- | ----- | ----- | --- | ---- | ---- | ------ |
| www  | startup | linux | science | technology | mobile | apple | hardware | software | security | games | books | ask | idle | blog | cloud  |

</route>

### 极客公园

<route name="全球快讯" author="xyqfer" example="/geekpark/breakingnews" path="/geekpark/breakingnews" />

### 华尔街见闻

<route name="华尔街见闻" author="conanjunn" example="/wallstreetcn/news/global" path="/wallstreetcn/news/global" />

### 经济观察网

<route name="分类资讯" author="epirus" example="/eeo/15" path="/eeo/:category" :paramsDesc="['分类']">

category 对应的关键词有

| 时事 | 政策 | 证券 | 资本 | 理财 | 新科技 | 大健康 | 房产 | 汽车 | 消费 | 影视 | 娱乐 | 体育 | 教育 | 观察家 | 专栏 | 书评 | 个人历史 | 宏观 |
| ---- | ---- | ---- | ---- | ---- | ------ | ------ | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ------ | ---- | ---- | -------- | ---- |
| 01   | 02   | 03   | 04   | 05   | 06     | 07     | 08   | 09   | 10   | 11   | 12   | 13   | 14   | 15     | 16   | 17   | 18       | 19   |

</route>

### 新浪科技

<route name="科学探索" author="LogicJake" example="/sina/discovery/zx" path="/sina/discovery/:type" :paramsDesc="['订阅分区类型']">

分类：
| zx | twhk | dwzw | zrdl | lskg | smyx | shbk | kjqy |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 最新 | 天文航空 | 动物植物 | 自然地理 | 历史考古 | 生命医学 | 生活百科 | 科技前沿 |

</route>

## 预报预警

### 停水通知

配合 [IFTTT](https://ifttt.com/) Applets [邮件通知](https://ifttt.com/applets/SEvmDVKY-) 使用实现自动通知效果.

<route name="杭州市" author="znhocn" example="/tingshuitz/hangzhou" path="/tingshuitz/hangzhou"/>

<route name="萧山区" author="znhocn" example="/tingshuitz/xiaoshan" path="/tingshuitz/xiaoshan"/>

<route name="大连市" author="DIYgod" example="/tingshuitz/dalian" path="/tingshuitz/dalian"/>

<route name="广州市" author="xyqfer" example="/tingshuitz/guangzhou" path="/tingshuitz/guangzhou"/>

<route name="东莞市" author="victoriqueko" example="/tingshuitz/dongguan" path="/tingshuitz/dongguan"/>

<route name="西安市" author="ciaranchen" example="/tingshuitz/xian" path="/tingshuitz/xian"/>

<route name="阳江市" author="ciaranchen" example="/tingshuitz/yangjiang" path="/tingshuitz/yangjiang"/>

### 停电通知

获取未来一天的停电通知

<route name="国家电网" author="xyqfer" example="/tingdiantz/95598/36401/36101" path="/tingdiantz/95598/:orgNo/:provinceNo/:scope?" :paramsDesc="['所属省供电公司编码', '所属地市供电公司编码', '停电范围关键字']"/>

> 以上参数可从[查询页面](http://m.95598.cn/95598/woutageNotice/winitOutageNotice)打开控制台抓包获得

### 中央气象台

<route name="全国气象预警" author="ylc395" example="/weatheralarm" path="/weatheralarm">

可通过全局过滤参数订阅您感兴趣的地区.

</route>

### 中国地震局

<route name="地震速报" author="LogicJake" example="/earthquake" path="/earthquake/:region?" :paramsDesc="['区域，0全部，1国内（默认），2国外']">

可通过全局过滤参数订阅您感兴趣的地区.

</route>

### 香港天文台

<route name="Current Weather Report" author="calpa" example="/hko/weather" path="/hko/weather"/>

## 出行旅游

### All the Flight Deals

<route name="特价机票" author="HenryQW" example="/atfd/us+new%20york,gb+london/1" path="/atfd/:locations/:nearby?" :paramsDesc="['始发地, 由「国家, 参见 ISO 3166-1 国家代码」和「城市」两部分组成', '可选 0 或 1, 默认 0 为不包括, 是否包括临近机场']">

举例: [https://rsshub.app/atfd/us+new york, gb+london/1](https://rsshub.app/atfd/us+new%20york,gb+london/1)

1. 单个始发地, 例如 「us+new york」, [https://rsshub.app/atfd/us+new york](https://rsshub.app/atfd/us+new%20york)
2. 逗号分隔多个始发地, 例如 「us+new york, gb+london」, [https://rsshub.app/atfd/us+new york, gb+london/](https://rsshub.app/atfd/us+new%20york,gb+london/)

ISO 3166-1 国家代码列表请参见 [维基百科 ISO_3166-1](https://zh.wikipedia.org/wiki/ISO_3166-1)

</route>

### iMuseum

<route name="展览信息" author="sinchang" example="/imuseum/shanghai/all" path="/imuseum/:city/:type" :paramsDesc="['如 shanghai, beijing', '不填则默认为 `all`']">

| 全部 | 最新   | 热门 | 即将结束 | 即将开始 | 已结束   |
| ---- | ------ | ---- | -------- | -------- | -------- |
| all  | latest | hot  | end_soon | coming   | outdated |

</route>

### Hopper Flight Deals

<route name="Hopper 特价机票" author="HenryQW" example="/hopper/1/LHR/PEK" path="/hopper/:lowestOnly/:from/:to?" :paramsDesc="['是否只返回最低价机票, `1`: 是, 其他任意值: 否', '始发地, IATA 国际航空运输协会机场代码', '目的地, IATA 国际航空运输协会机场代码, 可选, 缺省则目的地为`任意城市`']">

本路由返回由 Hopper 算法给出的现在可购入最便宜的折扣机票, 通常包含 6 个结果. 出行日期将由 Hopper 算法定义, 可能是明天也可能是 10 个月后.

伦敦希思罗 &#9992; 北京首都国际 <https://rsshub.app/hopper/1/LHR/PEK>

IATA 国际航空运输协会机场代码, 参见[维基百科 国际航空运输协会机场代码](<https://zh.wikipedia.org/wiki/%E5%9B%BD%E9%99%85%E8%88%AA%E7%A9%BA%E8%BF%90%E8%BE%93%E5%8D%8F%E4%BC%9A%E6%9C%BA%E5%9C%BA%E4%BB%A3%E7%A0%81_(A)>)

</route>

### 马蜂窝

<route name="游记" author="sinchang" example="/mafengwo/note/hot" path="/mafengwo/note/:type" :paramsDesc="['目前支持两种, `hot` 代表热门游记, `latest` 代表最新游记']"/>

### 中国美术馆

<route name="美术馆新闻" author="HenryQW" example="/namoc/announcement" path="/namoc/:type" :paramsDesc="['新闻类型， 可选如下']">

| 通知公告     | 新闻 | 媒体联报 | 展览预告   | 焦点专题 |
| ------------ | ---- | -------- | ---------- | -------- |
| announcement | news | media    | exhibition | specials |

</route>

### 国家地理

<route name="分类" author="fengkx" example="/natgeo/news/ngnews" path="/natgeo/:cat/:type?" :paramsDesc="['分类', '类型, 例如`https://www.natgeomedia.com/category/news/ngnews`对应 cat, type 分别为 news, ngnews']"/>

## 购物

### 什么值得买

::: tip 提示

网站也提供了部分 RSS: https://www.smzdm.com/dingyue

:::

<route name="关键词" author="DIYgod" example="/smzdm/keyword/女装" path="/smzdm/keyword/:keyword" :paramsDesc="['你想订阅的关键词']"/>

<route name="排行榜" author="DIYgod" example="/smzdm/ranking/pinlei/11/3" path="/smzdm/ranking/:rank_type/:rank_id/:hour" :paramsDesc="['榜单类型','榜单ID','时间跨度']">

-   榜单类型

| 好价品类榜 | 好价电商榜 | 海淘 TOP 榜 | 好文排行榜 | 好物排行榜 |
| ---------- | ---------- | ----------- | ---------- | ---------- |
| pinlei     | dianshang  | haitao      | haowen     | haowu      |

-   榜单 ID

好价品类榜

| 全部 | 时尚运动 | 3C 家电 | 食品家居 | 日百母婴 | 出行游玩 | 白菜 | 凑单品 |
| ---- | -------- | ------- | -------- | -------- | -------- | ---- | ------ |
| 11   | 12       | 13      | 14       | 15       | 16       | 17   | 22     |

好价电商榜

| 券活动 | 京东 | 天猫 | 亚马逊中国 | 国美在线 | 苏宁易购 | 网易 | 西集网 | 美国亚马逊 | 日本亚马逊 | ebay |
| ------ | ---- | ---- | ---------- | -------- | -------- | ---- | ------ | ---------- | ---------- | ---- |
| 24     | 23   | 25   | 26         | 27       | 28       | 29   | 30     | 31         | 32         | 33   |

海淘 TOP 榜

| 全部 | 海外直邮 | 美国榜 | 欧洲榜 | 澳新榜 | 亚洲榜 | 晒物榜 |
| ---- | -------- | ------ | ------ | ------ | ------ | ------ |
| 39   | 34       | 35     | 36     | 37     | 38     | hsw    |

好文排行榜

| 原创 | 资讯 |
| ---- | ---- |
| yc   | zx   |

好物排行榜

| 新晋榜 | 消费众测 | 新锐品牌 | 好物榜单 |
| ------ | -------- | -------- | -------- |
| hwall  | zc       | nb       | hw       |

<route name="值客原创" author="KIMI360" example="/smzdm/post" path="/smzdm/post"/>

</route>

### 小米

<route name="小米众筹" author="DIYgod" example="/mi/crowdfunding" path="/mi/crowdfunding"/>

<route name="小米有品众筹" author="DIYgod" example="/mi/youpin/crowdfunding" path="/mi/youpin/crowdfunding"/>

<route name="小米有品每日上新" author="xyqfer" example="/mi/youpin/new" path="/mi/youpin/new"/>

### 甩甩尾巴

<route name="分类" author="xyqfer" example="/dgtle/trade/111" path="/dgtle/trade/:typeId?" :paramsDesc="['分类 id，默认为全部']">

| 全部 | 电脑 | 手机 | 平板 | 相机 | 影音 | 外设 | 生活 | 公告 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 0    | 111  | 109  | 110  | 113  | 114  | 115  | 112  | 116  |

</route>

### Westore

<route name="新品" author="xyqfer" example="/westore/new" path="/westore/new"/>

### 玩物志

<route name="最新" author="xyqfer" example="/coolbuy/newest" path="/coolbuy/newest"/>

### 京东众筹

<route name="众筹项目" author="LogicJake" example="/jingdong/zhongchou/all/zcz/zhtj" path="/jingdong/zhongchou/:type/:status/:sort" :paramsDesc="['类型','状态','排序方式']">

类型

| 全部 | 科技 | 美食 | 家电 | 设计 | 娱乐 | 文化 | 公益 | 其他 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| all  | kj   | ms   | jd   | sj   | yl   | wh   | gy   | qt   |

状态

| 全部 | 预热中 | 众筹中 | 众筹成功 | 项目成功 |
| ---- | ------ | ------ | -------- | -------- |
| all  | yrz    | zcz    | zccg     | xmcg     |

排序方式

| 综合推荐 | 最新上线 | 金额最多 | 支持最多 | 即将结束 |
| -------- | -------- | -------- | -------- | -------- |
| zhtj     | zxsx     | jezg     | zczd     | jjjs     |

</route>

### 淘宝众筹

<route name="众筹项目" author="xyqfer" example="/taobao/zhongchou/all" path="/taobao/zhongchou/:type?" :paramsDesc="['类型, 默认为 `all` 全部']">

| 全部 | 科技 | 食品        | 动漫 | 设计   | 公益 | 娱乐 | 影音  | 书籍 | 游戏 | 其他  |
| ---- | ---- | ----------- | ---- | ------ | ---- | ---- | ----- | ---- | ---- | ----- |
| all  | tech | agriculture | acg  | design | love | tele | music | book | game | other |

</route>

## 游戏资讯

### 3DMGame

<route name="新闻中心" author="zhboner" example="/3dm/news" path="/3dm/news"/>

<route name="游戏资讯" author="sinchang jacky2001114 HenryQW" example="/3dm/detroitbecomehuman/news" path="/3dm/:name/:type" :paramsDesc="['游戏的名字, 可以在专题页的 url 中找到', '资讯类型']">

| 新闻 | 攻略 | 下载资源 | 区块链快讯 |
| ---- | ---- | -------- | ---------- |
| news | gl   | resource | blockchain |

</route>

### 米哈游

<route name="崩坏 2-游戏公告" author="deepred5" example="/mihoyo/bh2/gach" path="/mihoyo/bh2/:type" :paramsDesc="['公告种类']">

| 最新公告 | 版本信息 | 祈愿信息 | 活动介绍 |
| -------- | -------- | -------- | -------- |
| new      | version  | gach     | event    |

</route>

<route name="崩坏 3-游戏公告" author="deepred5" example="/mihoyo/bh3/strategy" path="/mihoyo/bh3/:type" :paramsDesc="['公告种类']">

| 最新   | 公告   | 新闻 | 活动     | 攻略     |
| ------ | ------ | ---- | -------- | -------- |
| latest | notice | news | activity | strategy |

</route>

### きららファンタジア｜奇拉拉幻想曲

<route name="公告" author="magic-akari" example="/kirara/news" path="/kirara/news"/>

### 旅法师营地

<route name="旅法师营地" author="qwertyuiop6" example="/lfsyd/1" path="/lfsyd/:typecode" :paramsDesc="['订阅分区类型']">

| 主页资讯 | 炉石传说 | 万智牌 | 昆特牌 | 游戏王 | 电子游戏 | 手机游戏 | 桌面游戏 |
| -------- | -------- | ------ | ------ | ------ | -------- | -------- | -------- |
| 1        | 2        | 3      | 14     | 16     | 4        | 22       | 9        |

| 影之诗 | Artifact | 玩家杂谈 | 营地电台 | 2047 | 魂武 |
| ------ | -------- | -------- | -------- | ---- | ---- |
| 17     | 67       | 21       | 5        | 62   | 68   |

</route>

### GNN.tw 游戏新闻

<route name="GNN.tw 游戏新闻" author="monner-henster" example="/gnn/gnn" path="/gnn/gnn"/>

### a9vgNews 游戏新闻

<route name="a9vgNews 游戏新闻" author="monner-henster" example="/a9vg/a9vg" path="/a9vg/a9vg"/>

### Steam

<route name="Steam search" author="maple3142" example="/steam/search/specials=1&term=atelier" path="/steam/search/:params" :paramsDesc="['搜寻参数']">

参数 params 请从 Steam 的 URL 取得

Example: `https://store.steampowered.com/search/?specials=1&term=atelier` 中的 params 是 `specials=1&term=atelier`，将它填入 RSSHub 的路由就好

</route>

<route name="Steam news" author="maple3142" example="/steam/news/282800" path="/steam/news/:appids" :paramsDesc="['游戏 id']"/>

### 小黑盒

<route name="用户动态" author="LogicJake" example="/xiaoheihe/user/7775687" path="xiaoheihe/user/:id" :paramsDesc="['用户 id']"/>

<route name="游戏新闻" author="MyFaith" example="/xiaoheihe/news" path="xiaoheihe/news"/>

<route name="游戏打折情况" author="MyFaith" example="/xiaoheihe/discount" path="xiaoheihe/discount"/>

### Indienova

<route name="indienova 文章" author="GensouSakuya" example="/indienova/article" path="indienova/article"/>

### 游戏时光

<route name="游戏时光新闻" author="MyFaith" example="/vgtime/news" path="vgtime/news"/>

<route name="游戏时光游戏发售表" author="MyFaith" example="/vgtime/release" path="vgtime/release"/>

## 小说·文学·阅读

### 观止（每日一文）

<route name="观止" author="Andiedie" example="/guanzhi" path="/guanzhi"/>

### 笔趣阁

<route name="小说更新" author="jjeejj" example="/novel/biquge/52_52542" path="/novel/biquge/:id" :paramsDesc="['小说 id, 可在对应小说页 URL 中找到']">

::: tip 提示

由于笔趣阁网站有多个, 各站点小说对应的小说 id 不同. 此 feed 只对应在[`www.biquge5200.com`](https://www.biquge5200.com/)中的小说 id.

:::

</route>

### UU 看书

<route name="小说更新" author="jacky2001114" example="/novel/uukanshu/49621>" path="/novel/uukanshu/:id" :paramsDesc="['小说 id, 可在对应小说页 URL 中找到']"/>

### 文学迷

<route name="小说更新" author="lengthmin" example="/novel/wenxuemi/6/6144" path="/novel/wenxuemi/:id1/:id2" :paramsDesc="['小说网站链接倒数第二部分的数字, 可在对应小说页 URL 中找到, 例如 `6`', '小说网站链接最后的数字, 可在对应小说页 URL 中找到, 例如 `6144`']">

举例网址：https://www.wenxuemi.com/files/article/html/6/6144/

</route>

### 起点

<route name="章节" author="Chingyat" example="/qidian/chapter/1010400217" path="/qidian/chapter/:id" :paramsDesc="['小说 id, 可在对应小说页 URL 中找到']"/>

<route name="讨论区" author="Chingyat" example="/qidian/forum/1010400217" path="/qidian/forum/:id" :paramsDesc="['小说 id, 可在对应小说页 URL 中找到']"/>

### 纵横

<route name="章节" author="georeth" example="/zongheng/chapter/672340" path="/zongheng/chapter/:id" :paramsDesc="['小说 id, 可在对应小说页 URL 中找到']"/>

### 刺猬猫

<route name="章节" author="Netrvin" example="/ciweimao/chapter/100045750" path="/ciweimao/chapter/:id" :paramsDesc="['小说 id, 可在对应小说页 URL 中找到']"/>

### 快眼看书

<route name="小说更新" author="squkw" example="/novel/booksky/98619" path="/novel/booksky/:id" :paramsDesc="['小说 id, 可在对应小说页 URL 中找到, 例如 `98619`']">

举例网址：http://booksky.so/BookDetail.aspx?Level=1&bid=98619

</route>

### 青空文庫

<route name="青空文庫新着リスト" author="sgqy" example="/aozora/newbook/10" path="/aozora/newbook/:count?" :paramsDesc="['更新数量. 设置每次下载列表大小. 范围是 1 到 50.']">

书籍网站每日一更. 信息更新时间为书籍最初出版时间, 排序可能不符合网络发表时间, 请认准未读消息.

</route>

### All Poetry

<route name="Poems" author="HenryQW" example="/allpoetry/newest" path="/allpoetry/:order?" :paramsDesc="['排序方式, `best` 或 `newest`, 缺省 `best`']"/>

### 轻小说文库

<route name="章节" author="zsakvo" example="/wenku8/chapter/74" path="/wenku8/chapter/:id" :paramsDesc="['小说 id, 可在对应小说页 URL 中找到']"/>

### 爱思想

<route name="栏目" author="HenryQW" example="/aisixiang/column/722" path="/aisixiang/column/:id" :paramsDesc="['栏目 ID, 可在对应栏目 URL 中找到']"/>

<route name="排行榜" author="HenryQW" example="/aisixiang/ranking/1/7" path="/aisixiang/ranking/:type?/:range?" :paramsDesc="['排行榜类型', '排行榜范围, 仅适用于点击排行榜, 可选日(1)，周(7)，月(30)']">

| 文章点击排行 | 文章推荐排行 | 最近更新文章 |
| ------------ | ------------ | ------------ |
| 1            | 10           | 11           |

</route>

## 政务消息

### 中国驻外使领馆

<route name="大使馆重要通知" author="HenryQW" example="/embassy/us" path="/embassy/:country" :paramsDesc="['国家短代码, 见[支持国家列表](#支持国家列表)', '城市, 对应国家列表下的`领事馆城市列表`']" />

<route name="领事馆重要通知" author="HenryQW" example="/embassy/us/chicago" path="/embassy/:country/:city" :paramsDesc="['国家短代码, 见[支持国家列表](#支持国家列表)', '城市, 对应国家列表下的`领事馆城市列表`']" />

#### 支持国家列表

##### 德国 `DE`

-   大使馆: `/embassy/de`

-   领事馆城市列表:

| 城市   | 路由                 |
| ------ | -------------------- |
| 慕尼黑 | `/embassy/de/munich` |

---

##### 法国 `FR`

-   大使馆: `/embassy/fr`

-   领事馆城市列表:

| 城市       | 路由                     |
| ---------- | ------------------------ |
| 马赛       | `/embassy/fr/marseille`  |
| 斯特拉斯堡 | `/embassy/fr/strasbourg` |
| 里昂       | `/embassy/fr/lyon`       |

---

##### 日本 `JP`

-   大使馆: `/embassy/jp`

-   领事馆城市列表:

| 城市   | 路由                   |
| ------ | ---------------------- |
| 长崎   | `/embassy/jp/nagasaki` |
| 大阪   | `/embassy/jp/osaka`    |
| 福冈   | `/embassy/jp/fukuoka`  |
| 名古屋 | `/embassy/jp/nagoya`   |
| 札幌   | `/embassy/jp/sapporo`  |
| 新潟   | `/embassy/jp/niigata`  |

---

##### 韩国 `KR`

-   大使馆: `/embassy/kr`

-   领事馆城市列表:

| 城市 | 路由                  |
| ---- | --------------------- |
| 釜山 | `/embassy/kr/busan`   |
| 济州 | `/embassy/kr/jeju`    |
| 光州 | `/embassy/kr/gwangju` |

---

##### 新加坡 `SG`

-   大使馆: `/embassy/sg`

---

##### 美国 `US`

-   大使馆: `/embassy/us`

-   领事馆城市列表:

| 城市   | 路由                       |
| ------ | -------------------------- |
| 纽约   | `/embassy/us/newyork`      |
| 芝加哥 | `/embassy/us/chicago`      |
| 旧金山 | `/embassy/us/sanfrancisco` |

---

##### 英国 `UK`

-   大使馆: `/embassy/uk`

-   领事馆城市列表:

| 城市       | 路由                     |
| ---------- | ------------------------ |
| 爱丁堡     | `/embassy/uk/edinburgh`  |
| 贝尔法斯特 | `/embassy/uk/belfast`    |
| 曼彻斯特   | `/embassy/uk/manchester` |

### 中国政府网

<route name="最新政策" author="SettingDust" example="/gov/zhengce/zuixin" path="/gov/zhengce/zuixin"/>
<route name="最新文件" author="ciaranchen" example="/gov/zhengce/wenjian" path="/gov/zhengce/wenjian/:pcodeJiguan?" :paramsDesc="['文种分类。 国令; 国发; 国函; 国发明电; 国办发; 国办函; 国办发明电; 其他']" />

### 中华人民共和国生态环境部

<route name="公示" author="billyct" example="/gov/mee/gs" path="/gov/mee/gs"/>

### 联合国

<route name="安理会否决了决议" author="HenryQW" example="/un/scveto" path="/un/scveto"/>

## 待分类

### 自如

<route name="房源" author="DIYgod" example="/ziroom/room/sh/1/2/五角场" path="/ziroom/room/:city/:iswhole/:room/:keyword" :paramsDesc="['城市, 北京 bj; 上海 sh; 深圳 sz; 杭州 hz; 南京 nj; 广州 gz; 成都 cd; 武汉 wh; 天津 tj', '是否整租', '房间数', '关键词']"/>

### 快递

<route name="快递" author="DIYgod" example="/express/youzhengguoji/CV054432809US" path="/express/:company/:number" :paramsDesc="['快递公司代码, 参考 [API URL 所支持的快递公司及参数说明](https://www.kuaidi100.com/download/api_kuaidi100_com%2820140729%29.doc)', '快递单号']">

::: warning 注意

快递送达后请及时取消订阅, 以免浪费服务器资源

:::

</route>

### 腾讯吐个槽

<route name="吐槽新帖" author="Qixingchen" example="/tucaoqq/post/28564/CdRI0728" path="/tucaoqq/post/:project/:key" :paramsDesc="['产品 ID', '产品密钥']"/>

### 今日头条

<route name="关键词" author="uni-zheng" example="/jinritoutiao/keyword/AI" path="/jinritoutiao/keyword/:keyword" :paramsDesc="['关键词']"/>

### Readhub

<route name="分类" author="WhiteWorld" example="/readhub/category/topic" path="/readhub/category/:category" :paramsDesc="['分类名']">

| 热门话题 | 科技动态 | 开发者资讯 | 区块链快讯 | 每日早报 |
| -------- | -------- | ---------- | ---------- | -------- |
| topic    | news     | technews   | blockchain | daily    |

</route>

### 机核网

<route name="分类" author="MoguCloud" example="/gcores/category/1" path="/gcores/category/:category" :paramsDesc="['分类名']">

| 文章 | 新闻 | 电台 |
| ---- | ---- | ---- |
| 1    | 2    | 9    |

</route>

### ONE · 一个

<route name="图片文字问答" author="fengkx" example="/one" path="/one"/>

### Hexo

<route name="Next 主题博客" author="fengkx" example="/hexo/next/fengkx.top" path="/hexo/next/:url" :paramsDesc="['博客 Url 不带协议头']"/>

<route name="Yilia 主题博客" author="aha2mao" example="/hexo/yilia/cloudstone.xin" path="/hexo/yilia/:url" :paramsDesc="['博客 Url 不带协议头']"/>

### Keep

<route name="运动日记" author="Dectinc DIYgod" example="/keep/user/556b02c1ab59390afea671ea" path="/keep/user/:id" :paramsDesc="['Keep 用户 id']"/>

### 懂球帝

::: tip 提示

-   可以通过头条新闻+参数过滤的形式获得早报、专题等内容。
-   不支持 gif 集锦播放

:::

<route name="头条新闻" author="dxmpalb" example="/dongqiudi/top_news" path="/dongqiudi/top_news"/>

<route name="专题" author="dxmpalb" example="/dongqiudi/special/41" path="/dongqiudi/special/:id" :paramsDesc="['专题 id, 可自行通过 https://www.dongqiudi.com/special/+数字匹配']">

| 新闻大爆炸 | 懂球帝十佳球 | 懂球帝本周 MVP |
| ---------- | ------------ | -------------- |
| 41         | 52           | 53             |

</route>

<route name="早报" author="HenryQW" example="/dongqiudi/daily" path="/dongqiudi/daily"/>

::: tip 提示

部分球队和球员可能会有两个 id, 正确 id 应该由 `5000` 开头.

:::

<route name="足球赛果" author="HenryQW" example="/dongqiudi/result/50001755" path="/dongqiudi/result/:team" :paramsDesc="['球队 id, 可在[懂球帝数据](https://www.dongqiudi.com/data)中找到']"/>

<route name="球队新闻" author="HenryQW" example="/dongqiudi/team_news/50001755" path="/dongqiudi/team_news/:team" :paramsDesc="['球队 id, 可在[懂球帝数据](https://www.dongqiudi.com/data)中找到']"/>

<route name="球员新闻" author="HenryQW" example="/dongqiudi/player_news/50000339" path="/dongqiudi/player_news/:id" :paramsDesc="['球员 id, 可在[懂球帝数据](https://www.dongqiudi.com/data)中通过其队伍找到']"/>

### 维基百科

<route name="中国大陆新闻动态" author="HenryQW" example="/wikipedia/mainland" path="/wikipedia/mainland"/>

### Google

<route name="谷歌学术关键词更新" author="HenryQW" example="/google/scholar/data+visualization" path="/google/scholar/:query" :paramsDesc="['查询语句, 支持「简单」和「高级」两种模式:']" crawlerBadge="1">

1. 简单模式, 例如「data visualization」, <https://rsshub.app/google/scholar/data+visualization>.
2. 高级模式, 前往 [Google Scholar](https://scholar.google.com/schhp?hl=zh-cn&as_sdt=0,5), 点击左上角, 选择高级搜索并提交查询. 此时 URL 应为: <https://scholar.google.com/scholar?as_q=data+visualization&as_epq=&as_oq=&as_eq=&as_occt=any&as_sauthors=&as_publication=&as_ylo=2018&as_yhi=&hl=zh-CN&as_sdt=0%2C5>, 复制`https://scholar.google.com/scholar?`后的所有语句作为本路由的查询参数. 例子所对应的完整路由为<https://rsshub.app/google/scholar/as_q=data+visualization&as_epq=&as_oq=&as_eq=&as_occt=any&as_sauthors=&as_publication=&as_ylo=2018&as_yhi=&hl=zh-CN&as_sdt=0%2C5>.

</route>

<route name="Google Doodles" author="xyqfer" example="/google/doodles/zh-CN" path="/google/doodles/:language?" :paramsDesc="['语言，默认为`zh-CN`简体中文，如需其他语言值可从[Google Doodles 官网](https://www.google.com/doodles)获取']" />

### 果壳网

<route name="科学人" author="alphardex" example="/guokr/scientific" path="/guokr/scientific"/>

### 推酷

<route name="周刊" author="zpcc" example="/tuicool/mags/tech" path="/tuicool/mags/:type" :paramsDesc="['类型如下']">

| 编程狂人 | 设计匠艺 | 创业周刊 | 科技周刊 |
| -------- | -------- | -------- | -------- |
| prog     | design   | startup  | tech     |

</route>

### 爱范儿 ifanr

<route name="爱范儿频道" author="HenryQW" example="/ifanr/app" path="/ifanr/:channel?" :paramsDesc="['默认 app，部分频道如下']">

-   频道为单一路径, 如 https://www.ifanr.com/`coolbuy` 则为 `/ifanr/coolbuy`.
-   频道包含多重路径, 如 https://www.ifanr.com/`category/intelligentcar` 则替换 `/` 为 `-` `/ifanr/category-intelligentcar`.

| AppSolution | 玩物志  | 董车会                  |
| ----------- | ------- | ----------------------- |
| app         | coolbuy | category-intelligentcar |

</route>

### Apple

<route name="更换和维修扩展计划" author="metowolf HenryQW" example="/apple/exchange_repair" path="/apple/exchange_repair/:country?" :paramsDesc="['苹果官网 URL 中的国家代码, 默认中国 `cn`']"/>

#### App Store/Mac App Store

见 [#app-store-mac-app-store](#app-store-mac-app-store)

### 少数派 sspai

<route name="最新上架付费专栏" author="HenryQW" example="/sspai/series" path="/sspai/series">

> 少数派专栏需要付费订阅, RSS 仅做更新提醒, 不含付费内容.

</route>

<route name="Shortcuts Gallery" author="Andiedie" example="/sspai/shortcuts" path="/sspai/shortcuts" />

<route name="Matrix" author="feigaoxyz" example="/sspai/matrix" path="/sspai/matrix" />

### 趣头条

<route name="分类" author="alphardex" example="/qutoutiao/category/1" path="/qutoutiao/category/:cid" :paramsDesc="['分类 id']">

| 推荐 | 热点 | 娱乐 | 健康 | 养生 | 励志 | 科技 | ... |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | --- |
| 255  | 1    | 6    | 42   | 5    | 4    | 7    | ... |

更多的 cid 可通过访问[官网](http://home.qutoutiao.net)切换分类，观察 url 获得。

</route>

### The Verge

<route name="The Verge" author="HenryQW" example="/verge" path="/verge">

通过提取文章全文, 以提供比官方源更佳的阅读体验.

</route>

### 后续

<route name="Live" author="ciaranchen" example="/houxu/live/5/original" path="/houxu/live/:id/:timeline?" :paramsDesc="['Live ID', '时间线筛选条件。默认为all。']">

| 全部 | 原创     | 精选     |
| ---- | -------- | -------- |
| all  | original | featured |

</route>

<route name="最新Live" author="ciaranchen" example="/houxu/lives/new" path="/houxu/lives/:type" :paramsDesc="['类型。实时进展`realtime` 或 最近关注`new`']" />

<route name="最新专栏" author="ciaranchen" example="/houxu/events" path="/houxu/events"/>

### 老司机

<route name="首页" author="xyqfer" example="/laosiji/feed" path="/laosiji/feed"/>
<route name="24小时热门" author="xyqfer" example="/laosiji/hot" path="/laosiji/hot"/>
<route name="节目" author="xyqfer" example="/laosiji/hotshow/128" path="/laosiji/hotshow/:id" :paramsDesc="['节目 id']"/>

### 99% Invisible

<route name="Transcript" author="Ji4n1ng" example="/99percentinvisible/transcript" path="/99percentinvisible/transcript"/>

### 腾讯大家

<route name="首页" author="xyqfer" example="/dajia" path="/dajia"/>
<route name="作者作品" author="LogicJake" example="/dajia/author/404" path="/dajia/author/:uid" :paramsDesc="['作者id']"/>
<route name="专栏" author="LogicJake" example="/dajia/zhuanlan/404" path="/dajia/zhuanlan/:uid" :paramsDesc="['专栏id']"/>

### 抽屉

<route name="新热榜" author="xyqfer" example="/chouti/hot" path="/chouti/:subject?" :paramsDesc="['主题名称']">

| 热榜 | 42 区 | 段子  | 图片 | 挨踢 1024 | 你问我答 |
| ---- | ----- | ----- | ---- | --------- | -------- |
| hot  | news  | scoff | pic  | tec       | ask      |

</route>

### 油价

<route name="今日油价" author="xyqfer" example="/oilprice/shanghai" path="/oilprice/:area" :paramsDesc="['地区拼音，详见[成品油价格网](http://oil.usd-cny.com/)']"/>

### AutoTrader

<route name="搜索结果" author="HenryQW" example="/autotrader/radius=50&postcode=sw1a1aa&onesearchad=Used&onesearchad=Nearly%20New&onesearchad=New&price-to=9000&year-from=2012&body-type=Hatchback&transmission=Automatic&exclude-writeoff-categories=on" path="/autotrader/:query" :paramsDesc="['查询语句']">

1. 在 AutoTrader 选择筛选条件进行搜索
1. 复制查询结果 URL 中`?`后的部分，例如 `https://www.autotrader.co.uk/car-search?radius=50&postcode=sw1a1aa&onesearchad=Used&onesearchad=Nearly%20New&onesearchad=New&price-to=9000&year-from=2012&body-type=Hatchback&transmission=Automatic&exclude-writeoff-categories=on` 则为 `radius=50&postcode=sw1a1aa&onesearchad=Used&onesearchad=Nearly%20New&onesearchad=New&price-to=9000&year-from=2012&body-type=Hatchback&transmission=Automatic&exclude-writeoff-categories=on`

</route>

### 百度

<route name="百度趣画" author="xyqfer" example="/baidu/doodles" path="/baidu/doodles"/>

<route name="搜索风云榜" author="xyqfer" example="/baidu/topwords/1" path="/baidu/topwords/:boardId?" :paramsDesc="['榜单 id, 默认为`1`']">

| 实时热点 | 今日热点 | 七日热点 | 民生热点 | 娱乐热点 | 体育热点 |
| -------- | -------- | -------- | -------- | -------- | -------- |
| 1        | 341      | 42       | 342      | 344      | 11       |

</route>

### 搜狗

<route name="搜狗特色LOGO" author="xyqfer" example="/sogou/doodles" path="/sogou/doodles"/>

### IT 桔子

<route name="投融资事件" author="xyqfer" example="/itjuzi/invest" path="/itjuzi/invest"/>

<route name="并购事件" author="xyqfer" example="/itjuzi/merge" path="/itjuzi/merge"/>

### 探物

<route name="产品" author="xyqfer" example="/tanwu/products" path="/tanwu/products"/>

### 下厨房

<route name="用户作品" author="xyqfer" example="/xiachufang/user/cooked/103309404" path="/xiachufang/user/cooked/:id" :paramsDesc="['用户 id, 可在用户主页 URL 中找到']"/>

<route name="用户菜谱" author="xyqfer" example="/xiachufang/user/created/103309404" path="/xiachufang/user/created/:id" :paramsDesc="['用户 id, 可在用户主页 URL 中找到']"/>

<route name="作品动态" author="xyqfer" example="/xiachufang/popular/hot" path="/xiachufang/popular/:timeframe?" :paramsDesc="['默认最新上传']">

| 正在流行 | 24 小时最佳 | 本周最受欢迎 | 新秀菜谱 | 月度最佳   |
| -------- | ----------- | ------------ | -------- | ---------- |
| hot      | pop         | week         | rising   | monthhonor |

</route>

### TSSstatus（iOS 降级通道）

<route name="Status" author="xyqfer" example="/tssstatus/j42dap/14W585a" path="/tssstatus/:board/:build" :paramsDesc="['平台 id', '版本 id']">

board 和 build 可在[这里](http://api.ineal.me/tss/status)查看

</route>

### iDownloadBlog

<route name="blog" author="HenryQW" example="/iDownloadBlog" path="/iDownloadBlog/index">

通过提取文章全文, 以提供比官方源更佳的阅读体验.

</route>

### 9To5

<route name="9To5 分站" author="HenryQW" example="/9to5/mac" path="/9to5/:type" :paramsDesc="['分站名字']">

支持分站：
| Mac | Google | Toys |
| --- | ------ | ---- |
| Mac | Google | Toys |

</route>

### 刷屏

<route name="最新" author="xyqfer" example="/weseepro/newest" path="/weseepro/newest"/>

<route name="朋友圈" author="xyqfer" example="/weseepro/circle" path="/weseepro/circle"/>

### 虎嗅

<route name="标签" author="xyqfer" example="/huxiu/tag/291" path="/huxiu/tag/:id" :paramsDesc="['标签 id']" />

<route name="搜索" author="xyqfer" example="/huxiu/search/%E8%99%8E%E5%97%85%E6%97%A9%E6%8A%A5" path="/huxiu/search/:keyword" :paramsDesc="['关键字']" />

<route name="作者" author="HenryQW" example="/huxiu/author/29318" path="/huxiu/author/:id" :paramsDesc="['用户 id']" />

### 扇贝

<route name="打卡" author="DIYgod" example="/shanbay/checkin/ddwej" path="/shanbay/checkin/:id" :paramsDesc="['用户 id']" />

### 36kr

<route name="搜索文章" author="xyqfer" example="/36kr/search/article/8%E7%82%B91%E6%B0%AA" path="/36kr/search/article/:keyword" :paramsDesc="['关键字']" />

### 中国大学 MOOC(慕课)

<route name="最新" author="xyqfer" example="/icourse163/newest" path="/icourse163/newest" />

### 多抓鱼

<route name="搜索结果" author="fengkx" example="/duozhuayu/search/JavaScript" path="/duozhuayu/search/:wd" :paramsDesc="['搜索关键词']"/>

### 创业邦

<route name="作者" author="xyqfer" example="/cyzone/author/1225562" path="/cyzone/author/:id" :paramsDesc="['作者 id']"/>

### 惠誉评级

<route name="板块信息" author="LogicJake" example="/fitchratings/site/economics" path="/fitchratings/site/:type" :paramsDesc="['板块名称，在网址 site 后面']"/>

### 移动支付网

<route name="新闻" author="LogicJake" example="/mpaypass/news" path="/mpaypass/news"/>

### 日报 | D2 资源库

<route name="日报 | D2 资源库" author="Andiedie" example="/d2/daily" path="/d2/daily"/>

### 摩根大通研究所

<route name="新闻" author="howel52" example="/jpmorganchase" path="/jpmorganchase"/>

### 多知网

<route name="首页" author="WenryXu" example="/duozhi" path="/duozhi"/>

### 人人都是产品经理

<route name="热门文章" author="WenryXu" example="/woshipm/popular" path="/woshipm/popular"/>

<route name="用户收藏" author="LogicJake" example="/woshipm/bookmarks/324696" path="/woshipm/bookmarks/:id" :paramsDesc="['用户 id']"/>

<route name="用户文章" author="LogicJake" example="/woshipm/user_article/324696" path="/woshipm/user_article/:id" :paramsDesc="['用户 id']"/>

### 鲸跃汽车

<route name="首页" author="LogicJake" example="/whalegogo/home" path="/whalegogo/home"/>

### 每日安全

<route name="推送" author="LogicJake" example="/security/pulses" path="/security/pulses"/>

### DoNews

<route name="栏目" author="HenryQW" example="/donews" path="/donews/:column?" :paramsDesc="['栏目代码, 默认为首页.']">

| 首页 | 商业    | 创业     | 互娱 | 科技       | 专栏    |
| ---- | ------- | -------- | ---- | ---------- | ------- |
| (空) | company | business | ent  | technology | idonews |

</route>

### WeGene

<route name="最近更新" author="LogicJake" example="/wegene/newest" path="/wegene/newest"/>
<route name="栏目" author="LogicJake" example="/wegene/column/all/all" path="/wegene/column/:type/:category" :paramsDesc="['栏目类型，all（全部项目） 或 weapp（专业版）','栏目分类']">

:::
type 为 all 时，category 参数不支持 cost 和 free
:::

| 全部 | 祖源分析 | 付费 | 遗传性疾病 | 药物指南 | 免费 | 运动基因 | 营养代谢   | 心理特质   | 健康风险 | 皮肤特性 | 遗传特征 |
| ---- | -------- | ---- | ---------- | -------- | ---- | -------- | ---------- | ---------- | -------- | -------- | -------- |
| all  | ancestry | cost | disease    | drug     | free | genefit  | metabolism | psychology | risk     | skin     | traits   |

</route>

### Instapaper

<route name="个人分享" author="LogicJake" example="/instapaper/person/viridiano" path="/instapaper/person"/>

### UI 中国

<route name="推荐文章" author="WenryXu" example="/ui-cn/article" path="/ui-cn/article"/>

<route name="个人作品" author="WenryXu" example="/ui-cn/user/85974" path="/ui-cn/user/:id" :paramsDesc="['用户id']"/>

### 12306

<route name="最新动态" author="LogicJake" example="/12306/zxdt" path="/12306/zxdt/:id?" :paramsDesc="['铁路局id，可在 URL 中找到，不填默认显示所有铁路局动态']"/>

### 北京天文馆

<route name="每日一图" author="HenryQW" example="/bjp/apod" path="/bjp/apod"/>

### 洛谷

<route name="日报" author="LogicJake" example="/luogu/daily" path="/luogu/daily/:id?" :paramsDesc="['年度日报所在帖子id，可在 URL 中找到，不填默认为2019年日报']"/>

### 决胜网

<route name="最新资讯" author="WenryXu" example="/juesheng" path="/juesheng"/>

### 播客 IBC 岩手放送｜ IBC ラジオ　イヤーマイッタマイッタ

<route name="IBC岩手放送｜IBCラジオ　イヤーマイッタマイッタ" author="fengkx" example="/maitta" path="/maitta" />

### 博客: 敬维

<route name="博客: 敬维" author="a180285" example="/blogs/jingwei.link" path="/blogs/jingwei.link"/>

### 裏垢女子まとめ

<route name="主页" author="SettingDust"  example="/uraaka-joshi" path="/uraaka-joshi"/>

<route name="用户" author="SettingDust"  example="/uraaka-joshi/_rrwq" path="/uraaka-joshi/:id" :paramsDesc="['用户名']"/>

### 今日热榜

<route name="榜单" author="LogicJake"  example="/tophub/Om4ejxvxEN" path="/tophub/:id" :paramsDesc="['榜单id，可在 URL 中找到']"/>
