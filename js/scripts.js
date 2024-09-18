// Funcionalidad para cambiar el encabezado al hacer scroll
var cbpAnimatedHeader = (function() {
    var docElem = document.documentElement,
        header = document.querySelector('.navbar-fixed-top'),
        didScroll = false,
        changeHeaderOn = 300;

    function init() {
        window.addEventListener('scroll', function(event) {
            if (!didScroll) {
                didScroll = true;
                setTimeout(scrollPage, 250);
            }
        }, false);
    }

    function scrollPage() {
        var sy = scrollY();
        if (sy >= changeHeaderOn) {
            header.classList.add('navbar-shrink');
        } else {
            header.classList.remove('navbar-shrink');
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();
})();

// Validación del formulario y envío del correo usando EmailJS
$(function() {
    // Validación y envío del formulario
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitSuccess: function($form, event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

            // Obtener los valores del formulario
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();

            // Enviar el correo usando EmailJS
            emailjs.send("service_wo926ol", "template_cworr8o", {
                to_name: "Recipient Name",
                from_name: name,
                from_email: email,
                message: message
            })
            .then(function(response) {
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success')
                    .append("<strong>Tu mensaje ha sido enviado correctamente. </strong>")
                    .append('</div>');
                $('#contactForm').trigger("reset"); // Limpiar el formulario
            }, function(error) {
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger')
                    .append("<strong>Lo siento, hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde. </strong>")
                    .append('</div>');
                $('#contactForm').trigger("reset");
            });
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    // Manejo de pestañas
    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });

    // Cuando se hace clic en el campo de nombre, ocultar los mensajes de éxito/error
    $('#name').focus(function() {
        $('#success').html('');
    });

    // jQuery para la característica de desplazamiento de la página
    document.addEventListener("DOMContentLoaded", function() {
        $('body').on('click', '.page-scroll a', function(event) {
            var $anchor = $(this);
            $('html, body').animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // Encabezados de etiqueta flotante para el formulario de contacto
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    // Resalta la navegación superior a medida que se produce el desplazamiento
    $('body').scrollspy({
        target: '.navbar-fixed-top'
    });

    // Cierra el menú receptivo al hacer clic en un elemento del menú
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });
});
