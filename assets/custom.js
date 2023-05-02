
let interval = setInterval(function(){
    if($('.hulkapps_check_option input.hulkapps_option_child').length > 0){
        $('.hulkapps_option_value').on('change',function(){
            $('.hulkapps_check_option').removeClass('selected')
            $('.hulkapps_check_option .hulkapps_option_child:checked ').parent().addClass('selected')
        })
    }
},500)