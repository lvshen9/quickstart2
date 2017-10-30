function swfUploadLoaded(){var e=this,a=function(){setFileHint();var a=e.customSettings.file_upload_data,l=e.customSettings.file_urlpath+"/attach?action=query";Wade.beginPageLoading("loading..."),Wade.post(l,"fileId="+a+"&ftpSite="+Wade("#ftpSite").val()+"&filePath="+Wade("#filePath").val()+"&needSuffix="+Wade("#needSuffix").val(),function(e){if(e){var a=Wade.parseJSON(e);if(a.context&&a.context.x_resultcode&&"0"==a.context.x_resultcode){var l=a.data;if(l){var t=Wade("#filetable");if(t){var d=0;Wade.each(l,function(e,a){a.index=e,a.id=a.fileId,a.name=a.fileName,a.size=a.fileSize,a.percent="100",a.oper=Wade.lang["view.web.comp.upload.del"],a.status=a.fileId,a.progress=" e_progress-ok";var l=Wade.format.lowercase(a.fileName.substring(a.fileName.lastIndexOf("."),a.fileName.length));".xls"===l||".xlsx"===l?a.filetype="xls":".doc"===l||".docx"===l?a.filetype="doc":".txt"===l?a.filetype="txt":".xml"===l?a.filetype="xml":".gif"===l||".jpg"===l||".png"===l||".ioc"===l?a.filetype="pic":a.filetype="file",d++,fileTableTemp.append(t,a),setDownloadUrl(a.id,a.id)}),setFileHint(Wade.lang.get("view.web.comp.upload.uploaded",d+" "))}talbe=null,d=null}l=null}a=null}Wade.endPageLoading()},"POST"),l=null};this.customSettings.loadingTimeout=setTimeout(function(){a.call(e)},500)}function fileDialogStart(){var e=Wade("tr",Wade("#filetable")[0]),a=this.getStats();a.successful_uploads=e.length,this.setStats(a),Wade("#bfinish").attr("disabled",!0),Wade("#bclean").attr("disabled",!0)}function fileQueued(e){try{addFileToTable(e)}catch(a){this.debug(a)}}function fileQueueError(e,a,l){try{switch(a){case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:alert(Wade.lang.get("view.web.comp.upload.sizelimit","["+this.settings.file_size_limit+"]"));break;case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:alert(Wade.lang["view.web.comp.upload.size0"]);break;case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:alert(Wade.lang.get("view.web.comp.upload.type",e.type));break;case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:alert(Wade.lang.get("view.web.comp.upload.num","["+this.settings.file_upload_limit+"]"));break;default:alert(Wade.lang["view.web.comp.upload.error"]+l)}}catch(t){this.debug(t)}Wade("#bfinish").attr("disabled",!1),Wade("#bclean").attr("disabled",!1)}function fileDialogComplete(e,a,l){try{this.startUpload()}catch(t){this.debug(t)}0==e&&(Wade("#bfinish").attr("disabled",!1),Wade("#bclean").attr("disabled",!1))}function uploadStart(e){try{setFileHint(e)}catch(a){}return!0}function uploadProgress(e,a,l){try{var t=Math.ceil(a/l*100);e.percent=t,e.loaded=a,e.total=l,changeFileStatus(e)}catch(d){this.debug(d)}}function setDownloadUrl(e,a){var l=Wade("#"+e+"Download"),t=l.attr("fileName"),d="attach?action=download&fileId="+a+"&needSuffix="+Wade("#needSuffix").val()+"&realName="+encodeURIComponent(t);l.attr("href",d)}function uploadSuccess(e,a){var l;try{if(e){var t=e.id;l=Wade.parseJSON(a),Wade("#"+t+"Value").html(l.data.fileId),setDownloadUrl(t,l.data.fileId)}}catch(d){l||(alert(a),Wade("#"+t).remove())}}function uploadError(e,a,l){try{switch(a){case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:alert(Wade.lang["view.web.comp.upload.disconnect"]);break;case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:alert(Wade.lang["view.web.comp.upload.fail"]+l);break;case SWFUpload.UPLOAD_ERROR.IO_ERROR:alert(Wade.lang["view.web.comp.upload.readfail"]+l);break;case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:alert(Wade.lang["view.web.comp.upload.authority"]+l);break;case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:alert(Wade.lang["view.web.comp.upload.content"]+"["+e.name+"]");break;case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:alert(Wade.lang["view.web.comp.upload.verify"]+"["+e.name+"]，"+l);break;case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:alert(Wade.lang.get("view.web.comp.upload.canceled","["+e.name+"]"));break;case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:alert(Wade.lang.get("view.web.comp.upload.stop","["+e.name+"]"))}}catch(t){this.debug(t)}}function uploadComplete(e){}function queueComplete(e){var a=Wade("tr",Wade("#filetable")[0]);setFileHint(Wade.lang.get("view.web.comp.upload.uploaded",a.length+" ")),a=null,Wade("#bfinish").attr("disabled",!1),Wade("#bclean").attr("disabled",!1)}function addFileToTable(e){if(e){var a=Wade("#filetable"),l=Wade.format.lowercase(e.type);".xls"===l||".xlsx"===l?e.filetype="xls":".doc"===l||".docx"===l?e.filetype="doc":".txt"===l?e.filetype="txt":".xml"===l?e.filetype="xml":".gif"===l||".jpg"===l||".png"===l||".ioc"===l?e.filetype="pic":e.filetype="file",e.oper=Wade.lang["view.web.comp.upload.cancel"],e.status="uploading...",e.progress="",fileTableTemp.append(a,e)}}function setFileHint(e){var a=Wade("#fileHint"),l="";l+=parent.Wade.expando!=Wade.expando?"<span class='e_red'>"+Wade.lang["view.web.comp.upload.limit"]+"("+swfu.settings.file_size_limit+")</span>":"<span class='e_red'>"+Wade.lang["view.web.comp.upload.limit"]+"(30M)</span>",e&&(Wade.isObject(e)?(l+=" | <span class='e_red'>",l+=Wade.lang["view.web.comp.upload.uploading"],l+="</span>"):Wade.isString(e)&&(l+=" | <span class='e_red'>"+Wade.lang["view.web.comp.upload.status"],l+=e,l+="</span>")),a.html(l)}function changeFileStatus(e){if(e){var a=e.id,l=100==e.percent,t=Wade("#"+a);t&&t.length>0&&(Wade("#"+a+"Size",t[0]).html(e.size),Wade("#"+a+"Progress",t[0]).attr("class",l?"e_progress e_progress-ok":"e_progress"),Wade("#"+a+"Percent1",t[0]).css("width",e.percent+"%"),Wade("#"+a+"Percent2",t[0]).html(e.percent+"%"),Wade("#"+a+"Delete",t[0]).html(l?Wade.lang["view.web.comp.upload.del"]:Wade.lang["view.web.comp.upload.cancel"]))}}function deleteFileFromTable(e){var a=Wade("#"+e);if(swfu&&a&&a.length>0){var l=Wade("#"+e+"Delete");if(l&&l.length>0){if(l.html()==Wade.lang["view.web.comp.upload.del"]){var t=Wade("#"+e+"Value").html();Wade("#delData").val(Wade("#delData").val()+t+","),a.remove()}else l.html()==Wade.lang["view.web.comp.upload.cancel"]&&(swfu.cancelUpload(e,!1),a.remove());setFileHint(Wade.lang.get("view.web.comp.upload.uploaded",Wade("tr",Wade("#filetable")[0]).length+" "))}l=null}a=null}function destroyUpload(){swfu&&(swfu.destroy(),swfu=null),fileTableTemp&&(fileTableTemp=null)}function finishUploadFiles(){setReturnUploadFiles(),handleData("ok"),parent.Wade.closeFileUpload&&parent.Wade.closeFileUpload()}function cancelUploadFiles(){cleanUpload(),handleData("cancel"),parent.Wade.closeFileUpload&&parent.Wade.closeFileUpload()}function setReturnUploadFiles(){var e={},a=Wade("#filetable"),l="",t=0;Wade("tr",a[0]).each(function(){var e=Wade("#"+Wade(this).attr("id")+"Value",this).html();e&&"uploading..."!=e&&(l+=e+",",t++)}),l&&""!=l&&(l=l.substring(0,l.length-1)),e.fieldId=swfu.customSettings.file_field_id,e.size=t,e.fileData=l,a=null,t=null,l=null,parent.Wade.setFileUploadReturnValue&&parent.Wade.setFileUploadReturnValue(e),e=null}function cleanUploadFiles(){cleanUpload();var e=Wade("#afterAction").val();e&&Wade.isFunction(parent.window[e])&&parent.window[e].call(parent,"clean")}function cleanUpload(){var e=Wade("#filetable");Wade("tr",e[0]).each(function(){var e=Wade("#"+Wade(this).attr("id")+"Value").html();Wade("#delData").val(Wade("#delData").val()+e+","),Wade(this).remove()}),setFileHint(Wade.lang.get("view.web.comp.upload.uploaded","0 "))}function handleData(e){var a="";if("ok"==e){if("true"==Wade("#fileDelete").val())a=Wade("#delData").val();else if(Wade("#delData").val())for(var l=Wade("#delData").val().split(","),t=Wade("#fileData").val().split(","),d=0;d<l.length;d++)t.contains(l[d])||(a+=l[d]+",")}else if("cancel"==e)for(var l=Wade("#delData").val().split(","),t=Wade("#fileData").val().split(","),d=0;d<l.length;d++)l[d]&&!t.contains(l[d])&&(a+=l[d]+",");a&&a.length>0&&(a=a.substring(0,a.length-1),Wade.post("attach?action=delete","fileId="+a,function(e){},"POST"));var i=Wade("#afterAction").val();i&&Wade.isFunction(parent.window[i])&&parent.window[i].call(parent,e)}var fileTableTemp=Wade.Template('<tr id={id} index={index}><td id="{id}Value">{status}</td><td class="wrap"><i class="e_ico-{filetype}"></i><a id="{id}Download" href="javascript:void(0);" fileName="{name}">{name}</a></td><td class="e_left" id="{id}Size">{size}</td><td class="e_center"><span id="{id}Progress" class="e_progress {progress}"><span id="{id}Percent1" class="e_progressBar" style="width:{percent}%;"></span><span id="{id}Percent2" class="e_progressValue">{percent}%</span></span></td><td class="fn e_center"><a href="javascript:void(0);" id="{id}Delete" onclick="deleteFileFromTable(\'{id}\')">{oper}</a></td></tr>'),swfu;SWFUpload.onload=function(){var e={flash_url:"v4/component/upload/swfupload.swf",flash9_url:"v4/component/upload/swfupload_fp9.swf",upload_url:"attach?action=upload&random="+Math.random()+"&ftpSite="+Wade("#ftpSite").val()+"&filePath="+Wade("#filePath").val()+"&needSuffix="+Wade("#needSuffix").val(),file_size_limit:Wade("#fileSize").val()+" MB",file_types:Wade("#fileTypes").val(),file_types_description:Wade("#fileTypesDesc").val(),file_upload_limit:parseInt(Wade("#fileLimit").val()),file_queue_limit:0,button_placeholder_id:"bupload",button_width:84,button_height:23,button_image_url:"v4/ecl/base/button-upload"+Wade.lang["view.web.comp.upload.image"]+".png",custom_settings:{file_delete_ids:"file_delete_ids",file_field_id:Wade("#uploadField").val(),file_upload_data:Wade("#fileData").val(),file_urlpath:Wade("#urlpath").val().substring(0,Wade("#urlpath").val().lastIndexOf("/"))},button_window_mode:SWFUpload.WINDOW_MODE.TRANSPARENT,button_cursor:SWFUpload.CURSOR.HAND,swfupload_loaded_handler:swfUploadLoaded,file_dialog_start_handler:fileDialogStart,file_queued_handler:fileQueued,file_queue_error_handler:fileQueueError,file_dialog_complete_handler:fileDialogComplete,upload_start_handler:uploadStart,upload_progress_handler:uploadProgress,upload_error_handler:uploadError,upload_success_handler:uploadSuccess,upload_complete_handler:uploadComplete,queue_complete_handler:queueComplete};swfu=new SWFUpload(e)};