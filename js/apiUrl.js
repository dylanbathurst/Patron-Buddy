
pb.ApiUrl = function(controller){
  var self = this;
  this.form = $('#inputForm');
  this.controller = controller;

  pb.createInputs(pb[this.controller]);
  
  this.form.unbind('submit').submit(function(e){
    e.preventDefault();
    $('#request').slideUp('fast');
    var serialArray = self.form.serialize().split('&');
    
    var formObject = pb[self.controller].formHandler(serialArray);
    console.log(formObject);

    zappos.key = formObject.apiKey;

    formObject.callback = function (res) {
        var formattedData = JSON.stringify(res, null, " ");
        $('#request').html('<pre><code>' + formattedData + '</code></pre>').slideDown('fast');
    };

    zappos[self.controller.toLowerCase()](formObject);
  });
};
