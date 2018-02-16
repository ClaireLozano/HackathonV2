$(document).ready(function(){
  function init() {

  }
  init();
});

function addInput(){

  addInputElement("keyListInput", "table_dataComposition_keys_list[]");
  addInputElement("valueListInput", "table_dataComposition_value_list[]" );

}

function addInputElement(elementInput, id){
  var inputDiv = document.getElementById(elementInput);
  var newInput = document.createElement("INPUT");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("name", id);
  newInput.setAttribute("class","form-control");
  inputDiv.appendChild(newInput);

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

}
