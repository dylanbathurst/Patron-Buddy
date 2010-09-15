// search controller specific code here
pb.Search = {
  requestInput: [
                          {term: 'string'}, 
                          {
                            sort: 'array',
                            values: ['newest', 'price', 'popular']
                          }, 
                          {limit: 'integer'},
                          {page: 'integer'},
                          {
                            facets: 'array',
                            values: ['productType', 'size', 'width']
                          },
                          {
                            filters: 'object',
                            values: ['productType', 'size', 'width']
                          },
                          {
                            includes: 'array',
                            values: ['styles', 'color']
                          },
                          {
                            excludes: 'array',
                            values: ['styles', 'color']
                          }
                        ]
};

pb.controllers.checkZterm = function(id) {
  return '?term=' + $(id).val();
}

pb.controllers.checkZsort = function(id) {
  var val = $(id).val();
  return val !== '' ? '&sort={' + pb.ApiUrl.splitCommas(val, ':') + '}' : '';
}

pb.controllers.checkZlimit = function(id) {
  var val = $(id).val();
  return val !== '' ? '&limit=' + val : '';
}

pb.controllers.checkZpage = function(id) {
  var val = $(id).val();
  return val !== '' ? '&page=' + val : '';
}

pb.controllers.checkZfacets = function(id) {
  var val = $(id).val();
  return val !== '' ? '&facets=[' + pb.ApiUrl.splitCommas(val, ',') + ']' : '';
}

pb.controllers.checkZfilters = function(id) {
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
