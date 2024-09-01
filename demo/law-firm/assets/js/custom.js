/* ==================================================
	Theme Name: Law Firm Template
    Theme URL: https://www.ogwebsolutions.com/
    Author: OG Websolutions Pvt. Ltd.
    Version:  1.0
===================================================== */

/*==================================================
	Header Fixed
==================================================*/
$(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
        $('header').addClass("sticky");
    } else {
        $('header').removeClass("sticky");
    }
});
var topIMG = "assets/logo/logo.svg";
var sclIMG = "assets/logo/header-logo.svg";

$('img[alt="Header Logo"]').attr("class", "headerLogo")

$(window).scroll(function() {
    var value = $(this).scrollTop();
    if (value > 50)
        $(".headerLogo").attr("src", sclIMG);
    else
        $(".headerLogo").attr("src", topIMG);
});


$(document).ready(function() {

    /*==================================================
        Consultation Form
    ==================================================*/

    if ($("#consultationForm").length) {
        $("#consultationForm").validate({
            errorPlacement: function(error, element) {
                return true;
            },
            rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true
                },
            },
            submitHandler: function(form) {
                var formData = $('#consultationForm').serialize();
                $.ajax({
                    type: 'POST',
                    url: 'assets/php/popup-form.php',
                    dataType: "json",
                    data: formData,
                    success: function(data) {
                        if (data.success) {
                            $('.form-status').addClass('alert alert-success');
                            $('.form-status').text('Your Message Has been Sent Successfully');
                            form.submit();
                            $('.form-status').slideDown().delay(3000).slideUp();
                            $("#consultationForm").trigger("reset");
                            window.location.href = 'appointment-confirmation.html';
                        } else {
                            $('.form-status').addClass('alert alert-danger');
                            $('.form-status').text('Error Occurred, Please Try Again');
                            $('.form-status').slideDown().delay(3000).slideUp();
                        }
                    },
                    error: function(xhr, status, error) {
                        $('.form-status').addClass('alert alert-danger');
                        $('.form-status').text('Something Went Wrong');
                        $('.form-status').slideDown().delay(3000).slideUp();
                    }
                });
            }
        });
    }
    
    /*==================================================
        Preload Spinner
    ==================================================*/
    $(window).on('load', function() {
        if ($('#preloader').length) {
            $('#preloader').delay(100).fadeOut('slow', function() {
                $(this).remove();
            });
        }
    });
    /*=========================================
        Back To Top
    =========================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.backtotop').fadeIn(100);
        } else {
            $('.backtotop').fadeOut(100);
        }
    });
    $('.backtotop').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 100);
        return false;
    });

    
    
    /*================================================== 
	    Copyright year auto update 
	================================================== */
	$('#copy_rightYears').html(new Date().getFullYear());

});