(function () {
  $(document).ready(function(){
    setupKeyboardShortcuts();
    setupControllerSwitching();
  });


  // function for switching between controller
  // forms using reyboard shortcuts
  function setupKeyboardShortcuts() {
    var bodyFocus = true;

    // we don't want the form switching when the
    // user types the shortcuts into the form!
    $('#inputForm')
      .focusin(function(){
        bodyFocus = false; 
      })
      .focusout(function(){
        bodyFocus = true;
      })
      .change(function(e) {
        var target = $(e.target);
        var value = target.val();
        var input = target.prev('input');
        input.val(input.val() + value + ',');
      });

    $('body').keypress(function(e){
      if (bodyFocus) {
        switch (e.charCode) {
          case 112: // p
            $('#cProduct').click(); 
            break;
          case 115: // s
            $('#cSearch').click(); 
            break;
          case 105: // i
            $('#cImage').click(); 
            break;
        }
      } 
    });
    
    // adds tips to nav links to show shortcut keys
    $('#controllers a').hover(
      function(e) {
       var text = e.target.innerHTML;
       var firstLetter = text.substr(0,1).toLowerCase();
       $(e.target).parent().append('<span class="shortcut">(' + firstLetter + ')</span>');
      },
      function(e) {
        $(this).parent().find('.shortcut').remove(); 
      }
    );
  }

  function setupControllerSwitching () {
    $('#controllers').click(function(e){
      e.preventDefault();
      if (e.target.href) {
        var target = e.target.innerHTML,
            // New ApiUrl instance
            contlr = new pb.ApiUrl(target);
        $(this).find('.current').removeClass('current');
        $(e.target).parent().addClass('current');
      }
    });
    $('#cSearch').click();
  }

})();
