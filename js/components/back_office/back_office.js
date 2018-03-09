$(document).ready(function(){

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
}


var id = 0;
var next = 1;

function addInputKeyWords(){
  // id++;
  // addInputElement("keyListInput", "table_dataComposition_keys_list[]", id);
  // addInputElement("valueListInput", "table_dataComposition_value_list[]", id);
  //// addRemoveButton("removeLine");
}

function requiredInputs(){
	// theElement = document.getElementById('theGraph');
	$("#theGraph :input.form-control").prop('required',true);

}

function addInput(){

      var addto = "#value" + next;
      var addRemove = "#value" + (next);
      next = next + 1;
      var newIn = '<input class="input form-control" id="key' + next + '" name="table_dataComposition_keys_list[]" type="text" placeholder="Mot clé" required><input autocomplete="off" class="input form-control" id="value' + next + '" name="table_dataComposition_value_list[]" type="text" placeholder="Valeur" required>';
      var newInput = $(newIn);
      var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="key">';
      var removeButton = $(removeBtn);
      $(addto).after(newInput);
      $(addRemove).after(removeButton);
      $("#value" + next).attr('data-source',$(addto).attr('data-source'));
      $("#count").val(next);

          $('.remove-me').click(function(e){
            //  e.preventDefault();
              var keyNum = this.id.charAt(this.id.length-1);
              var keyID = "#key" + keyNum;
              var valueNum = this.id.charAt(this.id.length-1);
              var valueID = "#value" + valueNum;
              $(this).remove();
              $(keyID).remove();
              $(valueID).remove();
          });

}

function addInput_timeline(){

      var addto = "#year_value" + next;
      var addRemove = "#year_value" + (next);
      next = next + 1;
      var newIn = '<input class="input form-control" id="year' + next + '" name="timeline_dataComposition_year_list[]" type="text" placeholder="Année" required><input class="input form-control" id="year_value' + next + '" name="timeline_dataComposition_year_value_list[]" type="text" placeholder="Valeur" required>';
      var newInput = $(newIn);
      var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="key">';
      var removeButton = $(removeBtn);
      $(addto).after(newInput);
      $(addRemove).after(removeButton);
      $("#year" + next).attr('data-source',$(addto).attr('data-source'));
      $("#count").val(next);

          $('.remove-me').click(function(e){
            //  e.preventDefault();
              var keyNum = this.id.charAt(this.id.length-1);
              var keyID = "#year" + keyNum;
              var valueNum = this.id.charAt(this.id.length-1);
              var valueID = "#year_value" + valueNum;
              $(this).remove();
              $(keyID).remove();
              $(valueID).remove();
          });

}

function addInputElement(elementInput, inputName, id){
  var inputDiv = document.getElementById(elementInput);
  var newInput = document.createElement("INPUT");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("name", inputName);
  newInput.setAttribute("id", elementInput +"_" + id);
  newInput.setAttribute("class","form-control");
  inputDiv.appendChild(newInput);

  var newButton = document.createElement("INPUT");
  var tmp = elementInput +"_"+id ;
  newButton.setAttribute("type", "button");
  newButton.setAttribute("value", "-");
  newButton.setAttribute("onclick", "removeButton("+tmp+")");
  // newInput.setAttribute("class","form-control");
  inputDiv.appendChild(newButton);

}

function removeButton(elementId){
  console.log(elementId);
  elementId.parentNode.removeChild(elementId);
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
