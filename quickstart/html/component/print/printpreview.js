(function(d){if(typeof(d.printpreview)=="undefined"){d("#printFn").bind("selectstart",function(){return false;});var c=false,b=-1,a=-1;d("#slipHandle").mousedown(function(f){b=parseInt((""+d.style(this,"left")).replace("%",""));a=f.pageX;c=true;});d(document).mouseup(function(){b=-1;a=-1;c=false;});d(document).mousemove(function(h){if(c&&b>-1&&a>-1){var g=parseInt(b+(h.pageX-a));
if(g>=0&&g<=100){var f=(g*2)+"%";d("#slipBar").css("width",g+"%");d("#slipHandle").css("left",g+"%");d("#paperContent").css("font-size",f);d("#slipValue").text(f);}}});}})(Wade);