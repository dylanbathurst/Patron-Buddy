// search controller specific code here
pb.search = {
  'searchRequestInput': [
                          {'term': 'string'}, 
                          {
                            'sort': 'object',
                            'values': ['newest', 'price', 'popular']
                          }, 
                          {'limit': 'integer'},
                          {'page': 'integer'},
                          {
                            'facets': 'array',
                            'values': ['productType', 'size', 'width']
                          },
                          {
                            'filters': 'object',
                            'values': ['productType', 'size', 'width']
                          },
                          {
                            'includes': 'array',
                            'values': ['styles', 'color']
                          },
                          {
                            'excludes': 'array',
                            'values': ['styles', 'color']
                          }
                        ]
};