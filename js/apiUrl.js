// A function for handling way too much stuff...
// Such as Controller/Tab switching, form submition,
// and the actual api call.
pb.ApiUrl = function(controller){
  var self = this;
  this.form = $('#inputForm');
  this.controller = controller;

  // Sets up the Product Controller Form by default
  self.createInputs(pb[this.controller]);
  
  // Does the necessary preprocessing to all the inputs
  // in the form. Then it creates the api call url and 
  // handles the ajax call and displaying the response
  this.form.submit(function(e){
    e.preventDefault();
    $('#request').slideUp('fast');
    var serial = self.form.serialize().split('&');
    
    var formObject = pb[self.controller].formHandler(serial);

    zappos.key = formObject.apiKey;
    // Make PatronJS Product call
    formObject.callback = function (res) {
        var formattedData = JSON.stringify(res, null, " ");
        $('#request').html('<pre><code>' + formattedData + '</code></pre>').slideDown('fast');
    };

    zappos[self.controller.toLowerCase()](formObject);
  });
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
pb.ApiUrl.prototype.createInputs = function(controllerObj) {
  var dynamicOptions = $('#searchOptions'),
      inputs = [],
      data = controllerObj.requestInput,
      len = controllerObj.requestInput.length;
  
  for (var i = 0; i < len; i++) {
    for (var key in data[i]) {
      var value = data[i][key],
          format = null;
      
      switch (value) {
        case 'string':
          format = 'single';
          break;
        case 'array':
          format = 'comma';
          break;
        case 'object':
          format = 'complex';
          break;
      }
      
      if (key !== 'values') {
        inputs.push('<label for="Z', key, '">', key, ': </label><input tabindex="', i + 1, '" type="text" class="', format, '" name="Z', key, '" value="" id="Z', key, '" />');
      } else {
        // This area is for displaying the possible
        // values that are available for each input
        var buffer = ['<select tabindex="', i + 1, '"><option value="">Values</option>'];
        var size = value.length;
         for (var e = 0; e < size; e++) {
          buffer.push('<option value="', value[e], '">', value[e], '</option>');
        }
        buffer.push('</select>');
        inputs.push(buffer.join(''));
      }
    }
  }
  $('#optionsHook').hide().html(inputs.join('')).slideDown('fast');  
};
