var SWFUpload;"function"==typeof SWFUpload&&(SWFUpload.speed={},SWFUpload.prototype.initSettings=function(e){return function(t){"function"==typeof e&&e.call(this,t),this.ensureDefault=function(e,s){this.settings[e]=t[e]==undefined?s:t[e]},this.fileSpeedStats={},this.speedSettings={},this.ensureDefault("moving_average_history_size","10"),this.speedSettings.user_file_queued_handler=this.settings.file_queued_handler,this.speedSettings.user_file_queue_error_handler=this.settings.file_queue_error_handler,this.speedSettings.user_upload_start_handler=this.settings.upload_start_handler,this.speedSettings.user_upload_error_handler=this.settings.upload_error_handler,this.speedSettings.user_upload_progress_handler=this.settings.upload_progress_handler,this.speedSettings.user_upload_success_handler=this.settings.upload_success_handler,this.speedSettings.user_upload_complete_handler=this.settings.upload_complete_handler,this.settings.file_queued_handler=SWFUpload.speed.fileQueuedHandler,this.settings.file_queue_error_handler=SWFUpload.speed.fileQueueErrorHandler,this.settings.upload_start_handler=SWFUpload.speed.uploadStartHandler,this.settings.upload_error_handler=SWFUpload.speed.uploadErrorHandler,this.settings.upload_progress_handler=SWFUpload.speed.uploadProgressHandler,this.settings.upload_success_handler=SWFUpload.speed.uploadSuccessHandler,this.settings.upload_complete_handler=SWFUpload.speed.uploadCompleteHandler,delete this.ensureDefault}}(SWFUpload.prototype.initSettings),SWFUpload.speed.fileQueuedHandler=function(e){if("function"==typeof this.speedSettings.user_file_queued_handler)return e=SWFUpload.speed.extendFile(e),this.speedSettings.user_file_queued_handler.call(this,e)},SWFUpload.speed.fileQueueErrorHandler=function(e,t,s){if("function"==typeof this.speedSettings.user_file_queue_error_handler)return e=SWFUpload.speed.extendFile(e),this.speedSettings.user_file_queue_error_handler.call(this,e,t,s)},SWFUpload.speed.uploadStartHandler=function(e){if("function"==typeof this.speedSettings.user_upload_start_handler)return e=SWFUpload.speed.extendFile(e,this.fileSpeedStats),this.speedSettings.user_upload_start_handler.call(this,e)},SWFUpload.speed.uploadErrorHandler=function(e,t,s){if(e=SWFUpload.speed.extendFile(e,this.fileSpeedStats),SWFUpload.speed.removeTracking(e,this.fileSpeedStats),"function"==typeof this.speedSettings.user_upload_error_handler)return this.speedSettings.user_upload_error_handler.call(this,e,t,s)},SWFUpload.speed.uploadProgressHandler=function(e,t,s){if(this.updateTracking(e,t),e=SWFUpload.speed.extendFile(e,this.fileSpeedStats),"function"==typeof this.speedSettings.user_upload_progress_handler)return this.speedSettings.user_upload_progress_handler.call(this,e,t,s)},SWFUpload.speed.uploadSuccessHandler=function(e,t){if("function"==typeof this.speedSettings.user_upload_success_handler)return e=SWFUpload.speed.extendFile(e,this.fileSpeedStats),this.speedSettings.user_upload_success_handler.call(this,e,t)},SWFUpload.speed.uploadCompleteHandler=function(e){if(e=SWFUpload.speed.extendFile(e,this.fileSpeedStats),SWFUpload.speed.removeTracking(e,this.fileSpeedStats),"function"==typeof this.speedSettings.user_upload_complete_handler)return this.speedSettings.user_upload_complete_handler.call(this,e)},SWFUpload.speed.extendFile=function(e,t){var s;return e?(t&&(s=t[e.id]),s?(e.currentSpeed=s.currentSpeed,e.averageSpeed=s.averageSpeed,e.movingAverageSpeed=s.movingAverageSpeed,e.timeRemaining=s.timeRemaining,e.timeElapsed=s.timeElapsed,e.percentUploaded=s.percentUploaded,e.sizeUploaded=s.bytesUploaded):(e.currentSpeed=0,e.averageSpeed=0,e.movingAverageSpeed=0,e.timeRemaining=0,e.timeElapsed=0,e.percentUploaded=0,e.sizeUploaded=0),e):e},SWFUpload.prototype.updateTracking=function(e,t){var s=this.fileSpeedStats[e.id];s||(this.fileSpeedStats[e.id]=s={}),t=t||s.bytesUploaded||0,t<0&&(t=0),t>e.size&&(t=e.size);var d=(new Date).getTime();if(s.startTime)if(s.startTime>d)this.debug("When backwards in time");else{var r=(new Date).getTime(),i=s.lastTime,a=r-i,n=t-s.bytesUploaded;if(0===n||0===a)return s;s.lastTime=r,s.bytesUploaded=t,s.currentSpeed=8*n/(a/1e3),s.averageSpeed=8*s.bytesUploaded/((r-s.startTime)/1e3),s.movingAverageHistory.push(s.currentSpeed),s.movingAverageHistory.length>this.settings.moving_average_history_size&&s.movingAverageHistory.shift(),s.movingAverageSpeed=SWFUpload.speed.calculateMovingAverage(s.movingAverageHistory),s.timeRemaining=8*(e.size-s.bytesUploaded)/s.movingAverageSpeed,s.timeElapsed=(r-s.startTime)/1e3,s.percentUploaded=s.bytesUploaded/e.size*100}else s.startTime=(new Date).getTime(),s.lastTime=s.startTime,s.currentSpeed=0,s.averageSpeed=0,s.movingAverageSpeed=0,s.movingAverageHistory=[],s.timeRemaining=0,s.timeElapsed=0,s.percentUploaded=t/e.size,s.bytesUploaded=t;return s},SWFUpload.speed.removeTracking=function(e,t){try{t[e.id]=null,delete t[e.id]}catch(s){}},SWFUpload.speed.formatUnits=function(e,t,s,d){var r,i,a,n;if(0===e)return"0 "+s[s.length-1];if(d){for(i=e,n=s.length>=t.length?s[t.length-1]:"",r=0;r<t.length;r++)if(e>=t[r]){i=(e/t[r]).toFixed(2),n=s.length>=r?" "+s[r]:"";break}return i+n}var l=[],p=e;for(r=0;r<t.length;r++)a=t[r],n=s.length>r?" "+s[r]:"",i=p/a,(i=r<t.length-1?Math.floor(i):i.toFixed(2))>0&&(p%=a,l.push(i+n));return l.join(" ")},SWFUpload.speed.formatBPS=function(e){var t=[1073741824,1048576,1024,1],s=["Gbps","Mbps","Kbps","bps"];return SWFUpload.speed.formatUnits(e,t,s,!0)},SWFUpload.speed.formatTime=function(e){var t=[86400,3600,60,1],s=["d","h","m","s"];return SWFUpload.speed.formatUnits(e,t,s,!1)},SWFUpload.speed.formatBytes=function(e){var t=[1073741824,1048576,1024,1],s=["GB","MB","KB","bytes"];return SWFUpload.speed.formatUnits(e,t,s,!0)},SWFUpload.speed.formatPercent=function(e){return e.toFixed(2)+" %"},SWFUpload.speed.calculateMovingAverage=function(e){var t,s,d=[],r=0,i=0,a=0,n=0,l=0,p=0,o=0;if((t=e.length)>=8){for(s=0;s<t;s++)d[s]=e[s],r+=d[s];for(i=r/t,s=0;s<t;s++)a+=Math.pow(d[s]-i,2);for(n=a/t,l=Math.sqrt(n),s=0;s<t;s++)d[s]=(d[s]-i)/l;for(s=0;s<t;s++)d[s]<=2&&d[s]>=-2&&(o++,p+=e[s])}else for(o=t,s=0;s<t;s++)p+=e[s];return p/o});