/*
Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	 config.toolbar = 'standard';
	 config.toolbar_full = [
       ['Save','NewPage','Preview','Print','-','Templates'],
       ['Cut','Copy','Paste','PasteText','PasteFromWord'],
       ['Undo','Redo','-','Find','Replace','-','SelectAll','SpellChecker','Scayt'],
       ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
       '/',
       ['Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat'],
       ['NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote','CreateDiv'],
       ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl'],
       ['Link','Unlink','Anchor'],
       ['Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak','Iframe'],
       '/',
       ['Styles','Format','Font','FontSize'],
       ['TextColor','BGColor'],
	   ['Maximize','ShowBlocks']
     ];
	 config.toolbar_standard = [
        ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll'],
		'/',
		['Bold','Italic','Underline','Strike','-','RemoveFormat'],
        ['NumberedList','BulletedList','-','Outdent','Indent'],
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
        ['Link','Unlink','Flash','Table','HorizontalRule','SpecialChar'],
        '/',
        ['Styles','Format','Font','FontSize'],
		['TextColor','BGColor'],
		['Maximize','ShowBlocks']
    ];
    config.toolbar_text = [
        ['Cut','Copy','Paste','PasteText','PasteFromWord'],
        ['Undo','Redo','-','Find','Replace','-','SelectAll'],
        ['Maximize','ShowBlocks'],
		'/',
		['Bold','Italic','Underline','Strike','-','RemoveFormat'],
        ['NumberedList','BulletedList','-','Outdent','Indent'],
        ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
        ['Link','Unlink','Table','HorizontalRule','SpecialChar'],
        '/',
        ['Styles','Format','Font','FontSize'],
		['TextColor','BGColor']
    ];
	config.toolbar_simple = [
        ['Cut','Copy','Paste','PasteText'],
        ['Undo','Redo'],
		['Bold','Italic','-','RemoveFormat'],
        ['NumberedList','BulletedList'],
        ['Outdent','Indent'],
		['TextColor','BGColor']
    ];
    //'Image',
	//config.language = 'zh-cn';
	config.skin = 'v2';
	// config.uiColor = '#AADC6E';
	/*
	if(config.extraPlugins){
		config.extraPlugins += ','
	}
	config.extraPlugins += 'uploadimage,uploadattach';
	*/
};
