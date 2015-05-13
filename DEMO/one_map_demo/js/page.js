$('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );

//$('.button-collapse').click(function(){
//    if($('.button-collapse')[0].className.indexOf('button-collapse-show') > 0){
//        $('#slide-out').removeClass('side-nav-show');
//        $('.button-collapse').removeClass('button-collapse-show');
//    }else{
//        $('#slide-out').addClass('side-nav-show');
//        $('.button-collapse').addClass('button-collapse-show');
//    }
//});