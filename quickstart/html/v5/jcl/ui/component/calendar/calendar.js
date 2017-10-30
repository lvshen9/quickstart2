/*!
 * calendar component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(t,e,n){"use strict";function l(l,i,a){if(l&&t.isString(l)&&(l=n.getElementById(l)),l&&l.nodeType){var s=t.extend({},a);if(s.name&&t.isString(s.name)){s.id&&t.isString(s.id)||(s.id=s.name);var r=s.className?s.className:"";r||(r="c_calendar",s.useLunar&&(r+=" c_calendar-lunar"));var u=[];return u.push('<div x-wade-uicomponent="calendar" id="'+s.id+'" class="'+r+'" style="'+(s.style?s.style:"")+'">'),u.push('<div class="header">'),u.push('\t<div class="prevYear"></div>'),u.push('\t<div class="prev"></div>'),u.push('\t<div class="info">'),u.push('\t\t<span class="year"></span>'),u.push('\t\t<span class="month"></span>'),u.push("\t</div>"),u.push('\t<div class="next"></div>'),u.push('\t<div class="nextYear"></div>'),u.push("</div>"),u.push('<div class="select" style="display:none;">'),u.push('\t<div class="year">'),u.push('\t\t<span class="prev"></span>'),u.push("\t\t<ul>"),u.push("\t\t\t<li></li>"),u.push("\t\t\t<li></li>"),u.push("\t\t\t<li></li>"),u.push("\t\t\t<li></li>"),u.push("\t\t\t<li></li>"),u.push("\t\t\t<li></li>"),u.push("\t\t\t<li></li>"),u.push("\t\t\t<li></li>"),u.push("\t\t\t<li></li>"),u.push("\t\t\t<li></li>"),u.push("\t\t</ul>"),u.push('\t\t<span class="next"></span>'),u.push("\t</div>"),u.push('\t<div class="month">'),u.push("\t\t<ul>"),u.push('\t\t\t<li val="0">'+t.lang.get("ui.component.calendar.janurary-text")+"</li>"),u.push('\t\t\t<li val="1">'+t.lang.get("ui.component.calendar.february-text")+"</li>"),u.push('\t\t\t<li val="2">'+t.lang.get("ui.component.calendar.march-text")+"</li>"),u.push('\t\t\t<li val="3">'+t.lang.get("ui.component.calendar.april-text")+"</li>"),u.push('\t\t\t<li val="4">'+t.lang.get("ui.component.calendar.may-text")+"</li>"),u.push('\t\t\t<li val="5">'+t.lang.get("ui.component.calendar.june-text")+"</li>"),u.push('\t\t\t<li val="6">'+t.lang.get("ui.component.calendar.july-text")+"</li>"),u.push('\t\t\t<li val="7">'+t.lang.get("ui.component.calendar.august-text")+"</li>"),u.push('\t\t\t<li val="8">'+t.lang.get("ui.component.calendar.september-text")+"</li>"),u.push('\t\t\t<li val="9">'+t.lang.get("ui.component.calendar.october-text")+"</li>"),u.push('\t\t\t<li val="10">'+t.lang.get("ui.component.calendar.november-text")+"</li>"),u.push('\t\t\t<li val="11">'+t.lang.get("ui.component.calendar.december-text")+"</li>"),u.push("\t\t</ul>"),u.push("\t</div>"),u.push("</div>"),u.push('<div class="week">'),u.push("\t<ul>"),u.push("\t\t<li>"+t.lang.get("ui.component.calendar.sunday-text")+"</li>"),u.push("\t\t<li>"+t.lang.get("ui.component.calendar.monday-text")+"</li>"),u.push("\t\t<li>"+t.lang.get("ui.component.calendar.tuesday-text")+"</li>"),u.push("\t\t<li>"+t.lang.get("ui.component.calendar.wednesday-text")+"</li>"),u.push("\t\t<li>"+t.lang.get("ui.component.calendar.thursday-text")+"</li>"),u.push("\t\t<li>"+t.lang.get("ui.component.calendar.friday-text")+"</li>"),u.push("\t\t<li>"+t.lang.get("ui.component.calendar.saturday-text")+"</li>"),u.push("\t</ul>"),u.push("</div>"),u.push('<div class="day">'),u.push("\t<ul>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t\t<li></li>"),u.push("\t</ul>"),u.push("</div>"),u.push('<div class="time" style="display:none">'),u.push('\t<div class="hour">'),u.push('\t\t<div class="input"><input type="text" value="00" maxlength="2" /></div>'),u.push('\t\t<div class="text">'+t.lang.get("ui.component.calendar.hour-text")+"</div>"),u.push('\t\t<div class="option" style="display:none">'),u.push("\t\t\t<ul>"),u.push("\t\t\t\t<li>1</li>"),u.push("\t\t\t\t<li>2</li>"),u.push("\t\t\t\t<li>3</li>"),u.push("\t\t\t\t<li>4</li>"),u.push("\t\t\t\t<li>5</li>"),u.push("\t\t\t\t<li>6</li>"),u.push("\t\t\t\t<li>7</li>"),u.push("\t\t\t\t<li>8</li>"),u.push("\t\t\t\t<li>9</li>"),u.push("\t\t\t\t<li>10</li>"),u.push("\t\t\t\t<li>11</li>"),u.push("\t\t\t\t<li>12</li>"),u.push("\t\t\t\t<li>13</li>"),u.push("\t\t\t\t<li>14</li>"),u.push("\t\t\t\t<li>15</li>"),u.push("\t\t\t\t<li>16</li>"),u.push("\t\t\t\t<li>17</li>"),u.push("\t\t\t\t<li>18</li>"),u.push("\t\t\t\t<li>19</li>"),u.push("\t\t\t\t<li>20</li>"),u.push("\t\t\t\t<li>21</li>"),u.push("\t\t\t\t<li>22</li>"),u.push("\t\t\t\t<li>23</li>"),u.push("\t\t\t\t<li>24</li>"),u.push("\t\t\t</ul>"),u.push("\t\t</div>"),u.push("\t</div>"),u.push('\t<div class="min">'),u.push('\t\t<span class="input"><input type="text" value="00" maxlength="2" /></span>'),u.push('\t\t<span class="text">'+t.lang.get("ui.component.calendar.minutes-text")+"</span>"),u.push('\t\t<div class="option" style="display:none">'),u.push("\t\t\t<ul>"),u.push("\t\t\t\t<li>0</li>"),u.push("\t\t\t\t<li>5</li>"),u.push("\t\t\t\t<li>10</li>"),u.push("\t\t\t\t<li>15</li>"),u.push("\t\t\t\t<li>20</li>"),u.push("\t\t\t\t<li>25</li>"),u.push("\t\t\t\t<li>30</li>"),u.push("\t\t\t\t<li>35</li>"),u.push("\t\t\t\t<li>40</li>"),u.push("\t\t\t\t<li>45</li>"),u.push("\t\t\t\t<li>50</li>"),u.push("\t\t\t\t<li>55</li>"),u.push("\t\t\t</ul>"),u.push("\t\t</div>"),u.push("\t</div>"),u.push('\t<div class="sec">'),u.push('\t\t<span class="input"><input type="text" value="00" maxlength="2" /></span>'),u.push('\t\t<span class="text">'+t.lang.get("ui.component.calendar.second-text")+"</span>"),u.push('\t\t<div class="option" style="display:none">'),u.push("\t\t\t<ul>"),u.push("\t\t\t\t<li>0</li>"),u.push("\t\t\t\t<li>5</li>"),u.push("\t\t\t\t<li>10</li>"),u.push("\t\t\t\t<li>15</li>"),u.push("\t\t\t\t<li>20</li>"),u.push("\t\t\t\t<li>25</li>"),u.push("\t\t\t\t<li>30</li>"),u.push("\t\t\t\t<li>35</li>"),u.push("\t\t\t\t<li>40</li>"),u.push("\t\t\t\t<li>45</li>"),u.push("\t\t\t\t<li>50</li>"),u.push("\t\t\t\t<li>55</li>"),u.push("\t\t\t</ul>"),u.push("\t\t</div>"),u.push("\t</div>"),u.push("</div>"),u.push('<div class="shortcut" style="display:none;">'),u.push("\t<ul>"),u.push('\t\t<li tag="HalfYearAgo">'+t.lang.get("ui.component.calendar.quicksel-btn-hyaday-text")+"</li>"),u.push('\t\t<li tag="ThreeMonthAgo">'+t.lang.get("ui.component.calendar.quicksel-btn-tmaday-text")+"</li>"),u.push('\t\t<li tag="PrevMonthToday">'+t.lang.get("ui.component.calendar.quicksel-btn-pmtday-text")+"</li>"),u.push('\t\t<li tag="Today">'+t.lang.get("ui.component.calendar.quicksel-btn-today-text")+"</li>"),u.push('\t\t<li tag="NextMonthFirst">'+t.lang.get("ui.component.calendar.quicksel-btn-nmfday-text")+"</li>"),u.push('\t\t<li tag="NextMonthLast">'+t.lang.get("ui.component.calendar.quicksel-btn-nmlday-text")+"</li>"),u.push('\t\t<li tag="NextYearToday">'+t.lang.get("ui.component.calendar.quicksel-btn-nytday-text")+"</li>"),u.push('\t\t<li tag="2050">'+t.lang.get("ui.component.calendar.quicksel-btn-2050day-text")+"</li>"),u.push("\t</ul>"),u.push("</div>"),u.push('<div class="fn">'),u.push('\t<button tag="clear" type="button" class="e_button-l e_button-navy">'+t.lang.get("ui.component.calendar.btn-clear-text")+"</button>"),u.push('\t<button tag="quicksel" type="button" class="e_button-l e_button-navy"><span>'+t.lang.get("ui.component.calendar.btn-quicksel-text")+'</span><span tag="fold" class="e_ico-fold"></span></button>'),u.push('\t<button tag="ok" type="button" class="e_button-l e_button-blue">'+t.lang.get("ui.component.calendar.btn-ok-text")+"</button>"),u.push("</div>"),u.push("</div>"),t(l)[i](u.join("")),u=null,e[s.id]=new Wade.Calendar(s.id,{now:s.now?s.now:new Date,value:s.value?s.value:null,format:s.format?s.foramt:"yyyy-MM-dd",useTime:!0===s.useTime,useLunar:!0===s.useLunar}),e[s.id]}}}function i(t){var e,n=348;for(e=32768;e>8;e>>=1)n+=p[t-1900]&e?1:0;return n+a(t)}function a(t){return s(t)?65536&p[t-1900]?30:29:0}function s(t){return 15&p[t-1900]}function r(t,e){return p[t-1900]&65536>>e?30:29}if(t&&"undefined"==typeof t.Calendar){var u=t.os.phone||!0===t.ratioPhone,o=function(e,l){var i=this;i.el=e&&1==e.nodeType?e:n.getElementById(e),i.el&&i.el.nodeType&&t.nodeName(i.el,"div")&&(i.id=t.attr(i.el,"id"))&&(l&&t.isObject(l)&&t.extend(i,l),t.attr(i.el,"x-wade-uicomponent")||t.attr(i.el,"x-wade-uicomponent","calendar"),i._init(),i.constructor.call(i))};o.prototype=t.extend(new t.UIComponent,{nowDate:function(){var t=this;if(t.now){var e=new Date;return new Date(t.now.getFullYear(),t.now.getMonth(),t.now.getDate(),e.getHours(),e.getMinutes(),e.getSeconds())}return new Date},val:function(e){var n=this;if(t.isString(e)){var l=""==e?n.nowDate():e.toDate(n.format);l&&l instanceof Date&&(n.value=l,n.date=new Date(n.value),n._fillDate(n.date))}else if(n.value&&n.value instanceof Date)return n.value.format(n.format)},lunarVal:function(){var t=this;if(t.useLunar&&t.value&&t.value instanceof Date){var e=new T(t.value);return e.chineseEra()+"年 【"+e.chineseZodiac()+"年】 "+e.lmonth()+" "+e.lday()}},showSelect:function(){var t=this;t.fn.style.display="none",t.select.style.display="",t.iyear!=t.date.getFullYear()&&(t.iyear=t.date.getFullYear(),t._fillYear(t.iyear)),t.imonth!=t.date.getMonth()&&(t.imonth=t.date.getMonth(),t._fillMonth(t.imonth))},hideSelect:function(){var t=this;t.fn.style.display="",t.select.style.display="none"},reset:function(){var e=this;e.timeCt.style.display=e.useTime?"":"none";var n=e.el.className?e.el.className:"";e.useTime&&(" "+n+" ").indexOf(" c_calendar-hasTime ")<0?e.el.className=t.trim(n+" c_calendar-hasTime"):!e.useTime&&(" "+n+" ").indexOf(" c_calendar-hasTime ")>-1&&(e.el.className=t.trim((" "+n+" ").replace(/ c_calendar-hasTime /gi," "))),e.format||(e.format=e.useTime?"yyyy-MM-dd HH:mm:ss":"yyyy-MM-dd"),e.value&&t.isString(e.value)&&e.format&&t.isString(e.format)&&(e.value=e.value.toDate(e.format)),e.value||(e.value=e.nowDate()),e.date=new Date(e.value),e._fillDate(e.date)},destroy:function(){var t=this;t.header=null,t.yearPrev=null,t.yearNext=null,t.monthPrev=null,t.monthNext=null,t.btnSelect=null,t.yearText=null,t.monthText=null,t.select=null,t.selectYear=null,t.selectMonth=null,t.selectYearPrev=null,t.selectYearNext=null,t.selectYearList=null,t.selectMonthList=null,t.dayCt=null,t.dayList=null,t.timeCt=null,t.hourCt=null,t.minCt=null,t.secCt=null,t.hourOption=null,t.minutesOption=null,t.secondOption=null,t.hourIpt=null,t.minutesIpt=null,t.secondIpt=null,t.quickSelFn=null,t.fn=null,t.btnClear=null,t.btnQuickSel=null,t.btnOk=null,t.el=null},_init:function(){function e(){i.iyear==i.date.getFullYear()&&i.imonth==i.date.getMonth()||(i.date.setFullYear(i.iyear),i.date.setMonth(i.imonth),i.value=new Date(i.date),i._fillDate(i.date),i._fillYear(i.iyear),i._fillMonth(i.imonth)),i.hideSelect()}function n(){i.quickSelFn.style.display="",t("span[tag=fold]",i.btnQuickSel).attr("className","e_ico-unfold")}function l(){i.quickSelFn.style.display="none",t("span[tag=fold]",i.btnQuickSel).attr("className","e_ico-fold")}var i=this;if(i.header=t(i.el).children("div.header:first")[0],i.yearPrev=t(i.header).children("div.prevYear:first")[0],i.yearNext=t(i.header).children("div.nextYear:first")[0],i.monthPrev=t(i.header).children("div.prev:first")[0],i.monthNext=t(i.header).children("div.next:first")[0],i.btnSelect=t(i.header).children("div.info:first")[0],i.yearText=t(i.btnSelect).children("span.year:first")[0],i.monthText=t(i.btnSelect).children("span.month:first")[0],i.select=t(i.el).children("div.select:first")[0],i.selectYear=t(i.select).children("div.year:first")[0],i.selectMonth=t(i.select).children("div.month:first")[0],i.selectYearPrev=t(i.selectYear).children("span.prev:first")[0],i.selectYearNext=t(i.selectYear).children("span.next:first")[0],i.selectYearList=t(i.selectYear).children("ul:first")[0],i.selectMonthList=t(i.selectMonth).children("ul:first")[0],i.dayCt=t(i.el).children("div.day:first")[0],i.dayList=t(i.dayCt).children("ul:first")[0],i.timeCt=t(i.el).children("div.time:first")[0],i.hourCt=t(i.timeCt).children("div.hour:first")[0],i.minCt=t(i.timeCt).children("div.min:first")[0],i.secCt=t(i.timeCt).children("div.sec:first")[0],i.hourOption=t(i.hourCt).children("div.option:first")[0],i.minutesOption=t(i.minCt).children("div.option:first")[0],i.secondOption=t(i.secCt).children("div.option:first")[0],i.hourIpt=t(i.hourCt).find("input[type=text]:first")[0],i.minutesIpt=t(i.minCt).find("input[type=text]:first")[0],i.secondIpt=t(i.secCt).find("input[type=text]:first")[0],i.quickSelFn=t(i.el).children("div.shortcut:first")[0],i.fn=t(i.el).children("div.fn:first")[0],i.btnClear=t(i.fn).children("button[tag=clear]:first")[0],i.btnQuickSel=t(i.fn).children("button[tag=quicksel]:first")[0],i.btnOk=t(i.fn).children("button[tag=ok]:first")[0],i.useLunar){var a=i.el.className?i.el.className:"";(" "+a+" ").indexOf(" c_calendar-lunar ")<0&&(i.el.className=t.trim(a+" c_calendar-lunar"))}i.reset(),i.useTime&&(u||t.os.pad)&&(t("#"+i.id+"_hour_ipt").attr("readonly",!0),t("#"+i.id+"_minutes_ipt").attr("readonly",!0),t("#"+i.id+"_second_ipt").attr("readonly",!0)),t(i.yearPrev).tap(function(){i.date.setFullYear(i.date.getFullYear()-1),i._fillDate(i.date),i.select.style.display="none"}),t(i.yearNext).tap(function(){i.date.setFullYear(i.date.getFullYear()+1),i._fillDate(i.date),i.select.style.display="none"}),t(i.monthPrev).tap(function(){i.date.setMonth(i.date.getMonth()-1),i._fillDate(i.date),i.select.style.display="none"}),t(i.monthNext).tap(function(){i.date.setMonth(i.date.getMonth()+1),i._fillDate(i.date),i.select.style.display="none"}),t(i.btnSelect).tap(function(){"none"==i.select.style.display?i.showSelect():i.hideSelect()}),t(i.hourOption).tap(function(e){e.originalEvent&&(e=t.event.fix(e.originalEvent));var n=e.target;if(n&&1==n.nodeType&&t.nodeName(n,"li")){var l=t.trim(n.innerHTML);if(""==l)return;t("li[class=on]",i.hourOption).attr("className",""),n.className="on",i.hourIpt.value=l,i.date.setHours(parseInt(l)),i.value=new Date(i.date),i._triggerSelectAction(e)}i.hourOption.style.display="none"}),t(i.minutesOption).tap(function(e){e.originalEvent&&(e=t.event.fix(e.originalEvent));var n=e.target;if(n&&1==n.nodeType&&t.nodeName(n,"li")){var l=t.trim(n.innerHTML);if(""==l)return;t("li[class=on]",i.minutesOption).attr("className",""),n.className="on",i.minutesIpt.value=l,i.date.setMinutes(parseInt(l)),i.value=new Date(i.date),i._triggerSelectAction(e)}i.minutesOption.style.display="none"}),t(i.secondOption).tap(function(e){e.originalEvent&&(e=t.event.fix(e.originalEvent));var n=e.target;if(n&&1==n.nodeType&&t.nodeName(n,"li")){var l=t.trim(n.innerHTML);if(""==l)return;t("li[class=on]",i.secondOption).attr("className",""),n.className="on",i.secondIpt.value=l,i.date.setSeconds(parseInt(l)),i.value=new Date(i.date),i._triggerSelectAction(e)}i.secondOption.style.display="none"}),t(i.hourIpt).tap(function(){i.minutesOption.style.display="none",i.secondOption.style.display="none",i.hourOption.style.display="none"==i.hourOption.style.display?"":"none"}),t(i.minutesIpt).tap(function(){i.hourOption.style.display="none",i.secondOption.style.display="none",i.minutesOption.style.display="none"==i.minutesOption.style.display?"":"none"}),t(i.secondIpt).tap(function(){i.hourOption.style.display="none",i.minutesOption.style.display="none",i.secondOption.style.display="none"==i.secondOption.style.display?"":"none"}),t(i.selectYearPrev).tap(function(){i.iyear-6<1920||(i.iyear-=10,i._fillYear(i.iyear))}),t(i.selectYearNext).tap(function(){i.iyear+5>2050||(i.iyear+=10,i._fillYear(i.iyear))}),t(i.selectYearList).tap(function(e){e.originalEvent&&(e=t.event.fix(e.originalEvent));var n=e.target;if(n&&1==n.nodeType&&t.nodeName(n,"li")){if(""==t.trim(n.innerHTML))return;t("li[class=on]",i.selectYearList).attr("className",""),n.className="on",i.iyear=n.innerHTML}}),t(i.selectMonthList).tap(function(n){n.originalEvent&&(n=t.event.fix(n.originalEvent));var l=n.target;if(l&&1==l.nodeType&&t.nodeName(l,"li")){if(""==t.trim(l.innerHTML))return;t("li[class=on]",i.selectMonthList).attr("className",""),l.className="on",i.imonth=t.attr(l,"val")}e()}),t(i.dayList).tap(function(e){e.originalEvent&&(e=t.event.fix(e.originalEvent));var n=e.target;if(n&&1==n.nodeType){for(var l=0,a=n,s=!1;l<3&&a&&a.nodeType;){if(1==a.nodeType&&t.nodeName(a,"li")){s=!0;break}a=a.parentNode,l++}if(!s)return;var r=t("span:first",a).text();if(!r||!/^\d+$/.test(r))return;if(t("li[class^=on]",i.dayList).attr("className",""),a.className="on",a=null,i.date.setDate(r),!i.useTime){var u=new Date;i.date.setHours(u.getHours()),i.date.setMinutes(u.getMinutes()),i.date.setSeconds(u.getSeconds())}i.value=new Date(i.date),i._triggerSelectAction(e)}}),t(i.btnClear).tap(function(e){!1!==t.event.trigger("clear",null,i.el)&&u&&backPopup(i.el)}),t(i.quickSelFn).tap(function(e){e.originalEvent&&(e=t.event.fix(e.originalEvent));var n=e.target;if(n&&n.nodeType&&t.nodeName(n,"li")){var a=t.attr(n,"tag");if(i.date=i.nowDate(),"HalfYearAgo"==a)i.date.setMonth(i.date.getMonth()-6);else if("ThreeMonthAgo"==a)i.date.setMonth(i.date.getMonth()-3);else if("PrevMonthToday"==a)i.date.setMonth(i.date.getMonth()-1);else if("Today"==a);else if("NextMonthFirst"==a)i.date.setMonth(i.date.getMonth()+1),i.date.setDate(1);else if("NextMonthLast"==a)i.date.setMonth(i.date.getMonth()+2),i.date.setDate(0);else if("NextYearToday"==a)i.date.setFullYear(i.date.getFullYear()+1);else{if("2050"!=a)return;i.date.setFullYear(2050),i.date.setMonth(11),i.date.setDate(31),i.date.setHours(23),i.date.setMinutes(59,59)}i.value=new Date(i.date),i._fillDate(i.date),i.hideSelect(),l(),i._triggerSelectAction(e)}}),t(i.btnQuickSel).tap(function(){"none"==i.quickSelFn.style.display?n():l()}),t(i.btnOk).tap(function(n){if(e(),i.useTime){var l=i.hourIpt.value,a=i.minutesIpt.value,s=i.secondIpt.value;t.isNumeric(l)&&t.isNumeric(a)&&t.isNumeric(s)&&i.date.setHours(l,a,s)}i.value&&i.value==i.date||(i.value=new Date(i.date),i._fillDate(i.date),!1!==t.event.trigger({type:"ok",originalEvent:n.originalEvent,context:i},null,i.el)&&i._triggerSelectAction(n))})},_fillDate:function(e){if(e&&!(!e instanceof Date)){var n=this,l=n.now.getFullYear(),i=n.now.getMonth(),a=n.now.getDate(),s=n.value.getFullYear(),r=n.value.getMonth(),u=n.value.getDate(),o=e.getFullYear(),p=e.getMonth(),d=(e.getDate(),new Date(o,p,1)),c=new Date(o,p+1,0),h=d.getDay(),v=c.getDate();n.yearText.innerHTML=o,n.monthText.innerHTML=p+1;var f,y,m,g,x,b,M,w,N,D,_,Y;if((m=n.dayList.childNodes)&&m.length>0)for(f=y=0;y<m.length;){if(N=!1,(g=m[y])&&1==g.nodeType&&t.nodeName(g,"li")){if(f>=h&&(b=f-h+1)&&b<=v){Y=!1,N=!0,w=[],w.push('<span class="solar">'),w.push(b),w.push("</span>"),n.useLunar&&(M=new Date(o,p,b),D=new T(M),_=M.festival(),_||(_=D.festival()),_||(_=D.solarTerm()),1==D.day&&(Y=!0,_||(_=D.lmonth())),_||(_=D.lday()),w.push('<span class="lunar'+(Y?" lunar-month":"")+'">'),w.push(_),w.push("</span>")),g.innerHTML=w.join(""),x="",s==o&&r==p&&u==b&&(x+=" on"),l==o&&i==p&&a==b&&(x+=" cur");var k=(h+b-1)%7;0==k?x+=" sun":6==k&&(x+=" sat"),g.className=t.trim(x)}N||(g.innerHTML="",g.className="empty"),f++}y++}f=y=m=g=x=M=D=_=w=N=null,d=c=null,n.iyear=o,n._fillYear(o),n.imonth=p,n._fillMonth(p),n.hourIpt.value=e.getHours(),n.minutesIpt.value=e.getMinutes(),n.secondIpt.value=e.getSeconds()}},_fillYear:function(e){var n,l,i,a,s=this,r=s.date.getFullYear(),u=s.selectYearList.childNodes;if(u&&u.length>0)for(n=l=0;l<u.length;)a=u[l],a&&1==a.nodeType&&t.nodeName(a,"li")&&(i=e-5+n,i<1920||i>2050?a.innerHTML="":(a.innerHTML=i,a.className=i==r?"on":""),n++),l++;n=l=i=a=u=null},_fillMonth:function(e){var n,l,i,a=this,s=a.selectMonthList.childNodes;if(s&&s.length>0)for(n=l=0;l<s.length;)i=s[l],i&&1==i.nodeType&&t.nodeName(i,"li")&&(i.className=e==n?"on":"",n++),l++;n=l=i=s=null},_triggerSelectAction:function(e){var n=this,l=t.event.trigger({type:"select",originalEvent:e.originalEvent,context:n},null,n.el);return l}});t.extend(o,{append:function(t,e,n){return l(t,"append",e)},prepend:function(t,e,n){return l(t,"prepend",e)},before:function(t,e,n){return l(t,"before",e)},after:function(t,e,n){return l(t,"after",e)}}),e.Calendar=t.Calendar=o;var p=new Array(19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42448,83315,21200,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46496,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19415,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448),d=(new Array(31,28,31,30,31,30,31,31,30,31,30,31),new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸")),c=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"),h=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"),v=new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"),f=new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758),y=new Array("0101 春节","0115 元宵节","0505 端午节","0707 七夕","0715 中元节","0815 中秋节","0909 重阳节","1208 腊八节","1224 小年","0100 除夕"),m=new Array("0101 元旦","0214 情人节","0308 妇女节","0312 植树节","0315 消费者权益日","0401 愚人节","0501 劳动节","0504 青年节","0601 儿童节","0701 建党节","0801 建军节","0910 教师节","1001 国庆节","1225 圣诞节"),g=new Array("日","一","二","三","四","五","六","七","八","九","十"),x=new Array("初","十","廿","卅","　"),T=function(t){var e=this;e.sdate=t;var n,l=0,u=0,o=new Date(1900,0,31),p=(e.sdate-o)/864e5;for(e.dayCyl=p+40,e.monCyl=14,n=1900;n<2050&&p>0;n++)u=i(n),p-=u,e.monCyl+=12;for(p<0&&(p+=u,n--,e.monCyl-=12),e.year=n,e.yearCyl=n-1864,l=s(n),e.isLeap=!1,n=1;n<13&&p>0;n++)l>0&&n==l+1&&0==e.isLeap?(--n,e.isLeap=!0,u=a(e.year)):u=r(e.year,n),1==e.isLeap&&n==l+1&&(e.isLeap=!1),p-=u,0==e.isLeap&&e.monCyl++;0==p&&l>0&&n==l+1&&(e.isLeap?e.isLeap=!1:(e.isLeap=!0,--n,--e.monCyl)),p<0&&(p+=u,--n,--e.monCyl),e.month=n,e.day=parseInt(p+1)};T.prototype={chineseZodiac:function(){var t=this;return t.chineseZodiacText==undefined&&t.year&&(t.chineseZodiacText=h[this.year%12-4],t.chineseZodiacText||(t.chineseZodiacText="")),t.chineseZodiacText},chineseEra:function(){var t=this;if(t.chineseEraText==undefined&&t.year){var e=this.year-1900+36;t.chineseEraText=d[e%10]+c[e%12],t.chineseEraText||(t.chineseEraText="")}return t.chineseEraText},festival:function(){var t=this;if(t.festivalText==undefined){for(var e=0;e<y.length;e++){var n,l;y[e].match(/^(\d{2})(\d{2})([\s*])(.+)$/)&&(n=parseInt(RegExp.$1)-t.month,l=parseInt(RegExp.$2)-t.day,0==n&&0==l&&(t.festivalText=RegExp.$4))}t.festivalText||(t.festivalText="")}return t.festivalText},solarTerm:function(){var t=this;if(t.solarTermText==undefined){var e=t.sdate.getFullYear(),n=t.sdate.getMonth(),l=t.sdate.getDate(),i=new Date(31556925974.7*(e-1900)+6e4*f[2*n+1]+Date.UTC(1900,0,6,2,5)),a=i.getUTCDate();a==l&&(t.solarTermText=v[2*n+1]),i=new Date(31556925974.7*(e-1900)+6e4*f[2*n]+Date.UTC(1900,0,6,2,5)),a=i.getUTCDate(),a==l&&(t.solarTermText=v[2*n]),t.solarTermText||(t.solarTermText="")}return t.solarTermText},lmonth:function(){var t,e=this;switch(e.month){case 1:t="正月";break;case 2:t="二月";break;case 3:t="三月";break;case 4:t="四月";break;case 5:t="五月";break;case 6:t="六月";break;case 7:t="七月";break;case 8:t="八月";break;case 9:t="九月";break;case 10:t="十月";break;case 11:t="冬月";break;case 12:t="腊月"}return t},lday:function(){var t,e=this;switch(e.day){case 10:t="初十";break;case 20:t="二十";break;case 30:t="三十";break;default:t=x[Math.floor(e.day/10)],t+=g[e.day%10]}return t}},Date.prototype.festival=function(){var t=this;if(t.festivalText==undefined){for(var e=0;e<m.length;e++){var n,l;m[e].match(/^(\d{2})(\d{2})([\s*])(.+)$/)&&(n=parseInt(RegExp.$1)-(t.getMonth()+1),l=parseInt(RegExp.$2)-t.getDate(),0==n&&0==l&&(t.festivalText=RegExp.$4))}t.festivalText||(t.festivalText="")}return t.festivalText},e.LunarDate=t.LunarDate=T}}(window.Wade,window,document);