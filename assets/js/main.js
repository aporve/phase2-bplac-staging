

var claim_msg_type;
var companyName;
var transactionNumber;
var claim_type;
var subType;
var disbursementType;
// var beneficiaryType;
var claimStatus;
var docsPending;
var docsReceived;
var policyNumber;
var claimantFirstName;
var beneficiaryCount;
var lapsationDate;
// var denialTag;
var claimAmount;
var currency;
var requirementsList = [];
var sourceSystem;
var isFallout;
var surveyTag;
var referenceNumber = null;

var surveyQues1;
var surveyAns1 = 0;
var surveyQues2;
var surveyAns2 = 0;
var surveyQues3;
var surveyAns3 = 0;
var surveyObj = {};
var org_claimType;
var org_claimSubType;
var org_sourceSystem = '';
var currSeconds = 0;
var survey_form = document.getElementById('customer_survey');
survey_form.addEventListener('submit', submit_survey);

$(document).ready(function (event) { 
    let idleInterval = setInterval(timerIncrement, 1000);
    $(this).mousemove(resetTimer);
    $(this).keypress(resetTimer);
});

function resetTimer() {
    currSeconds = 0;
}

function timerIncrement() {
    currSeconds = currSeconds + 1;
    if (currSeconds == 1800) {
        window.top.location = 'https://www.bpi-philam.com'
    }
}
function getAccidentPage() {
    console.log('get accident page ');
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "nextaction",
                data: "accident"
            }
        })
    }), '*');
}

function getIllnessPage() {
    console.log('get illness page ');
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "nextaction",
                data: "illness"
            }
        })
    }), '*');
}

function getDeathPage() {
    console.log('get death page ');
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "nextaction",
                data: "death"
            }
        })
    }), '*');
}

function captcha() {
    var ref_num = $("#reference_number").val();
    var specRefNo = specialcharacterValidation(ref_num);
    var numRefNo = onlyNumberValidate(ref_num);
    var lenRefNo = fieldCheckLength(ref_num, 10);
    if (ref_num.length === 0) {
        $("#err_field_ref_num").text('Field is empty');
        $("#err_field_ref_num").show();
    }
    else if (ref_num.length != 10) {
        $("#err_field_ref_num").text('Should consist of 10 digits');
        $("#err_field_ref_num").show();
    } else if (lenRefNo) {
        $("#err_field_ref_num").text("Maximum 10 characters allowed!");
        $("#err_field_ref_num").show();
    } else if (specRefNo) {
        $("#err_field_ref_num").text('Special character is not allowed');
        $("#err_field_ref_num").show();
    } else if (!numRefNo) {
        $("#err_field_ref_num").text('Only number is allowed!');
        $("#err_field_ref_num").show();
    } else {
        $("#err_field_ref_num").text('');
        $("#err_field_ref_num").hide();
    }

    // $('#refNoWarning').modal('hide');
    if (ref_num.length != 0 && ref_num.length == 10 && lenRefNo == false && specRefNo == false && numRefNo == true) {
        if (grecaptcha && grecaptcha.getResponse().length > 0) {

            referenceNumber = document.getElementById('reference_number').value
            if (referenceNumber != null) { trackProgress(); }
        } else {
            $("#err_recaptcha").text('Please verify the reCAPTCHA and tick the check box before submission');
            $("#err_recaptcha").show();
            // activeProcess()
        }
    } else {
        $(`#err_field_ref_num`).show();
    }

    /*before api intgrtn*/
    // // $('#refNoWarning').modal('hide');
    // if (grecaptcha && grecaptcha.getResponse().length > 0) {

    //     referenceNumber = document.getElementById('reference_number').value
    //     trackProgress();
    // } else {
    //     $("#err_recaptcha").text('Please verify the reCAPTCHA and tick the check box before submission');
    //     $("#err_recaptcha").show();
    //     // activeProcess()
    // }
}

function trackUser() {

    $('.dropdown-content').toggle()
    $('.arrow-up').toggle();
    $('.arrow-down ').toggle();



}



function dummyRefNumberTest() {

    if ($('#reference_number').val() == '1234') {
        claim_type = 'accident';
        claim_msg_type = 'A-1'
        return true;
    }
    else if ($('#reference_number').val() == '5678') {
        claim_type = 'illness';
        claim_msg_type = 'I-2'
        return true;
    }
    else if ($('#reference_number').val() == '9012') {
        claim_type = 'death';
        claim_msg_type = 'D-2'
        return true;
    }
    else {
        return false;

    }
}

function trackProgress() {

    document.getElementById('go-btn').style.display = 'none'
    document.getElementById('loader-btn').style.display = 'block'
    var finalPayload = {}
    var source = 'main';
    var raw = JSON.stringify({ "companyName": "BPLAC", "TIPSReferenceNumber": referenceNumber });
    finalPayload['source'] = source;
    finalPayload['data'] = raw;
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "getClaimStatus",
                data: finalPayload
            }
        })
    }), '*');


    window.addEventListener('message', function (eventData) {

        console.log("receiving claim status event ")
        // console.log(event.data.event_code)
        try {

            if (eventData.data) {
                let event = JSON.parse(eventData.data);
                console.log(event);
                if (event.event_code == 'claimStatusResponse') { //sucess
                    console.log(event.data)
                    if (event.data.returnCode == '0' || event.data.retCode == '0') {
                        if (event.data.type != null) {
                            document.getElementById('go-btn').style.display = 'block'
                            document.getElementById('loader-btn').style.display = 'none'
                            org_claimType = event.data.type;
                            if (event.data.type.toLowerCase() == 'death') {
                                claim_type = event.data.type.toLowerCase()
                            }
                            else {

                                claim_type = event.data.subType.toLowerCase()
                                org_claimSubType = event.data.subType;
                                if (event.data.subType.toLowerCase() == 'il') {
                                    claim_type = 'illness'
                                }
                                else if (event.data.subType.toLowerCase() == 'ac') {
                                    claim_type = 'accident'
                                }
                            }
                            transactionNumber = event.data.transactionNumber;
                            disbursementType = event.data.disbursementType?.toUpperCase();
                            beneficiaryCount = event.data.beneficiaryCount;
                            lapsationDate = event.data.lapsationDate;
                            claimStatus = event.data.claimStatus?.toLowerCase();
                            docsPending = event.data.docsPending?.toLowerCase();
                            docsReceived = event.data.docsReceived?.toLowerCase();
                            policyNumber = event.data.policyNumber;
                            claimantFirstName = event.data.claimantFirstName;
                            // denialTag = response.denialTag;
                            sourceSystem = event.data.sourceSystem?.toLowerCase();
                            org_sourceSystem = event.data.sourceSystem;
                            if (sourceSystem.trim().toLowerCase() != 'tips' && sourceSystem.trim().toLowerCase() != 'cms') {
                                sourceSystem = 'cms'
                            }
                            isFallout = event.data?.isFallout?.toLowerCase();
                            claimAmount = event.data.claimAmount;
                            currency = event.data.currency;
                            requirementsList = event.data.requirementsList;
                            surveyTag = event.data.surveyTag?.toLowerCase();

                            //for customer survey
                            if ((claimStatus.toLowerCase() == 'denied1' || claimStatus.toLowerCase() == 'denied2' || claimStatus.toLowerCase() == 'denied3' || claimStatus.toLowerCase() == 'denied4' || claimStatus.toLowerCase() == 'approved') && (surveyTag == 'n' || surveyTag == null)) {
                                $('#customer_survey').show()
                            }
                            else {

                                $('#customer_survey').hide()
                            }
                            //for customer survey

                            document.getElementById('original_ref_no').innerHTML = document.getElementById('reference_number').value;
                            if (claimAmount != null && claimAmount != '' && claimAmount != '0.0' && claimAmount != '0.00') { document.getElementById('payment_amount').innerHTML = currency + ' ' + claimAmount; }
                            else {
                                document.getElementById('payment_amount').innerHTML = ''
                                $("#payment-ref").css("background-color", "lightgray");
                                $("#payment_text").css({"color":"#b3b1b2"});
                            }

                            displayDateForClaimStatus() // date to be displayed on top
                            $("#img_claim").hide();
                            $("#claim").hide();
                            $("#reference_No").hide();

                            // document.getElementById('text').innerHTML = document.getElementById('payout-pickup-ill').innerHTML;
                            // activeProcess()
                            // activeProcessCircle()
                            $("#err_recaptcha").text('');
                            $("#err_recaptcha").hide();
                            $("#reference-divider").show();
                            $("#process_confirmation1").show();
                            setClaimProgressScreen(); // to set header title and image for claim status screen
                            trackProgressDropDown() // for tracking progress dropdown
                        }
                        else {
                            $('#refNoWarning').modal('show');
                        }
                    }
                    else if (event.data.returnCode == '1') {
                        $('#refNoWarning').modal('show');

                    }
                    else {
                        $('#refNoWarning').modal('show');
                    }
                }
                else {
                    // $('#refNoWarning').modal('show');

                }
            } else {
                $('#refNoWarning').modal('show');

            }
        } catch (error) {
            // alert(error)

        }

    })



    // api call on clicking GO button from claim status screen
    // var res;
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify({ "companyName": "BPLAC", "TIPSReferenceNumber": referenceNumber });
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw
    // };
    // fetch("http://localhost:3000/claim_status", requestOptions).then((response) => response.json())
    //     .then(response => {
    //         if (response.returnCode != '0') {
    //             $('#refNoWarning').modal('show');
    //         }
    //         else {
    //             if (response.type.toLowerCase().trim() == 'death') {
    //                 claim_type = response.type
    //             }
    //             else {
    //                 claim_type = response.subType
    //             }
    //             transactionNumber = response.transactionNumber;
    //             disbursementType = response.disbursementType;
    //             beneficiaryCount = response.beneficiaryCount;
    //             lapsationDate = response.lapsationDate;
    //             claimStatus = response.claimStatus;
    //             docsPending = response.docsPending;
    //             docsReceived = response.docsReceived;
    //             policyNumber = response.policyNumber;
    //             claimantFirstName = response.claimantFirstName;
    //             // denialTag = response.denialTag;
    //             sourceSystem = response.sourceSystem;
    //             isFallout = response.isFallout;
    //             claimAmount = response.claimAmount;
    //             currency = response.currency;
    //             requirementsList = response.requirementsList;
    //             surveyTag = response.surveyTag;
    //             if (claimStatus.toLowerCase().trim() == 'denied' || claimStatus.toLowerCase().trim() == 'approved' && surveyTag == 'N') {
    //                 $('#customer_survey').show()
    //             }
    //             else {

    //                 $('#customer_survey').hide()
    //             }
    //             // document.getElementById('name').innerHTML = claimantFirstName;

    //             document.getElementById('payment_amount').innerHTML = currency + ' ' + claimAmount;
    //             // document.getElementById('currency').innerHTML = currency;
    //             // document.getElementById('net_amount').innerHTML = claimAmount;
    //             displayDateForClaimStatus()
    //             $("#img_claim").hide();
    //             $("#claim").hide();
    //             $("#reference_No").hide();

    //             // document.getElementById('text').innerHTML = document.getElementById('payout-pickup-ill').innerHTML;
    //             // activeProcess()
    //             // activeProcessCircle()
    //             $("#err_recaptcha").text('');
    //             $("#err_recaptcha").hide();
    //             $("#reference-divider").show();
    //             $("#process_confirmation1").show();
    //             setClaimProgressScreen(); // to set header title and image for claim status screen
    //             trackProgressDropDown(trackMessagesArr) // for tracking progress dropdown
    //         }
    //     }).catch(error => {
    //         console.log(error)
    //     });

    // var response = {};
    // // to show header and description based on claim type
    // claim_msg_type = response['claim-msg-type'] // to set the message shown based on status
    // trackMessagesArr = response['trackMessages']  // to populate dropdown

    // var x = dummyRefNumberTest() // for testing





    /*before api ingtrn*/


    // var response = {};
    // claim_type = response['claim-type']         // to show header and description based on claim type
    // claim_msg_type = response['claim-msg-type'] // to set the message shown based on status
    // trackMessagesArr = response['trackMessages']  // to populate dropdown

    // var x = dummyRefNumberTest() // for testing
    // if (x == false) {
    //     $('#refNoWarning').modal('show');
    // }
    // else {
    //     displayDateForClaimStatus()
    //     $("#img_claim").hide();
    //     $("#claim").hide();
    //     $("#reference_No").hide();
    //     $("#err_recaptcha").text('');
    //     $("#err_recaptcha").hide();
    //     $("#reference-divider").show();
    //     $("#process_confirmation1").show();
    //     setClaimProgressScreen(); // to set header title and image for claim status screen
    //     trackProgressDropDown(trackMessagesArr) // for tracking progress dropdown
    // }
}

// to set header title and image for claim status screen
function setClaimProgressScreen() {
    switch (claim_type.toLowerCase().trim()) {
        case 'accident':
            setClaimProgressScreenHeader('accident')
            break;
        case 'illness':
            setClaimProgressScreenHeader('illness')
            break;
        case 'death':
            setClaimProgressScreenHeader('death')
            break;
        default: setClaimProgressScreenHeader('accident') // to be removed
            break;
    }
}

function setClaimProgressScreenHeader(title) {

    if (title == 'accident') {
        document.getElementById('claim-header-text').innerHTML = 'ACCIDENT';
        document.getElementById('claim-header-desc').innerHTML = 'We have your back and we&#8217;re here to help you focus on your recovery';
        document.getElementById('claim-header-img').src = '../../public/webviews/aia_bplac_d2/assets/images/accidental.png';
        setAccidentClaimStatusMsg()
    }
    else if (title == 'illness') {
        document.getElementById('claim-header-text').innerHTML = 'ILLNESS';
        document.getElementById('claim-header-desc').innerHTML = 'Don’t worry about your medical expenses because we’re here for you.';
        document.getElementById('claim-header-img').src = '../../public/webviews/aia_bplac_d2/assets/images/illness.png';
        setIllnessClaimStatusMsg()
    }
    else if (title == 'death') {
        document.getElementById('claim-header-text').innerHTML = 'DEATH';
        document.getElementById('claim-header-desc').innerHTML = 'Nothing can be harder than losing someone close to us, that’s why we’re here to help you in this trying time.';
        document.getElementById('claim-header-img').src = '../../public/webviews/aia_bplac_d2/assets/images/death.png';
        setDeathClaimStatusMsg()
    }
}


// functions to set the message for each claim status //
function setAccidentClaimStatusMsg() {
    if (isFallout.toLowerCase() == 'y') {

        if (docsPending == 'y' && docsReceived == 'n' && claimStatus == 'received') {
            var finalDocsList = '';
            requirementsList.forEach(function (item) {
                finalDocsList = finalDocsList + '<div style="display: flex;align-items: center; padding-bottom: 1px;"> <div id="outer-circle"> <div id="inner-circle"></div> </div> <p style="padding-left:7px">' + ' ' + item.name + '</p> </div>'

            });

            document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR OTHER CLAIMS DOCUMENTS</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed your initial claim request submission and identified that we may also need the following documents for us to proceed: </p> <br /> <p class="font-weight-normal request-font"> <div style="padding-left: 10px;"> ' + finalDocsList + ' </div> </p> <br /> <p class="font-weight-normal request-font"> Don’t worry, you can easily submit scanned copies of these documents via e-mail at BPIAIA.customerservice@aia.com so we can proceed with your claim request. </p> </div>';
            document.getElementById("turnaround-time-ref").style.display = "block";
            document.getElementById("payment-ref").style.display = "none";
            twoStepperActive();
        }
        else {
            if (claimStatus.toLowerCase().trim() == 'received') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR REQUEST IS BEING PROCESSED</h3> <br /> <p class="font-weight-justy request-font"> We have received your claim request and it is now in process. Kindly expect an SMS update on the status of your request in 7 to 10 working days . </p> <br /> <p class="font-weight-justy request-font"> Should additional requirements be needed, we will reach out to you immediately. </p> <br /> <p class="font-weight-normal request-font"> To check the status of your claims request, please type in your reference number ' + transactionNumber + ' <a href="main.html">here</a>. </p> </div> '
                document.getElementById("turnaround-time-ref").style.display = "block";
                document.getElementById("payment-ref").style.display = "none";
                twoStepperActive();
            }
            else if (claimStatus.toLowerCase().trim() == 'approved') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi, ' + claimantFirstName + '. You will be pleased to know that your claim request for your BPI AIA policy has been approved. </p> <br /> <p> Kindly expect receipt of your benefit through your chosen payout method. You will receive an update when your benefit is ready for release. </p> <br /> <p class="font-weight-normal request-font"> This information has been sent as well via SMS for your reference. </p> </div> '

                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "block";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied1') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your policy doesn’t cover Accident. </p> <br /> <p> We understand that you’re going through a tough time, ' + claimantFirstName + '. While we can’t release a payment for this claim, we can assure you that your life insurance coverage remains intact for the future. </p> <br /> <p> If you have any questions, you may reach out to us by chatting with Bessie the chatbot at https://m.me/BessieofBPIAIA. You may also email us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";

                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied2') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The circumstances that led to your current condition are not included in the provisions of your current BPI AIA policy. </p> <br /> <p> We understand that you’re going through a tough time, ' + claimantFirstName + '. While we can’t release a payment for this claim, we can assure you that your life insurance coverage remains intact for the future. </p> <br /> <p> If you have any questions, you may reach out to us by chatting with Bessie the chatbot at https://m.me/BessieofBPIAIA. You may also email us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied3') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your current BPI AIA policy does not cover the condition for which you are claiming a benefit. </p> <br /> <p> We understand that you’re going through a tough time, ' + claimantFirstName + '. While we can’t release a payment for this claim, we can assure you that your life insurance coverage remains intact for the future. </p> <br /> <p> If you have any questions, you may reach out to us by chatting with Bessie the chatbot at https://m.me/BessieofBPIAIA. You may also email us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied4') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br />  <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your coverage and all its benefits have ended  due to non-payment of premium dues. </p> <br /> <p> We wish you a speedy recovery. </p> <br /> <p> If you have any questions, or would like to reinstate your policy, you may reach out to us by chatting with Bessie the chatbot at https://m.me/BessieofBPIAIA. You may also email us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }

        }
    }
    else if (isFallout.toLowerCase() == 'n') {
        if (docsPending == 'y' && docsReceived == 'n' && claimStatus == 'received') {
            var finalDocsList = '';
            requirementsList.forEach(function (item) {
                finalDocsList = finalDocsList + '<div style="display: flex;align-items: center; padding-bottom: 1px;"> <div id="outer-circle"> <div id="inner-circle"></div> </div> <p style="padding-left:7px">' + ' ' + item.name + '</p> </div>'

            });

            document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR OTHER CLAIMS DOCUMENTS</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed your initial claim request submission and need the documents listed below to proceed with the assessment: </p> <br /> <p class="font-weight-normal request-font"> <div style="padding-left: 10px;"> ' + finalDocsList + ' </div> </p> <br /> <p> Don&#39;t worry, you can easily submit scanned copies of these documents via e-mail at BPIAIA.customerservice@aia.com so we can proceed with your claim request.</p > <br /> </div >';
            document.getElementById("turnaround-time-ref").style.display = "block";
            document.getElementById("payment-ref").style.display = "none";
            twoStepperActive();
        }
        else {
            if (claimStatus.toLowerCase().trim() == 'received') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR REQUEST IS BEING PROCESSED</h3> <br /> <p class="font-weight-justy request-font"> We have received your claim request and it is now in process. Kindly expect an SMS update on the status of your request in 7 to 10 working days . </p> <br /> <p class="font-weight-justy request-font"> Should additional requirements be needed, we will reach out to you immediately. </p> <br /> <p class="font-weight-normal request-font"> To check the status of your claims request, please type in your reference number ' + transactionNumber + ' <a href="main.html">here</a>. </p> </div> '
                document.getElementById("turnaround-time-ref").style.display = "block";
                document.getElementById("payment-ref").style.display = "none";
                twoStepperActive();
            }
            else if (claimStatus.toLowerCase().trim() == 'approved') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR PAYOUT HAS BEEN APPROVED</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We are happy to inform you that we have approved your claim request for your BPI AIA policy no. ' + policyNumber + '. </p> <br /> <p class="font-weight-normal request-font"> You will receive ' + currency + ' ' + claimAmount + ' through your chosen payout method. Please expect an update from us on the release of your benefit. </p> <br /> </div> '

                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "block";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied1') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and regret that we are unable to grant your claim request. Your BPI AIA policy does not have Accident coverage. </p> <br /> <p class="font-weight-normal request-font"> We understand that you&#39;re going through a tough time, ' + claimantFirstName + '.While we can&#39;t release a payment for this claim, we assure you that your life insurance coverage remains intact. </p> <br /> <p class="font-weight-normal request-font"> If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";

                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied2') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and regret that we are unable to grant your claim request. The circumstances that led to your condition are not included in the provisions of your BPI AIA policy. </p> <br /> <p class="font-weight-normal request-font"> We understand that you&#39;re going through a tough time, ' + claimantFirstName + '.While we can&#39;t release a payment for this claim, we assure you that your life insurance coverage remains intact. </p> <br /> <p class="font-weight-normal request-font"> If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied3') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and regret that we are unable to grant your claim request. The circumstances that led to your condition are not included in the provisions of your BPI AIA policy. </p> <br /> <p class="font-weight-normal request-font"> We understand that youre going through a tough time, ' + claimantFirstName + '.While we can&#39;t release a payment for this claim, we assure you that your life insurance coverage remains intact. </p> <br /> <p class="font-weight-normal request-font"> If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied4') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your policy&#39;s coverage and all its benefits have ended last ' + lapsationDate + ' due to non-payment of premium dues. </p> <br /> <p class="font-weight-normal request-font"> We understand that you&#39;re going through a tough time, ' + claimantFirstName + '. If you wish reinstate your policy, your Bancassurance Sales Executive will be ready to assist you. </p> <br /> <p class="font-weight-normal request-font"> You may also chat with Bessie at https://m.me/BessieofBPIAIA, email us at at BPI AIA_CustomerService@aia.com, or call us at (02) 8528-5501. </p> <br /> </div> '
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }

        }
    }

    // switch (claim_msg_type) {
    //     case 'A-1':

    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-1').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "block";
    //         document.getElementById("payment-ref").style.display = "none";
    //         twoStepperActive()

    //         break;
    //     case 'A-2':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-2').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         document.getElementById("payment-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     case 'A-3':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-3').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         document.getElementById("payment-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     case 'A-4':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-4').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         document.getElementById("payment-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     case 'A-5':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-5').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         document.getElementById("payment-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     default: document.getElementById('claim-msg-text').innerHTML = 'No message found'
    //         break;
    // }
    //  
    // if (docsPending == 'Y') {
    //     var finalDocsList = '';
    //     requirementsList.forEach(function (item) {
    //         finalDocsList = finalDocsList + '<div style="display: flex;align-items: center; padding-bottom: 1px;"> <div id="outer-circle"> <div id="inner-circle"></div> </div> <p>' + item.name + '</p> </div>'

    //     });
    //     document.getElementById('docs-list').innerHTML = finalDocsList
    //     document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-1').innerHTML;
    //     document.getElementById("turnaround-time-ref").style.display = "block";
    //     document.getElementById("payment-ref").style.display = "none";
    //     twoStepperActive()
    // }
    // else if (docsPending == 'N') {
    //     document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-6').innerHTML;
    //     document.getElementById("payment-ref").style.display = "block"; // to display payment box
    //     document.getElementById("turnaround-time-ref").style.display = "none";
    //     allStepperActive()
    // }



    //before integration//
    // switch (claim_msg_type) {
    //     case 'A-1':

    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-1').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "block";
    //         document.getElementById("payment-ref").style.display = "none";
    //         twoStepperActive()

    //         break;
    //     case 'A-2':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-2').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         document.getElementById("payment-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     case 'A-3':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-3').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         document.getElementById("payment-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     case 'A-4':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-4').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         document.getElementById("payment-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     case 'A-5':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('A-5').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         document.getElementById("payment-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     default: document.getElementById('claim-msg-text').innerHTML = 'No message found'
    //         break;
    // }
}
function setIllnessClaimStatusMsg() {
    if (isFallout.toLowerCase() == 'y') {

        if (docsPending == 'y' && docsReceived == 'n'  && claimStatus == 'received') {

            twoStepperActive();
            var finalDocsList = '';
            requirementsList.forEach(function (item) {
                finalDocsList = finalDocsList + '<div style="display: flex;align-items: center; padding-bottom: 1px;"> <div id="outer-circle"> <div id="inner-circle"></div> </div> <p style="padding-left:7px">' + ' ' + item.name + '</p> </div>'

            });
            document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR OTHER CLAIMS DOCUMENTS</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed your initial claim request submission and identified that we may also need the following documents for us to proceed: </p> <br /> <p class="font-weight-normal request-font"> <div style="padding-left: 10px;"> ' + finalDocsList + ' </div> </p> <br /> <p class="font-weight-normal request-font"> Don’t worry, you can easily submit scanned copies of these documents via e-mail at BPIAIA.customerservice@aia.com so we can proceed with your claim request. </p> </div>';
            document.getElementById("turnaround-time-ref").style.display = "block";
            document.getElementById("payment-ref").style.display = "none";
        }
        else {
            if (claimStatus.toLowerCase().trim() == 'received') {
                document.getElementById('claim-msg-text').innerHTML = ' <div> <h3>YOUR REQUEST IS BEING PROCESSED</h3> <br /> <p class="font-weight-justy request-font"> We have received your claim request and it is now in process. Kindly expect an SMS update on the status of your request in 7 to 10 working days . </p> <br /> <p class="font-weight-normal request-font"> Should additional requirements be needed, we will reach out to you immediately.</p> <br /> <p class="font-weight-normal request-font"> To check the status of your claims request, please type in your reference number ' + transactionNumber + '<a href="main.html">here</a>. </p> </div>'
                document.getElementById("turnaround-time-ref").style.display = "block";
                document.getElementById("payment-ref").style.display = "none";
                twoStepperActive();
            }
            else if (claimStatus.toLowerCase().trim() == 'approved') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi, ' + claimantFirstName + '. You will be pleased to know that your claim request for your BPI AIA policy has been approved. </p> <br /> <p> Kindly expect receipt of your benefit through your chosen payout method. You will receive an update when your benefit is ready for release. </p> <br /> <p class="font-weight-normal request-font"> This information has been sent as well via SMS for your reference. </p> </div> '

                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "block";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied1') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your policy doesn’t cover Illness. </p> <br /> <p> We understand that you’re going through a tough time, ' + claimantFirstName + '. While we can’t release a payment for this claim, we can assure you that your life insurance coverage remains intact for the future. </p> <br /> <p> If you have any questions, you may reach out to us by chatting with Bessie the chatbot at https://m.me/BessieofBPIAIA. You may also email us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";

                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied2') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The circumstances that led to your current condition are not included in the provisions of your current BPI AIA policy. </p> <br /> <p> We understand that you’re going through a tough time, ' + claimantFirstName + '. While we can’t release a payment for this claim, we can assure you that your life insurance coverage remains intact for the future. </p> <br /> <p> If you have any questions, you may reach out to us by chatting with Bessie the chatbot at https://m.me/BessieofBPIAIA. You may also email us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied3') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your current BPI AIA policy does not cover the condition for which you are claiming a benefit. </p> <br /> <p> We understand that you’re going through a tough time, ' + claimantFirstName + '. While we can’t release a payment for this claim, we can assure you that your life insurance coverage remains intact for the future. </p> <br /> <p> If you have any questions, you may reach out to us by chatting with Bessie the chatbot at https://m.me/BessieofBPIAIA. You may also email us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied4') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your coverage and all its benefits have ended  due to non-payment of premium dues. </p> <br /> <p> We wish you a speedy recovery. </p> <br /> <p> If you have any questions, or would like to reinstate your policy, you may reach out to us by chatting with Bessie the chatbot at https://m.me/BessieofBPIAIA. You may also email us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }
        }
    }
    else if (isFallout.toLowerCase() == 'n') {
        if (docsPending == 'y' && docsReceived == 'n'  && claimStatus == 'received') {
            var finalDocsList = '';
            requirementsList.forEach(function (item) {
                finalDocsList = finalDocsList + '<div style="display: flex;align-items: center; padding-bottom: 1px;"> <div id="outer-circle"> <div id="inner-circle"></div> </div> <p style="padding-left:7px">' + ' ' + item.name + '</p> </div>'

            });

            document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR OTHER CLAIMS DOCUMENTS</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed your initial claim request submission and need the documents listed below to proceed with the assessment: </p> <br /> <p class="font-weight-normal request-font"> <div style="padding-left: 10px;"> ' + finalDocsList + ' </div> </p> <br /> <p> Don&#39;t worry, you can easily submit scanned copies of these documents via e-mail at BPIAIA.customerservice@aia.com so we can proceed with your claim request. </p > <br /> </div >';
            document.getElementById("turnaround-time-ref").style.display = "block";
            document.getElementById("payment-ref").style.display = "none";
            twoStepperActive();
        }
        else {
            if (claimStatus.toLowerCase().trim() == 'received') {
                document.getElementById('claim-msg-text').innerHTML = ' <div> <h3>YOUR REQUEST IS BEING PROCESSED</h3> <br /> <p class="font-weight-justy request-font"> Hang in there as we are now processing your request. Kindly expect an SMS update from us within 7 to 10 working days on the status of your request. </p> <br /> <p class="font-weight-normal request-font"> If we would need additional documents to support your request, we will reach out to you immediately. </p> <br /> <p class="font-weight-normal request-font"> You may also check the progress of your request <a href="main.html">here</a>. Just type in your reference number ' + transactionNumber + ' to view the status of your request. </p> </div>'
                document.getElementById("turnaround-time-ref").style.display = "block";
                document.getElementById("payment-ref").style.display = "none";
                twoStepperActive();
            }
            else if (claimStatus.toLowerCase().trim() == 'approved') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR PAYOUT HAS BEEN APPROVED</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We are happy to inform you that we have approved your claim request for your BPI AIA policy no. ' + policyNumber + '. </p> <br /> <p class="font-weight-normal request-font"> You will receive ' + currency + ' ' + claimAmount + ' through your chosen payout method. Please expect an update from us on the release of your benefit. </p> <br /> </div> '

                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "block";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied1') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and regret that we are unable to grant your claim request. Your BPI AIA policy does not have Illness coverage. </p> <br /> <p class="font-weight-normal request-font"> We understand that you&#39;re going through a tough time, ' + claimantFirstName + '.While we can&#39;t release a payment for this claim, we assure you that your life insurance coverage remains intact. </p> <br /> <p class="font-weight-normal request-font"> If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";

                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied2') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and regret that we are unable to grant your claim request. The circumstances that led to your condition are not included in the provisions of your BPI AIA policy. </p> <br /> <p class="font-weight-normal request-font"> We understand that you&#39;re going through a tough time, ' + claimantFirstName + '.While we can&#39;t release a payment for this claim, we assure you that your life insurance coverage remains intact. </p> <br /> <p class="font-weight-normal request-font"> If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied3') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and regret that we are unable to grant your claim request. The circumstances that led to your condition are not included in the provisions of your BPI AIA policy. </p> <br /> <p class="font-weight-normal request-font"> We understand that youre going through a tough time, ' + claimantFirstName + '.While we can&#39;t release a payment for this claim, we assure you that your life insurance coverage remains intact. </p> <br /> <p class="font-weight-normal request-font"> If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied4') {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your policy&#39;s coverage and all its benefits have ended last ' + lapsationDate + ' due to non-payment of premium dues. </p> <br /> <p class="font-weight-normal request-font"> We understand that you&#39;re going through a tough time, ' + claimantFirstName + '. If you wish reinstate your policy, your Bancassurance Sales Executive will be ready to assist you. </p> <br /> <p class="font-weight-normal request-font"> You may also chat with Bessie at https://m.me/BessieofBPIAIA, email us at at BPI AIA_CustomerService@aia.com, or call us at (02) 8528-5501. </p> <br /> </div> '
                document.getElementById("turnaround-time-ref").style.display = "none";
                document.getElementById("payment-ref").style.display = "none";
                allStepperActive()
            }

        }
    }



    // switch (claim_msg_type) {
    //     case 'I-1':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('I-1').innerHTML;
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         document.getElementById("payment-ref").style.display = "none";
    //         twoStepperActive()
    //         break;
    //     case 'I-2':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('I-2').innerHTML;
    //         document.getElementById("payment-ref").style.display = "block"; // to display payment box
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     case 'I-3':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('I-3').innerHTML;
    //         document.getElementById("payment-ref").style.display = "block";
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     default: document.getElementById('claim-msg-text').innerHTML = 'No message found'
    //         break;
    // }

}


function setDeathClaimStatusMsg() {
    if (isFallout.toLowerCase() == 'y') {

        if (docsPending == 'y' && docsReceived == 'n'  && claimStatus == 'received') {
            var finalDocsList = '';
            requirementsList.forEach(function (item) {
                finalDocsList = finalDocsList + '<div style="display: flex;align-items: center; padding-bottom: 1px;"> <div id="outer-circle"> <div id="inner-circle"></div> </div> <p style="padding-left:7px">' + ' ' + item.name + '</p> </div>'

            });
            if(claimantFirstName !== ''){
                document.getElementById('claim-msg-text').innerHTML = '<div> <h3>YOUR OTHER CLAIMS DOCUMENTS</h3>  <br /><p>Our sincerest condolences for your loss. </p><br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '.We have reviewed your initial claim request submission and identified that we may need the following documents for us to proceed: </p > <br /> <p class="font-weight-normal request-font"> <div style="padding-left: 10px;"> ' + finalDocsList + '</div> </p> <br /> <p class="font-weight-normal request-font"> Don&#39;t worry you can easily submit scanned copies of these documents via e-mail at BPIAIA.customerservice@aia.com so we can proceed with your claim request. </p> </div>';
                document.getElementById("turnaround-time-ref").style.display = "block";
                document.getElementById("payment-ref").style.display = "none";
                twoStepperActive();
            }else {
                document.getElementById('claim-msg-text').innerHTML = '<div> <h3>YOUR OTHER CLAIMS DOCUMENTS</h3>  <br /><p>Our sincerest condolences for your loss. </p><br /> <p class="font-weight-justy request-font"> We have reviewed your initial claim request submission and identified that we may need the following documents for us to proceed: </p > <br /> <p class="font-weight-normal request-font"> <div style="padding-left: 10px;"> ' + finalDocsList + '</div> </p> <br /> <p class="font-weight-normal request-font"> Don&#39;t worry you can easily submit scanned copies of these documents via e-mail at BPIAIA.customerservice@aia.com so we can proceed with your claim request. </p> </div>';
                document.getElementById("turnaround-time-ref").style.display = "block";
                document.getElementById("payment-ref").style.display = "none";
                twoStepperActive();
            }
        }
        else {
            if (claimStatus.toLowerCase().trim() == 'received') {
                if (beneficiaryCount == 1) {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR REQUEST IS BEING PROCESSED</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss, ' + claimantFirstName + '. </p> <br /> <p class="font-weight-justy request-font"> We have received your claim request and it is now in process. Kindly expect an SMS update on the status of your request in 7 to 10 working days . </p> <br /> <p> Should additional requirements be needed, we will reach out to you immediately. </p> <br /> <p class="font-weight-normal request-font"> To check the status of your claims request, please type in your reference number ' + transactionNumber + ' <a href="main.html">here</a>. </p> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "block";
                    document.getElementById("payment-ref").style.display = "none";
                }
                else {

                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR REQUEST IS BEING PROCESSED</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> We have received your claim request and it is now in process. Kindly expect an SMS update on the status of your request in 7 to 10 working days . </p> <br /> <p> Should additional requirements be needed, we will reach out to you immediately. </p> <br /> <p class="font-weight-normal request-font"> To check the status of your claims request, please type in your reference number ' + transactionNumber + ' <a href="main.html">here</a>. </p> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "block";
                    document.getElementById("payment-ref").style.display = "none";

                }
                twoStepperActive();
            }
            else if (claimStatus.toLowerCase().trim() == 'approved') {
                if (beneficiaryCount == 1) {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> We hope all is well, ' + claimantFirstName + ' </p> <br /> <p class="font-weight-justy request-font"> Your claim request has been approved. Kindly expect receipt of your benefit through your chosen payout method. You will receive an update when your benefit is ready for release. </p> <br /> <p> This information has been sent as well via SMS for your reference. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "block";
                }
                else {
                    if( claimantFirstName !== '') {
                        document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> We hope all is well with you and your family. </p> <br /> <p class="font-weight-justy request-font"> Your claim request has been approved. Kindly expect receipt of your benefit through your chosen payout method. You will receive an update when your benefit is ready for release. </p> <br /> <p> This information has been sent as well via SMS for your reference. </p> <br /> </div> '
                        document.getElementById("turnaround-time-ref").style.display = "none";
                        document.getElementById("payment-ref").style.display = "none";
                    }else {
                        document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> We hope all is well with you and your family. </p> <br /> <p class="font-weight-justy request-font"> Your claim request has been approved. Kindly expect receipt of your benefit through your chosen payout method. You will receive an update when your benefit is ready for release. </p> <br /> <p> This information has been sent as well via SMS for your reference. </p> <br /> </div> '
                        document.getElementById("turnaround-time-ref").style.display = "none";
                        document.getElementById("payment-ref").style.display = "none";
                    }
                }

                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied1') {
                if(claimantFirstName !== ''){
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The policy you have provided doesn’t cover Death. </p> <br /> <p> We understand that you’re going through a tough time. For assistance, please feel free to reach out to us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }else {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The policy you have provided doesn’t cover Death. </p> <br /> <p> We understand that you’re going through a tough time. For assistance, please feel free to reach out to us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }
            }
            else if (claimStatus.toLowerCase().trim() == 'denied2') {
                if(claimantFirstName !== ''){
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The circumstances that led to the condition of the policy insured are not included in the provisions of policy. </p> <br /> <p> We understand that you’re going through a tough time. For assistance, please feel free to reach out to us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }else {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The circumstances that led to the condition of the policy insured are not included in the provisions of policy. </p> <br /> <p> We understand that you’re going through a tough time. For assistance, please feel free to reach out to us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div>'
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }
            }
            else if (claimStatus.toLowerCase().trim() == 'denied3') {
                if(claimantFirstName !== ''){
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The BPI AIA policy you provided does not cover the condition for which you are claiming a benefit. </p> <br /> <p> We understand that you’re going through a tough time. For assistance, please feel free to reach out to us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }else {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The BPI AIA policy you provided does not cover the condition for which you are claiming a benefit. </p> <br /> <p> We understand that you’re going through a tough time. For assistance, please feel free to reach out to us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }
            }
            else if (claimStatus.toLowerCase().trim() == 'denied4') {
                if(claimantFirstName !== ''){
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The BPI AIA policy you provided and its benefits have ended due to non-payment of premium dues. </p> <br /> <p> We understand that you’re going through a tough time. For assistance, please feel free to reach out to us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }else {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> We have reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The BPI AIA policy you provided and its benefits have ended due to non-payment of premium dues. </p> <br /> <p> We understand that you’re going through a tough time. For assistance, please feel free to reach out to us at BPIAIA.customerservice@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }
            }
        }
    }
    else if (isFallout.toLowerCase() == 'n') {
        if (docsPending == 'y' && docsReceived == 'n'  && claimStatus == 'received') {
            var finalDocsList = '';
            requirementsList.forEach(function (item) {
                finalDocsList = finalDocsList + '<div style="display: flex;align-items: center; padding-bottom: 1px;"> <div id="outer-circle"> <div id="inner-circle"></div> </div> <p style="padding-left:7px">' + ' ' + item.name + '</p> </div>'

            });
            if(claimantFirstName !== ''){
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR OTHER CLAIMS DOCUMENTS</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We have reviewed your initial claim request submission and need the documents listed below to proceed with the assessment: </p> <br /> <p class="font-weight-normal request-font"> <div style="padding-left: 10px;"> ' + finalDocsList + ' </div> </p> <br /> <p> Don&#39;t worry, you can easily submit scanned copies of these documents via e-mail at BPIAIA.customerservice@aia.com so we can proceed with your claim request. </p > <br /> </div > ';
                document.getElementById("turnaround-time-ref").style.display = "block";
                document.getElementById("payment-ref").style.display = "none";
                twoStepperActive();
            }else {
                document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR OTHER CLAIMS DOCUMENTS</h3> <br /> <p class="font-weight-justy request-font"> We have reviewed your initial claim request submission and need the documents listed below to proceed with the assessment: </p> <br /> <p class="font-weight-normal request-font"> <div style="padding-left: 10px;"> ' + finalDocsList + ' </div> </p> <br /> <p> Don&#39;t worry, you can easily submit scanned copies of these documents via e-mail at BPIAIA.customerservice@aia.com so we can proceed with your claim request. </p > <br /> </div > ';
                document.getElementById("turnaround-time-ref").style.display = "block";
                document.getElementById("payment-ref").style.display = "none";
                twoStepperActive();
            }
        }
        else {
            if (claimStatus.toLowerCase().trim() == 'received') {
                if (beneficiaryCount == 1) {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR REQUEST IS BEING PROCESSED</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss, ' + claimantFirstName + '. </p> <br /> <p class="font-weight-justy request-font"> We have received your claim request and it is now in process. Kindly expect an SMS update on the status of your request in 7 to 10 working days . </p> <br /> <p> Should additional requirements be needed, we will reach out to you immediately. </p> <br /> <p class="font-weight-normal request-font"> To check the status of your claims request, please type in your reference number ' + transactionNumber + ' <a href="main.html">here</a>. </p> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "block";
                    document.getElementById("payment-ref").style.display = "none";
                }
                else {

                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR REQUEST IS BEING PROCESSED</h3> <br /> <p class="font-weight-justy request-font"> Our sincerest condolences for your loss. </p> <br /> <p class="font-weight-justy request-font"> We have received your claim request and it is now in process. Kindly expect an SMS update on the status of your request in 7 to 10 working days . </p> <br /> <p> Should additional requirements be needed, we will reach out to you immediately. </p> <br /> <p class="font-weight-normal request-font"> To check the status of your claims request, please type in your reference number ' + transactionNumber + ' <a href="main.html">here</a>. </p> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "block";
                    document.getElementById("payment-ref").style.display = "none";

                }
                twoStepperActive();
            }
            else if (claimStatus.toLowerCase().trim() == 'approved') {
                if (beneficiaryCount == 1) {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR PAYOUT HAS BEEN APPROVED</h3> <br /> <p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. Your claim request for BPI AIA policy no. ' + policyNumber + ' has been approved. </p> <br /> <p class="font-weight-normal request-font"> You will receive the benefit of ' + currency + ' ' + claimAmount + ' through your chosen payout method. Please expect an update from us on the release of your benefit. </p> <br /> <p class="font-weight-normal request-font"> This information has been sent to you via SMS as well for your reference. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "block";
                }
                else {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>YOUR PAYOUT HAS BEEN APPROVED</h3> <br /> <p class="font-weight-justy request-font"> We would like to let you know that your claim request for BPI AIA policy no. ' + policyNumber + ' has been approved . </p> <br /> <p class="font-weight-normal request-font"> You will receive the policy benefit through your chosen payout method. Please expect an update from us on when this will be released. </p> <br /> <p class="font-weight-normal request-font"> This information has been sent to you via SMS as well for your reference. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                }
                allStepperActive()
            }
            else if (claimStatus.toLowerCase().trim() == 'denied1') {
                if(claimantFirstName !== ''){
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The BPI AIA policy contract does not have Death coverage. </p> <br /> <p class="font-weight-normal request-font"> We are sorry that this news is coming to you at a tough time, ' + claimantFirstName + '. If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }else {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The BPI AIA policy contract does not have Death coverage. </p> <br /> <p class="font-weight-normal request-font"> We are sorry that this news is coming to you at a tough time. If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }
            }
            else if (claimStatus.toLowerCase().trim() == 'denied2') {
                if(claimantFirstName !== ''){
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The circumstances that led to the claim are not included in the provisions of the BPI AIA policy. </p> <br /> <p class="font-weight-normal request-font"> We are sorry that this news is coming to you at a tough time, ' + claimantFirstName + '. If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }else {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The circumstances that led to the claim are not included in the provisions of the BPI AIA policy. </p> <br /> <p class="font-weight-normal request-font"> We are sorry that this news is coming to you at a tough time. If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }
            }
            else if (claimStatus.toLowerCase().trim() == 'denied3') {
                if(claimantFirstName !== ''){
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The circumstances that led to the claim are not included in the provisions of the BPI AIA policy. </p> <br /> <p class="font-weight-normal request-font"> We are sorry that this news is coming to you at a tough time, ' + claimantFirstName + '. If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }else {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. The circumstances that led to the claim are not included in the provisions of the BPI AIA policy. </p> <br /> <p class="font-weight-normal request-font"> We are sorry that this news is coming to you at a tough time. If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }
            }
            else if (claimStatus.toLowerCase().trim() == 'denied4') {
                if(claimantFirstName !== ''){
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> Hi ' + claimantFirstName + '. We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your poliyc&#39;s coverage and all its benefits have ended last ' + lapsationDate + ' due to non-payment of premium. </p> <br /> <p class="font-weight-normal request-font"> We are sorry that this news is coming to you at a tough time, ' + claimantFirstName + '. If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }else {
                    document.getElementById('claim-msg-text').innerHTML = '<div > <h3>AN UPDATE ON YOUR CLAIM REQUEST</h3> <br /><p class="font-weight-justy request-font"> We reviewed the documents you submitted and we regret to inform you that we are unable to grant your claim request. Your poliyc&#39;s coverage and all its benefits have ended last ' + lapsationDate + ' due to non-payment of premium. </p> <br /> <p class="font-weight-normal request-font"> We are sorry that this news is coming to you at a tough time. If you wish to discuss the details of your claim, you may reach out to your Bancassurance Sales Executive or chat with Bessie at https://m.me/BessieofBPIAIA. You may also email us at BPI AIA_CustomerService@aia.com or call us at (02) 8528-5501. </p> <br /> </div> '
                    document.getElementById("turnaround-time-ref").style.display = "none";
                    document.getElementById("payment-ref").style.display = "none";
                    allStepperActive()
                }
            }

        }
    }

    // switch (claim_msg_type) {
    //     case 'D-1':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('D-1').innerHTML;
    //         document.getElementById("payment-ref").style.display = "block";
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     case 'D-2':
    //         document.getElementById('claim-msg-text').innerHTML = document.getElementById('D-2').innerHTML;
    //         document.getElementById("payment-ref").style.display = "block";
    //         document.getElementById("turnaround-time-ref").style.display = "none";
    //         allStepperActive()
    //         break;
    //     default: 'No message'
    //         break;
    // }
}
// functions to set the message for each claim status //

//-----functions for stepper-----//

//function to be called if all three steps are to be highlighted//
function allStepperActive() {
    $("#step1").addClass("active");
    $("#step2").addClass("active");
    $("#step3").addClass("active");
    $("#step3").addClass("done");
    document.getElementById('step-circle-1').style.backgroundColor = "#8bc435";
    document.getElementById('step-circle-1').style.borderColor = "#8bc435";
    document.getElementById('step-circle-2').style.backgroundColor = "#8bc435";
    document.getElementById('step-circle-2').style.borderColor = "#8bc435";
    document.getElementById('step-circle-3').style.backgroundColor = "#8bc435";
    document.getElementById('step-circle-3').style.borderColor = "#8bc435";


    document.getElementById('step-circle-title-1').style.color = 'black';
    document.getElementById('step-circle-title-2').style.color = 'black';
    document.getElementById('step-circle-title-3').style.color = '#8bc435';
    //change stepper bar colour based on status//
    document.getElementById('step-circle-1').style.width = '20px';
    document.getElementById('step-circle-1').style.height = '20px';
    document.getElementById('step-circle-2').style.width = '20px';
    document.getElementById('step-circle-2').style.height = '20px';
    //change stepper bar colour based on status//
    document.getElementById('step-bar-1').style.border = '1px solid #8bc435'
    document.getElementById('step-bar-2').style.border = '1px solid #8bc435'
    document.getElementById('step-bar-3').style.border = '1px solid #8bc435'
    document.getElementById('step-bar-4').style.border = '1px solid #8bc435'


}

//function to be called if only two steps are to be highlighted//
function twoStepperActive() {
    $("#step1").addClass("active");
    $("#step2").addClass("active");
    $("#step3").addClass("done");
    document.getElementById('step-circle-1').style.backgroundColor = "#b8123e";
    document.getElementById('step-circle-1').style.borderColor = "#b8123e";
    document.getElementById('step-circle-2').style.backgroundColor = "#b8123e";
    document.getElementById('step-circle-2').style.borderColor = "#b8123e";

    document.getElementById('step-circle-title-1').style.color = 'black';
    document.getElementById('step-circle-title-2').style.color = 'black';
    document.getElementById('step-circle-title-3').style.color = '#c7c2c2';

    document.getElementById('step-circle-3').style.backgroundColor = "#c7c2c2";
    document.getElementById('step-circle-3').style.borderColor = "#c7c2c2";
    //change stepper circle size based on status//
    document.getElementById('step-circle-1').style.width = '20px';
    document.getElementById('step-circle-1').style.height = '20px';
    document.getElementById('step-circle-2').style.width = '20px';
    document.getElementById('step-circle-2').style.height = '20px';
    //change stepper bar colour based on status//
    document.getElementById('step-bar-1').style.border = '1px solid rgb(184, 18, 62)'
    document.getElementById('step-bar-2').style.border = '1px solid rgb(184, 18, 62)'

}
/* -------functions for stepper------ */

function trackProgressDropDown(trackMessagesArr) {
    var disbMsg;
    if (disbursementType?.toLowerCase() == 'cta') {
        disbMsg='Bank Transfer'
    }
    else if (disbursementType?.toLowerCase() == 'pua') {
        disbMsg = 'Pick Up Anywhere'
    }
    var final_progress_result = ''
    final_progress_result = '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[0]['msg'] + claim_type.toLowerCase() + ' claim.' + '</div></div></div>' +
        '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[1]['msg'] + '</div></div></div>' +
        (claim_type == 'accident' || claim_type == 'illness' ?
        '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + 'You have chosen ' + disbMsg + ' as a preferred payout method' + '</div></div></div>' :
            beneficiaryCount == 1 ?
            '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + 'You have chosen ' + disbMsg + ' as a preferred payout method' + '</div></div></div>' :
                '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + 'You have chosen your preferred payout methods.' + '</div></div></div>')
        + (claimStatus.toLowerCase() == 'received' || claimStatus.toLowerCase() == 'approved' || claimStatus.toLowerCase() == 'received' || claimStatus.toLowerCase() == 'approved' || claimStatus.toLowerCase() == 'received' || claimStatus.toLowerCase() == 'approved' || claimStatus.toLowerCase() == 'denied1' || claimStatus.toLowerCase() == 'denied2' || claimStatus.toLowerCase() == 'denied3' || claimStatus.toLowerCase() == 'denied4'?
            '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[4]['msg'] + '</div></div></div>' : '') +
        (docsPending.toLowerCase() == 'y' && docsReceived.toLowerCase() == 'n' ?
            '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[5]['msg'] + '</div></div></div>' :
            (docsPending.toLowerCase() == 'n' && docsReceived.toLowerCase() == 'y' ?
                '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[5]['msg'] + '</div></div></div>' +
                '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[6]['msg'] + '</div></div></div>' : docsPending.toLowerCase() == 'y' && docsReceived.toLowerCase() == 'y' ? '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[5]['msg'] + '</div></div></div>' + '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[6]['msg'] + '</div></div></div>' : ''))
        + (claimStatus == 'denied1' || claimStatus == 'denied2' || claimStatus == 'denied3' || claimStatus == 'denied4' ?
            '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[7]['msg'] + '</div></div></div>' :
            '')
        + (claimStatus == 'approved' ?
            '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[8]['msg'] + '</div></div></div>' + '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[11]['msg'] + '</div></div></div>' :
            '')
        // + (claimStatus == 'approved' && disbursementType == 'CTA' && beneficiaryCount == 1  ?
        //     '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[12]['msg'] + '</div></div></div>'
        //     : claimStatus == 'approved' && disbursementType == 'PUA' && beneficiaryCount == 1 ? '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + progress_msges[9]['msg'] + '</div></div></div>' : '')
    document.getElementById('progs-status').innerHTML = final_progress_result

    //--before integration--//
    // //to be reomvesd -testing
    // if (claim_msg_type == 'A-1') {
    //     trackMessagesArr = [1, 4, 5, 7, 8] // for testing - to be removed
    // }
    // if (claim_msg_type == 'I-2') {
    //     trackMessagesArr = [2, 4, 6, 7, 8, 9, 11] // for testing - to be removed
    // }

    // if (claim_msg_type == 'D-2') {
    //     trackMessagesArr = [3, 4, 6, 7, 11, 12] // for testing - to be removed
    // }
    // else {
    //     trackMessagesArr = [1, 4, 5, 7, 8] // for testing - to be removed
    // }
    // //to be reomved -testing

    // var finaltext = '';
    // trackMessagesArr.forEach(function (item) {
    //     progress_msges.forEach(function (msg) {
    //         if (item == msg['id']) {
    //             finaltext = finaltext + '<div class="step step-active"><div><div class="circle " id="circle2"><i class="fa fa-check" ></i ></div ></div><div><div class="title">' + msg['msg'] + '</div></div></div>'
    //             // break;
    //         }

    //     })

    // });
    // console.log('finaltext' + finaltext)
    // document.getElementById('progs-status').innerHTML = finaltext // set the populated dropdown details to html
}


/* function to display date at top in the claim status screen */

function displayDateForClaimStatus() {
    var date = new Date();

    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };

    var x = date.toLocaleDateString("en", options);
    var parts = x.split(',');
    var day = parts[0];
    var mnthDate = parts[1].split(' ')[1];
    var year = parts[2];
    var time = parts[3];
    var finalDate = day + ' ' + date.getDate() + ' ' + mnthDate + year + ' at ' + time;
    document.getElementById("displayDt").innerHTML = finalDate
}



function selectAnswer(quesn_num, id, selectedOption) {

    var idList = ['a11', 'a12', 'a13', 'a14', 'a15', 'a21', 'a22', 'a23', 'a24', 'a25', 'a31', 'a32', 'a33',
        'a34', 'a35', 'a36', 'a37', 'a38', 'a39', 'a310'];
    if (quesn_num == 1) {
        for (var i = 0; i <= 4; i++) {
            if ($('#' + idList[i]).hasClass('survey_btn_selected')) {
                $('#' + idList[i]).removeClass('survey_btn_selected');
                $('#' + idList[i]).addClass('survey_btn');
            }
        }
    }
    else if (quesn_num == 2) {

        for (var i = 5; i <= 9; i++) {
            if ($('#' + idList[i]).hasClass('survey_btn_selected')) {
                $('#' + idList[i]).removeClass('survey_btn_selected');
                $('#' + idList[i]).addClass('survey_btn');
            }
        }

    }
    else if (quesn_num == 3) {

        for (var i = 10; i <= 19; i++) {
            if ($('#' + idList[i]).hasClass('survey_btn_selected')) {
                $('#' + idList[i]).removeClass('survey_btn_selected');
                $('#' + idList[i]).addClass('survey_btn');
            }
        }

    }

    if ($('#' + id).hasClass('survey_btn_selected')) { $('#' + id).removeClass('survey_btn_selected'); }
    else {
        if ($('#' + id).hasClass('survey_btn')) {
            $('#' + id).removeClass('survey_btn');
            $('#' + id).addClass('survey_btn_selected');
        }
        else {
            $('#' + id).addClass('survey_btn_selected');

        }

    }
    if (quesn_num == 1) {
        surveyQues1 = 'surveyQuestion1';
        surveyAns1 = selectedOption
    }
    else if (quesn_num == 2) {
        surveyQues2 = 'surveyQuestion2';
        surveyAns2 = selectedOption
    }
    else if (quesn_num == 3) {
        surveyQues3 = 'surveyQuestion3';
        surveyAns3 = selectedOption
    }
    surveyObj = { 'surveyQuestion1': surveyAns1, 'surveyQuestion2': surveyAns2, 'surveyQuestion3': surveyAns3 }


}

function submit_survey(event) {

    event.preventDefault();
    // if (org_sourceSystem == '' || org_sourceSystem == null) {
    //     org_sourceSystem = 'cms'
    // }
    var survey_data =
    {
        'companyName': 'BPLAC',
        'TIPSReferenceNumber': referenceNumber,
        'type': org_claimType,
        'subType': org_claimSubType,
        'policyNumber': policyNumber,
        'sourceSystem': org_sourceSystem,
        'surveyQuestion1': surveyAns1,
        'surveyQuestion2': surveyAns2,
        'surveyQuestion3': surveyAns3
    };
    // survey_data['companyName'] = 'BPLAC';
    // survey_data['TIPSReferenceNumber'] = referenceNumber;
    // survey_data['sourceSystem'] = sourceSystem;
    // survey_data['surveyQuestion1'] = surveyAns1;
    // survey_data['surveyQuestion2'] = surveyAns2;
    // survey_data['surveyQuestion3'] = surveyAns3;

    // let surveyData = {
    //     stageOne: true,
    //     type: "survey",
    //     referenceNumber: referenceNumber,
    //     data: survey_data
    // }
    var finalPayload = {}
    var raw = JSON.stringify(survey_data)

    var source = 'main';
    finalPayload['source'] = source;
    finalPayload['data'] = raw;
    $('#cover-spin').show(0)
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "customerSurvey",
                data: finalPayload
            }
        })
    }), '*');
    window.addEventListener('message', function (eventData) {

       
        // console.log(event.data.event_code)
        try {

            if (eventData.data) {
             
                // console.log(event)
                let event = JSON.parse(eventData.data);
                if (event.event_code == 'surveryResponse') { //sucess
                   
                    console.log("receiving survey event in acc")
                    if (event.data.returnCode == '0' || event.data.retCode == '0') {
                        var nodes = document.getElementById("customer_survey").getElementsByTagName('*');
                        for (var i = 0; i < nodes.length; i++) {
                            nodes[i].disabled = true;
                            nodes[i].style.cursor = 'no-drop'

                        }
                        document.getElementById("customer_survey").style.opacity = '0.65'
                        $('#cover-spin').hide(0)
                        $("#successfullSurvey").modal("show");
                    } else {
                        $('#cover-spin').hide(0)
                        document.getElementById('returnMessage').innerHTML = event.data.returnMessage;
                        $("#invalidReturnCode").modal("show");

                    }
                }
                else {

                }
            }
        } catch (error) {
            console.log(error)
        }

    })




    // var nodes = document.getElementById("customer_survey").getElementsByTagName('*');
    // for (var i = 0; i < nodes.length; i++) {
    //     nodes[i].disabled = true;
    //     nodes[i].style.cursor = 'no-drop'

    // }
    // document.getElementById("customer_survey").style.opacity = '0.65'



    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify({ "companyName": "BPLAC", "TIPSReferenceNumber": referenceNumber, 'surveyQuestion1': surveyAns1, 'surveyQuestion2': surveyAns2, 'surveyQuestion3': surveyAns3, "sourceSystem": sourceSystem, });
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw
    // };
    // fetch("http://localhost:3000/survey", requestOptions).then((response) => response.json())
    //     .then(response => {

    //         if (response.returnCode == '0') {

    //             var nodes = document.getElementById("customer_survey").getElementsByTagName('*');
    //             for (var i = 0; i < nodes.length; i++) {
    //                 nodes[i].disabled = true;
    //                 nodes[i].style.cursor = 'no-drop'

    //             }
    //             document.getElementById("customer_survey").style.opacity = '0.65'
    //         }

    //     }).catch(error => {
    //         console.log(error)
    //     });
}
function closeModal() {
    location.reload();
}
function backToFileClaim() {

    window.location.href = "main";


}


var validateRefNumber = false;
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        $(`#err_field_ref_num`).text('Only numbers allowed!');
        $(`#err_field_ref_num`).show();
        // document.getElementById('go-btn').disabled = true;
        // document.getElementById('go-btn').style.cursor = 'no-drop'
        // document.getElementById('go-btn').style.opacity = '0.65'
        validateRefNumber = false;
        return false;

    }
    $(`#err_field_ref_num`).text('');
    $(`#err_field_ref_num`).hide();
    // document.getElementById('go-btn').disabled = false;
    // document.getElementById('go-btn').style.cursor = 'pointer'
    validateRefNumber = true
    return true;
}
function checkLength(evt, max_Length) {
    let id = evt.target.id;
    var val = document.getElementById(id).value;
    var length = val.length;
    if (length >= max_Length) {
        $(`#err_field_ref_num`).text("Maximum " + max_Length + " digits allowed!");
        $(`#err_field_ref_num`).show();
        // document.getElementById('go-btn').disabled = true;
        // document.getElementById('go-btn').style.cursor = 'no-drop'
        // document.getElementById('go-btn').style.opacity = '0.65'
        validateRefNumber = false;
    } else {
        validateRefNumber = true;
        // document.getElementById('go-btn').disabled = false;
        // document.getElementById('go-btn').style.cursor = 'pointer'
        detection(evt);
    }
}

function checkSpcialChar(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (!((evt.charCode >= 65) && (evt.charCode <= 90) || (evt.charCode >= 97)
        && (evt.charCode <= 122) || (evt.charCode >= 48) && (evt.charCode <= 57) || (evt.charCode == 32) || (evt.charCode == 13))) {
        $(`#err_field_ref_num`).text("special character is not allowed");
        $(`#err_field_ref_num`).show();
        // document.getElementById('go-btn').disabled = true;
        // document.getElementById('go-btn').style.cursor = 'no-drop'
        // document.getElementById('go-btn').style.opacity = '0.65'
        validateRefNumber = false;
        return false;
    }
    $(`#err_field_ref_num`).text("");
    $(`#err_field_ref_num`).hide();
    // document.getElementById('go-btn').disabled = false;
    // document.getElementById('go-btn').style.cursor = 'pointer'
    validateRefNumber = true;
    return true;
}
function detection(evt) {
    id = evt.target.id;
    document.getElementById(id).addEventListener('keydown', event => {
        if (event.key == 'Backspace') {
            $(`#err_field_ref_num`).text("");
            $(`#err_field_ref_num`).hide();
        }
    })
}

function specialcharacterValidation(input) {
    var regex = /^[A-Za-z0-9 ]+$/
    var val = regex.test(input);
    if (!val) {
        return true;
    } else {
        return false;
    }
}

function onlyNumberValidate(input) {
    var regex = /^[0-9]*$/;
    var val = regex.test(input);
    if (val) {
        return true;
    } else {
        return false;
    }
}

function fieldCheckLength(field, maxLength) {
    var length = field.length;
    if (length > maxLength) {
        return true;
    }
    else {
        return false;
    }
}
//