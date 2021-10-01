// ==UserScript==
// @name                RIP HLTV BET
// @name:zh-CN          HLTV 广告去除插件
// @namespace           https://github.com/wolfcon/RIP-HLTV-BET
// @version             1.1
// @description         Remove hltv.org Annoy AD
// @description:zh-cn   清除那些🤮背景赌博广告.
// @author              Frank
// @require             https://code.jquery.com/jquery-3.6.0.min.js
// @match               https://*.hltv.org/*
// @icon                https://www.hltv.org/img/static/favicon/favicon-32x32.png
// @license             MIT
// @run-at              document-body
// ==/UserScript==

const filters = [
    '[class*="yabo"]'
];

function waitForKeyElements (
    selectorTxt, actionFunction, bWaitOnce, iframeSelector
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements(selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
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

    // remove filters ad
    filters.forEach(filter => {
        removeClassElement(filter);
    });
};

removeAll();
waitForKeyElements("div,aside", removeAll);