$(window).scroll(function(){
    if($("#menu").offset().top>56) {
        $("#menu").addClass("nav-color navbar-dark");
    }else{
        $("#menu").removeClass("nav-color navbar-dark");
    }
 });