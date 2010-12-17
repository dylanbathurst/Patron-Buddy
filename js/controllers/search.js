// Search controller object that contains all 
// the options and possible values for that 
// controller. Hopefully this will be turned
// into an ajax call to get this object.
pb.Search = {
  requestInput: [
                          {term: 'string'}, 
                          {
                            sort: 'array',
                            values: ['price,asc', 'price,desc', 'goLiveDate,asc', 'goLiveDate,desc', 'productPopularity,asc', 'productPopularity,desc', 'recentSales,asc', 'recentSales,desc', 'brandNameFacet,asc', 'brandNameFacet,desc']
                          }, 
                          {limit: 'integer'},
                          {page: 'integer'},
                          {
                            facets: 'array',
                            values: ['productTypeFacet', 'size', 'width','color','price','brand']
                          },
                          {
                            filters: 'object',
                            values: ['productTypeFacet', 'size', 'width','color','price','brand']
                          },
                          {
                            includes: 'array',
                            values: ['styleId', 'productId', 'colorId', 'brandName', 'productName', 'productUrl', 'thumbnailImageUrl', 'price', 'originalPrice', 'description', 'videoUrl', 'videoFileName', 'videoUploadedDate', 'productRating', 'currentResultCount', 'totalResultCount', 'limit', 'currentPage', 'pageCount', 'filters', 'facets', 'facetField', 'facetFieldDisplayName', 'values', 'name', 'count']
                          },
                          {
                            excludes: 'array',
                            values: ['styleId', 'productId', 'colorId', 'brandName', 'productName', 'productUrl', 'thumbnailImageUrl', 'price', 'originalPrice', 'description', 'videoUrl', 'videoFileName', 'videoUploadedDate', 'productRating', 'currentResultCount', 'totalResultCount', 'limit', 'currentPage', 'pageCount', 'filters', 'facets', 'facetField', 'facetFieldDisplayName', 'values', 'name', 'count']
                          }
                        ],

  formHandler : function() {
  
  }
};

// Adds all Search controller methods to the
// controllers object.
pb.controllers.checkZterm = function(id) {
  return '?term=' + $(id).val();
}

pb.controllers.checkZsort = function(id) {
  var val = $(id).val();
  return val !== '' ? '&sort={' + pb.splitCommas(val, ':') + '}' : '';
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
  return val !== '' ? '&facets=[' + pb.splitCommas(val, ',') + ']' : '';
}

// Filters are a pain in the ass and so this 
// monstrosity loops and doops and finally poops
// out the set filters in a pretty manner.
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
