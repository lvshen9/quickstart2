(function(b){var a=b.seriesTypes,c=b.each;a.heatmap=b.extendClass(a.map,{colorKey:"z",pointArrayMap:["y","z"],translate:function(){var e=this,d=e.options,g=Number.MAX_VALUE,f=Number.MIN_VALUE;e.generatePoints();c(e.data,function(i){var h=i.x,m=i.y,l=i.z,k=(d.colsize||1)/2,j=(d.rowsize||1)/2;i.path=["M",h-k,m-j,"L",h+k,m-j,"L",h+k,m+j,"L",h-k,m+j,"Z"];
i.shapeType="path";i.shapeArgs={d:e.translatePath(i.path)};if(typeof l==="number"){if(l>f){f=l;}else{if(l<g){g=l;}}}});e.translateColors(g,f);},getBox:function(){}});}(Highcharts));