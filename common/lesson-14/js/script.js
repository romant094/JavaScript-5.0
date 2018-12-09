$(document).ready(function() { //Ждет полной загрузки страницы

    function modalToggle() {
        $('.overlay').fadeToggle('slow');
        $('.modal').slideToggle('slow');
    }

    $('.main_btna, .main_btn, nav a:eq(1)').on('click', modalToggle);
    
    $('.close').on('click', modalToggle);

});