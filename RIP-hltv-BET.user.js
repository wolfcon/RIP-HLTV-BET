// ==UserScript==
// @name                RIP HLTV BET
// @name:zh-CN          HLTV 广告去除插件
// @namespace           https://github.com/wolfcon/RIP-HLTV-BET
// @version             1.2
// @description         Remove hltv.org Annoy AD
// @description:zh-cn   清除那些🤮背景赌博广告.
// @author              Frank
// @require             https://code.jquery.com/jquery-3.6.0.min.js
// @match               https://*.hltv.org/*
// @icon                https://www.hltv.org/img/static/favicon/favicon-32x32.png
// @license             MIT
// @run-at              document-body
// ==/UserScript==

const filters = '[class*="yabo"], [href*="bet"], a:not([href^="/"])';
// Use ADBlock way to block some annoy element
function removeFilters() {
    var $hiddenStyle = $('<style type="text/css"></style>');
    $($('head')[0]).append($hiddenStyle);
    $hiddenStyle.append(filters + "{display: none !important; visibility: hidden !important;}");
}

function removeAll() {
    'use strict';

    function removeNonOfficialSiteElement(element) {
        const adA = $(element).find('a').not('[href^="/"]');
        $(adA).remove();
    }

    function removeClassElement(filter) {
        const ele = $('div,aside').find(filter);
        $(ele).remove();
    }

    // removeBackgroundAd
    document.body.removeAttribute("data-href");
    document.body.removeAttribute("style");

    (function removeTopAds() {
        var topDiv = document.getElementsByClassName("logoCon")[0];
        var adCount = topDiv.children.length - 1;

        while (adCount > 0) {
            topDiv.removeChild(topDiv.lastElementChild);
            adCount--;
        }
    })();

    // removeLeftColumnAd
    removeNonOfficialSiteElement($('.leftCol'));

    // removeRightColumnAd
    removeNonOfficialSiteElement($('.rightCol'));
    removeNonOfficialSiteElement($('.right2Col'));

    // removeContentColumnAd
    removeNonOfficialSiteElement($('.contentCol'));

    // remove extra filters
    removeFilters();
};

removeAll();