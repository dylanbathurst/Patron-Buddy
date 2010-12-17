// product controller specific code here
// Eventually I want to make an ajax call to get these
// values, but the functionality currently doesn't exist.
pb.Product = {
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
  
  formHandler : function(serial) {
    var len = serial.length,
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
    return formValues;
  }
};

