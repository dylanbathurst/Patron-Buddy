// Search controller object that contains all 
// the options and possible values for that 
// controller. Hopefully this will be turned
// into an ajax call to get this object.
pb.Search = {
endPoints : [{
"name": "Search",
"endPoint": "/Search",
"request_methods": [ "GET" ],
"outputs": [ "application/json" ],
"parameters": [
  {
    "name": "term",
    "datatype": "string",
    "description": "Returns a list of styles that matches the search term"
  },
  {
    "name": "includes",
    "datatype": "json_array",
    "desciption": "Include specific options",
    "valid_values": [ "results", "currentResultCount", "totalResultCount", "limit", "currentPage", "pageCount", "filters", "facets" ]
  },
  {
    "name": "excludes",
    "datatype": "json_array",
    "description": "Exclude specific options",
    "valid_values": [ "results", "currentResultCount", "totalResultCount", "limit", "currentPage", "pageCount", "filters", "facets" ]
  },
  {
    "name": "sort",
    "datatype": "json_map",
    "description": "Specify the sort order of results",
    "valid_keys": [ "price", "goLiveDate", "productPopularity", "recentSales", "brandNameFacet" ],
    "valid_values": [ "asc", "desc" ]
  },
  {
    "name": "limit",
    "description": "Limit the number of results returned",                    
    "datatype": "int"
  },
  {
    "name": "page",
    "datatype": "int"
  },
  {
    "name": "facets",
    "datatype": "json_list",
    "valid_values": [ "productTypeFacet", "size", "width","color","price","brand" ]

  },
  {
    "name": "filters",
    "datatype": "json_multimap",
    "valid_values": [ "productTypeFacet", "size", "width","color","price","brand" ]
  }
]
}],
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

  formHandler : function(ary) {
    var len = ary.length,
        formValues = {};
    formValues.options = {};

    console.log(ary);
    for (var i = 1; i < len; i++) {
      var key = ary[i].split('=')[0].replace(/^Z/,''),
          value = ary[i].split('=')[1],
          valueSub = value.substring(value.length - 3, value.length);

      switch (key) {
        case 'term':
          formValues[key] = value;
        break;
        case 'limit':
        case 'page':
          if (value) {
            formValues.options[key] = value;
          }
        break;
        default:
          if (valueSub == '%2C') {
            value = value.substring(0, value.length - 3);
          }

          if (value) {
            formValues.options[key] = value.split('%2C');
          }
        break;
      }
    }
    formValues.apiKey = ary[0].split('=')[1];
    return formValues;
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
