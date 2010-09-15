// product controller specific code here
// Eventually I want to make an ajax call to get these
// values, but the functionality currently doesn't exist.
pb.Product = {
  requestInput: [
                          {id:'array'},
                          {
                            includes: 'array',
                            values: ['styles', 'color']
                          },
                          {
                            excludes: 'array',
                            values: ['styles', 'color', 'size']
                          }
                         ]
};

// Product controller method
pb.controllers.checkZid = function(id) {
  if ($(id).val()) {
    return '?id=[' + pb.splitCommas($(id).val(), ',') + ']';
  }
}