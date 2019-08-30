//Put the focus on the name input field.

function focusOnName() {
    $("#name").focus();
}

//Adds extra input field if Other is selected on Job role section

function setupOtherTitle() {
    $("#title").on('change', function() {
        if ($(this).val() === "other") {
            $("#other-title").show(); 
        } else {
            $("#other-title").hide(); 
        }
    })
    $("#title").trigger('change');
}

// Shows the right color options per design and hides the color section if no design selected

function setupDesignSection() {
    $("#design").on('change', function() {
    
        if ($(this).val() === "js puns") {
    
           $("#colors-js-puns").show();
    
           $("option[value='tomato']").removeAttr("selected");  
           $("option[value='cornflowerblue']").attr("selected", true);
    
           $("option[value='cornflowerblue']").removeAttr("disabled");
           $("option[value='cornflowerblue']").removeAttr("hidden");
    
           $("option[value='darkslategrey']").removeAttr("disabled");
           $("option[value='darkslategrey']").removeAttr("hidden");
           
           $("option[value='gold']").removeAttr("disabled");
           $("option[value='gold']").removeAttr("hidden");
    
    
           $("option[value='tomato']").attr("disbaled", true);
           $("option[value='tomato']").attr("hidden", true);
    
           $("option[value='steelblue']").attr("disbaled", true); 
           $("option[value='steelblue']").attr("hidden", true); 
    
           $("option[value='dimgrey']").attr("disbaled", true); 
           $("option[value='dimgrey']").attr("hidden", true); 
    
        } else if ($(this).val() === "heart js") {
    
            $("#colors-js-puns").show();
    
            $("option[value='cornflowerblue']").removeAttr("selected");
            $("option[value='tomato']").attr("selected", true); 
    
            $("option[value='cornflowerblue']").attr("disbaled", true);
            $("option[value='cornflowerblue']").attr("hidden", true);
    
            $("option[value='darkslategrey']").attr("disbaled", true); 
            $("option[value='darkslategrey']").attr("hidden", true)
            
            $("option[value='gold']").attr("disbaled", true);
            $("option[value='gold']").attr("hidden", true);
    
            $("option[value='tomato']").removeAttr("disabled");
            $("option[value='tomato']").removeAttr("hidden");
    
            $("option[value='steelblue']").removeAttr("disabled");
            $("option[value='steelblue']").removeAttr("hidden"); 
    
            $("option[value='dimgrey']").removeAttr("disabled");
            $("option[value='dimgrey']").removeAttr("hidden"); 
        } else {
           $("#colors-js-puns").hide();
        }
    })
    
    $("#design").trigger('change');

}

//Makes possible to select only one activity per a certain time slot
//Shows the total amount of costs of activities.

function registerActivities() {

    let totalCost = 0;
    const $activitiesSection = $(".activities");
    let $totalDivHtml = $("<div class='total'></div");
    $activitiesSection.append($totalDivHtml);

    $(".activities").on('change', function(e) {
        let $checkboxes = $("input[type='checkbox']");
        let $clickedCheckbox = $(e.target);
        let $clickedTime = $clickedCheckbox.attr("data-day-and-time");
        
        
        $checkboxes.each(function(i, checkbox) {
        
           if($(checkbox).attr("data-day-and-time") === $clickedTime && !$clickedCheckbox.is($(checkbox))) {
               if ($clickedCheckbox.prop('checked')) {
                   $(checkbox).attr("disabled", true);
                   $(checkbox).parent().addClass("notvalid");
               } else {
                   $(checkbox).attr("disabled", false);
                   $(checkbox).parent().removeClass("notvalid");
               }
           }
    
        });

        if ($clickedCheckbox.prop('checked')) {
            let cost = parseInt($clickedCheckbox.attr('data-cost').slice(1), 10);
            totalCost += cost;
            $totalDivHtml.text(`Total: $${totalCost}`);
        } else {
            let cost = parseInt($clickedCheckbox.attr('data-cost').slice(1), 10);   
            totalCost -= cost;
            $totalDivHtml.text(`Total: $${totalCost}`);
            
        }

        if (totalCost === 0) {
            $totalDivHtml.text("");
        }
        
       
    });
    
}

//If page refreshed removes all ticks from checkboxes thus making sure
//total cost cannot go into minus.

function resetToEmptyCheckboxes() {
    let $checkboxes = $("input[type='checkbox']");

    $checkboxes.each(function(i, checkbox) {
        $(checkbox).prop('checked', false);
    });

}

//Shows the right section per chosen payment menthod
//Selects Credit Card payment as default

function paymentSectionSetup() {
    const $creditCardInfo = $("#credit-card");
    const $paypalInfo = $("#paypal");
    const $bitcoinInfo = $("#bitcoin");

    $("option[value='Credit Card']").attr("selected", true); 

    $("#payment").on('change', function() {
       if ($("#payment").val() === "Credit Card") {
        $creditCardInfo.show();
        $paypalInfo.hide();
        $bitcoinInfo.hide();
       } else if ($("#payment").val() === "PayPal") {
        $creditCardInfo.hide();
        $paypalInfo.show();
        $bitcoinInfo.hide();  
       } else if ($("#payment").val() === "Bitcoin") {
        $creditCardInfo.hide();
        $paypalInfo.hide();
        $bitcoinInfo.show();
       } else {
        $creditCardInfo.hide();
        $paypalInfo.hide();
        $bitcoinInfo.hide();  
       }  

    }); 
    
    $("#payment").trigger('change');

}

//Checks for valid email address

function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+(\.[a-z]+)?$/i.test(email); 
}

//Checks if at least one activity checkbox is checked

function isValidActivity($checkboxes) {
    let isValid = false;
    $checkboxes.each(function(i, checkbox) {
        if ($(checkbox).prop('checked')) {
            isValid = true;
        }
    });
    return isValid;
}

//Checks for valid credit card number

function isValidCreditCardNumber(creditCardNumber) {
    let validation = '';

    if(!creditCardNumber) {
        return validation = 'empty';
    }else if (!/\d{13,16}/.test(creditCardNumber)) {
        return validation = 'notgoodpattern';
    }else if (/\d{13,16}/.test(creditCardNumber)) {
        return validation = 'valid';
    } 
}

//Checks for valid zip code

function isValidZipCode(zipCode) {
    return /\d{5}/.test(zipCode); 
}

//Checks for valid cvv number

function isValidCVVNumber(cvvNumber) {
    return /\d{3}/.test(cvvNumber); 
}


// Checks for form validation when submit button is sent
// Shows the error messages in case there is a problem with validation

function checkFormValid() {

    $("form").submit(function(event) { 
        let name = $("#name").val();
        let email = $("#mail").val();
        let $checkboxes =$("input[type='checkbox']");
        let isCreditCardOn = $("#payment").val() === "Credit Card";

        if(!name) {
            event.preventDefault()
            $(".name-error").show();
        } else {
            $(".name-error").hide()
        }

        
        if(!isValidEmail(email)) {
            event.preventDefault()
            $(".email-error").show();
        } else {
            $(".email-error").hide();
        }

        if(!isValidActivity($checkboxes)) {
            event.preventDefault()
            $(".activities-error").show();
        } else {
            $(".activities-error").hide();
        }

        if(isCreditCardOn) {
            let creditCardNumber = $("#cc-num").val();
            let zipCode = $("#zip").val();
            let cvv = $("#cvv").val();

            if (isValidCreditCardNumber(creditCardNumber) === 'empty') {
                event.preventDefault()
                $(".credit-card-number-error2").hide(); 
                $(".credit-card-number-error1").show(); 
            } else if (isValidCreditCardNumber(creditCardNumber) === 'notgoodpattern') {
                event.preventDefault()
                $(".credit-card-number-error1").hide();
                $(".credit-card-number-error2").show(); 
            } else {
                $(".credit-card-number-error1").hide();
                $(".credit-card-number-error2").hide();  
            }

            if (!isValidZipCode(zipCode)) {
                event.preventDefault()
                $(".zip-code-error").show(); 
            } else {
                $(".zip-code-error").hide(); 
            }

            if (!isValidCVVNumber(cvv)) {
                event.preventDefault()
                $(".cvv-error").show(); 
            } else {
                $(".cvv-error").hide(); 
            }
        }
        
    });
}

//Checks in real time as typed whether the email address is valid

function checkEmailRealTime() {
    $('#mail').on('input', function() {

        let email = $("#mail").val();

        if(!isValidEmail(email)) {
            event.preventDefault()
            $(".email-error").show();
        } else {
            $(".email-error").hide();
        }
    });
}

focusOnName();

setupOtherTitle();

setupDesignSection();

resetToEmptyCheckboxes();

registerActivities();

paymentSectionSetup();

checkFormValid();

checkEmailRealTime();
