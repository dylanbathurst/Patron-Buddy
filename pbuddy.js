$(document).ready(function(){
  api = new ApiUrl();
});



var ApiUrl = function(){
  var self = this;
  this.key = null;
  this.controller = $('#controller').val();
  this.ids = '';
  this.includes = '';
  this.excludes = '';
  this.sort = '';
  this.limit = '';
  this.page = '';
  this.facets = '';
  this.filters = '';
  this.searchOn = false;
  
  $('#controller').change(function(){
    self.controller = $('#controller').val();
    if (self.controller == 'Search') {
      $('#idLabel').text('Search Term :');
      $('#productId').attr('id', 'searchTerm');
      $('#searchOptions').show('fast');
      self.searchOn = true;
      
    } else {
      $('#idLabel').text('id(s) : (comma delimited)');
      $('#searchTerm').attr('id', 'productId');
      $('#searchOptions').hide('fast');
      self.searchOn = false;
    }
  });
  
  $('#inputForm').submit(function(e){
    e.preventDefault();
    self.checkKey();
    if (self.key) {
      self.checkIds();
      self.checkIncludes();
      self.checkExcludes();
      
      self.checkSort();
      self.checkLimit();
      self.checkPage();
      self.checkFacets();
      self.checkFilters();
      
      if (self.searchOn) {
        var searchOptions = self.sort + self.limit + self.page + self.facets + self.filters;
      }
      var output = 'http://api.zappos.com/' + 
      self.controller + 
      self.ids + 
      self.includes + 
      self.excludes + 
      (searchOptions || '') +
      self.key + 
      '&callback=?';
      
      $('#output').val(output);
      
      $.ajax({
        url: output,
        dataType: 'jsonp',
        success: function(data){
          var formattedData = JSON.stringify(data, null, " ");
          $('#request').html('<pre>' + formattedData + '</pre>');
          }
      });
      
    } else {
      alert('Wow, hold on! You forgot your API key.');
    }
  });
  
};

ApiUrl.prototype = {
  // Product controller methods
  checkKey : function(){
    this.key = '';
    this.key = '&key=' + $('#apiKey').val();
  },
  checkIds : function() {
    if ($('#productId').val()) {
      this.ids = '?id=[' + this.splitCommas($('#productId').val(), ',') + ']';
    } else {
      this.checkTerm();
    }
  },
  checkIncludes : function(){
    if ($('#includes').val()) {
      this.includes = '&includes=[' + this.splitCommas($('#includes').val(), ',') + ']';
    } else {
      this.includes = '';
    }
  },
  checkExcludes : function(){
    if ($('#excludes').val()) {
      this.excludes = '&excludes=[' + this.splitCommas($('#excludes').val(), ',') + ']';
    } else {
      this.excludes = '';
    }
  },
  // Search controller methods
  checkTerm : function() {
    this.ids = '?term=' + $('#searchTerm').val();
  },
  checkSort : function() {
    var val = $('#sort').val();
    this.sort = val !== '' ? '&sort={' + this.splitCommas(val, ':') + '}' : '';
  },
  checkLimit : function() {
    var val = $('#limit').val();
    this.limit = val !== '' ? '&limit=' + val : '';
  },
  checkPage : function() {
    var val = $('#page').val();
    this.page = val !== '' ? '&page=' + val : '';
  },
  checkFacets : function() {
    var val = $('#facets').val();
    this.facets = val !== '' ? '&facets=[' + this.splitCommas(val, ',') + ']' : '';
  },
  checkFilters : function() {
    var val = $('#filters').val();
    this.facets = val !== '' ? '&filters={' + this.splitCommas(val, ':[') + ']}' : '';
  }
};

ApiUrl.prototype.splitCommas = function(value, separator){
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










