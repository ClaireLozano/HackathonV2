$(document).ready(function(){
	//Add the input for the table :
	$("#b1").click(function() {
    		var lastField = $("#buildyourform div:last");
        var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
        var fieldWrapper = $("<div class=\"fieldwrapper\" id=\"field" + intId + "\"/>");
        fieldWrapper.data("idx", intId);
        var fName = $("<input type=\"text\" class=\"input form-control\" name=\"table_dataComposition_keys_list[]\" placeholder=\"Mot clé\" required/><input type=\"text\" class=\"input form-control\" name=\"table_dataComposition_value_list[]\" placeholder=\"Valeur\" required/>");
        var removeButton = $("<input type=\"button\" class=\"remove\" value=\"-\" />");
        removeButton.click(function() {
            $(this).parent().remove();
        });
        fieldWrapper.append(fName);
        fieldWrapper.append(removeButton);
        $("#buildyourform").append(fieldWrapper);
    });

		//Add the input for the timeline :
		$("#b_timeline").click(function() {
					var lastField = $("#buildtimeline div:last");
					var intId = (lastField && lastField.length && lastField.data("idx") + 1) || 1;
					var fieldWrapper = $("<div class=\"fieldwrapper\" id=\"field" + intId + "\"/>");
					fieldWrapper.data("idx", intId);
					var fName = $("<input type=\"text\" class=\"input form-control\" name=\"timeline_dataComposition_year_list[]\" placeholder=\"Année\" required/><input type=\"text\" class=\"input form-control\" name=\"timeline_dataComposition_year_value_list[]\" placeholder=\"Valeur de l'année\" required/>");
					var removeButton = $("<input type=\"button\" class=\"remove\" value=\"-\" />");
					removeButton.click(function() {
							$(this).parent().remove();
					});
					fieldWrapper.append(fName);
					fieldWrapper.append(removeButton);
					$("#buildtimeline").append(fieldWrapper);
			});


	function init() {
	}

 	init();
});


function atleast_onecheckbox(e) {
  if ($("input[type=checkbox]:checked").length === 0) {
      e.preventDefault();
      alert('Il faut choisir au moins un type de visualisation !');
      return false;
  }
  if(document.getElementById('type_graphe').checked){
		var inputs = document.getElementById('theGraph').getElementsByTagName('input');
		var counter = 0;
		for (var i = 0 ; i < inputs.length ; i++){
			if(inputs[i].checked){
				counter ++;
			}
		}
		if(counter == 0){
			e.preventDefault();
			alert('Il faut choisir au moins un type de graphe !');
			return false;

		}
	}
}

var id = 0;
var next = 1;

function requiredInputs(){
	$("#theGraph :input.form-control").prop('required',true);

}

function dataTypeChoice() {
    if (document.getElementById('type_map').checked) {
        document.getElementById('theMap').style.display = 'block';
				$("#theMap :input.form-control").prop('required',true);

    }
		if (!document.getElementById('type_map').checked) {
				document.getElementById('theMap').style.display = 'none';
				$("#theMap :input.form-control").prop('required',false);

		}

    if(document.getElementById('type_graphe').checked){
        document.getElementById('theGraph').style.display = 'block';
				$("#theGraph :input.form-control").prop('required',true);
     }
		if(!document.getElementById('type_graphe').checked){
 				document.getElementById('theGraph').style.display = 'none';
				$("#theGraph :input.form-control").prop('required',false);
 		 }

   	if(document.getElementById('type_table').checked){
        document.getElementById('theTable').style.display = 'block';
				$("#theTable :input.form-control").prop('required',true);
     }
  	if(!document.getElementById('type_table').checked){
         document.getElementById('theTable').style.display = 'none';
				 $("#theTable :input.form-control").prop('required',false);
    }

		if (document.getElementById('type_timeline').checked) {
        document.getElementById('theTimeline').style.display = 'block';
				$("#theTimeline :input.form-control").prop('required',true);
    }
		if (!document.getElementById('type_timeline').checked) {
				document.getElementById('theTimeline').style.display = 'none';
				$("#theTimeline :input.form-control").prop('required',false);
		}


}

function mapChoice() {
    if (document.getElementById('map_newMap').checked) {
        document.getElementById('new_map').style.display = 'block';
				document.getElementById('kmlFile_map').style.display = 'none';
				$("#new_map :input.form-control").prop('required',true);
				$("#kmlFile_map :input.form-control").prop('required',false);


     }
  	else if(document.getElementById('map_fileKml').checked){
        document.getElementById('kmlFile_map').style.display = 'block';
				document.getElementById('new_map').style.display = 'none';
				$("#kmlFile_map :input.form-control").prop('required',true);
				$("#new_map :input.form-control").prop('required',false);

     }
}

function addDictionary() {
    if (document.getElementById('add_dict').checked) {
        document.getElementById('theDictionary').style.display = 'block';
				$("#theDictionary :input.form-control").prop('required',true);
     }
  	else if(!document.getElementById('map_fileKml').checked){
				document.getElementById('theDictionary').style.display = 'none';
				$("#theDictionary :input.form-control").prop('required',false);
     }
}
