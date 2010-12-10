(function () {
  $(document).ready(function(){
    var api = new pb.ApiUrl();
    var api2 = new pb.setupFormSubmission('Product');
    setupKeyboardShortcuts();
    setupControllerSwitching();
  });


  // function for switching between controller
  // forms using reyboard shortcuts
  function setupKeyboardShortcuts() {
    var bodyFocus = true;

    // we don't want the form switing when the
    // user types the shortcuts into the form!
    $('#inputForm')
    .focusin(function(){
      bodyFocus = false; 
    })
    .focusout(function(){
      bodyFocus = true;
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
        var target = e.target.innerHTML;
        var searchTest = new pb.setupFormSubmission(target);
        console.log(searchTest);
      }
    });
  }

})();
