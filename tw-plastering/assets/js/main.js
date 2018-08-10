jQuery(document).ready(function($) {

    $.fancybox.open({
        src  : '#modal-popup-2',
        type : 'inline',
        opts : {
            closeClickOutside : false,
            closeBtn   : false
        }
    });

    /*---------------------------
                                  Close login form on submit
    ---------------------------*/
    $('form[name=loginForm]').on('submit', function(event){
        event.preventDefault();
        $.fancybox.close();
    });

    $(".job-tabs__nav li a").each(function() {
        alert();
        $(this).click(function(event) {
                event.preventDefault(); 
                var tabHref = $(this).attr('href');
                var tabHref = tabHref.split('-');
                var tabContent = document.getElementById('tabs-' + tabHref[1]);
                tabContent.style.display = 'block';
                $(this).parent().addClass('selected');
                $(this).parent().siblings().removeClass('selected');                     
                $(tabContent).siblings().css('display','none'); 
        });
    });

    /*---------------------------
                                  Fancybox
    ---------------------------*/
    $('.fancybox').fancybox({
    });


    $('#contractor-checkbox').on('change', function(event) {
        event.preventDefault();
        if ( $(this).is(':checked') ) {
            $.fancybox.open([
                {
                    src  : '#modal-popup',
                    type: 'inline',
                    opts : {
                        afterClose: function(){
                            $('#contractor-checkbox').prop('checked', false);
                        }
                    }
                }
            ], {
                loop : false
            });
        } 
    });


    /*---------------------------
                                  Datepicker
    ---------------------------*/
    $('.datepicker').datepicker( {
        minDate: 0,
        dateFormat: "dd/mm/yy",
    } );

    $('a.list__item__value').click(function(event){
        event.preventDefault();
        if (! $(this).hasClass('input-active')) {
            $(this).addClass('input-active');
            var name = $(this).text();
            $(this).html('');
            $('<input></input>')
                .attr({
                    'type': 'text',
                    'name': 'fname',
                    'id': 'txt_fullname',
                    'value': ' ' + name
                })
                .appendTo(this);
            $('#txt_fullname').focus();
        }
    });

    $(document).on('blur', '#txt_fullname', function(){
        var name = $(this).val();
        $('#txt_fullname').parent().removeClass('input-active').text(name);
    });


}); // end file