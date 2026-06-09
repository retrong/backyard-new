/*==============================================================*/
// Contact Form JS - Updated with better form handling
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    
    var isSubmitting = false; // Prevent duplicate submissions
    
    console.log('Contact form script loaded');
    console.log('jQuery version:', $.fn.jquery);
    console.log('Validator available:', typeof $.fn.validator);
    
    bindAjaxForm("#contactForm", "#msgSubmit", "Message Sent!");
    bindAjaxForm("#launchpadForm", "#launchpadMsgSubmit", "LaunchPad enquiry sent!");
    bindAjaxForm("#yarderApplicationForm", "#yarderSubmitMsg", "Application sent successfully!");
    bindAjaxForm("#investorContactForm", "#investorSubmitMsg", "Enquiry sent successfully!");

    function bindAjaxForm(formSelector, messageSelector, successMessage) {
      var $form = $(formSelector);

      console.log("Binding form:", formSelector, "Found:", $form.length);

      if (!$form.length) {
        console.warn("Form not found:", formSelector);
        return;
      }

      // Direct submit handler - simpler and more reliable
      $form.on("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("Submit handler fired for:", formSelector);

        // Simple validation check using HTML5
        var isValid = this.checkValidity();
        console.log("HTML5 validation result:", isValid);

        if (!isValid) {
          // Let browser show validation errors
          this.reportValidity();
          formError($form);
          submitMSG(
            messageSelector,
            false,
            "Please fill in all required fields properly.",
          );
          return false;
        }

        console.log("Validation passed, submitting form");
        submitForm($form, messageSelector, successMessage);
        return false;
      });
    }

    function submitForm($form, messageSelector, successMessage) {
        // Prevent duplicate submissions
        if (isSubmitting) {
            console.log("Form submission already in progress");
            return;
        }
        
        console.log('Starting form submission...');
        isSubmitting = true;
        var formData = new FormData($form[0]);
        
        // Log form data
        console.log('Form data entries:');
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        $.ajax({
            type: "POST",
            url: "assets/php/form-process.php",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                console.log('Sending AJAX request to:', 'assets/php/form-process.php');
            },
            success: function (statustxt) {
                console.log('AJAX success response:', statustxt);
                isSubmitting = false;
                if (statustxt === "success") {
                    formSuccess($form, messageSelector, successMessage);
                } else {
                    formError($form);
                    submitMSG(messageSelector, false, statustxt);
                }
            },
            error: function (xhr) {
                console.error('AJAX error:', xhr.status, xhr.statusText);
                console.error('Response:', xhr.responseText);
                isSubmitting = false;
                formError($form);
                var errorMsg = xhr.responseText || "Something went wrong. Please try again.";
                submitMSG(messageSelector, false, errorMsg);
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