// ==UserScript==
// @name                RIP HLTV BET
// @name:zh-CN          HLTV 广告去除插件
// @namespace           https://github.com/wolfcon/RIP-HLTV-BET
// @version             0.1
// @description         Remove hltv.org Annoy AD
// @description:zh-cn   清除那些🤮背景赌博广告.
// @author              Frank
// @match               https://www.hltv.org/*
// @icon                https://www.hltv.org/img/static/favicon/favicon-32x32.png
// @run-at              document-end
// ==/UserScript==

(function() {
    'use strict';

    document.body.removeAttribute("data-href");
    document.body.removeAttribute("style");
})();
