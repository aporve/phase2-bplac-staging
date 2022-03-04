/* var stepper2
var stepper3
var stepper4
var stepperForm
var stepperFormEl */

var currSeconds = 0;

var form = document.getElementById("illness__form");
var form_Bank = document.getElementById("bank_form");
var listCheckBox = document.querySelector('#illness_upload_invalidCheck_1');
var file1 = document.getElementById('illness_file_Upload_1');
var file2 = document.getElementById('illness_file_Upload_2');
var file3 = document.getElementById('illness_file_Upload_3');
var file5 = document.getElementById('illness_file_Upload_5');
var file6 = document.getElementById('proof_BAO');
var file7 = document.getElementById('proof_addBAO');
var scanDoc = false;
haveBankDetails = false;
var user_mobile;
var fileSizeZero = false;
$('#privacy_consent_1').prop('checked', true);
$('#privacy_consent_2').prop('checked', true);
// $('#privacy_consent_3').prop('checked', true);

document.getElementById('upload_waiting_btn').style.display = 'none'
// document.getElementById('account_details1_btn_waiting').style.display = 'none'
// document.getElementById('pick_up_btn_waiting').style.display = 'none'
// document.getElementById('submit9_waiting_btn').style.display = 'none'


let url = new URL(window.location.href);
let referenceNumber = url.searchParams.get('refNumber');
let uid = url.searchParams.get('sender');
let botId = url.searchParams.get('botId');

form.addEventListener('submit', handleForm);
form_Bank.addEventListener('submit', handleAccountInfo);

var form_addBank = document.getElementById("addbank_form");
form_addBank.addEventListener('submit', handleAddBankInfo);
let beneficiaryCount = "1";
let finalPayload = {};
let accidentPayload = {};
let basicInformation = {};
let InsuredInformation = {};
let BeneficiaryList = {};
let PaymentOption = {};
let BankDetails = {};
let FilesInformation = {};
let filesList = [];
let filesMap = {};
var payoutOption;
var isChangeInBankDetails = 'N';
var isChangeInPayoutOption = 'N';
var isOtpPopShown = false;
let claimType, causeOfLoss, govIdFront, govIdBack, apsFile, narrationReport, officialReceipts;
let file1Buffer, file2Buffer, file3Buffer, file4Buffer, file5Buffer, file6Buffer, file7Buffer, file8Buffer;
basicInformation["companyName"] = "BPLAC";
basicInformation["claimType"] = "Living";
basicInformation["causeOfLoss"] = "Illness";
basicInformation["webReferenceNumber"] = referenceNumber;
var otpSubmitted = false;
/* document.addEventListener('DOMContentLoaded', function () {
    stepperFormEl = document.querySelector('#stepperForm')
    stepperForm = new Stepper(stepperFormEl, {
        animation: true
    })
}) */

function myDisable() {
    document.getElementById("submit9").disabled = true;
    document.getElementById("submit9").style.cursor = "no-drop";
    document.getElementById("field_AccountName").disabled = true;
    document.getElementById("field_AccountName").style.cursor = "no-drop";
    document.getElementById("field_AccountNumber").disabled = true;
    document.getElementById("field_AccountNumber").style.cursor = "no-drop";
    document.getElementById("field_Bank").disabled = true;
    document.getElementById("field_Bank").style.cursor = "no-drop";
    document.getElementById("field_Branch").disabled = true;
    document.getElementById("field_Branch").style.cursor = "no-drop";
    document.getElementById("from_currency").disabled = true;
    document.getElementById("from_currency").style.cursor = "no-drop";
    document.getElementById("proof_BAO").disabled = true;
    document.getElementById("proof_BAO").style.cursor = "no-drop";
    document.getElementById("back_btn1").style.cursor = "no-drop";
    document.getElementById("back_btn1").style.pointerEvents = "none";
    document.getElementById("bank_form").style.cursor = "no-drop";
}

function addFileToList(fileObject, fileName) {
    console.log("in function, with name : ");
    console.log(fileName);
    let index = filesList.findIndex(x => x.Filename == fileName)

    if (index === -1) {
        console.log("adding bcoz unique");
        filesList.push(fileObject);
    }
}

function enableDottedLoader() {
    document.getElementById('files_upload_btn').style.display = 'none'
    document.getElementById('upload_waiting_btn').style.display = 'block'

    document.getElementById('account_details1_btn').style.display = 'none'
    // document.getElementById('account_details1_btn_waiting').style.display = 'block'


    document.getElementById('pick_up_btn').style.display = 'none'
    // document.getElementById('pick_up_btn_waiting').style.display = 'block'

    document.getElementById('submit9').style.display = 'none'
    // document.getElementById('submit9_waiting_btn').style.display = 'block'
}
function disableDottedLoader() {
    document.getElementById('files_upload_btn').style.display = 'block'
    document.getElementById('files_upload_btn').disabled = "false";
    document.getElementById("files_upload_btn").style.cursor = "pointer";
    document.getElementById('upload_waiting_btn').style.display = 'none'

    document.getElementById('account_details1_btn').style.display = 'block'
    // document.getElementById('account_details1_btn_waiting').style.display = 'none'

    document.getElementById('pick_up_btn').style.display = 'block'
    // document.getElementById('pick_up_btn_waiting').style.display = 'none'

    document.getElementById('submit9').style.display = 'block'
    // document.getElementById('submit9_waiting_btn').style.display = 'none'
}
let cleartime = null;
function timer(lowerVal, UpperVal) {

    var random = 1
    return new Promise((resolve, reject) => {
        var i = lowerVal
        cleartime = setInterval(() => {
            i = random + i;
            renderProgress(i)
            if (i == (UpperVal - 1)) {
                i = UpperVal;
                renderProgress(i)
            }
            if (i == UpperVal) {

                console.log("cleartime");
                clearTimeout(cleartime);
                resolve("cleartime")
            }
            //  i++;
        }, 500);
    })
}

function renderProgress(progress) {
    progress = Math.floor(progress);
    if (progress < 25) {
        var angle = -90 + (progress / 100) * 360;
        $(".animate-0-25-b").css("transform", "rotate(" + angle + "deg)");
    }
    else if (progress >= 25 && progress < 50) {
        var angle = -90 + ((progress - 25) / 100) * 360;
        $(".animate-0-25-b").css("transform", "rotate(0deg)");
        $(".animate-25-50-b").css("transform", "rotate(" + angle + "deg)");
    }
    else if (progress >= 50 && progress < 75) {
        var angle = -90 + ((progress - 50) / 100) * 360;
        $(".animate-25-50-b, .animate-0-25-b").css("transform", "rotate(0deg)");
        $(".animate-50-75-b").css("transform", "rotate(" + angle + "deg)");
    }
    else if (progress >= 75 && progress <= 100) {
        var angle = -90 + ((progress - 75) / 100) * 360;
        $(".animate-50-75-b, .animate-25-50-b, .animate-0-25-b")
            .css("transform", "rotate(0deg)");
        $(".animate-75-100-b").css("transform", "rotate(" + angle + "deg)");
    }
    $(".text").html(progress + "%");
}


$(document).ready(function (event) {
    disableFutureDates();
    disableFutureDatesDOB();
    setCountryCode();
    let idleInterval = setInterval(timerIncrement, 1000);
    $(this).mousemove(resetTimer);
    $(this).keypress(resetTimer);

    var val = 'Peso';
    if (val == "Peso") {
        $("#field_Bank").html(
            "<option value='BPI'>Bank of the Philippine Islands - BPI</option><option value='BFB'>BPI Family Savings Bank - BFB</option>"
        );
    }

    $("#from_currency").change(function () {
        var val = $(this).val();
        if (val == "Peso") {
            $("#field_Bank").html(
                "<option value='BPI'>Bank of the Philippine Islands - BPI</option><option value='BFB'>BPI Family Savings Bank - BFB</option>"
            );
        } else if (val == "USD") {
            $("#field_Bank").html(
                "<option value='BPI'>Bank of the Philippine Islands - BPI</option>"
            );
        }
    });
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


/* Check Date should not be in future */
function futureDate(date) {
    /*   let id = evt.target.id;
      var date1 = document.getElementById(id).value; */
    var res = date.split('-');
    var year = res[0];
    var Month = Number(res[1]);
    var day = res[2];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = Number(String(today.getMonth() + 1).padStart(2, '0')); //January is 0!
    var yyyy = today.getFullYear();
    /* This is for safari, not good way to handle */
    if (day.length == 4) {

        if (day < yyyy) {
            return true;
        } else if (day > yyyy) {
            return false
        }
        else {
            if (day = yyyy) {
                if (Month < mm) {
                    return true;
                }
                else if (Month == mm) {
                    if (year <= dd) {
                        return true;
                    } else {
                        return false;
                    }
                }
                else {
                    return false;
                }

            }
            else {
                return false;
            }

        }

    } else {
        if (year < yyyy) {
            return true;
        } else if (year > yyyy) {
            return false
        }
        else {
            if (year == yyyy) {
                if (Month < mm) {
                    return true;
                }
                else if (Month == mm) {
                    if (day <= dd) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}

function addBank(event) {
    event.preventDefault();
    $('#account_details').hide();
    $('#requirements').hide();
    $('#account_details1').show();
    event.target.value = '';
    /*   $('#account_details1')[0].scrollIntoView(true); */
}
function futureDateDOB(date) {
    /*   let id = evt.target.id;
      var date1 = document.getElementById(id).value; */
    var res = date.split('-');
    var year = res[0];
    var Month = res[1];
    var day = res[2];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    //   console.log("Logged-In Date:" + day, Month, year)
    //   console.log("System Date:" + dd, mm, yyyy)

    /* This is for safari, not good way to handle */
    if (day.length == 4) {
        if ((day == yyyy) && (Month == mm) && (year == dd)) {
            return false;
        }
        else {
            return true;
        }
    } else {
        if ((year == yyyy) && (Month == mm) && (day == dd)) {
            return false;
        } else {
            return true;
        }
    }
}


function disableFutureDates() {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    $('#field_DOA').attr('max', maxDate);
    $('#field_TOA').attr('max', maxDate);
    $('#field_POA').attr('max', maxDate);
}


function disableFutureDatesDOB() {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var dobdate = day - 1
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + dobdate;
    if (day <= 10) {
        maxDate = year + '-' + month + '-' + '0' + dobdate;
    }
    $('#field_DOB').attr('max', maxDate);
}



function setCountryCode() {
    $('#inlineFormCustomSelect').change(function () {
        $('select option')[0].value = $('select option:selected').val();
        $('select option')[0].innerHTML = '+' + $('select option:selected').val();
        $("select").val($('select option:selected').val());
        $("select option").css({ "background-color": "", "color": "" });
    });
}

/**
 * 
 * New function
 * instead of giving a PDF the as result
 * you will be getting the cdn link to the file in the bot
 */
const handleFileUpload = (formData, fileName) => {
    console.log("file upload new");
    var myHeaders = new Headers();

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    };
    fetch(`https://app.yellowmessenger.com/api/chat/upload-file?bot=${botId}&uid=${fileName}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log("reading file")
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const checkForVirus = (fileData) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "data": fileData, "type": "base64" });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };
    return fetch("https://app.yellowmessenger.com/components/virus-scanner/scan", requestOptions);
}

listCheckBox.onchange = function () {
    if ($(listCheckBox).is(':checked')) {
        $('.feedback_label').show();
    } else {
        $('.feedback_label').hide();
    }
}

/* function loader() {
    var btnNextList = [].slice.call(document.querySelectorAll('.btn-next-form'))
    var stepperPanList = [].slice.call(stepperFormEl.querySelectorAll('.bs-stepper-pane'))
    var inputMailForm = document.getElementById('inputMailForm')
    var inputPasswordForm = document.getElementById('inputPasswordForm')
    var form = stepperFormEl.querySelector('.bs-stepper-content form')

    btnNextList.forEach(function (btn) {
        btn.addEventListener('click', function () {
            stepperForm.next()
        })
    })

    stepperFormEl.addEventListener('show.bs-stepper', function (event) {
        form.classList.remove('was-validated')
        var nextStep = event.detail.indexStep
        var currentStep = nextStep

        if (currentStep > 0) {
            currentStep--
        }

        var stepperPan = stepperPanList[currentStep]

        if ((stepperPan.getAttribute('id') === 'test-form-1' && !inputMailForm.value.length)
            || (stepperPan.getAttribute('id') === 'test-form-2' && !inputPasswordForm.value.length)) {
            event.preventDefault()
            form.classList.add('was-validated')
        }
    })
}
 */
/* 
 function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField) == false) {
        $("#err_field_emailAddress").text('Invalid Email');
        $("#err_field_emailAddress").show();
        return false;
    }
    $("#err_field_emailAddress").text('');
    $("#err_field_emailAddress").hide();
    return true;
} */

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        $(`#err_${evt.target.id}`).text('Only numbers allowed!');
        $(`#err_${evt.target.id}`).show();
        return false;
    }
    $(`#err_${evt.target.id}`).text('');
    $(`#err_${evt.target.id}`).hide();
    return true;
}

function checkSpcialChar(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (!((evt.charCode >= 65) && (evt.charCode <= 90) || (evt.charCode >= 97)
        && (evt.charCode <= 122) || (evt.charCode >= 48) && (evt.charCode <= 57) || (evt.charCode == 32) || (evt.charCode == 13))) {
        $(`#err_${evt.target.id}`).text("special character is not allowed");
        $(`#err_${evt.target.id}`).show();
        return false;
    }
    $(`#err_${evt.target.id}`).text("");
    $(`#err_${evt.target.id}`).hide();
    return true;
}

function isNotNumber(evt) {
    $(`#err_${evt.target.id}`).text("");
    $(`#err_${evt.target.id}`).hide();
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) || (evt.charCode == 13)) {
        $(`#err_${evt.target.id}`).text('');
        $(`#err_${evt.target.id}`).hide();
        return true;
    }
    validateNotNumber(evt)
    return false;
}

function validateNotNumber(evt) {
    let id = evt.target.id;
    $(`#err_${id}`).text("Numbers not allowed");
    $(`#err_${id}`).show();
    return;
}

function specialcharacterValidation(input) {
    var regex = /^[A-Za-z0-9 ]+$/
    var firstNameValid = regex.test(input);
    if (!firstNameValid) {
        return true;
    } else {
        return false;
    }
}



function checkLength(evt, max_Length) {
    let id = evt.target.id;
    var val = document.getElementById(id).value;
    var length = val.length;
    if (length >= max_Length) {
        $(`#err_${id}`).text("Maximum " + max_Length + " characters allowed!");
        $(`#err_${id}`).show();
    } else {
        detection(evt);
    }

}

function detection(evt) {
    id = evt.target.id;
    document.getElementById(id).addEventListener('keydown', event => {
        if (event.key == 'Backspace') {
            $(`#err_${id}`).text("");
            $(`#err_${id}`).hide();
        }
    })
}


function check_Mobile_Length(evt, max_Length) {
    let id = evt.target.id;
    var val = document.getElementById(id).value;
    var length = val.length;
    if (length !== max_Length) {
        detection(evt);
    } else {
        console.log(length, max_Length)
        $(`#err_${id}`).text("Maximum " + max_Length + " number allowed!");
        $(`#err_${id}`).show();
    }
}

function numberValidation(input) {
    var regex = /^([^0-9]*)$/;
    var firstNameValid = regex.test(input);
    if (!firstNameValid) {
        return true;
    } else {
        return false;
    }
}


function onlyNumberValidate(input) {
    var regex = /^[0-9]*$/;
    var firstNameValid = regex.test(input);
    if (firstNameValid) {
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

function process(date) {
    var parts = date.split("-");
    if (parts[2].length == 4) {
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }
    else {
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }
}

//function passing all dates
function checkDob(dob, date1, date2, date3) {
    if (process(dob) <= process(date1))// && (process(dob) >= process(date2)) && (process(dob) >= process(date3)))       
    {
        if (process(dob) <= process(date2)) {
            if (process(dob) <= process(date3)) {
                if (process(date1) <= process(date2)) {
                    if (process(date1) <= process(date3)) {
                        if (process(date3) <= process(date2)) {
                            return 1;
                        }
                        else {
                            return 2;
                        }
                    }
                    else {
                        return 3;
                    }
                }
                else {
                    return 4;
                }

            }
            else {
                return 5;
            }
        }
        else {
            return 6;
        }
    }
    else {
        return 7;
    }
    return
}


function handleForm(event) {
    event.preventDefault();
    var field_firstName = $("#field_firstName").val();
    var field_middleName = $("#field_middleName").val();
    var field_MedicalConsultation = $("#field_MedicalConsultation").val();
    var field_lastName = $("#field_lastName").val();
    var field_lastName_Suffix = $("#field_lastName_Suffix").val();
    var field_DOB = $("#field_DOB").val();
    var field_mobileNum = $("#field_mobileNum").val();
    var field_emailAddress = $("#field_emailAddress").val();
    var field_homeAddress = $("#field_homeAddress").val();
    var field_DOA = $("#field_DOA").val();
    var field_TOA = $("#field_TOA").val();
    var field_POA = $("#field_POA").val();
    var specFirstName = specialcharacterValidation(field_firstName);
    var specMiddleName = specialcharacterValidation(field_middleName);
    var specLastName = specialcharacterValidation(field_lastName);
    var numFirstName = numberValidation(field_firstName);
    var numMiddleName = numberValidation(field_middleName)
    var numLastName = numberValidation(field_lastName);
    var numMobile = onlyNumberValidate(field_mobileNum);
    var specLastNameSuffix = false;
    var numLastNameSuffix = false;
    var lenLastNameSuffix = false;

    if (field_lastName_Suffix != 0) {
        specLastNameSuffix = specialcharacterValidation(field_lastName_Suffix);
        numLastNameSuffix = numberValidation(field_lastName_Suffix);
        lenLastNameSuffix = fieldCheckLength(field_lastName_Suffix, 3);
    }

    if (field_DOB.length !== 0) {
        var futDOB = futureDate(field_DOB);
        var futExistDOB = futureDateDOB(field_DOB);
    }

    if (field_DOA.length !== 0) {
        var futDOA = futureDate(field_DOA);
    }

    if (field_TOA.length !== 0) {
        var futTOA = futureDate(field_TOA);
    }

    if (field_POA.length !== 0) {
        var futPOA = futureDate(field_POA);
    }

    if (field_firstName.length === 0) {
        $("#err_field_firstName").text('Field is empty');
        $("#err_field_firstName").show();
    } else if (specFirstName == true) {
        $("#err_field_firstName").text('Special character is not allowed');
        $("#err_field_firstName").show();
    } else if (numFirstName) {
        $("#err_field_firstName").text('Number is not allowed');
        $("#err_field_firstName").show();
    } else {
        $("#err_field_firstName").text('');
        $("#err_field_firstName").hide();
    }

    if (field_middleName.length === 0) {
        $("#err_field_middleName").text('Field is empty');
        $("#err_field_middleName").show();
    } else if (specMiddleName) {
        $("#err_field_middleName").text('Special character is not allowed');
        $("#err_field_middleName").show();
    } else if (numMiddleName) {
        $("#err_field_middleName").text('Number is not allowed');
        $("#err_field_middleName").show();
    } else {
        $("#err_field_middleName").text('');
        $("#err_field_middleName").hide();
    }

    if (field_MedicalConsultation.length === 0) {
        $("#err_field_MedicalConsultation").text('Field is empty');
        $("#err_field_MedicalConsultation").show();
    } else {
        $("#err_field_MedicalConsultation").text('');
        $("#err_field_MedicalConsultation").hide();
    }

    if (field_lastName.length === 0) {
        $("#err_field_lastName").text('Field is empty');
        $("#err_field_lastName").show();
    } else if (specLastName) {
        $("#err_field_lastName").text('Special character is not allowed');
        $("#err_field_lastName").show();
    } else if (numLastName) {
        $("#err_field_lastName").text('Number is not allowed');
        $("#err_field_lastName").show();
    } else {
        $("#err_field_lastName").text('');
        $("#err_field_lastName").hide();
    }

    if (field_lastName_Suffix.length === 0) {
        $("#err_field_lastName_Suffix").text('');
        $("#err_field_lastName_Suffix").hide();
    } else if (lenLastNameSuffix) {
        $("#err_field_lastName_Suffix").text('Maximum 3 characters allowed!');
        $("#err_field_lastName_Suffix").show();
    } else if (specLastNameSuffix) {
        $("#err_field_lastName_Suffix").text('Special character is not allowed');
        $("#err_field_lastName_Suffix").show();
    } else if (numLastNameSuffix) {
        $("#err_field_lastName_Suffix").text('Number not allowed');
        $("#err_field_lastName_Suffix").show();
    } else {
        $("#err_field_lastName_Suffix").text('');
        $("#err_field_lastName_Suffix").hide();
    }

    if (field_DOB.length === 0) {
        $("#err_field_DOB").text('Field is empty');
        $("#err_field_DOB").show();
    } else if (!futDOB) {
        $("#err_field_DOB").text('Future date is  not Accepted!');
        $("#err_field_DOB").show();
    } else if (!futExistDOB) {
        $("#err_field_DOB").text('Current date is  not Applicable!');
        $("#err_field_DOB").show();
    } else {
        $("#err_field_DOB").text('');
        $("#err_field_DOB").hide();
    }

    if (field_mobileNum.length === 0) {
        $("#err_field_mobileNum").text('Field is empty');
        $("#err_field_mobileNum").show();
    } else if (!numMobile) {
        $("#err_field_mobileNum").text('Only number is allowed!');
        $("#err_field_mobileNum").show();
    } else if (field_mobileNum.length !== 10) {
        $("#err_field_mobileNum").text('Minimum 10 number allowed!');
        $("#err_field_mobileNum").show();
    } else {
        $("#err_field_mobileNum").text('');
        $("#err_field_mobileNum").hide();
    }

    if (field_emailAddress.length === 0) {
        $("#err_field_emailAddress").text('Field is empty');
        $("#err_field_emailAddress").show();
    } else {
        validateEmail(field_emailAddress);

    }

    if (field_homeAddress.length === 0) {
        $("#err_field_homeAddress").text('Field is empty');
        $("#err_field_homeAddress").show();
    } else {
        $("#err_field_homeAddress").text('');
        $("#err_field_homeAddress").hide();
    }

    if (field_DOA.length === 0) {
        $("#err_field_DOA").text('Field is empty');
        $("#err_field_DOA").show();
    } else if (!futDOA) {
        $("#err_field_DOA").text('Future date is  not Accepted!');
        $("#err_field_DOA").show();
    } else {
        $("#err_field_DOA").text('');
        $("#err_field_DOA").hide();
    }

    if (field_TOA.length === 0) {
        $("#err_field_TOA").text('Field is empty');
        $("#err_field_TOA").show();
    } else if (!futTOA) {
        $("#err_field_TOA").text('Future date is  not Accepted!');
        $("#err_field_TOA").show();
    } else {
        $("#err_field_TOA").text('');
        $("#err_field_TOA").hide();
    }

    if (field_POA.length === 0) {
        $("#err_field_POA").text('Field is empty');
        $("#err_field_POA").show();
    } else if (!futPOA) {
        $("#err_field_POA").text('Future date is  not Accepted!');
        $("#err_field_POA").show();
    } else {
        $("#err_field_POA").text('');
        $("#err_field_POA").hide();
    }

    if (!$('#invalidCheck_basic').is(':checked')) {
        $("#err_invalidCheck_basic").text('Please select the field');
        $("#err_invalidCheck_basic").show();
    } else {
        $("#err_invalidCheck_basic").text('');
        $("#err_invalidCheck_basic").hide();
    }

    if (!$('#invalidCheck_privacy').is(':checked')) {
        $("#err_invalidCheck_privacy").text('Please select the field');
        $("#err_invalidCheck_privacy").show();
    } else {
        $("#err_invalidCheck_privacy").text('');
        $("#err_invalidCheck_privacy").hide();
    }

    var comparingDob = 0;
    if ((field_DOB.length != 0) && (field_DOA.length != 0) && (field_TOA.length != 0) && (field_POA.length != 0)) {
        comparingDob = checkDob(field_DOB, field_DOA, field_TOA, field_POA);
        if (comparingDob == 0) {
            /*nothing to do*/
        } else
            if (comparingDob == 1) {
                /*nothing to do*/
            } else
                if (comparingDob == 2) {
                    $("#err_field_TOA").text('Root cause date can not be lesser than doctor visit date');
                    $("#err_field_TOA").show();

                } else
                    if (comparingDob == 3) {
                        $("#err_field_POA").text('Doctor visit Date can not be lesser than symptom date');
                        $("#err_field_POA").show();

                    } else
                        if (comparingDob == 4) {
                            $("#err_field_TOA").text('Root cause date can not be lesser than symptom date');
                            $("#err_field_TOA").show();

                        } else
                            if (comparingDob == 5) {
                                $("#err_field_POA").text('Doctor visit date can not be lesser than DOB');
                                $("#err_field_POA").show();

                            } else
                                if (comparingDob == 6) {
                                    $("#err_field_TOA").text('Root cause date can not be lesser than DOB');
                                    $("#err_field_TOA").show();
                                } else
                                    if (comparingDob == 7) {
                                        $("#err_field_DOA").text('Symptom date can not be lesser than DOB');
                                        $("#err_field_DOA").show();
                                    } else { }
    }
    if (
        field_firstName.length !== 0 &&
        field_middleName.length !== 0 &&
        field_MedicalConsultation.length !== 0 &&
        field_lastName.length !== 0 &&
        field_DOB.length !== 0 &&
        field_mobileNum.length == 10 &&
        field_emailAddress.length !== 0 &&
        validateEmail(field_emailAddress) &&
        field_homeAddress.length !== 0 &&
        field_DOA.length !== 0 &&
        field_TOA.length !== 0 &&
        field_POA.length !== 0 &&
        $("#invalidCheck_basic").is(":checked") &&
        $("#invalidCheck_privacy").is(":checked") &&
        (specFirstName == false) &&
        (specMiddleName == false) &&
        (specLastName == false) &&
        (numFirstName == false) &&
        (numMiddleName == false) &&
        (numLastName == false) &&
        (numMobile == true) &&
        (futDOB == true) &&
        (futExistDOB == true) &&
        (futDOA == true) &&
        (futPOA == true) &&
        (futTOA == true) &&
        (specLastNameSuffix == false) &&
        (numLastNameSuffix == false) &&
        (comparingDob == 1)
    ) {
        const data = {
            field_firstName,
            field_middleName,
            field_MedicalConsultation,
            field_lastName,
            field_lastName_Suffix,
            field_DOB,
            country_code: $("select#inlineFormCustomSelect option")
                .filter(":selected")
                .val(),
            field_mobileNum,
            field_emailAddress,
            field_homeAddress,
            field_DOA,
            field_TOA,
            field_POA,
            basic_checkbox: $("#invalidCheck_basic").is(":checked"),
            privacy_checkbox: $("#invalidCheck_privacy").is(":checked"),
            privacy_consent_1: $("#privacy_consent_1").is(":checked"),
            privacy_consent_2: $("#privacy_consent_2").is(":checked"),
            // privacy_consent_3: $("#privacy_consent_3").is(":checked"),
        };

        $("#err_privacy_consent").text("");
        $("#err_privacy_consent").hide();
        $("#form_wrapper").hide();
        $("#stepper_intro").hide();
        $("#illness_data_privacy").hide();
        $("#step1").addClass("done");
        $("#step2").addClass("active");
        $("#step2>div").addClass("active");
        $("#requirements").show();
        $("#customer_Name").text(`Hi ${field_firstName}. Hang in there as we process your request. Expect an SMS from us within 7 to 10 working days on the status of your request.`);
        /* $('#requirements')[0].scrollIntoView(true); */

        console.log("Data -> ", data);

        InsuredInformation["firstName"] = field_firstName.toUpperCase();
        InsuredInformation["middleName"] = field_middleName.toUpperCase();
        InsuredInformation["lastName"] = field_lastName.toUpperCase();
        InsuredInformation["suffix"] = field_lastName_Suffix.toUpperCase();
        InsuredInformation["dateOfBirth"] = field_DOB.split('-')[1] + "/" + field_DOB.split('-')[2] + "/" + field_DOB.split('-')[0];
        InsuredInformation["countryCode"] = $("select#inlineFormCustomSelect option").filter(":selected").val();
        InsuredInformation["phoneNumber"] = field_mobileNum;
        InsuredInformation["emailAddress"] = field_emailAddress;
        InsuredInformation["homeAddress"] = field_homeAddress;
        InsuredInformation["firstSymptomsDate"] = field_DOA.split('-')[1] + "/" + field_DOA.split('-')[2] + "/" + field_DOA.split('-')[0];
        InsuredInformation["accidentDate"] = field_TOA.split('-')[1] + "/" + field_TOA.split('-')[2] + "/" + field_TOA.split('-')[0];
        InsuredInformation["firstConsultationDate"] = field_POA.split('-')[1] + "/" + field_POA.split('-')[2] + "/" + field_POA.split('-')[0];
        InsuredInformation["injuryDetails"] = field_MedicalConsultation;
        // for otp screen
        document.getElementById('user_mobile').innerHTML = field_mobileNum.replace(/.(?=.{4})/g, '*')
        // for otp screen
        InsuredInformation["check1"] = data.privacy_consent_1;
        InsuredInformation["check2"] = data.privacy_consent_2;

        let stageOneData = {
            stageOne: true,
            type: "Accident",
            referenceNumber: referenceNumber,
            data: InsuredInformation
        }
        window.parent.postMessage(JSON.stringify({
            event_code: 'ym-client-event', data: JSON.stringify({
                event: {
                    code: "personalinfo",
                    data: JSON.stringify(stageOneData)
                }
            })
        }), '*');
    } else if ((comparingDob == 5) || (comparingDob == 6) || (comparingDob == 7)) {
        $('#popUp_DOB').modal('show');
    } else {
        $("#popUp").modal("show");
    }
}

function dataReset() {
    let args = arguments;
    for (let i = 0; i < args.length; i++) {
        $(`#${args[i]}`).val('');
    }
}

function removeErr(event) {
    $(`#err_${event.target.id}`).text('');
    $(`#err_${event.target.id}`).hide();
}

const proceedScan = async (fileObj, button, pageid) => {
    console.log(button);
    console.log("code is here");
    $(`#file_loader_icon_${button}`).show();
    let baseData = await toBase64(fileObj);
    const regex = /data:application\/pdf;base64,/gi;
    let newBaseData = baseData.replace(regex, "");
    await checkForVirus(newBaseData)
        .then((response) => response.text())
        .then((result) => {
            let parsedJson = JSON.parse(result);
            console.log(parsedJson);
            if (parsedJson.hasVirus) {
                console.log("Netering");

                if (pageid == 1) {
                    $("#warning_parent").show();
                    $("#upload_warning").text(
                        "Warning : We detected a virus/malware in your uploaded documents. Please re-upload a clean, virus-free document to proceed."
                    );
                }
                if (pageid == 2) {
                    $("#warning_parent_acct").show();
                    $("#upload_warning_acct").text(
                        "Warning : We detected a virus/malware in your uploaded documents. Please re-upload a clean, virus-free document to proceed."
                    );
                }
                if (pageid == 3) {
                    $("#warning_parent_acct1").show();
                    $("#upload_warning_acct1").text(
                        "Warning : We detected a virus/malware in your uploaded documents. Please re-upload a clean, virus-free document to proceed."
                    );
                }

                $(`#file_loader_icon_${button}`).hide();
                $(`#file_Upload_Tick_${button}`).hide();
                $(`#file_upload_cancle_${button}`).show();

                return;
            } else {
                scanDoc = true
                $("#warning_parent").hide();
                $("#warning_parent_acct").hide();
                $("#warning_parent_acct1").hide();
                $(`#file_loader_icon_${button}`).hide();
                $(`#file_Upload_Tick_${button}`).show();
                $(`#file_upload_cancle_${button}`).hide();
                $('#upload_feedback_label').hide();
                return;
            }
        })
        .catch((error) => {
            console.log("error", error);
            if (pageid == 1) {
                $("#warning_parent").show();
            }
            if (pageid == 2) {
                $("#warning_parent_acct").show();
            }

            $(`#file_loader_icon_${button}`).hide();
            $(`#file_Upload_Tick_${button}`).hide();
            $(`#file_upload_cancle_${button}`).show();
            $("#upload_warning").text(
                "Looks like the file you are trying to upload is Virus infected. Please upload a virus free document."
            );
            return;
        });
};

const fileCheck = (file, button, pageid, formData, fileName) => {

    console.log(button);
    var _URL = window.URL || window.webkitURL;
    console.log("FILE OBJECT -> ", file);
    var img = new Image();
    console.log("Before on load --> ");
    img.onload = async function () {
        console.log("inside image load --> ");
        console.log(this.width + " " + this.height);
        if (this.width < 400 && this.height < 400) {
            if (pageid == 1) {
                $(`#warning_parent`).show();
                $("#upload_warning").text("Sorry, we noticed that your uploaded documents are unreadable. Please reupload a clearer copy of your documents to proceed.");
                console.log("Image is bad");
            }

            if (pageid == 2) {
                $('#warning_parent_acct').show();
                $("#upload_warning_acct").text("Sorry, we noticed that your uploaded documents are unreadable. Please reupload a clearer copy of your documents to proceed.");
                console.log("Image is bad");
            }
            if (pageid == 3) {
                $('#warning_parent_acct1').show();
                $("#upload_warning_acct1").text("Sorry, we noticed that your uploaded documents are unreadable. Please reupload a clearer copy of your documents to proceed.");
                console.log("Image is bad");
            }

            $(`#file_loader_icon_${button}`).hide();
            $(`#file_Upload_Tick_${button}`).hide();
            $(`#file_upload_cancle_${button}`).show();


        } else {

            console.log("This is right JPG");
            await proceedScan(file, button);
            if (scanDoc == true) { handleFileUpload(formData, fileName); scanDoc = false }
        }
    };
    img.onerror = function () {
        console.log("inside image error");
        alert("not a valid file: " + file.type);
    };
    img.src = _URL.createObjectURL(file);

};
var timerVal = null;
function otpTimerFunction() {
    timerVal = setTimeout(() => {
        if (isOtpPopShown == false) {
            disableDottedLoader();
            document.getElementById('fallbackMessage').innerHTML = '<p id="otp-text">Your request is taking a while to get through due to intermittent connection. Stay with us! <br> Please refresh the page and re-submit your request to continue.</p>';
            $("#fallbackMessagePopUp").modal("show");
        }
    }, 60000);
}
//to call preSubmit api
function preSubmitCall() {
    enableDottedLoader();
    //Basic Information
    //Insured information
    //Beneficiary list
    var source = 'Illness'
    var raw = JSON.stringify({
        "basicInformation": basicInformation,
        "insuredInformation": InsuredInformation,
        "beneficiaryList": [],
    });

    var preSubmitPayload = {}
    preSubmitPayload['source'] = source;
    preSubmitPayload['data'] = raw;
    // timer(0,50)
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "preSubmit",
                data: preSubmitPayload
            }
        })
    }), '*');
    otpTimerFunction();
    window.addEventListener('message', function (eventData) {


        // console.log(event.data.event_code)
        try {

            if (eventData.data) {
                let event = JSON.parse(eventData.data);
                console.log(event)
                if (event.event_code == 'preSubmitResponse') { //sucess
                    clearTimeout(timerVal);
                    if (isOtpPopShown == false) {
                        console.log("receiving presubmit event in illness")
                        if (event.data.returnCode == '0' || event.data.retCode == '0') {
                            disableDottedLoader();
                            // timer(50, 100).then(async () => {
                            $("#step2").addClass("active");
                            $("#step2>div").addClass("active");
                            if (otpSubmitted == false) { otpTimer(); isOtpPopShown = true; } else {
                                $('#requirements').hide();
                                $('#payment').show();
                            }
                            // })
                        }
                        else {
                            document.getElementById('returnMessage').innerHTML = event.data.returnMessage;
                            $("#invalidReturnCode").modal("show");
                        }
                    }
                }
                else {

                }
            }
        } catch (error) {
            console.log(error)
        }

    })
}

function finalSubmitCall() {
    // enableDottedLoader();
    let filesObject = {};
    filesObject["folderName"] = `CLAIMS/BPLAC/${referenceNumber}`
    filesObject["fileList"] = filesList;

    // var field_AccountName = $("#field_AccountName").val();
    // var field_AccountNumber = $("#field_AccountNumber").val();
    // var field_Bank = $("#field_Bank").val();
    // var field_currency = $("from_currency").val();
    // var field_Branch = $("#field_Branch").val();
    let BankDetailsList = [];
    BankDetailsList.push(BankDetails);
    InsuredInformation["payoutOption"] = payoutOption;
    var finalData = {}
    var source = 'Illness';
    var raw = JSON.stringify({
        "companyName": "BPLAC",
        "webReferenceNumber": referenceNumber,
        "payoutOption": payoutOption,
        "bankDetailsList": BankDetailsList,
        "isChangeInPayoutOption": isChangeInPayoutOption,
        "isChangeInBankDetails": isChangeInBankDetails,
        "filesInformation": filesObject,

        "BasicInformation": basicInformation,
        "InsuredInformation": InsuredInformation,
        "BeneficiaryList": []
    });
    finalData['source'] = source;
    finalData['data'] = raw;
    timer(0, 2).then(async () => {
        window.parent.postMessage(JSON.stringify({
            event_code: 'ym-client-event', data: JSON.stringify({
                event: {
                    code: "finalSubmit",
                    data: finalData
                }
            })
        }), '*');
        timer(2, 85).then(async () => {
        })
    })

    window.addEventListener('message', function (eventData) {

        try {

            if (eventData.data) {
                let event = JSON.parse(eventData.data);
                console.log(event)
                if (event.event_code == 'uploadSuccess') { //sucess
                    clearTimeout(cleartime);
                    console.log('upload success event received')
                    timer(85, 95).then(async () => {


                    })


                }
                else {
                    // $("#popUp").modal("show");
                }
            }
        } catch (error) {
            console.log(error)
        }

    })

    window.addEventListener('message', function (eventData) {


        // console.log(event.data.event_code)
        try {

            if (eventData.data) {
                let event = JSON.parse(eventData.data);
                console.log(event)
                if (event.event_code == 'finalSubmitResponse') { //sucess
                    clearTimeout(cleartime);
                    console.log("receiving final event in illness")
                    if (event.data.returnCode == '0' || event.data.retCode == '0') {
                        // disableDottedLoader();
                        myDisable()
                        document.getElementById('ref_number').innerHTML = event.data?.transactionNumber
                        timer(95, 100).then(async () => {
                            $("#step2").addClass("done");
                            $("#step3_circle").addClass("md-step-step3-circle ");
                            $("#step3_span").addClass("md-step3-span");
                            $("#step3_reference").addClass("md-step3-span")
                            /* $("#step3").addClass("active");
                            $("#step3>div").addClass("active");
                            $("#step3").addClass("done"); */
                            $('#account_details').hide();
                            $('#account_details1').hide();
                            $('#pickUp').hide();
                            $('#process_confirmation').show();
                            // console.log('Data -> ', data)
                        })

                    }
                    else {
                        document.getElementById('returnMessage').innerHTML = event.data.returnMessage;
                        $("#invalidReturnCode").modal("show");
                    }
                }
                else {
                    // $("#popUp").modal("show");
                }
            }
        } catch (error) {
            console.log(error)
        }

    })



}


const isFileSizeValid = (file) => {
    if (file.size == 0) {
        fileSizeZero = true;
        return false;
        //
    }
    else if (file.size < 5242880) {
        return true;
    }
    return false;
};

file1.onchange = async function (e) {
    docType = "LIDC001";
    tranType = "CIF-MIN";
    $("#file_upload_cancle_1").hide();
    $("#file_Upload_Tick_1").hide();
    console.log("Starting");
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case "jpg":
        case "pdf":
            var file = this.files[0];
            var buttonNum = 1;
            var pageId = 1;
            var sizevalid = isFileSizeValid(file, buttonNum);
            if (sizevalid) {
                if (ext == "jpg") {


                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Front copy of doc"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`);
                    fileCheck(file, buttonNum, pageId, formData, fileName);

                }
                else {
                    proceedScan(file, buttonNum, pageId);

                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Front copy of doc"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`);
                    handleFileUpload(formData, fileName);
                }

            } else {
                if (fileSizeZero) {
                    fileSizeZero = false;
                    $("#warning_parent").show();
                    $("#file_loader_icon_1").hide();
                    $("#file_Upload_Tick_1").hide();
                    $("#file_upload_cancle_1").show();
                    $("#upload_warning").text(
                        "Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size."
                    );
                } else {
                    $("#warning_parent").show();
                    $("#file_loader_icon_1").hide();
                    $("#file_Upload_Tick_1").hide();
                    $("#file_upload_cancle_1").show();
                    $("#upload_warning").text(
                        "The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed."
                    );
                }
            }
            break;
        default:
            $("#warning_parent").show();
            $("#file_Upload_Tick_1").hide();
            $("#file_upload_cancle_1").show();
            $("#upload_warning").text(
                "Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed. "
            );
            this.value = "";
    }
};

file2.onchange = async function (e) {
    docType = "LIDC001";
    tranType = "CIB-MIN";
    $("#file_upload_cancle_2").hide();
    $("#file_Upload_Tick_2").hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case "jpg":
        case "pdf":
            var file = this.files[0];
            var buttonNum = 2;
            var pageId = 1;
            var sizevalid = isFileSizeValid(file, buttonNum);
            if (sizevalid) {
                if (ext == "jpg") {

                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};

                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Back copy of doc"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`)
                    fileCheck(file, buttonNum, pageId, formData, fileName);

                }
                else {
                    proceedScan(file, buttonNum, pageId);
                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};

                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Back copy of doc"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`)
                    handleFileUpload(formData, fileName);
                }



            } else {
                if (fileSizeZero) {
                    fileSizeZero = false;
                    $("#warning_parent").show();
                    $("#file_loader_icon_2").hide();
                    $("#file_Upload_Tick_2").hide();
                    $("#file_upload_cancle_2").show();
                    $("#upload_warning").text(
                        "Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size."
                    );
                } else {
                    $("#warning_parent").show();
                    $("#file_loader_icon_2").hide();
                    $("#file_Upload_Tick_2").hide();
                    $("#file_upload_cancle_2").show();
                    $("#upload_warning").text(
                        "The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed."
                    );
                }
            }
            break;
        default:
            $("#warning_parent").show();
            $("#file_Upload_Tick_2").hide();
            $("#file_upload_cancle_2").show();
            $("#upload_warning").text(
                "Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed. "
            );
            this.value = "";
    }
};

file3.onchange = async function (e) {
    docType = "LIDC034";
    tranType = "APS-MIN";
    $("#file_upload_cancle_3").hide();
    $("#file_Upload_Tick_3").hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case "jpg":
        case "pdf":
            var file = this.files[0];
            var buttonNum = 3;
            var pageId = 1;
            var sizevalid = isFileSizeValid(file, buttonNum);
            if (sizevalid) {
                if (ext == "jpg") {

                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Attending Physician’s Statement"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`)
                    fileCheck(file, buttonNum, pageId, formData, fileName);

                }
                else {
                    proceedScan(file, buttonNum, pageId);
                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Attending Physician’s Statement"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`)
                    handleFileUpload(formData, fileName);
                }


            } else {
                if (fileSizeZero) {
                    fileSizeZero = false;
                    $("#warning_parent").show();
                    $("#file_loader_icon_3").hide();
                    $("#file_Upload_Tick_3").hide();
                    $("#file_upload_cancle_3").show();
                    $("#upload_warning").text(
                        "Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size."
                    );
                } else {
                    $("#warning_parent").show();
                    $("#file_loader_icon_3").hide();
                    $("#file_Upload_Tick_3").hide();
                    $("#file_upload_cancle_3").show();
                    $("#upload_warning").text(
                        "The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed."
                    );
                }
            }
            break;
        default:
            $("#warning_parent").show();
            $("#file_Upload_Tick_3").hide();
            $("#file_upload_cancle_3").show();
            $("#upload_warning").text(
                "Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed. "
            );
            this.value = "";
    }
};

file5.onchange = async function (e) {
    docType = "LIDC037";
    tranType = "SOA-MIN";
    $("#file_upload_cancle_5").hide();
    $("#file_Upload_Tick_5").hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case "jpg":
        case "pdf":
            var file = this.files[0];
            var buttonNum = 5;
            var pageId = 1;
            var sizevalid = isFileSizeValid(file, buttonNum);
            if (sizevalid) {
                if (ext == "jpg") {

                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Police or Narration Report"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`)
                    fileCheck(file, buttonNum, pageId, formData, fileName);

                }
                else {
                    proceedScan(file, buttonNum, pageId);
                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Police or Narration Report"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`)
                    handleFileUpload(formData, fileName);
                }


            } else {
                if (fileSizeZero) {
                    fileSizeZero = false;
                    $("#warning_parent").show();
                    $("#file_loader_icon_5").hide();
                    $("#file_Upload_Tick_5").hide();
                    $("#file_upload_cancle_5").show();
                    $("#upload_warning").text(
                        "Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size."
                    );
                } else {
                    $("#warning_parent").show();
                    $("#file_loader_icon_5").hide();
                    $("#file_Upload_Tick_5").hide();
                    $("#file_upload_cancle_5").show();
                    $("#upload_warning").text(
                        "The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed."
                    );
                }
            }
            break;
        default:
            $("#warning_parent").show();
            $("#file_Upload_Tick_5").hide();
            $("#file_upload_cancle_5").show();
            $("#upload_warning").text(
                "Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed. "
            );
            this.value = "";
    }
};

file6.onchange = async function (e) {
    docType = "LIBA001";
    tranType = "BA-MIN";
    $("#file_upload_cancle_6").hide();
    $("#file_Upload_Tick_6").hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case "jpg":
        case "pdf":
            var file = this.files[0];
            var buttonNum = 6;
            var pageId = 2;
            var sizevalid = isFileSizeValid(file, buttonNum);
            if (sizevalid) {
                if (ext == "jpg") {

                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Proof of Bank Account"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`);
                    fileCheck(file, buttonNum, pageId, formData, fileName);

                }
                else {
                    proceedScan(file, buttonNum, pageId);
                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Proof of Bank Account"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`);
                    handleFileUpload(formData, fileName);
                }


            } else {
                if (fileSizeZero) {
                    fileSizeZero = false;
                    $("#warning_parent").show();
                    $("#file_loader_icon_6").hide();
                    $("#file_Upload_Tick_6").hide();
                    $("#file_upload_cancle_6").show();
                    $("#upload_warning").text(
                      "Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size."
                    );
                  } else {
                    $("#warning_parent").show();
                    $("#file_loader_icon_6").hide();
                    $("#file_Upload_Tick_6").hide();
                    $("#file_upload_cancle_6").show();
                    $("#upload_warning").text(
                      "The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed."
                    );
                  }
            }
            break;
        default:
            $("#warning_parent_acct").show();
            $("#file_Upload_Tick_6").hide();
            $("#file_upload_cancle_6").show();
            $("#upload_warning_acct").text(
                " Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed."
            );
            this.value = "";
    }
};
file7.onchange = async function (e) {
    docType = "LIBA001";
    tranType = "BA-MIN";
    $("#file_upload_cancle_7").hide();
    $("#file_Upload_Tick_7").hide();
    var ext = this.value.match(/\.([^\.]+)$/)[1];
    switch (ext) {
        case "jpg":
        case "pdf":
            var file = this.files[0];
            var buttonNum = 7;
            var pageId = 3;
            var sizevalid = isFileSizeValid(file, buttonNum);
            if (sizevalid) {
                if (ext == "jpg") {

                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Proof of Bank Account"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`);
                    fileCheck(file, buttonNum, pageId, formData, fileName);

                }
                else {
                    proceedScan(file, buttonNum, pageId);
                    let fileName = referenceNumber + "-" + docType + "-" + tranType;

                    let accident = {};
                    accident['beneficiaryNo'] = beneficiaryCount,
                        accident["filename"] = `${fileName}.pdf`,
                        accident["docType"] = "PDF",
                        accident["docTypeCode"] = docType,
                        accident["documentDescription"] = "Proof of Bank Account"

                    addFileToList(accident, `${fileName}.pdf`);
                    const formData = new FormData()
                    formData.append('file', file, fileName + `.${ext}`);
                    handleFileUpload(formData, fileName);
                }


            } else {
                if (fileSizeZero) {
                    fileSizeZero = false;
                    $("#warning_parent").show();
                    $("#file_loader_icon_7").hide();
                    $("#file_Upload_Tick_7").hide();
                    $("#file_upload_cancle_7").show();
                    $("#upload_warning").text(
                      "Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size."
                    );
                  } else {
                    $("#warning_parent").show();
                    $("#file_loader_icon_7").hide();
                    $("#file_Upload_Tick_7").hide();
                    $("#file_upload_cancle_7").show();
                    $("#upload_warning").text(
                      "The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed."
                    );
                  }
            }
            break;
        default:
            $("#warning_parent_acct1").show();
            $("#file_Upload_Tick_7").hide();
            $("#file_upload_cancle_7").show();
            $("#upload_warning_acct").text(
                " Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed."
            );
            this.value = "";
    }
};


// file7.onchange = async function (e) {
//     $("#file_upload_cancle_7").hide();
//     $("#file_Upload_Tick_7").hide();
//     var ext = this.value.match(/\.([^\.]+)$/)[1];
//     switch (ext) {
//         case "jpg":
//         case "pdf":
//             var file = this.files[0];
//             var buttonNum = 7;
//             var sizevalid = isFileSizeValid(file, buttonNum);
//             if (sizevalid) {
//                 if (ext == "jpg") {
//                     // var isFileBlur = fileCheck(file, buttonNum);
//                     // if (isFileBlur == false) {
//                     fileCheck(file, buttonNum);
//                     file1Buffer = await getBuffer(file);
//                     console.log("file buffer : ")
//                     console.log(file1Buffer);
//                     filesMap["file7"] = file1Buffer;
//                     // }
//                 }
//                 else {
//                     proceedScan(file, buttonNum);
//                     file1Buffer = await getBuffer(file);
//                     console.log("file buffer : ")
//                     console.log(file1Buffer);
//                     filesMap["file7"] = file1Buffer;
//                 }

//             } else {
//                 $("#warning_parent").show();
//                 $("#file_loader_icon_7").hide();
//                 $("#file_Upload_Tick_7").hide();
//                 $("#file_upload_cancle_7").show();
//                 $("#upload_warning").text(
//                     "You may only upload documents not exceeding 5MB in file size. Please re-upload in the correct format and file size proceed."
//                 );
//             }
//             break;
//         default:
//             $("#warning_parent").show();
//             $("#file_Upload_Tick_7").hide();
//             $("#file_upload_cancle_7").show();
//             $("#upload_warning").text(
//                 "You may only upload documents that are in .jpg, .pdf formats and must not exceed 5MB in file size. Please re-upload in the correct format and file size to proceed."
//             );
//             this.value = "";
//     }
// };


function buttonSubmitClicked(event) {
    event.preventDefault();

    if (!file1.value || ($('#file_Upload_Tick_1').is(":hidden"))) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Valid Government ID (Front)');
        $('#popUp').modal('show');
        return;
    }

    if (!file2.value || ($('#file_Upload_Tick_2').is(":hidden"))) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Valid Government ID (Back)');
        $('#popUp').modal('show');
        return;
    }

    if (!file3.value || ($('#file_Upload_Tick_3').is(":hidden"))) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Attending Physician’s Statement (APS)!');
        $('#popUp').modal('show');
        return;
    }

    if (!file5.value || ($('#file_Upload_Tick_5').is(":hidden"))) {
        $('#warning_parent').show();
        $('#upload_warning').text('Please upload your Hospital Statement of Account (SOA)!');
        $('#popUp').modal('show');
        return;
    }




    if (!$('#upload_invalidCheck_2').is(':checked')) {
        $("#upload_warning").text('Please don’t forget to tick the box to confirm the accuracy of your submitted documents.');
        $("#warning_parent").show();
        $('#popUp').modal('show');
        return;
    }

    const upload_data = {
        upload_file_1: file1.value,
        upload_file_2: file2.value,
        upload_file_3: file3.value,
        upload_file_5: file5.value,
        aia_Philam_Life_Checkbox: $('#illness_upload_invalidCheck_1').is(':checked'),
        insurance_Checkbox: $('#upload_invalidCheck_2').is(':checked')
    }

    // $("#step2").addClass("active");
    // $("#step2>div").addClass("active");
    // if (otpSubmitted == false) { otpTimer(); } else {
    //     $('#requirements').hide();
    //     $('#payment').show();
    // }
    /* $('#payment')[0].scrollIntoView(true); */

    // console.log('upload data --> ', upload_data);
    document.getElementById('files_upload_btn').disabled = "true";
    document.getElementById("files_upload_btn").style.cursor = "no-drop";
    preSubmitCall()
}

function handleAccountInfo(event) {
    event.preventDefault();
    var field_AccountName = $("#field_AccountName").val();
    var field_AccountNumber = $("#field_AccountNumber").val();
    var field_Bank = $("#field_Bank").val();
    var field_Branch = $("#field_Branch").val();
    if (haveBankDetails == false) {
        var speCharAccountName = specialcharacterValidation(field_AccountName);
        var numAccountName = numberValidation(field_AccountName);
        var numAccountNumber = onlyNumberValidate(field_AccountNumber);
        /*  var specCharBank = specialcharacterValidation(field_Bank);
         var numBank = numberValidation(field_Bank); */
        /*   var specCharBRANCH = specialcharacterValidation(field_Branch);
          var numBranch = numberValidation(field_Branch); */

        if (field_AccountName.length === 0) {
            $("#err_field_AccountName").text('Field is empty');
            $("#err_field_AccountName").show();
        } else if (speCharAccountName) {
            $("#err_field_AccountName").text('special character is not allowed');
            $("#err_field_AccountName").show();
        } else if (numAccountName) {
            $("#err_field_AccountName").text('Number not allowed');
            $("#err_field_AccountName").show();
        } else {
            $("#err_field_AccountName").text('');
            $("#err_field_AccountName").hide();
        }

        if (field_AccountNumber.length === 0) {
            $("#err_field_AccountNumber").text('Field is empty');
            $("#err_field_AccountNumber").show();
        } else if (!numAccountNumber) {
            $("#err_field_AccountNumber").text('Only number is allowed');
            $("#err_field_AccountNumber").show();
        } else {
            $("#err_field_AccountNumber").text('');
            $("#err_field_AccountNumber").hide();
        }


        if (field_Bank.length <= 0) {
            $("#err_field_Bank").text('Field is empty');
            $("#err_field_Bank").show();
        } else {
            $("#err_field_Bank").text('');
            $("#err_field_Bank").hide();
        }

        if (field_Branch.length === 0) {
            $("#err_field_Branch").text('Field is empty');
            $("#err_field_Branch").show();
        }/*  else if(specCharBRANCH) {
        $("#err_field_Branch").text('special character is not allowed');
        $("#err_field_Branch").show();
    } else if(numBranch) {
        $("#err_field_Branch").text('Number is not allowed');
        $("#err_field_Branch").show();
    }  */else {
            $("#err_field_Branch").text('');
            $("#err_field_Branch").hide();
        }

        if (!file6.value) {
            $('#upload_feedback_label').show();
            $('#upload_feedback_label').text('Please upload your Bank Account Ownership');
        }

        if (field_AccountName.length !== 0 && field_AccountNumber.length !== 0 && field_Bank.length !== 0 && field_Branch.length !== 0 && file6.length !== 0 && (speCharAccountName == false) && (numAccountName == false) && (numAccountNumber == true) && (file6.value && (!$('#file_Upload_Tick_6').is(":hidden")))) {
            const data = {
                field_AccountName,
                field_AccountNumber,
                field_Bank,
                field_Branch,
                field_Currency: $("select#from_currency option").filter(":selected").val(),
                upload_file_6: file6.value
            }
            BankDetails["beneficiaryNo"] = 1;
            BankDetails["bankName"] = field_Bank;
            BankDetails["bankBranch"] = field_Branch;
            BankDetails["accountName"] = field_AccountName;
            BankDetails["accountNumber"] = field_AccountNumber;
            BankDetails["accountCurrency"] = $("select#from_currency option").filter(":selected").val();
            document.getElementById("account_details_btn").disabled = true;
            document.getElementById("account_details_btn").style.cursor = "no-drop";
            document.getElementById("submit9").disabled = true;
            document.getElementById("submit9").style.cursor = "no-drop";
            var nodes = document.getElementById("bank_form").getElementsByTagName('*');
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].disabled = true;
                nodes[i].style.cursor = 'no-drop'

            }
            document.getElementById("bank_form").style.opacity = '0.65'
            finalSubmitCall()
            // myDisable()
            // timer().then(async () => {
            //     $("#step2").addClass("done");
            //     $("#step3_circle").addClass("md-step-step3-circle ");
            //     $("#step3_span").addClass("md-step3-span");
            //     $("#step3_reference").addClass("md-step3-span")
            //     /* $("#step3").addClass("active");
            //     $("#step3>div").addClass("active");
            //     $("#step3").addClass("done"); */
            //     $('#account_details').hide();
            //     $('#process_confirmation').show();
            //     console.log('Data -> ', data)

            //     BankDetails["BeneficiaryNo"] = 1;
            //     BankDetails["BankName"] = field_Bank;
            //     BankDetails["BankBranch"] = field_Branch;
            //     BankDetails["AccountName"] = field_AccountName;
            //     BankDetails["AccountNumber"] = field_AccountNumber;
            //     BankDetails["AccountCurrency"] = $("select#from_currency option").filter(":selected").val();
            //     let BankDetailsList = [];
            //     BankDetailsList.push(BankDetails);

            //     let filesObject = {};
            //     filesObject["FolderName"] = `/CLAIMS/BPLAC/${referenceNumber}`
            //     filesObject["FileList"] = filesList;

            //     InsuredInformation["PayoutOption"] = "CTA";

            //     finalPayload["BasicInformation"] = basicInformation;
            //     finalPayload["InsuredInformation"] = InsuredInformation;
            //     finalPayload["BankDetailsList"] = BankDetailsList;
            //     finalPayload["FilesInformation"] = filesObject;

            //     console.log("FPB : ")
            //     console.log(finalPayload)
            //     window.parent.postMessage(JSON.stringify({
            //         event_code: 'ym-client-event', data: JSON.stringify({
            //             event: {
            //                 code: "finalEvent",
            //                 data: JSON.stringify(finalPayload)
            //             }
            //         })
            //     }), '*');
            // });
        } else {
            $('#popUp').modal('show');
        }
    }
    else {
        BankDetails["BeneficiaryNo"] = 1;
        BankDetails["BankName"] = field_Bank;
        BankDetails["BankBranch"] = field_Branch;
        BankDetails["AccountName"] = field_AccountName;
        BankDetails["AccountNumber"] = field_AccountNumber;
        BankDetails["AccountCurrency"] = $("select#from_currency option").filter(":selected").val();
        document.getElementById("account_details_btn").disabled = true;
        document.getElementById("account_details_btn").style.cursor = "no-drop";
        document.getElementById("submit9").disabled = true;
        document.getElementById("submit9").style.cursor = "no-drop";
        var nodes = document.getElementById("bank_form").getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].disabled = true;
            nodes[i].style.cursor = 'no-drop'

        }
        document.getElementById("bank_form").style.opacity = '0.65'
        finalSubmitCall()
    }
}

function handleAddBankInfo(event) {
    event.preventDefault();
    isChangeInBankDetails = 'Y';
    var field_AccountName1 = $("#field_AccountName1").val();
    var field_AccountNumber1 = $("#field_AccountNumber1").val();
    var field_currency1 = $("#from_currency1").val();
    var field_Bank1 = $("#field_Bank1").val();
    var field_Branch1 = $("#field_Branch1").val();
    var speCharAddAccountName = specialcharacterValidation(field_AccountName1);
    var numAddAccountName = numberValidation(field_AccountName1);
    var numAddAccountNumber = onlyNumberValidate(field_AccountNumber1);


    if (field_AccountName1.length === 0) {
        $("#err_field_AccountName1").text('Field is empty');
        $("#err_field_AccountName1").show();
    } else if (speCharAddAccountName) {
        $("#err_field_AccountName1").text('special character is not allowed');
        $("#err_field_AccountName1").show();
    } else if (numAddAccountName) {
        $("#err_field_AccountName1").text('Number not allowed');
        $("#err_field_AccountName1").show();
    } else {
        $("#err_field_AccountName1").text('');
        $("#err_field_AccountName1").hide();
    }

    if (field_AccountNumber1.length === 0) {
        $("#err_field_AccountNumber1").text('Field is empty');
        $("#err_field_AccountNumber1").show();
    } else if (!numAddAccountNumber) {
        $("#err_field_AccountNumber1").text('Only number is allowed');
        $("#err_field_AccountNumber1").show();
    } else {
        $("#err_field_AccountNumber1").text('');
        $("#err_field_AccountNumber1").hide();
    }

    if (field_currency1 <= 0) {
        $("#err_field_Currency1").text('Field is empty');
        $("#err_field_Currency1").show();
    } else {
        $("#err_field_Currency1").text('');
        $("#err_field_Currency1").show();
    }

    if (field_Bank1.length <= 0) {
        $("#err_field_Bank1").text('Field is empty');
        $("#err_field_Bank1").show();
    } else {
        $("#err_field_Bank1").text('');
        $("#err_field_Bank1").hide();
    }

    if (field_Branch1.length === 0) {
        $("#err_field_Branch1").text('Field is empty');
        $("#err_field_Branch1").show();
    }/*  else if (specCharAddBRANCH) {
    $("#err_field_Branch1").text('special character is not allowed');
    $("#err_field_Branch1").show();
  } else if (numAddBranch) {
    $("#err_field_Branch1").text('Number not allowed');
    $("#err_field_Branch1").show();
  }  */else {
        $("#err_field_Branch1").text('');
        $("#err_field_Branch1").hide();
    }

    if (!file7.value) {
        $('#upload_feedback_label1').show();
        $('#upload_feedback_label1').text('Please upload your Bank Account Ownership');
    }
    else {
        $('#upload_feedback_label1').hide();
        $('#upload_feedback_label1').text('');
    }

    if (field_AccountName1.length !== 0 && field_AccountNumber1.length !== 0 && field_currency1.length !== 0 && field_Bank1.length !== 0 && field_Branch1.length !== 0 && file7.length !== 0 && (speCharAddAccountName == false) && (numAddAccountName == false) && (numAddAccountNumber == true)) {
        const data = {
            field_AccountName1,
            field_AccountNumber1,
            field_Bank1,
            field_Branch1,
            field_Currency1: $("select#from_currency1 option").filter(":selected").val(),
            upload_file_7: file7.value
        }
        let BankDetailsList = [];
        BankDetails["beneficiaryNo"] = 1
        BankDetails["bankName"] = field_Bank1;
        BankDetails["bankBranch"] = field_Branch1;
        BankDetails["accountName"] = field_AccountName1;
        BankDetails["accountNumber"] = field_AccountNumber1;
        BankDetails["accountCurrency"] = $("select#from_currency1 option").filter(":selected").val(),
            BankDetailsList.push(BankDetails);
        document.getElementById("account_details1_btn").disabled = true;
        document.getElementById("account_details1_btn").style.cursor = "no-drop";
        var nodes = document.getElementById("addbank_form").getElementsByTagName('*');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].disabled = true;
            nodes[i].style.cursor = 'no-drop'

        }
        document.getElementById("addbank_form").style.opacity = '0.65'
        finalSubmitCall();
        // $("#step3_circle").addClass("md-step-step3-circle ");
        // $("#step3_span").addClass("md-step3-span");
        // $("#step3_reference").addClass("md-step3-span")
        // /* $("#step3").addClass("active");
        // $("#step3>div").addClass("active"); */
        // /* $("#step3").addClass("done"); */
        // $('#account_details1').hide();
        // $('#process_confirmation').show();
        // console.log('bank data -> ', data)
    }
}

function getBankDetails() {
    var finalPayload = {};
    var source = 'Illness';
    $('#cover-spin').show(0)
    var raw = JSON.stringify({ "companyName": "BPLAC", "webReferenceNumber": referenceNumber });
    finalPayload['source'] = source;
    finalPayload['data'] = raw;
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "getPayoutDetails",
                data: finalPayload
            }
        })
    }), '*');

    window.addEventListener('message', function (eventData) {


        // console.log(event.data.event_code)
        try {

            if (eventData.data) {
                let event = JSON.parse(eventData.data);
                console.log(event)
                if (event.event_code == 'payoutDetails') { //sucess
                    console.log("receiving payout event in illness")
                    if (event.data.returnCode == '0' || event.data.retCode == '0') {
                        $('#proof_BAO_display').hide();
                        haveBankDetails = true;
                        $('#cover-spin').hide(0)
                        if (event.data.accountName != null) {
                            isChangeInPayoutOption = 'Y';
                            document.getElementById('have_bank_details').innerHTML = ' We have your bank details on file.'
                            field_AccountName = event.data?.accountName;
                            document.getElementById('field_AccountName').value = field_AccountName;
                            document.getElementById('field_AccountName1').value = field_AccountName;

                            field_AccountNumber = event.data?.maskedAccountNumber?.replace(/.(?=.{4})/g, '*');

                            document.getElementById('field_AccountNumber').value = field_AccountNumber;
                            document.getElementById('field_AccountNumber1').value = field_AccountNumber;
                            field_Branch = ''
                            document.getElementById('field_Branch').value = field_Branch;
                            document.getElementById('field_Branch1').value = field_Branch;
                            field_Bank = event.data.bankName;
                            document.getElementById('field_Bank').value = field_Bank;
                            document.getElementById('field_Bank1').value = field_Bank;
                            // field_Branch = '';
                            field_Currency = event.data.accountCurrency;
                            if (field_Currency.toLowerCase() == 'php') {
                                field_Currency = 'peso'
                            }
                            $("#from_currency option").each(function () {
                                if ($(this).text().toLowerCase() == field_Currency) {
                                    $(this).attr('selected', 'selected');
                                }
                            });
                            $("#from_currency1 option").each(function () {
                                if ($(this).text().toLowerCase() == field_Currency) {
                                    $(this).attr('selected', 'selected');
                                }
                            });


                            if (field_Currency.toLowerCase() == "peso") {

                                $("#field_Bank").html(
                                    "<option value='BPI'>Bank of the Philippine Islands - BPI</option><option value='BFB'>BPI Family Savings Bank - BFB</option>"
                                );
                                $("#field_Bank option").each(function () {

                                    if ($(this).text().split('-')[1].toLowerCase().trim() == field_Bank.toLowerCase().trim()) {

                                        $(this).attr('selected', 'selected');
                                    }
                                });

                                $("#field_Bank1").html(
                                    "<option value='BPI'>Bank of the Philippine Islands - BPI</option><option value='BFB'>BPI Family Savings Bank - BFB</option>"
                                );
                                $("#field_Bank1 option").each(function () {

                                    if ($(this).text().split('-')[1].toLowerCase().trim() == field_Bank.toLowerCase().trim()) {

                                        $(this).attr('selected', 'selected');
                                    }
                                });
                            }
                            else if (field_Currency.toLowerCase() == "usd") {
                                $("#field_Bank1").html(
                                    "<option value='BPI'>Bank of the Philippine Islands - BPI</option>"
                                );
                                $("#field_Bank1 option").each(function () {

                                    if ($(this).text().split('-')[1].toLowerCase().trim() == field_Bank.toLowerCase().trim()) {

                                        $(this).attr('selected', 'selected');
                                    }
                                });

                                $("#field_Bank").html(
                                    "<option value='BPI'>Bank of the Philippine Islands - BPI</option>"
                                );
                                $("#field_Bank option").each(function () {

                                    if ($(this).text().split('-')[1].toLowerCase().trim() == field_Bank.toLowerCase().trim()) {

                                        $(this).attr('selected', 'selected');
                                    }
                                });
                            }
                            disableBankDetailsOnHavingData()
                        }
                        $('#payment').hide();
                        $('#account_details').show();
                        $("#step2").addClass("active");
                        $("#step2>div").addClass("active");
                    }
                    else if (event.data.returnCode == '1') {
                        $('#cover-spin').hide(0)
                        $('#payment').hide();
                        $('#account_details').show();
                        $("#step2").addClass("active");
                        $("#step2>div").addClass("active");
                        $('#change_bank_account').hide()
                    }
                }
                else {
                    // $('#change_bank_account').hide()
                }
            }
            else {
                $('#change_bank_account').hide()
            }
        } catch (error) {
            console.log(error)
        }

    })




    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify({ "companyName": "BPLAC", "webReferenceNumber": referenceNumber });
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw
    // };
    // fetch("http://localhost:3000/disbursement_details", requestOptions).then((response) => response.json())
    //     .then(response => {

    //         if (response.returnCode == '0') {
    //             if (response.accountName != '') {

    //                 document.getElementById('have_bank_details').innerHTML = 'Here are your bank details that we have on file. If you wish to update your bank details, click CHANGE BANK ACCOUNT.'
    //                 field_AccountName = response.accountName;
    //                 document.getElementById('field_AccountName').value = field_AccountName;

    //                 field_AccountNumber = response.maskedAccountNumber.replace(/.(?=.{4})/g, '*');
    //                 document.getElementById('field_AccountNumber').value = field_AccountNumber;

    //                 field_Bank = response.bankName;

    //                 field_Currency = response.accountCurrency;
    //                 $("#from_currency option").each(function () {
    //                     if ($(this).text() == field_Currency) {
    //                         $(this).attr('selected', 'selected');
    //                     }
    //                 });

    //                 if (field_Currency.toLowerCase() == "peso") {

    //                     $("#field_Bank").html(
    //                         "<option value='Bank of the Philippine Islands - BPI'>Bank of the Philippine Islands - BPI</option><option value='BPI Family Savings Bank - BFB'>BPI Family Savings Bank - BFB</option>"
    //                     );
    //                     $("#field_Bank option").each(function () {

    //                         if ($(this).text().split('-')[1].toLowerCase().trim() == field_Bank.toLowerCase().trim()) {

    //                             $(this).attr('selected', 'selected');
    //                         }
    //                     });
    //                 }
    //                 else if (field_Currency.toLowerCase() == "usd") {
    //                     $("#field_Bank").html(
    //                         "<option value='Bank of the Philippine Islands - BPI'>Bank of the Philippine Islands - BPI</option>"
    //                     );
    //                     $("#field_Bank option").each(function () {

    //                         if ($(this).text().split('-')[1].toLowerCase().trim() == field_Bank.toLowerCase().trim()) {

    //                             $(this).attr('selected', 'selected');
    //                         }
    //                     });
    //                 }


    //             }

    //         }
    //         else {
    //             $('#change_bank_account').hide()
    //         }
    //     }).catch(error => {
    //         console.log(error)
    //     });



}

function bankTranfer() {

    document.getElementById('ref_number').innerHTML = referenceNumber
    payoutOption = 'CTA';
    getBankDetails();

}

function pickUp() {
    document.getElementById('ref_number').innerHTML = referenceNumber
    document.getElementById('spin_loader_1').style.display = 'none'
    payoutOption = 'PUA';
    let filesObject = {};
    filesObject["FolderName"] = `/CLAIMS/BPLAC/${referenceNumber}`
    filesObject["FileList"] = filesList;
    let BankDetailsList = [];
    BankDetailsList.push(BankDetails);

    // InsuredInformation["PayoutOption"] = "PUA";
    finalPayload["BasicInformation"] = basicInformation;
    finalPayload["InsuredInformation"] = InsuredInformation;
    finalPayload["BankDetailsList"] = BankDetailsList;
    finalPayload["FilesInformation"] = filesObject;

    console.log("pick up payload : ")
    console.log(finalPayload)
    // window.parent.postMessage(JSON.stringify({
    //     event_code: 'ym-client-event', data: JSON.stringify({
    //         event: {
    //             code: "finalEvent",
    //             data: JSON.stringify(finalPayload)
    //         }
    //     })
    // }), '*');
    $('#payment').hide();
    $("#pickUp").show();
    $("#step2").addClass("active");
    $("#step2>div").addClass("active");
}

function pickup_Bpi() {
    document.getElementById("pick_up_btn").disabled = true;
    document.getElementById("pick_up_btn").style.cursor = "no-drop";
    document.getElementById("goback_pickup").style.display = "none";
    var nodes = document.getElementById("pickUp").getElementsByTagName('*');
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
        nodes[i].style.cursor = 'no-drop'

    }
    document.getElementById("pickUp").style.opacity = '0.65'
    document.getElementById('msg').style.display = 'none'
    document.getElementById('spin_loader_1').style.display = 'block'
    finalSubmitCall()
    // $("#pickUp").hide();
    // $('#process_confirmation').show();
    // $("#step2").addClass("done");
    // $("#step3_circle").addClass("md-step-step3-circle ");
    // $("#step3_span").addClass("md-step3-span");
    // $("#step3_reference").addClass("md-step3-span")
    /* $("#step3").addClass("active");
    $("#step3>div").addClass("active");
    $("#step3").addClass("done"); */
}


function openlink() {
    window.open("https://www.google.com/maps/search/bpi+branch+locator/@14.6079731,120.9860096,14z/data=!3m1!4b1");
}



function validateEmail(my_email) {
    var ind0 = my_email.indexOf("@");
    var my_username = my_email.slice(0, ind0);
    var ind = my_email.indexOf("@");
    var my_domain = my_email.substr((ind + 1));
    var ind3 = my_domain.indexOf(".");
    var my_final_domain = my_domain.slice(0, ind3);
    var ind1 = my_domain.indexOf(".");
    var my_extension = my_domain.slice((ind1 + 1), my_domain.length);

    var usernamesize = stringlength(my_username, 2, 30);
    var domainsize = stringlength(my_final_domain, 2, 10);
    var extension = stringlength(my_extension, 2, 3);


    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(my_email) == false) {
        $("#err_field_emailAddress").text('Invalid Email');
        $("#err_field_emailAddress").show();
        return false;
    } else {
        if (!usernamesize) {
            $("#err_field_emailAddress").text('UserName should have minimum 2 and maximum 30 character');
            $("#err_field_emailAddress").show();
            return false;
        } else if (!domainsize) {
            $("#err_field_emailAddress").text('Domain should have minimum 2 and maximum 10 character');
            $("#err_field_emailAddress").show();
            return false;
        } else if (!extension) {
            $("#err_field_emailAddress").text('Extension should have minimum 2 and maximum 3 characters');
            $("#err_field_emailAddress").show();
            return false;
        } else {
            $("#err_field_emailAddress").text('');
            $("#err_field_emailAddress").hide();
            return true;
        }

    }

}


function stringlength(inputtxt, minlength, maxlength) {
    var field = inputtxt;
    var mnlen = minlength;
    var mxlen = maxlength;

    if (field.length < mnlen || field.length > mxlen) {
        return false;
    }
    else {
        return true;
    }
}



function goBack() {
    console.log('go back!!!');
    $("#step2").removeClass("active");
    $("#step2>div").removeClass("active");
    $("#step2").removeClass("done");
    $('#requirements').hide();
    $('#form_wrapper').show();
    $('#illness_data_privacy').show();
    /* $('#form_wrapper')[0].scrollIntoView(true); */
}

function goBackPickup() {
    console.log('go back!!!');
    $("#step3").removeClass("active");
    $("#step3>div").removeClass("active");
    /*  $("#step3").removeClass("done"); */
    $('#pickUp').hide();
    $('#requirements').show();
}


function goBack1() {
    console.log('go back!!!');
    $("#step3").removeClass("active");
    $("#step3>div").removeClass("active");
    /*  $("#step3").removeClass("done"); */
    $('#account_details').hide();
    $('#requirements').show();
    /* $('#form_wrapper')[0].scrollIntoView(true); */
}



//drop-2 methods
var duration;
var remaining = 120; // 2 mins timer 
var resendCount = 0;
var otpModal = document.getElementById('otpPopUp');
var otpExpModal = document.getElementById('otpExpiry');
var invalidOtpModal = document.getElementById('invalidOtp');
var maxResendOtp = document.getElementById('maxResendOtp');
var invalidOtp = 0;
function otpTimer() {
    document.getElementById('otp-btn').style.display = 'block'
    document.getElementById('otp-invalid-btn').style.display = 'block'
    document.getElementById('otp-expiry-btn').style.display = 'block'
    document.getElementById('loader-btn').style.display = 'none'
    document.getElementById('loader-btn-expiry').style.display = 'none'
    document.getElementById('loader-btn-invalid').style.display = 'none'
    if (resendCount <= 5) {
        $('#otpPopUp').modal('show');
        if (remaining == 120) {
            duration = setInterval(otpTimer, 1000);
        }
        var m = Math.floor(remaining / 60);
        var s = remaining % 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        document.getElementById('otpTimer').innerHTML = m + ':' + s;
        remaining -= 1;
        if (remaining == 0) {
            //  timeout stuff here
            removeTimer();
            $('#otpPopUp').modal('hide'); // to hide otp modal on timer exceed
            $('#otpExpiry').modal('show'); //show otp expiry  modal on timer exceed
        }
    }
    else {
        $('#otpExpiry').modal('hide');
        $('#invalidOtp').modal('hide');
        $('#maxResendOtp').modal('show');
    }
}


// to refresh the otp otp timer

function removeTimer() {
    clearInterval(duration);
    document.getElementById('otpTimer').innerHTML = "";
    remaining = 120;
}
function closeModal() {
    removeTimer();
    document.getElementById('otp').value = ''
    $('#otpPopUp').modal('hide');
    $('#otpExpiry').modal('hide');

}
function resendOtp(type) {
    removeTimer();
    resendCount++;
    if (resendCount > 5) { // on reaching max resend (5 times)
        $('#otpPopUp').modal('hide');
        $('#invalidOtp').modal('hide');
        $('#maxResendOtp').modal('show');
        $('#otpExpiry').modal('hide');
    }
    else {
        if (type == 'otpExpire') {
            document.getElementById('otp-expiry-btn').style.display = 'none'
            document.getElementById('loader-btn-expiry').style.display = 'block'
        }
        else if (type == 'invalidInput') {
            document.getElementById('otp-invalid-btn').style.display = 'none'
            document.getElementById('loader-btn-invalid').style.display = 'block'

        }
        document.getElementById('otp-btn').style.display = 'none'
        document.getElementById('loader-btn').style.display = 'block'
        var source = 'Illness'
        var validateOtpPayload = {}
        removeTimer();
        var raw = JSON.stringify({
            "companyName": "BPLAC",
            "webReferenceNumber": referenceNumber

        });
        validateOtpPayload['source'] = source;
        validateOtpPayload['data'] = raw;
        window.parent.postMessage(JSON.stringify({
            event_code: 'ym-client-event', data: JSON.stringify({
                event: {
                    code: "resetOtp",
                    data: validateOtpPayload
                }
            })
        }), '*');

        window.addEventListener('message', function (eventData) {

            console.log("receiving otp event in acc")
            // console.log(event.data.event_code)
            try {

                if (eventData.data) {
                    let event = JSON.parse(eventData.data);
                    if (event.event_code == 'resetResponse') { //sucess

                        console.log(event.data)
                        if (event.data.returnCode == '0' || event.data.retCode == '0') {
                            $('#invalidOtp').modal('hide');
                            $('#otpExpiry').modal('hide');
                            if (type != 'resend') { $('#otpPopUp').modal('show'); }
                            document.getElementById('otp').value = ''
                            otpTimer();
                        }
                        else {
                            $('#otpExpiry').modal('hide');
                            document.getElementById('returnMessage').innerHTML = event.data.returnMessage;
                            $("#invalidReturnCode").modal("show");
                            // $('#otpPopUp').modal('hide');
                        }
                    }
                    else {
                        // $('#otpPopUp').modal('hide');
                    }
                }
                else {
                    // $('#otpPopUp').modal('hide');
                }
            } catch (error) {
                console.log(error)
                alert(error)
                // $('#otpPopUp').modal('hide');
            }

        })

    }

    //api call for resend otp

    // removeTimer();
    // resendCount++;
    // if (resendCount > 5) {
    //     $('#otpPopUp').modal('hide');
    //     $('#invalidOtp').modal('hide');
    //     $('#maxResendOtp').modal('show');

    // }
    // else {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");
    //     var raw = JSON.stringify({

    //         "companyName": "BPLAC",
    //         "webReferenceNumber": referenceNumber

    //     });
    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw
    //     };
    //     fetch("http://localhost:3000/resend_otp", requestOptions).then((response) => response.json())
    //         .then(response => {
    //             console.log(response)
    //             if (response.returnCode == '0') { //sucess
    //                 $('#invalidOtp').modal('hide');
    //                 if (type != 'resend') { $('#otpPopUp').modal('show'); }
    //                 document.getElementById('otp').value = ''
    //                 otpTimer();

    //             }


    //         }).catch(error => {
    //             console.log(error)
    //         });


    // }
    // $('#otpExpiry').modal('hide');


    //-bfre api intgrn--//

    // removeTimer();
    // resendCount++;
    // if (resendCount > 5) {
    //     $('#otpPopUp').modal('hide');
    //     $('#invalidOtp').modal('hide');
    //     $('#maxResendOtp').modal('show');

    // }
    // else {
    //     $('#invalidOtp').modal('hide');
    //     if (type != 'resend') { $('#otpPopUp').modal('show'); }
    //     document.getElementById('otp').value = ''
    //     otpTimer();

    // }
    // $('#otpExpiry').modal('hide');
}



function submitOtp() {
    document.getElementById('otp-btn').style.display = 'none'
    document.getElementById('loader-btn').style.display = 'block'
    var source = 'Illness'
    var validateOtpPayload = {}
    removeTimer();
    var raw = JSON.stringify({
        "oneTimePINInformation": {
            "companyName": "BPLAC",
            "webReferenceNumber": referenceNumber,
            "oneTimePIN": document.getElementById('otp').value
        }
    });
    validateOtpPayload['source'] = source;
    validateOtpPayload['data'] = raw;
    window.parent.postMessage(JSON.stringify({
        event_code: 'ym-client-event', data: JSON.stringify({
            event: {
                code: "validateOtp",
                data: validateOtpPayload
            }
        })
    }), '*');

    window.addEventListener('message', function (eventData) {

        console.log("receiving otp event in acc")
        // console.log(event.data.event_code)
        try {

            if (eventData.data) {
                let event = JSON.parse(eventData.data);
                if (event.event_code == 'validationResponse') { //sucess
                    console.log(event.data)
                    if (event.data.returnCode == '0' || event.data.retCode == '0') {
                        document.getElementById("back_btn1").style.display = "none";
                        $('#otpPopUp').modal('hide');
                        $('#requirements').hide();
                        $('#payment').show();
                        otpSubmitted = true;
                        document.getElementById('otp').value = '';
                    }
                    else if (event.data.returnCode == '1' || event.data.returnCode == '2') {


                        invalidOtp++;
                        if (invalidOtp <= 3) {
                            $('#otpPopUp').modal('hide');
                            $('#invalidOtp').modal('show');
                        }
                        else {
                            $('#otpPopUp').modal('hide');
                            $('#invalidOtp').modal('hide');
                            $('#maxInvalidOtp').modal('show');
                        }
                        document.getElementById('otp').value = '';
                    }
                    else {
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
        // document.getElementById('otp').value = '';
    })

    //api call fro submit otp
    // removeTimer();
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify({
    //     "oneTimePINInformation": {
    //         "companyName": "BPLAC",
    //         "webReferenceNumber": referenceNumber,
    //         "oneTimePIN": document.getElementById('otp').value
    //     }
    // });
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw
    // };
    // fetch("http://localhost:3000/otp_verification", requestOptions).then((response) => response.json())
    //     .then(response => {
    //         console.log(response)
    //         if (response.returnCode == '0') { //sucess
    //             $('#otpPopUp').modal('hide');
    //             $('#requirements').hide();
    //             $('#payment').show();
    //             otpSubmitted = true;
    //         }
    //         else {
    //             invalidOtp++;
    //             if (invalidOtp <= 3) {
    //                 $('#invalidOtp').modal('show');
    //             }
    //             else {
    //                 $('#invalidOtp').modal('hide');
    //                 $('#maxInvalidOtp').modal('show');
    //             }

    //         }

    //     }).catch(error => {
    //         console.log(error)
    //     });
    // document.getElementById('otp').value = ''


    //----before api  intgrtn---//

    // var dummy_otp = '1234'
    // removeTimer();

    // if (document.getElementById('otp').value != dummy_otp) {
    //     invalidOtp++;
    //     if (invalidOtp <= 3) {
    //         $('#invalidOtp').modal('show');
    //     }
    //     else {
    //         $('#invalidOtp').modal('hide');
    //         $('#maxInvalidOtp').modal('show');
    //     }

    // }
    // else {
    //     $('#otpPopUp').modal('hide');
    //     $('#requirements').hide();
    //     $('#payment').show();

    // }

    // document.getElementById('otp').value = ''
}
function disableBankDetailsOnHavingData() {
    document.getElementById('field_AccountName').disabled = true;
    document.getElementById('field_AccountNumber').disabled = true;
    document.getElementById('field_Branch').disabled = true;
    document.getElementById('from_currency').disabled = true;
    document.getElementById('field_Bank').disabled = true;

    document.getElementById("field_AccountName").style.cursor = "no-drop";
    document.getElementById("field_AccountNumber").style.cursor = "no-drop";
    document.getElementById("field_Branch").style.cursor = "no-drop";
    document.getElementById("from_currency").style.cursor = "no-drop";
    document.getElementById("field_Bank").style.cursor = "no-drop";
}


// When the user clicks anywhere outside of the modal, close it and remove timer 
// window.onclick = function (event) {
//     if (event.target == otpModal || event.target == otpExpModal || event.target == invalidOtpModal || event.target == maxResendOtp) {
//         console.log(event.target)
//         removeTimer();
//     }
// }
// when user clicks exit button from OTP pop up
function backToFileClaim() {

    window.location.href = "main";


}

//drop-2 methods