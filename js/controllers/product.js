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
                         ]
};

// Product controller method
pb.controllers.checkZid = function(id) {
  if ($(id).val()) {
    return '?id=[' + pb.splitCommas($(id).val(), ',') + ']';
  }
}
