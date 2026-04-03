/*==============================================================*/
// Contact Form JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    bindAjaxForm("#contactForm", "#msgSubmit", "Message Submitted!");
    bindAjaxForm("#launchpadForm", "#launchpadMsgSubmit", "LaunchPad enquiry submitted!");

    function bindAjaxForm(formSelector, messageSelector, successMessage) {
        var $form = $(formSelector);

        if (!$form.length) {
            return;
        }

        $form.validator().on("submit", function (event) {
            if (event.isDefaultPrevented()) {
                formError($form);
                submitMSG(messageSelector, false, "Did you fill in the form properly?");
            } else {
                event.preventDefault();
                submitForm($form, messageSelector, successMessage);
            }
        });
    }

    function submitForm($form, messageSelector, successMessage) {
        var formData = new FormData($form[0]);

        $.ajax({
            type: "POST",
            url: "assets/php/form-process.php",
            data: formData,
            processData: false,
            contentType: false,
            success: function (statustxt) {
                if (statustxt === "success") {
                    formSuccess($form, messageSelector, successMessage);
                } else {
                    formError($form);
                    submitMSG(messageSelector, false, statustxt);
                }
            },
            error: function () {
                formError($form);
                submitMSG(messageSelector, false, "Something went wrong. Please try again.");
            }
        });
    }

    function formSuccess($form, messageSelector, successMessage) {
        $form[0].reset();
        submitMSG(messageSelector, true, successMessage);
    }

    function formError($form) {
        $form.removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSG(messageSelector, valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-center tada animated text-success";
        } else {
            var msgClasses = "h4 text-center text-danger";
        }

        $(messageSelector).removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery)); // End of use strict