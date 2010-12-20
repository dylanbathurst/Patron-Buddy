// product controller specific code here
// Eventually I want to make an ajax call to get these
// values, but the functionality currently doesn't exist.
pb.Product = {
"endPoints": [
  {
  "name": "Product",
  "endPoint": "/Product",
  "request_methods": [ "GET" ],
  "outputs": [ "application/json" ],
  "description": "Gets some product information. What? Yeah! OK!",
  "parameters": [
  {
    "name": "id",
    "datatype": "json_array",
    "description": "The id of the product you would like to look up",
    "required": "yes"
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
    "desciption": "Exclude specific options",
    "valid_values": [ "results", "currentResultCount", "totalResultCount", "limit", "currentPage", "pageCount", "filters", "facets" ]
  }
  ]
}],

  requestInput: [
                          {id:'array'},
                          {
                            includes: 'array',
                            values: ['productId', 'brandName','brandId','productName','defaultProductUrl','defaultImageUrl','rootProductType','productType','description','gender','weight','videoFileName','videoUrl','videoUploadedDate','sizeFit','widthFit','archFit','productRating','styles','styleId','styleId','color','originalPrice','price','productUrl','imageUrl','thumbnailImageUrl','goLiveDate','productId','stocks','stockId','size','width','onHand','sizeId','widthId','sortedSizes','sortedWidths','isNew']
                          },
                          
                          {
                            excludes: 'array',
                            values: ['productId', 'brandName','brandId','productName','defaultProductUrl','defaultImageUrl','rootProductType','productType','description','gender','weight','videoFileName','videoUrl','videoUploadedDate','sizeFit','widthFit','archFit','productRating','-styles','-styleId','-styleId','-color','-originalPrice','-price','-productUrl','-imageUrl','-thumbnailImageUrl','-goLiveDate','-productId','--stocks','--stockId','--size','--width','--onHand','--sizeId','--widthId','sortedSizes','sortedWidths','isNew']
                          }
                         ],
  
  formHandler : function(ary) {
    var len = ary.length,
        formValues = {};
    formValues.options = {};

    // Loop through form values and put them 
    // in an object to pass to PatronJS
    for (var i = 0; i < len; i++) {

      var key = ary[i].split('=')[0],
          value = ary[i].split('=')[1],
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
    return formValues;
  }
};

