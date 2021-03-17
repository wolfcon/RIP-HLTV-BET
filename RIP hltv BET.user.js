// ==UserScript==
// @name         RIP hltv BET
// @namespace    https://github.com/wolfcon/RIP-HLTV-BET
// @version      0.1
// @description  Remove hltv.org Annoy AD
// @author       Frank
// @match        https://www.hltv.org/*
// @icon         https://www.hltv.org/img/static/favicon/favicon-32x32.png
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    document.body.removeAttribute("data-href");
    document.body.removeAttribute("style");
})();

