/*!
 * TabsetBox
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(e,t,a){"use strict";if(e&&"undefined"==typeof e.TabsetBox){var o=(Array.prototype.push,Array.prototype.splice,"undefined"!=typeof e.hasTouch&&e.hasTouch,{}),n={registerTabsetFramePage:function(){var a=e.expando;o[a]||(e.Tabset||t.includeScript(e.UI_TABSET_JS,!0,!0),e.Tabset&&(o[a]=new e.Tabset.FramePage))}};e(t).unload(function(){for(var e in o)o[e].destroy(),delete o[e]}),e.TabsetBox=n,e.each("registerTabsetFramePage".split(","),function(a,o){t[o]=e.TabsetBox[o]})}}(window.Wade,window,document);