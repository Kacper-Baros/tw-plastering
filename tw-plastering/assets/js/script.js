$(document).ready(function () {
    $(".job-tabs__nav li a").each(function () {
        $(this).click(function (event) {
            $(this).parent().parent().find('.selected').removeClass('selected');
            $(this).parent().addClass('selected');
        });
    });

})
