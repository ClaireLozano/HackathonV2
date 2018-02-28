$(document).ready(function(){

	function init() {

	}

 	init();
});


var id = 0;
var next = 1;

function addInputKeyWords(){
  // id++;
  // addInputElement("keyListInput", "table_dataComposition_keys_list[]", id);
  // addInputElement("valueListInput", "table_dataComposition_value_list[]", id);
  //// addRemoveButton("removeLine");
}


function addInput(){

      var addto = "#value" + next;
      var addRemove = "#value" + (next);
      next = next + 1;
      var newIn = '<input class="input form-control" id="key' + next + '" name="table_dataComposition_keys_list[]" type="text" placeholder="Mot clé"><input autocomplete="off" class="input form-control" id="value' + next + '" name="table_dataComposition_value_list[]" type="text" placeholder="Valeur">';
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
      var newIn = '<input class="input form-control" id="year' + next + '" name="timeline_dataComposition_year_list[]" type="text" placeholder="Année"><input class="input form-control" id="year_value' + next + '" name="timeline_dataComposition_year_value_list[]" type="text" placeholder="Valeur">';
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
    }
		if (!document.getElementById('type_map').checked) {
				document.getElementById('theMap').style.display = 'none';
		}

    if(document.getElementById('type_graphe').checked){
        document.getElementById('theGraph').style.display = 'block';
     }
		if(!document.getElementById('type_graphe').checked){
 				document.getElementById('theGraph').style.display = 'none';
 		 }

   	if(document.getElementById('type_table').checked){
        document.getElementById('theTable').style.display = 'block';
     }
  	if(!document.getElementById('type_table').checked){
         document.getElementById('theTable').style.display = 'none';
    }

		if (document.getElementById('type_timeline').checked) {
        document.getElementById('theTimeline').style.display = 'block';
    }
		if (!document.getElementById('type_timeline').checked) {
				document.getElementById('theTimeline').style.display = 'none';
		}


}
