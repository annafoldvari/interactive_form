$("#name").focus();

$("#title").on('change', function() {
    if ($(this).val() === "other") {
        $("#other-title").show(); 
    } else {
        $("#other-title").hide(); 
    }
})
$("#title").trigger('change');

$("#design").on('change', function() {
    
    if ($(this).val() === "js puns") {

       if ($("option[value='nodesignselected']")) {
            $("option[value='nodesignselected']").attr("hidden", true);
            $("option[value='nodesignselected']").removeAttr("selected"); 
       } 

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

        if ($("option[value='nodesignselected']")) {
            $("option[value='nodesignselected']").attr("hidden", true);
            $("option[value='nodesignselected']").removeAttr("selected"); 
            
       } 

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
       $("option[value='tomato']").removeAttr("selected");
       $("option[value='cornflowerblue']").removeAttr("selected");

       $("#color").append($("<option value='nodesignselected'>Please select a T-shirt theme</option>"));

       $("option[value='nodesignselected']").attr("selected", true);
       
       $("option[value='tomato']").attr("disbaled", true);
       $("option[value='tomato']").attr("hidden", true);

       $("option[value='steelblue']").attr("disbaled", true); 
       $("option[value='steelblue']").attr("hidden", true); 

       $("option[value='dimgrey']").attr("disbaled", true); 
       $("option[value='dimgrey']").attr("hidden", true); 

       $("option[value='cornflowerblue']").attr("disbaled", true);
       $("option[value='cornflowerblue']").attr("hidden", true);

       $("option[value='darkslategrey']").attr("disbaled", true); 
       $("option[value='darkslategrey']").attr("hidden", true)
        
       $("option[value='gold']").attr("disbaled", true);
       $("option[value='gold']").attr("hidden", true);
    }
})

$("#design").trigger('change');

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

function resetToEmptyCheckboxes() {
    let $checkboxes = $("input[type='checkbox']");

    $checkboxes.each(function(i, checkbox) {
        $(checkbox).prop('checked', false);
    });

}

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


function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email); 
}

function isValidActivity($checkboxes) {
    let isValid = false;
    $checkboxes.each(function(i, checkbox) {
        if ($(checkbox).prop('checked')) {
            isValid = true;
        }
    });
    return isValid;
}

function isValidCreditCardNumber(creditCardNumber) {
    return /\d{13,16}/.test(creditCardNumber); 
}

function isValidZipCode(zipCode) {
    return /\d{5}/.test(zipCode); 
}

function isValidCVVNumber(cvvNumber) {
    return /\d{3}/.test(cvvNumber); 
}

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

            if (!isValidCreditCardNumber(creditCardNumber)) {
                event.preventDefault()
                $(".credit-card-number-error").show(); 
            } else {
                $(".credit-card-number-error").hide(); 
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

resetToEmptyCheckboxes();
registerActivities();
paymentSectionSetup();
checkFormValid();
