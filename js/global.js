var pb = {};
pb.controllers = {
  // These common functions are shared amongst multiple
  // controllers so I added them here do reduce duplication
  setKey : function(key){
    pb.key = '&key=' + key;
  },
  checkZincludes : function(id){
    if ($(id).val()) {
      return '&includes=[' + pb.splitCommas($(id).val(), ',') + ']';
    }
  },
  checkZexcludes : function(id){
    if ($(id).val()) {
      return '&excludes=[' + pb.splitCommas($(id).val(), ',') + ']';
    }
  }
};
