var pb = {};
// product controller specific code here
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