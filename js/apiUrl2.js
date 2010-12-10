pb.setupFormSubmission = function (controller) {
  var self = this;
  this.controller = controller;
  this.form = $('#inputForm');
  
  self[this.controller]();
}

pb.setupFormSubmission.prototype = {
  Product : function () {
    var self = this;
    this.form.submit(function (e) {
      var serial = self.form.serialize().split('&'),
          len = serial.length,
          formValues = {};
      formValues.options = {};


      // Loop through form values and put them 
      // in an object to pass to PatronJS
      for (var i = 0; i < len; i++) {

        var key = serial[i].split('=')[0],
            value = serial[i].split('=')[1],
            valueSub = value.substring(value.length - 3, value.length);

        if (valueSub == '%2C') {
          value = value.substring(0, value.length - 3);
        }

        if (value && key !== 'apiKey') {
          formValues.options[key.replace(/^Z/,'')] = value.split('%2C');
        } else if (key == 'apiKey') {
          formValues[key] = value.split('%2C');
        }

      }
      zappos.key = formValues.apiKey;

      // Make PatronJS Product call
      zappos.product(formValues, function (res) {
        //console.log(res);
      });
    });
  },

  Search : function () {
    var self = this;
    this.form.submit(function (e) {
      var serial = self.form.serialize().split('&'),
          len = serial.length,
          formValues = {};
      formValues.options = {};
      
      for (var i = 0; i < len; i++) {
        var key = serial[i].split('=')[0],
            value = serial[i].split('=')[1],
            valueSub = value.substring(value.length - 3, value.length);

        if (valueSub == '%2C') {
          value = value.substring(0, value.length - 3);
        }

        if (value && key !== 'apiKey') {
          formValues.options[key.replace(/^Z/,'')] = value.split('%2C');
        } else if (key == 'apiKey') {
          formValues[key] = value.split('%2C');
        }

      }
      console.log(formValues);
      zappos.key = formValues.apiKey;

    });
  }
};
