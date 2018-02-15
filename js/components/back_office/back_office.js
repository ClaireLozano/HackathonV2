$(document).ready(function(){
  function init() {

  }
  init();
});

function addInput(){
  var inputDiv = document.getElementById('keyListInput');
  var newInput = document.createElement("INPUT");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("name", "table_dataComposition_keys_list[]");
  newInput.setAttribute("class","form-control");
  inputDiv.appendChild(newInput);
}
