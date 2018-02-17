$(document).ready(function(){

  var next = 1;
   // $(".add-more").click(function(e){
   //    // e.preventDefault();
   //     var addto = "#field" + next;
   //     var addRemove = "#field" + (next);
   //     next = next + 1;
   //     var newIn = '<input autocomplete="off" class="input form-control" id="field' + next + '" name="table_dataComposition_keys_list[]" type="text">';
   //     var newInput = $(newIn);
   //     var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">';
   //     var removeButton = $(removeBtn);
   //     $(addto).after(newInput);
   //     $(addRemove).after(removeButton);
   //     $("#field" + next).attr('data-source',$(addto).attr('data-source'));
   //     $("#count").val(next);
   //
   //         $('.remove-me').click(function(e){
   //             //e.preventDefault();
   //             var fieldNum = this.id.charAt(this.id.length-1);
   //             var fieldID = "#field" + fieldNum;
   //             $(this).remove();
   //             $(fieldID).remove();
   //         });
   // });
   //
	function init() {

	}

 	init();
});


var id = 0;
var next = 1;

function addInputKeyWords(){
  var addto = "#valueListInput" + next;
  var addRemove = "#valueListInput" + (next);
  next = next + 1;
  var newIn = '<input autocomplete="off" class="input form-control" id="valueListInput' + next + '" name="table_dataComposition_value_list[]" type="text">';
  var newInput = $(newIn);
  var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="valueListInput">';
  var removeButton = $(removeBtn);
  $(addto).after(newInput);
  $(addRemove).after(removeButton);
  $("#valueListInput" + next).attr('data-source',$(addto).attr('data-source'));
  $("#count").val(next);

      $('.remove-me').click(function(e){
        //  e.preventDefault();
          var fieldNum = this.id.charAt(this.id.length-1);
          var fieldID = "#valueListInput" + fieldNum;
          $(this).remove();
          $(fieldID).remove();
      });
}

function addInput(){

      var addto = "#value" + next;
      var addRemove = "#value" + (next);
      next = next + 1;
      var newIn = '<input autocomplete="off" class="input form-control" id="key' + next + '" name="table_dataComposition_keys_list[]" type="text" placeholder="Mot clé"><input autocomplete="off" class="input form-control" id="value' + next + '" name="table_dataComposition_value_list[]" type="text" placeholder="Valeur">';
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
  // });

  // id++;
  // addInputElement("keyListInput", "table_dataComposition_keys_list[]", id);
  // addInputElement("valueListInput", "table_dataComposition_value_list[]", id);
  //// addRemoveButton("removeLine");

}


// function removeElement(elementId) {
//     // Removes an element from the document
//     var element = document.getElementById(elementId);
//     element.parentNode.removeChild(element);
// }


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
    if (document.getElementById('nH_L').checked) {
        document.getElementById('theMap').style.display = 'block';
        document.getElementById('theGraph').style.display = 'block';
        document.getElementById('theTable').style.display = 'block';
    }
    else if(document.getElementById('h_NL').checked){
        document.getElementById('theMap').style.display = 'none';
        document.getElementById('theGraph').style.display = 'none';
        document.getElementById('theTable').style.display = 'block';
     }
     else if(document.getElementById('nH_nL').checked){
        document.getElementById('theMap').style.display = 'none';
        document.getElementById('theGraph').style.display = 'none';
        document.getElementById('theTable').style.display = 'block';
     }
     else if(document.getElementById('h_l').checked){
        document.getElementById('theMap').style.display = 'block';
        document.getElementById('theGraph').style.display = 'block';
        document.getElementById('theTable').style.display = 'block';
     }
     else if(document.getElementById('loc').checked){
        document.getElementById('theMap').style.display = 'block';
        document.getElementById('theGraph').style.display = 'block';
        document.getElementById('theTable').style.display = 'block';
     }

}
