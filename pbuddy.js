$(document).ready(function(){
  var api = new pb.ApiUrl();
});

pb.ApiUrl = function(){
  var self = this;
  this.key = null;
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
      self.checkKey(formSet.eq(0).val());
    } else {
      alert('Wow, hold on! You forgot your API key.');
      return;
    }
    
    for (var i = 1; i <= len-2; i++) {
      var id = formSet.eq(i).attr('id');
      output.push(self['check' + id]('#' + id));
    }
    output.push(self.key);
    outputStr = output.join('');
    $('#output').val(outputStr);
    
    $.ajax({
      url: outputStr,
      dataType: 'jsonp',
      success: function(data){
        var formattedData = JSON.stringify(data, null, " ");
        $('#request').html('<pre>' + formattedData + '</pre>').slideDown('slow');
        $('#recents').prepend("<li><a target='_blank' href='" + outputStr + "'>" + outputStr + "</a></li>");
        }
    });
  });
  
};

pb.ApiUrl.prototype = {
  // Product controller methods
  checkKey : function(key){
    this.key = '&key=' + key;
  },
  checkZid : function(id) {
    if ($(id).val()) {
      return '?id=[' + this.splitCommas($(id).val(), ',') + ']';
    } else {
      this.checkTerm();
    }
  },
  checkZincludes : function(id){
    if ($(id).val()) {
      return '&includes=[' + this.splitCommas($(id).val(), ',') + ']';
    }
  },
  checkZexcludes : function(id){
    if ($(id).val()) {
      return '&excludes=[' + this.splitCommas($(id).val(), ',') + ']';
    }
  },
  // Search controller methods
  checkZterm : function(id) {
    return '?term=' + $(id).val();
  },
  checkZsort : function(id) {
    var val = $(id).val();
    return val !== '' ? '&sort={' + this.splitCommas(val, ':') + '}' : '';
  },
  checkZlimit : function(id) {
    var val = $(id).val();
    return val !== '' ? '&limit=' + val : '';
  },
  checkZpage : function(id) {
    var val = $(id).val();
    return val !== '' ? '&page=' + val : '';
  },
  checkZfacets : function(id) {
    var val = $(id).val();
    return val !== '' ? '&facets=[' + this.splitCommas(val, ',') + ']' : '';
  },
  checkZfilters : function(id) {
    var val = $(id).val();
    if (val !== '') {
      var filters = val.split('/');
      var filterSplit = [];
      var comma = ',';
      var comma2 = ',';
      var len = filters.length;
      for (var i = 0; i < len; i++) {
        if (i == len - 1) {
          comma = '';
        }
        var commaFilter = filters[i].split(',');
        var len2 = commaFilter.length;
        for (var c = 0; c < len2; c++) {
          if (c == len2 - 1) {
            comma2 = '';
          }
          if (c == 0) {
            filterSplit.push('"', commaFilter[0], '":[');
          } else {
            filterSplit.push('"', commaFilter[c], '"' + comma2);
          }
        }
        filterSplit.push(']' + comma);
      }
      
      filterSplit.unshift('&filters={');
      filterSplit.push('}');
      return filterSplit.join('');
    }
  }
};

pb.ApiUrl.prototype.splitCommas = function(value, separator){
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
