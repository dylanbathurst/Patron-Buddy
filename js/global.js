
//////STOLEN FROM ZAPPOS.COM Z OBJECT///////
////////////////////////////////////////////
////////////////////////\\\/////////////////
///////\\\\\\\\\\\\/////\\\/////////////////
///////\\\//////\\\/////\\\/////////////////
///////\\\//////\\\/////\\\/////////////////
///////\\\//////\\\/////\\\\\\\\\\\\////////
///////\\\\\\\\\\\\/////\\\//////\\\////////
///////\\\//////////////\\\//////\\\////////
///////\\\//////////////\\\//////\\\////////
///////\\\//////////////\\\\\\\\\\\\////////
///////\\\//////////////////////////////////
////////////////////////////////////////////
///////////NAMESPACE THAT SHIT//////////////

var pb = {};

// controllers object in the main pb object
// is my attempt at a module type system for 
// the different controllers. All controller
// methods go on this object.
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
