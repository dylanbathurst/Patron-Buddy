// A function for handling way too much stuff...
// Such as Controller/Tab switching, form submition,
// and the actual api call.
pb.ApiUrl = function(){
  var self = this;
  this.controller = 'Product';
  
  // Sets up the Product Controller Form by default
  this.createInputs(pb[this.controller]);
  
  // This should not be here but while it is it just
  // handles the tabs at the top of the site and the
  // setting of this.controller and triggering the 
  // createInputs method. Damn that's a lot of stuff!
  $('#controllers').click(function(e){
    e.preventDefault();
    if (e.target.href) {
      var target = e.target.innerHTML;
      self.controller = target;
      $(this).find('.current').removeClass('current');
      $(e.target).parent().addClass('current');
      self.createInputs(pb[target]);
    }
  });
  
  $('#inputForm').change(function(e) {
    var target = $(e.target);
    var value = target.val();
    var input = target.prev('input');
    input.val(input.val() + value + ',');
  });

  // Does the necessary preprocessing to all the inputs
  // in the form. Then it creates the api call url and 
  // handles the ajax call and displaying the response
  $('#inputForm').submit(function(e){
    e.preventDefault();
    var formSet = $(this).find('input'),
        output = ['http://api.zappos.com/', self.controller],
        outputStr = '';
        len = formSet.length;
    
    if (formSet.eq(0).val() !== '') {
      pb.controllers.setKey(formSet.eq(0).val());
    } else {
      alert('Wow, hold on! You forgot your API key.');
      return;
    }
    
    for (var i = 1; i <= len-2; i++) {
      var id = formSet.eq(i).attr('id');
      output.push(pb.controllers['check' + id]('#' + id));
    }
    
    output.push(pb.key);
    outputStr = output.join('');
    $('#output').val(outputStr);
    
    $.ajax({
      url: outputStr,
      dataType: 'jsonp',
      // error is not working with zappos api 404s for some reason. hurm...
      error: function(request, error) {
        console.log('shiiaaattt');
      },
      success: function(data){
        // this is where the response object is displayed
        // for the user. I want to add syntax highlighting
        // and here is where that will be implemented.
        var formattedData = JSON.stringify(data, null, " ");
        $('#request').html('<pre><code>' + formattedData + '</code></pre>').slideDown('slow');
        $('#recents').prepend("<li><a target='_blank' href='" + outputStr + "'>" + outputStr + "</a></li>");
        }
    });
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
