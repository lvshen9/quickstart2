if(typeof(ElementDateChoice)=="undefined"){
	window["ElementDateChoice"]=function(){
		
	};
	var elementDateChoice = new ElementDateChoice();
}

(function(){
	$.extend(ElementDateChoice.prototype,{
		getChoiceInfo: function(){	
			var choiceInfo = new $.DataMap();
			var editMode = $('#CHOICE_EDIT_MODE').val();
			if(editMode == '1')
			{
				choiceInfo.put('START_DATE', $('#CHOICE_ENABLE_TAG').val());
				choiceInfo.put('END_DATE', '');
			}
			else if(editMode == '2')
			{
				choiceInfo.put('END_DATE', $('#CHOICE_END_DATE').val());
				choiceInfo.put('START_DATE', '');
				
			}
			
			return choiceInfo;
		},
		changeEditMode: function(){
			$("#choiceEditDate li[tag=1]").css("display","none");
			$("#choiceEditDate li[tag=2]").css("display","none");
			var editMode = $('#CHOICE_EDIT_MODE').val();
			
			$("#choiceEditDate li[tag="+editMode+"]").css("display","");
		}
	});
})();