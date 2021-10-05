// ==UserScript==
// @name                RIP HLTV BET
// @name:zh-CN          HLTV 广告去除插件
// @namespace           https://github.com/wolfcon/RIP-HLTV-BET
// @version             1.3
// @description         Remove hltv.org Annoy AD
// @description:zh-cn   清除那些🤮背景赌博广告.
// @author              Frank
// @require             https://code.jquery.com/jquery-3.6.0.min.js
// @match               https://*.hltv.org/*
// @icon                https://www.hltv.org/img/static/favicon/favicon-32x32.png
// @license             MIT
// @run-at              document-body
// ==/UserScript==

(function() {
    const filters = [
        '[class*="yabo"]',
        '[class*="kgN8P9bvyb2EqDJR"]',
        '[class*="ASdvuasdr123Gazx"]',
        '[class*="regional"]',
        '[class*="world"]',
        '[class*="bet"]',
        '[href*="/betting/analytics"]',
        '[href*="/fantasy"]',
        '[href*="lzhtys"]',
        '[href*="http://manilasunyanzi.cn"]',
        //'a:not([href^="/"])'
    ];

    // Use ADBlock way to block some annoy element
    var $hiddenStyle = $('<style type="text/css"></style>');
    $($('head')[0]).append($hiddenStyle);
    $hiddenStyle.append(filters + "{display: none !important; visibility: hidden !important;}");

    // removeBackgroundAd
    document.body.removeAttribute("data-href");
    document.body.removeAttribute("style");
})();