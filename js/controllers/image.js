// product controller specific code here
// Eventually I want to make an ajax call to get these
// values, but the functionality currently doesn't exist.
pb.Image = {
  requestInput: [
                          {productId:'array'},
                          {styleId:'array'},
                          {
                            type:'array',
                            values: ['THUMBNAIL','DETAILED','PAIR','DELETED','TOP','BOTTOM','LEFT','BACK','RIGHT','FRONT','CLOSEUP','SWATCH']
                          },
                          {
                            recipe: 'array'
                          },
                          {
                            includes: 'array',
                            values: ['styleId', 'productId', 'type','recipeName','format','filename','colorId','width','height','uploadDate','isHighResolution','tiles']
                          },
                          
                          {
                            excludes: 'array',
                            values: ['styleId', 'productId', 'type','recipeName','format','filename','colorId','width','height','uploadDate','isHighResolution','tiles']
                          }
                         ]
};

// Image controller method
pb.controllers.checkZproductId = function(id) {
  if ($(id).val()) {
    return '?productId=' + $(id).val();
  }
}

pb.controllers.checkZstyleId = function(id) {
  if ($(id).val()) {
    return '?styleId=[' + pb.splitCommas($(id).val(), ',') + ']';
  }
}

pb.controllers.checkZtype = function(id) {
  if ($(id).val()) {
    return '&type=[' + pb.splitCommas($(id).val(), ',') + ']';
  }
}

pb.controllers.checkZrecipe = function(id) {
  if ($(id).val()) {
    return '&recipe=[' + pb.splitCommas($(id).val(), ',') + ']';
  }
}
