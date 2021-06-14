// ==UserScript==
// @name                RIP HLTV BET
// @name:zh-CN          HLTV 广告去除插件
// @namespace           https://github.com/wolfcon/RIP-HLTV-BET
// @version             0.2
// @description         Remove hltv.org Annoy AD
// @description:zh-cn   清除那些🤮背景赌博广告.
// @author              Frank
// @require             https://code.jquery.com/jquery-3.6.0.min.js
// @match               https://www.hltv.org/*
// @icon                https://www.hltv.org/img/static/favicon/favicon-32x32.png
// @license             MIT
// @run-at              document-end
// ==/UserScript==

(function () {
    'use strict';

    function removeNonOfficialSiteElement(element) {
        $.each(element.children(), function (index, ele) {
            const adA = $(ele).find('a').not('[href^="/"]');
            $(adA).remove();
            // const finded = adA.length;
            // if (finded > 0) {
            //     $(ele).remove();
            // }
        });
    }

    (function removeBackgroundAd() {
        document.body.removeAttribute("data-href");
        document.body.removeAttribute("style");
    })();

    (function removeTopAds() {
        var topDiv = document.getElementsByClassName("logoCon")[0];
        var adCount = topDiv.children.length - 1;

        while (adCount > 0) {
            topDiv.removeChild(topDiv.lastElementChild);
            adCount--;
        }
    })();

    (function removeLeftColumnAd() {
        removeNonOfficialSiteElement($('.leftCol'));
    })();

    (function removeRightColumnAd() {
        removeNonOfficialSiteElement($('.rightCol'));
        removeNonOfficialSiteElement($('.right2Col'))
    })();

    (function removeContentColumnAd() {
        removeNonOfficialSiteElement($('.contentCol'));
    })();
})();
