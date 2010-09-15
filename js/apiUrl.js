pb.ApiUrl = function(){
  var self = this;
  this.controller = 'Product';
  
  this.createInputs(pb[this.controller]);
  
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
      error: function(request, error) {
        console.log(error);
      },
      success: function(data){
        var formattedData = JSON.stringify(data, null, " ");
        $('#request').html('<pre><code>' + formattedData + '</code></pre>').slideDown('slow');
        $('#recents').prepend("<li><a target='_blank' href='" + outputStr + "'>" + outputStr + "</a></li>");
        }
    });
  });
  
};

// Helper function to take form comma delimited values and split them out
pb.splitCommas = function(value, separator){
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
        inputs.push('<label for="Z', key, '">', key, ': </label><input type="text" class="', format, '" name="Z', key, '" value="" id="Z', key, '" />');
      } else {
        var size = value.length;
        for (var e = 0; e < size; e++) {
          // console.log(value[e]);
        }
      }
    }
  }
  $('#optionsHook').hide().html(inputs.join('')).slideDown('fast');  
};
