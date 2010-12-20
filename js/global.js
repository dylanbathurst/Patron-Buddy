
//////STOLEN FROM ZAPPOS.COM Z OBJECT///////
////////////////////////////////////////////
////////////////////////\\\/////////////////
///////\\\\\\\\\\\\/////\\\/////////////////
///////\\\//////\\\/////\\\/////////////////
///////\\\//////\\\/////\\\/////////////////
///////\\\//////\\\/////\\\\\\\\\\\\////////
///////\\\\\\\\\\\\/////\\\//////\\\////////
///////\\\//////////////\\\//////\\\////////
///////\\\//////////////\\\//////\\\////////
///////\\\//////////////\\\\\\\\\\\\////////
///////\\\//////////////////////////////////
////////////////////////////////////////////
///////////NAMESPACE THAT SHIT//////////////

var pb = {};

// controllers object in the main pb object
// is my attempt at a module type system for 
// the different controllers. All controller
// methods go on this object.
pb.controllers = {
  // These common functions are shared amongst multiple
  // controllers so I added them here do reduce duplication
  setKey : function(key){
    pb.key = '&key=' + key;
  },
  checkZincludes : function(id){
    if ($(id).val()) {
      return '&includes=[' + pb.splitCommas($(id).val(), ',') + ']';
    }
  },
  checkZexcludes : function(id){
    if ($(id).val()) {
      return '&excludes=[' + pb.splitCommas($(id).val(), ',') + ']';
    }
  }
};

// Helper function to take form comma delimited values and split them out
pb.splitCommas = function(value, separator){
  var lastComma = value.length;
  if (value[value.length - 1] == ',') {
    value = value.substr(0,value.length - 1); 
  }
  var spArray = value.split(',');
  var last = '"' + separator + '"';
  var spString = '"';
  var len = spArray.length;
  for (var i = 0; i < len; i++) {
    if (i === len - 1) {
      last = '';
    }
    spString += spArray[i] + last;
  }
  spString += '"';
  return spString;
};

// Helper function that takes the controller object as an argument and creates
// form inputs and inserts them into the DOM
pb.createInputs = function(controllerObj) {
  var dynamicOptions = $('#searchOptions'),
      inputs = [],
      data = controllerObj.endPoints[0].parameters,
      len = data.length;
  
  for (var i = 0; i < len; i++) {
    var value = data[i],
        format = null;
    
    switch (value.datatype) {
      case 'string':
      case 'int':
        format = 'single';
        break;
      case 'json_array':
        format = 'comma';
        break;
      case 'json_map':
      case 'json_multimap':
        format = 'complex';
        break;
    }
    
    inputs.push('<label for="Z', value.name, '">', value.name, ': </label><input tabindex="', i + 1, '" type="text" class="', format, '" name="Z', value.name, '" value="" id="Z', value.name, '" />');

    if (value.valid_keys) {
      var keyBuffer = ['<select tabindex="', i + 1, '"><option value="">Keys</option>'];
      var vlen = value.valid_keys.length;
      var key = value.valid_keys;
      for (var o = 0; o < vlen; o++) {
        keyBuffer.push('<option value="', key[o], '">', key[o], '</option>');
      }
      keyBuffer.push('</select>');
      inputs.push(keyBuffer.join(''));
    }

    if (value.valid_values) {

      // This area is for displaying the possible
      // values that are available for each input
      var buffer = ['<select tabindex="', i + 1, '"><option value="">Values</option>'];
      var size = value.valid_values.length;
      var option = value.valid_values;

      for (var e = 0; e < size; e++) {
        buffer.push('<option value="', option[e], '">', option[e], '</option>');
      }
      buffer.push('</select>');
      inputs.push(buffer.join(''));
    }
  }
  $('#optionsHook').hide().html(inputs.join('')).slideDown('fast');  
};
