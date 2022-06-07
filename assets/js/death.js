var form = document.getElementById("death__form")
var death__form_addBeneficiary = document.getElementById("death__form_addBeneficiary")
var form_Bank = document.getElementById("bank_form")
var addBeneficiaryform_Bank = document.getElementById("addBeneficiarybank_form")
var buttonCount = 0
var bCount
var optiondisable = 1
var optionAge = false
var relation = false
var upload_data = null
var dataBen = null
var addBenAccountInfo = null
var addBeni_upload_data = null
var data1, data2, data3, data4, data5, data6
var acct_data1, acct_data2, acct_data3, acct_data4, acct_data5, acct_data6
var uppload_data1, uppload_data2, uppload_data3, uppload_data4, uppload_data5, uppload_data6
var trackBenificiary = 0
var trackaddBenificiary
var trackaddBenificiary1, trackaddBenificiary2, trackaddBenificiary3, trackaddBenificiary4, trackaddBenificiary5, trackaddBenificiary6
var screenCount = 0
var bpiCount = 0
var acctButtonCount = 0
var traverse
var currSeconds = 0
let filesMap = {}
var otpSubmitted = false
var isOtpPopShown = false
var scanDoc = false
var payoutOption
var isChangeInBankDetails = "N"
var isChangeInPayoutOption = "N"
var file1 = document.getElementById("file_Upload_1")
var file2 = document.getElementById("file_Upload_2")
var file3 = document.getElementById("file_Upload_3")
var file4 = document.getElementById("file_Upload_4")
var file5 = document.getElementById("file_Upload_5")
var file6 = document.getElementById("file_Upload_6")
var file7 = document.getElementById("file_Upload_7")
var file8 = document.getElementById("file_Upload_8")
var file9 = document.getElementById("file_Upload_9")
var file10 = document.getElementById("file_Upload_10")
var file11 = document.getElementById("file_Upload_11")
var file12 = document.getElementById("file_Upload_12")
var file13 = document.getElementById("proof_addBAO")
var customName
let url = new URL(window.location.href)
let referenceNumber = url.searchParams.get("refNumber")
let uid = url.searchParams.get("sender")
let botId = url.searchParams.get("botId")
var fileSizeZero = false

$("#privacy_consent_1").prop("checked", true)
$("#privacy_consent_2").prop("checked", true)
// $('#privacy_consent_3').prop('checked', true);
$("#privacy_consent_beneficiary_1").prop("checked", true)
$("#privacy_consent_beneficiary_2").prop("checked", true)
// $('#privacy_consent_beneficiary_3').prop('checked', true);

// document.getElementById('submit9_waiting').style.display = 'none'
// document.getElementById('submit10_waiting').style.display = 'none'

let basicInformation = {}
let InsuredInformation = {}
let finalPayload = {}
let BeneficiaryList = []
let BankDetailsList = []
let FilesInformation = {}
let filesList = []
let beneficiaryCount = 1
let docType, tranType
basicInformation["webReferenceNumber"] = referenceNumber
basicInformation["companyName"] = "BPLAC"
basicInformation["claimType"] = "Death"

form.addEventListener("submit", handleForm)
death__form_addBeneficiary.addEventListener("submit", handleFormAddBeneficiary)
form_Bank.addEventListener("submit", handleAccountInfo)
addBeneficiaryform_Bank.addEventListener("submit", addBenificiaryAccountInfo)

var form_addBank = document.getElementById("addbank_form")
form_addBank.addEventListener("submit", handleAddBankInfo)

$(document).ready(function (event) {
  disableFutureDates()
  disableFutureDatesDOB()
  setCountryCode()
  let idleInterval = setInterval(timerIncrement, 1000)
  $(this).mousemove(resetTimer)
  $(this).keypress(resetTimer)

  defaultBank()

  $("#from_currency").change(function () {
    var val = $(this).val()
    if (val == "Peso") {
      $("#field_Bank").html("<option value='BPI'>Bank of the Philippine Islands - BPI</option><option value='BFB'>BPI Family Savings Bank - BFB</option>")
    } else if (val == "USD") {
      $("#field_Bank").html("<option value='BPI'>Bank of the Philippine Islands - BPI</option>")
    }
  })

  $("#from_addBeneficiarycurrency").change(function () {
    var val = $(this).val()
    if (val == "Peso") {
      $("#field_addBenificiaryBank").html("<option value='BPI'>Bank of the Philippine Islands - BPI</option><option value='BFB'>BPI Family Savings Bank - BFB</option>")
    } else if (val == "USD") {
      $("#field_addBenificiaryBank").html("<option value='BPI'>Bank of the Philippine Islands - BPI</option>")
    }
  })
})

function defaultBank() {
  var val = "Peso"
  if (val == "Peso") {
    $("#field_Bank").html("<option value='BPI'>Bank of the Philippine Islands - BPI</option><option value='BFB'>BPI Family Savings Bank - BFB</option>")
    $("#field_addBenificiaryBank").html("<option value='BPI'>Bank of the Philippine Islands - BPI</option>")
  }
}

function resetTimer() {
  currSeconds = 0
}

function timerIncrement() {
  currSeconds = currSeconds + 1
  if (currSeconds == 1800) {
    window.top.location = "https://www.bpi-aia.com.ph/en/index.html"
  }
}

function myDisable() {
  document.getElementById("submit9").disabled = true
  document.getElementById("submit9").style.cursor = "no-drop"
  document.getElementById("file_Upload_1").disabled = true
  document.getElementById("file_Upload_1").style.cursor = "no-drop"
  document.getElementById("file_Upload_2").disabled = true
  document.getElementById("file_Upload_2").style.cursor = "no-drop"
  document.getElementById("file_Upload_3").disabled = true
  document.getElementById("file_Upload_3").style.cursor = "no-drop"
  document.getElementById("file_Upload_4").disabled = true
  document.getElementById("file_Upload_4").style.cursor = "no-drop"
  document.getElementById("file_Upload_5").disabled = true
  document.getElementById("file_Upload_5").style.cursor = "no-drop"
  document.getElementById("file_Upload_6").disabled = true
  document.getElementById("file_Upload_6").style.cursor = "no-drop"
  document.getElementById("addBeneficiary1").disabled = true
  document.getElementById("addBeneficiary1").style.cursor = "no-drop"
  document.getElementById("upload_invalidCheck_2").disabled = true
  document.getElementById("upload_invalidCheck_2").style.cursor = "no-drop"
  document.getElementById("goBack1").style.pointerEvents = "none"
  document.getElementById("form_Beneficiary").style.cursor = "no-drop"
}

function addFileToList(fileObject, fileName) {
  console.log(fileName)
  let index = filesList.findIndex(x => x.Filename == fileName)

  if (index === -1) {
    console.log("adding bcoz unique")
    filesList.push(fileObject)
  }
}

function enableDottedLoader() {
  document.getElementById("submit9").style.display = "none"
  // document.getElementById('submit9_waiting').style.display = 'block'

  document.getElementById("submit10").style.display = "none"
  // document.getElementById('submit10_waiting').style.display = 'block'

  // document.getElementById('pick_up_btn').style.display = 'none'
  // document.getElementById('pick_up_btn_waiting').style.display = 'block'
}
function disableDottedLoader() {
  document.getElementById("submit9").style.display = "block"
  // document.getElementById('submit9_waiting').style.display = 'none'

  document.getElementById("submit10").style.display = "block"
  // document.getElementById('submit10_waiting').style.display = 'none'

  document.getElementById("submit9").disabled = false
  document.getElementById("submit9").style.cursor = "pointer"
  document.getElementById("submit10").disabled = false
  document.getElementById("submit10").style.cursor = "pointer"
  // document.getElementById('pick_up_btn').style.display = 'block'
  // document.getElementById('pick_up_btn_waiting').style.display = 'none'
}

// function timer() {
//     var random = Math.floor(Math.random() * 5) + 1
//     return new Promise((resolve, reject) => {
//         var i = 0
//         let cleartime = setInterval(() => {
//             i = random + i;
//             renderProgress(i)
//             if (i == 99) {
//                 i = 100;
//                 renderProgress(i)
//             }
//             if (i == 100) {

//                 console.log("cleartime");
//                 clearTimeout(cleartime);
//                 resolve("cleartime")
//             }
//             //  i++;
//         }, 500);
//     })
// }
let cleartime = null
function timer(lowerVal, UpperVal) {
  // var random = Math.floor(Math.random() * 5) + 1
  var random = 1
  return new Promise((resolve, reject) => {
    var i = lowerVal
    cleartime = setInterval(() => {
      i = random + i
      renderProgress(i)
      if (i == UpperVal - 1) {
        i = UpperVal
        renderProgress(i)
      }
      if (i == UpperVal) {
        console.log("cleartime")
        clearTimeout(cleartime)
        resolve("cleartime")
      }
      //  i++;
    }, 500)
  })
}

function myDisable2() {
  document.getElementById("submit10").disabled = true
  document.getElementById("submit10").style.cursor = "no-drop"
  document.getElementById("file_Upload_9").disabled = true
  document.getElementById("file_Upload_9").style.cursor = "no-drop"
  document.getElementById("file_Upload_10").disabled = true
  document.getElementById("file_Upload_10").style.cursor = "no-drop"
  document.getElementById("file_Upload_11").disabled = true
  document.getElementById("file_Upload_11").style.cursor = "no-drop"
  document.getElementById("file_Upload_12").disabled = true
  document.getElementById("file_Upload_12").style.cursor = "no-drop"
  document.getElementById("addBeneficiary_submit").disabled = true
  document.getElementById("addBeneficiary_submit").style.cursor = "no-drop"
  document.getElementById("goBack3").style.pointerEvents = "none"
  document.getElementById("addBeneficiaryRequirements").style.cursor = "no-drop"

  /*   document.getElementById("upload_invalidCheck_2").disabled = true;
      document.getElementById("upload_invalidCheck_2").style.cursor = "no-drop"; 
      document.getElementById("link_Beneficiary").style.pointerEvents = "none";
      document.getElementById("link2_Beneficiary").style.pointerEvents = "none";
      document.getElementById("form_Beneficiary").style.cursor = "no-drop"; */
}

function timer2() {
  var random = Math.floor(Math.random() * 5) + 1
  return new Promise((resolve, reject) => {
    var i = 0
    let cleartime = setInterval(() => {
      i = 3 + i
      renderProgress(i)
      if (i == 99) {
        i = 100
        renderProgress(i)
      }
      if (i == 100) {
        console.log("cleartime")
        clearTimeout(cleartime)
        resolve("cleartime")
      }
      //  i++;
    }, 500)
  })
}

function renderProgress(progress) {
  progress = Math.floor(progress)
  if (progress < 25) {
    var angle = -90 + (progress / 100) * 360
    $(".animate-0-25-b").css("transform", "rotate(" + angle + "deg)")
  } else if (progress >= 25 && progress < 50) {
    var angle = -90 + ((progress - 25) / 100) * 360
    $(".animate-0-25-b").css("transform", "rotate(0deg)")
    $(".animate-25-50-b").css("transform", "rotate(" + angle + "deg)")
  } else if (progress >= 50 && progress < 75) {
    var angle = -90 + ((progress - 50) / 100) * 360
    $(".animate-25-50-b, .animate-0-25-b").css("transform", "rotate(0deg)")
    $(".animate-50-75-b").css("transform", "rotate(" + angle + "deg)")
  } else if (progress >= 75 && progress <= 100) {
    var angle = -90 + ((progress - 75) / 100) * 360
    $(".animate-50-75-b, .animate-25-50-b, .animate-0-25-b").css("transform", "rotate(0deg)")
    $(".animate-75-100-b").css("transform", "rotate(" + angle + "deg)")
  }
  $(".text").html(progress + "%")
}

/* Check Date should not be in future */
function futureDate(date) {
  /*   let id = evt.target.id;
      var date1 = document.getElementById(id).value; */
  var res = date.split("-")
  var year = res[0]
  var Month = Number(res[1])
  var day = res[2]
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = Number(String(today.getMonth() + 1).padStart(2, "0")) //January is 0!
  var yyyy = today.getFullYear()
  /* This is for safari, not good way to handle */
  if (day.length == 4) {
    if (day < yyyy) {
      return true
    } else if (day > yyyy) {
      return false
    } else {
      if ((day = yyyy)) {
        if (Month < mm) {
          return true
        } else if (Month == mm) {
          if (year <= dd) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    }
  } else {
    if (year < yyyy) {
      return true
    } else if (year > yyyy) {
      return false
    } else {
      if (year == yyyy) {
        if (Month < mm) {
          return true
        } else if (Month == mm) {
          if (day <= dd) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
}

function futureDateDOB(date) {
  /*   let id = evt.target.id;
      var date1 = document.getElementById(id).value; */
  console.log("This is date" + date)
  var res = date.split("-")
  var year = res[0]
  var Month = res[1]
  var day = res[2]
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  var yyyy = today.getFullYear()

  console.log("Logged-In Date:" + day, Month, year)
  console.log("System Date:" + dd, mm, yyyy)

  /* This is for safari, not good way to handle */
  if (day.length == 4) {
    if (day == yyyy && Month == mm && year == dd) {
      return false
    } else {
      return true
    }
  } else {
    if (year == yyyy && Month == mm && day == dd) {
      return false
    } else {
      return true
    }
  }
}

$("#popUp").on("hidden.bs.modal", function (e) {
  $("#pep-content").hide()
  $("#pep-content").empty()
  $("#p1").show()
})

function showDetails() {
  var content_title = `<p class="small-modal-pep-font"><span class="font-weight-bold">Politically Exposed Person</span></p>`
  var content_pt_1 = `<p class="m-modal-top-2 small-modal-pep-font"><span class="font-weight-bold">Politically Exposed Person (PEP)</span> refers to an individual who is or has been entrusted with prominent public position in (1) the Philippines with substantial authority over policy, operations or the use or allocation of government-owned resources; (2) a foreign State; or (3) an international organization.</p>`
  var content_pt_2 = `<p class="m-modal-top-2 small-modal-pep-font"><span class="font-weight-bold">Close Relationship/Associates of PEPS</span> refers to persons who are widely and publicly known, socially or professionally, to maintain a  particularly close with the PEP, and include persons who are in a position to conduct substantial, domestic and international financial transaction on behalf of a PEP.</p>`
  var content_pt_3 = `<p class="m-modal-top-2 small-modal-pep-font"><span class="font-weight-bold">Immediate Family Member of PEPS</span> refers to individuals relation to the PEP within the second degree or consanguinity or affinity</p>`
  $("#p1").hide()
  $("#pep-content").append(`${content_title + content_pt_1 + content_pt_2 + content_pt_3}`)
  $("#pep-content").show()
  $("#popUp").modal("show")
}

function disableFutureDates() {
  var dtToday = new Date()
  var month = dtToday.getMonth() + 1
  var day = dtToday.getDate()
  var year = dtToday.getFullYear()
  if (month < 10) month = "0" + month.toString()
  if (day < 10) day = "0" + day.toString()
  var maxDate = year + "-" + month + "-" + day
  $("#field_DOID").attr("max", maxDate)
  $("#field_addBeneficiaryDOB").attr("max", maxDate)
  $("#field_BeneficiaryDOB").attr("max", maxDate)
}

function disableFutureDatesDOB() {
  var dtToday = new Date()
  var month = dtToday.getMonth() + 1
  var day = dtToday.getDate()
  var dobdate = day - 1
  var year = dtToday.getFullYear()
  if (month < 10) month = "0" + month.toString()
  if (day < 10) day = "0" + day.toString()
  var maxDate = year + "-" + month + "-" + dobdate
  if (day <= 10) {
    maxDate = year + "-" + month + "-" + "0" + dobdate
  }
  $("#field_DOB").attr("max", maxDate)
}

var timerVal = null
function otpTimerFunction() {
  timerVal = setTimeout(() => {
    if (isOtpPopShown == false) {
      // disableDottedLoader();
      document.getElementById("fallbackMessage").innerHTML = '<p id="otp-text">Your request is taking a while to get through due to intermittent connection. Stay with us! <br> Please refresh the page and re-submit your request to continue.</p>'
      $("#fallbackMessagePopUp").modal("show")
    }
  }, 60000)
}
//to call preSubmit api
function preSubmitCall() {
  // enableDottedLoader();
  //Basic Information
  //Insured information
  //Beneficiary list
  document.getElementById("submit9").disabled = true
  document.getElementById("submit9").style.cursor = "no-drop"
  document.getElementById("submit10").disabled = true
  document.getElementById("submit10").style.cursor = "no-drop"
  var source = "Death"
  var raw = JSON.stringify({
    basicInformation: basicInformation,
    insuredInformation: InsuredInformation,
    beneficiaryList: BeneficiaryList
  })
  //
  var preSubmitPayload = {}
  preSubmitPayload["source"] = source
  preSubmitPayload["data"] = raw
  timer(0, 2).then(async () => {
    window.parent.postMessage(
      JSON.stringify({
        event_code: "ym-client-event",
        data: JSON.stringify({
          event: {
            code: "preSubmit",
            data: preSubmitPayload
          }
        })
      }),
      "*"
    )
    timer(2, 30).then(async () => {})
  })
  otpTimerFunction()
  window.addEventListener("message", function (eventData) {
    // console.log(event.data.event_code)
    try {
      if (eventData.data) {
        let event = JSON.parse(eventData.data)
        console.log(event)
        if (event.event_code == "preSubmitResponse") {
          //sucess
          clearTimeout(timerVal)
          if (isOtpPopShown == false) {
            console.log("receiving presubmit event in death")
            if (event.data.returnCode == "0" || event.data.retCode == "0") {
              // disableDottedLoader();
              clearTimeout(cleartime)
              timer(30, 35).then(async () => {
                if (otpSubmitted == false) {
                  otpTimer()
                  isOtpPopShown = true
                } else {
                  $("#requirements").hide()
                  $("#process_confirmation").show()
                }
              })
            } else {
              document.getElementById("returnMessage").innerHTML = event.data.returnMessage
              $("#invalidReturnCode").modal("show")
            }
          }
        } else {
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
}

function finalSubmitCall() {
  // enableDottedLoader();
  let filesObject = {}
  filesObject["folderName"] = `CLAIMS/BPLAC/${referenceNumber}`
  filesObject["fileList"] = filesList

  // var field_AccountName = $("#field_AccountName").val();
  // var field_AccountNumber = $("#field_AccountNumber").val();
  // var field_Bank = $("#field_Bank").val();
  // var field_currency = $("from_currency").val();
  // var field_Branch = $("#field_Branch").val();
  // let BankDetailsList = [];
  // BankDetailsList.push(BankDetails);

  var finalData = {}
  var source = "Death"
  var raw = JSON.stringify({
    companyName: "BPLAC",
    webReferenceNumber: referenceNumber,
    payoutOption: payoutOption,
    bankDetailsList: BankDetailsList,
    isChangeInPayoutOption: isChangeInPayoutOption,
    isChangeInBankDetails: isChangeInBankDetails,
    filesInformation: filesObject,

    BasicInformation: basicInformation,
    InsuredInformation: InsuredInformation,
    BeneficiaryList: BeneficiaryList
  })
  finalData["source"] = source
  finalData["data"] = raw
  timer(35, 75).then(async () => {
    window.parent.postMessage(
      JSON.stringify({
        event_code: "ym-client-event",
        data: JSON.stringify({
          event: {
            code: "finalSubmit",
            data: finalData
          }
        })
      }),
      "*"
    )
  })
  window.addEventListener("message", function (eventData) {
    try {
      if (eventData.data) {
        let event = JSON.parse(eventData.data)
        console.log(event)
        if (event.event_code == "uploadSuccess") {
          //sucess
          clearTimeout(cleartime)
          console.log("upload success event received")
          timer(75, 85).then(async () => {})
        } else {
          // $("#popUp").modal("show");
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
  window.addEventListener("message", function (eventData) {
    // console.log(event.data.event_code)
    try {
      if (eventData.data) {
        let event = JSON.parse(eventData.data)
        console.log(event)
        if (event.event_code == "finalSubmitResponse") {
          //sucess
          clearTimeout(cleartime)
          console.log("receiving final event in death")
          if (event.data.returnCode == "0" || event.data.retCode == "0") {
            // disableDottedLoader();
            document.getElementById("ref_number").innerHTML = event.data?.transactionNumber
            // myDisable()
            timer(85, 100).then(async () => {
              $("#step2").addClass("done")
              /*  $("#step3").addClass("active");
                             $("#step3>div").addClass("active"); */
              /* $("#step3").addClass("done"); */
              $("#step3_circle").addClass("md-step-step3-circle ")
              $("#step3_span").addClass("md-step3-span")
              $("#step3_reference").addClass("md-step3-span")
              $("#account_details").hide()
              $("#addBeneficiaryRequirements").hide()
              $("#requirements").hide()
              $("#process_confirmation").show()
              // console.log("Data -> ", data);
            })
          } else {
            document.getElementById("returnMessage").innerHTML = event.data.returnMessage
            $("#invalidReturnCode").modal("show")
            // $("#popUp").modal("show");
          }
        } else {
          // $("#popUp").modal("show");
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
}

function checkKeyword(keyword, type) {
  if (keyword == "husband" || keyword == "wife" || keyword == "spouse" || keyword == "Husband" || keyword == "Wife" || keyword == "Spouse" || keyword == "HUSBAND" || keyword == "WIFE" || keyword == "SPOUSE") {
    if (type == "new_beneficiary") {
      document.getElementById("file_Upload_11").disabled = false
      document.getElementById("file_Upload_11").style.cursor = "pointer"
      document.getElementById("file_Upload_11").style.opacity = "0"
      document.getElementById("marriage_certificate_11").style.border = "none"
    } else {
      document.getElementById("file_Upload_5").disabled = false
      document.getElementById("file_Upload_5").style.cursor = "pointer"
      document.getElementById("file_Upload_5").style.opacity = "0"
      document.getElementById("marriage_certificate").style.border = "none"
    }
    return true
  } else {
    if (type == "new_beneficiary") {
      document.getElementById("file_Upload_11").disabled = true
      document.getElementById("file_Upload_11").style.cursor = "no-drop"
      document.getElementById("file_Upload_11").style.opacity = "0.4"
      document.getElementById("marriage_certificate_11").style.border = "none"
    } else {
      document.getElementById("file_Upload_5").disabled = true
      document.getElementById("file_Upload_5").style.cursor = "no-drop"
      document.getElementById("file_Upload_5").style.opacity = "0.4"
      document.getElementById("marriage_certificate").style.border = "none"
    }
    return false
  }
}

function currentDate(date, type) {
  var dtToday = new Date()
  var month = dtToday.getMonth() + 1
  var day = dtToday.getDate()
  var year = dtToday.getFullYear()
  var userDate = date.split("-")
  var userYear = userDate[0]
  var userMonth = userDate[1]
  var userday = userDate[2]
  var age = year - userYear

  if (age <= 18) {
    if (type == "new_beneficiary") {
      document.getElementById("file_Upload_12").disabled = false
      document.getElementById("file_Upload_12").style.cursor = "pointer"
      document.getElementById("file_Upload_12").style.opacity = "0"
    } else {
      document.getElementById("file_Upload_6").disabled = false
      document.getElementById("file_Upload_6").style.cursor = "pointer"
      document.getElementById("file_Upload_6").style.opacity = "0"
    }
    return true
  } else {
    if (type == "new_beneficiary") {
      document.getElementById("file_Upload_12").disabled = true
      document.getElementById("file_Upload_12").style.cursor = "no-drop"
      document.getElementById("file_Upload_12").style.opacity = "0.4"
      document.getElementById("age_cert_12").style.border = "none"
    } else {
      document.getElementById("file_Upload_6").disabled = true
      document.getElementById("file_Upload_6").style.cursor = "no-drop"
      document.getElementById("file_Upload_6").style.opacity = "0.4"
      document.getElementById("age_cert").style.border = "none"
    }
    return false
  }
}

function setCountryCode() {
  $("#field_BeneficiaryMobileNumberSelect").change(function () {
    $("#field_BeneficiaryMobileNumberSelect option")[0].value = $("#field_BeneficiaryMobileNumberSelect option:selected").val()
    $("#field_BeneficiaryMobileNumberSelect option")[0].innerHTML = "+" + $("#field_BeneficiaryMobileNumberSelect option:selected").val()
    $("#field_BeneficiaryMobileNumberSelect").val($("#field_BeneficiaryMobileNumberSelect option:selected").val())
    $("select option").css({ "background-color": "", color: "" })
  })
}
/**
 *
 * New function
 * instead of giving a PDF the as result
 * you will be getting the cdn link to the file in the bot
 */
const handleFileUpload = (formData, fileName) => {
  console.log("file upload new")
  var myHeaders = new Headers()

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow"
  }
  fetch(`https://app.yellowmessenger.com/api/chat/upload-file?bot=${botId}&uid=${fileName}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error))
}
const getBuffer = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    console.log("reading file")
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    console.log("reading file")
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

const checkForVirus = fileData => {
  var myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  var raw = JSON.stringify({ data: fileData, type: "base64" })
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw
  }
  return fetch("https://app.yellowmessenger.com/components/virus-scanner/scan", requestOptions)
}

/* 
function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField) == false) {
        return false;
    }
    return true;
} */

function isNumber(evt) {
  evt = evt ? evt : window.event
  var charCode = evt.which ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    $(`#err_${evt.target.id}`).text("Only numbers allowed!")
    $(`#err_${evt.target.id}`).show()
    return false
  }
  $(`#err_${evt.target.id}`).text("")
  $(`#err_${evt.target.id}`).hide()
  return true
}

function checkSpcialChar(evt) {
  evt = evt ? evt : window.event
  var charCode = evt.which ? evt.which : evt.keyCode
  if (!((evt.charCode >= 65 && evt.charCode <= 90) || (evt.charCode >= 97 && evt.charCode <= 122) || (evt.charCode >= 48 && evt.charCode <= 57) || evt.charCode == 32 || evt.charCode == 13)) {
    $(`#err_${evt.target.id}`).text("special character is not allowed")
    $(`#err_${evt.target.id}`).show()
    return false
  }
  $(`#err_${evt.target.id}`).text("")
  $(`#err_${evt.target.id}`).hide()
  return true
}

function isNotNumber(evt) {
  $(`#err_${evt.target.id}`).text("")
  $(`#err_${evt.target.id}`).hide()
  evt = evt ? evt : window.event
  var charCode = evt.which ? evt.which : evt.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) || evt.charCode == 13) {
    $(`#err_${evt.target.id}`).text("")
    $(`#err_${evt.target.id}`).hide()
    return true
  }
  validateNotNumber(evt)
  return false
}

function checkLength(evt, max_Length) {
  let id = evt.target.id
  var val = document.getElementById(id).value
  var length = val.length
  if (length >= max_Length) {
    $(`#err_${id}`).text("Maximum " + max_Length + " characters allowed!")
    $(`#err_${id}`).show()
  } else {
    detection(evt)
  }
}

function fieldCheckLength(field, maxLength) {
  var length = field.length
  if (length > maxLength) {
    return true
  } else {
    return false
  }
}

function detection(evt) {
  id = evt.target.id
  document.getElementById(id).addEventListener("keydown", event => {
    if (event.key == "Backspace") {
      $(`#err_${id}`).text("")
      $(`#err_${id}`).hide()
    }
  })
}

function check_Mobile_Length(evt, max_Length) {
  let id = evt.target.id
  var val = document.getElementById(id).value
  var length = val.length
  if (length !== max_Length) {
    detection(evt)
  } else {
    $(`#err_${id}`).text("Maximum " + max_Length + " number allowed!")
    $(`#err_${id}`).show()
  }
}

function validateNotNumber(evt) {
  let id = evt.target.id
  $(`#err_${id}`).text("Numbers not allowed")
  $(`#err_${id}`).show()
  return
}

function handleFormAddBeneficiary(event) {
  event.preventDefault()
  // beneficiaryCount++;
  beneficiaryCount = buttonCount + 1
  traverse = 1
  var field_addBeneficiaryFirstName = $("#field_addBeneficiaryFirstName").val()
  var field_addBeneficiaryMiddleName = $("#field_addBeneficiaryMiddleName").val()
  var field_addBeneficiaryLastName = $("#field_addBeneficiaryLastName").val()
  var field_addBeneficiaryMobileNum = $("#field_addBeneficiaryMobileNum").val()
  var field_addBeneficiaryEmailAddress = $("#field_addBeneficiaryEmailAddress").val()
  var field_addBeneficiaryHomeAddress = $("#field_addBeneficiaryHomeAddress").val()
  var field_addBeneficiaryDOB = $("#field_addBeneficiaryDOB").val()
  var field_addBeneficiaryPOB = $("#field_addBeneficiaryPOB").val()
  var field_addBeneficiaryNationality = $("#field_addBeneficiaryNationality").val()
  var field_addBeneficiarySex = $("#field_addBeneficiarySex").val()
  var field_addBeneficiaryRelationToDeceased = $("#field_addBeneficiaryRelationToDeceased").val()
  var field_addBeneficiaryEmployerName = $("#field_addBeneficiaryEmployerName").val()
  var field_addBeneficiaryOccupation = $("#field_addBeneficiaryOccupation").val()
  var field_addBeneficiary_relatives1 = $("#field_addBeneficiary_relatives1").val()
  var field_add_Beneficiary_add_relatives2 = $("#field_add_Beneficiary_add_relatives2").val()

  var speciAddBeniFirstName = specialcharacterValidation(field_addBeneficiaryFirstName)
  var numAddBeniFirstName = numberValidation(field_addBeneficiaryFirstName)
  var numAddBeniMobile = onlyNumberValidate(field_addBeneficiaryMobileNum)
  var speciAddBeniMiddleName = specialcharacterValidation(field_addBeneficiaryMiddleName)
  var numAddBeniMiddleName = numberValidation(field_addBeneficiaryMiddleName)
  var speciAddBeniLastName = specialcharacterValidation(field_addBeneficiaryLastName)
  var numAddBeniLastName = numberValidation(field_addBeneficiaryLastName)
  var lenaddBeneficiaryFirstName = fieldCheckLength(field_addBeneficiaryFirstName, 30)
  var lenaddBeneficiaryMiddleName = fieldCheckLength(field_addBeneficiaryFirstName, 30)
  var lenaddBeneficiaryLastName = fieldCheckLength(field_addBeneficiaryFirstName, 30)
  var lenaddBeneficiaryMobileNum = fieldCheckLength(field_addBeneficiaryMobileNum, 30)
  var lenaddBeneficiaryHomeAddress = fieldCheckLength(field_addBeneficiaryHomeAddress, 250)
  var lenaddBeneficiaryPOB = fieldCheckLength(field_addBeneficiaryPOB, 120)
  var lenaddBeneficiaryNationality = fieldCheckLength(field_addBeneficiaryNationality, 120)
  var lenaddBeneficiaryRelationToDeceased = fieldCheckLength(field_addBeneficiaryRelationToDeceased, 50)
  var lenaddBeneficiaryEmployerName = fieldCheckLength(field_addBeneficiaryEmployerName, 30)
  var ageaddBeneficiaryDOB = currentDate(field_addBeneficiaryDOB, "new_beneficiary")
  var relationaddBeneficiaryRelation = checkKeyword(field_addBeneficiaryRelationToDeceased, "new_beneficiary")
  /*  var numAddBeniEmployerName = numberValidation(field_addBeneficiaryEmployerName);
     var specAddBeniEmployerName = specialcharacterValidation(field_addBeneficiaryEmployerName); */

  if (ageaddBeneficiaryDOB) {
    /*  console.error(ageaddBeneficiaryDOB); */
    optionAge = true
  }

  if (relationaddBeneficiaryRelation) {
    /* console.error(relationaddBeneficiaryRelation) */
    relation = true
  }

  if (field_addBeneficiaryDOB.length !== 0) {
    var futaddBeneficiaryDOB = futureDate(field_addBeneficiaryDOB)
  }

  if (field_addBeneficiaryFirstName.length === 0) {
    $("#err_field_addBeneficiaryFirstName").text("Field is empty")
    $("#err_field_addBeneficiaryFirstName").show()
  } else if (lenaddBeneficiaryFirstName) {
    $("#err_field_addBeneficiaryFirstName").text("Maximum 30 characters allowed!")
    $("#err_field_addBeneficiaryFirstName").show()
  } else if (speciAddBeniFirstName == true) {
    $("#err_field_addBeneficiaryFirstName").text("Special character is not allowed")
    $("#err_field_addBeneficiaryFirstName").show()
  } else if (numAddBeniFirstName) {
    $("#err_field_addBeneficiaryFirstName").text("Number is not allowed")
    $("#err_field_addBeneficiaryFirstName").show()
  } else {
    $("#err_field_addBeneficiaryFirstName").text("")
    $("#err_field_addBeneficiaryFirstName").hide()
  }

  if (field_addBeneficiaryMiddleName.length === 0) {
    $("#err_field_addBeneficiaryMiddleName").text("Field is empty")
    $("#err_field_addBeneficiaryMiddleName").show()
  } else if (lenaddBeneficiaryMiddleName) {
    $("#err_field_addBeneficiaryMiddleName").text("Maximum 30 characters allowed!")
    $("#err_field_addBeneficiaryMiddleName").show()
  } else if (speciAddBeniMiddleName) {
    $("#err_field_addBeneficiaryMiddleName").text("Special character is not allowed")
    $("#err_field_addBeneficiaryMiddleName").show()
  } else if (numAddBeniMiddleName) {
    $("#err_field_addBeneficiaryMiddleName").text("Number is not allowed")
    $("#err_field_addBeneficiaryMiddleName").show()
  } else {
    $("#err_field_addBeneficiaryMiddleName").text("")
    $("#err_field_addBeneficiaryMiddleName").hide()
  }

  if (field_addBeneficiaryLastName.length === 0) {
    $("#err_field_addBeneficiaryLastName").text("Field is empty")
    $("#err_field_addBeneficiaryLastName").show()
  } else if (lenaddBeneficiaryLastName) {
    $("#err_field_addBeneficiaryLastName").text("Maximum 30 characters allowed!")
    $("#err_field_addBeneficiaryLastName").show()
  } else if (speciAddBeniLastName) {
    $("#err_field_addBeneficiaryLastName").text("Special character is not allowed")
    $("#err_field_addBeneficiaryLastName").show()
  } else if (numAddBeniLastName) {
    $("#err_field_addBeneficiaryLastName").text("Number is not allowed")
    $("#err_field_addBeneficiaryLastName").show()
  } else {
    $("#err_field_addBeneficiaryLastName").text("")
    $("#err_field_addBeneficiaryLastName").hide()
  }

  if (field_addBeneficiaryMobileNum.length === 0) {
    $("#err_field_addBeneficiaryMobileNum").text("Field is empty")
    $("#err_field_addBeneficiaryMobileNum").show()
  } else if (lenaddBeneficiaryMobileNum) {
    $("#err_field_addBeneficiaryMobileNum").text("Maximum 10 characters allowed")
    $("#err_field_addBeneficiaryMobileNum").show()
  } else if (!numAddBeniMobile) {
    $("#err_field_addBeneficiaryMobileNum").text("Only number is allowed!")
    $("#err_field_addBeneficiaryMobileNum").show()
  } else if (field_addBeneficiaryMobileNum.length !== 10) {
    $("#err_field_addBeneficiaryMobileNum").text("Minimum 10 number required!")
    $("#err_field_addBeneficiaryMobileNum").show()
  } else {
    $("#err_field_addBeneficiaryMobileNum").text("")
    $("#err_field_addBeneficiaryMobileNum").hide()
  }

  if (field_addBeneficiaryEmailAddress.length === 0) {
    $("#err_field_addBeneficiaryEmailAddress").text("Field is empty")
    $("#err_field_addBeneficiaryEmailAddress").show()
  } else {
    validateEmailAddBeneficiary(field_addBeneficiaryEmailAddress)
  }

  if (field_addBeneficiaryHomeAddress.length === 0) {
    $("#err_field_addBeneficiaryHomeAddress").text("Field is empty")
    $("#err_field_addBeneficiaryHomeAddress").show()
  } else if (lenaddBeneficiaryHomeAddress) {
    $("#err_field_addBeneficiaryHomeAddress").text("Maximum 250 characters allowed")
    $("#err_field_addBeneficiaryHomeAddress").show()
  } else {
    $("#err_field_addBeneficiaryHomeAddress").text("")
    $("#err_field_addBeneficiaryHomeAddress").hide()
  }

  if (field_addBeneficiaryDOB.length === 0) {
    $("#err_field_addBeneficiaryDOB").text("Field is empty")
    $("#err_field_addBeneficiaryDOB").show()
  } else if (!futaddBeneficiaryDOB) {
    $("#err_field_addBeneficiaryDOB").text("Future date is  not Accepted!")
    $("#err_field_addBeneficiaryDOB").show()
  } else {
    $("#err_field_addBeneficiaryDOB").text("")
    $("#err_field_addBeneficiaryDOB").hide()
  }

  if (field_addBeneficiaryPOB.length === 0) {
    $("#err_field_addBeneficiaryPOB").text("Field is empty")
    $("#err_field_addBeneficiaryPOB").show()
  } else if (lenaddBeneficiaryPOB) {
    $("#err_field_addBeneficiaryPOB").text("Maximum 120 characters allowed!")
    $("#err_field_addBeneficiaryPOB").show()
  } else {
    $("#err_field_addBeneficiaryPOB").text("")
    $("#err_field_addBeneficiaryPOB").hide()
  }

  if (field_addBeneficiaryNationality.length === 0) {
    $("#err_field_addBeneficiaryNationality").text("Field is empty")
    $("#err_field_addBeneficiaryNationality").show()
  } else if (lenaddBeneficiaryNationality) {
    $("#err_field_addBeneficiaryNationality").text("Maximum 120 characters allowed!")
    $("#err_field_addBeneficiaryNationality").show()
  } else {
    $("#err_field_addBeneficiaryNationality").text("")
    $("#err_field_addBeneficiaryNationality").hide()
  }

  if (field_addBeneficiarySex.length === 0) {
    $("#err_field_addBeneficiarySex").text("Field is empty")
    $("#err_field_addBeneficiarySex").show()
  } else {
    $("#err_field_addBeneficiarySex").text("")
    $("#err_field_addBeneficiarySex").hide()
  }

  if (field_addBeneficiaryRelationToDeceased.length === 0) {
    $("#err_field_addBeneficiaryRelationToDeceased").text("Field is empty")
    $("#err_field_addBeneficiaryRelationToDeceased").show()
  } else if (lenaddBeneficiaryRelationToDeceased) {
    $("#err_field_addBeneficiaryRelationToDeceased").text("Maximum 50 characters allowed!")
    $("#err_field_addBeneficiaryRelationToDeceased").show()
  } else {
    $("#err_field_addBeneficiaryRelationToDeceased").text("")
    $("#err_field_addBeneficiaryRelationToDeceased").hide()
  }

  if (field_addBeneficiaryOccupation.length === 0) {
    $("#err_field_addBeneficiaryOccupation").text("Field is empty")
    $("#err_field_addBeneficiaryOccupation").show()
  } else {
    $("#err_field_addBeneficiaryOccupation").text("")
    $("#err_field_addBeneficiaryOccupation").hide()
  }

  if (field_addBeneficiaryEmployerName.length === 0) {
    $("#err_field_addBeneficiaryEmployerName").text("Field is empty")
    $("#err_field_addBeneficiaryEmployerName").show()
  } else if (lenaddBeneficiaryEmployerName) {
    $("#err_field_addBeneficiaryEmployerName").text("Maximum 250 characters allowed!")
    $("#err_field_addBeneficiaryEmployerName").show()
  } else {
    $("#err_field_addBeneficiaryEmployerName").text("")
    $("#err_field_addBeneficiaryEmployerName").show()
  }

  if (field_addBeneficiary_relatives1.length === 0) {
    $("#err_field_add_Beneficiary_relatives1").text("Field is empty")
    $("#err_field_add_Beneficiary_relatives1").show()
  } else {
    $("#err_field_add_Beneficiary_relatives1").text("")
    $("#err_field_add_Beneficiary_relatives1").show()
  }

  if (field_add_Beneficiary_add_relatives2.length === 0) {
    $("#err_field_add_Beneficiary_relatives2").text("Field is empty")
    $("#err_field_add_Beneficiary_relatives2").show()
  } else {
    $("#err_field_add_Beneficiary_relatives2").text("")
    $("#err_field_add_Beneficiary_relatives2").show()
  }

  if (!$("#invalidCheck_basicAddBeneficiary").is(":checked")) {
    $("#err_invalidCheck_basicAddBeneficiary").text("Please select the field")
    $("#err_invalidCheck_basicAddBeneficiary").show()
  } else {
    $("#err_invalidCheck_basicAddBeneficiary").text("")
    $("#err_invalidCheck_basicAddBeneficiary").hide()
  }

  if (!$("#invalidCheck_privacyAddBeneficiary").is(":checked")) {
    $("#err_invalidCheck_privacyAddBeneficiary").text("Please select the field")
    $("#err_invalidCheck_privacyAddBeneficiary").show()
  } else {
    $("#err_invalidCheck_privacyAddBeneficiary").text("")
    $("#err_invalidCheck_privacyAddBeneficiary").hide()
  }

  if ($("#field_addBeneficiaryinlineRadio1").is(":checked") || $("#field_addBeneficiaryinlineRadio2").is(":checked")) {
    $("#err_field_addBeneficiaryPEP").text("")
    $("#err_field_addBeneficiaryPEP").hide()
  } else {
    $("#err_field_addBeneficiaryPEP").text("Please select the field")
    $("#err_field_addBeneficiaryPEP").show()
  }

  if (field_addBeneficiaryFirstName.length !== 0 && field_addBeneficiaryMiddleName.length !== 0 && field_addBeneficiaryLastName.length !== 0 && field_addBeneficiaryMobileNum.length == 10 && field_addBeneficiaryEmailAddress.length !== 0 && field_addBeneficiaryHomeAddress.length !== 0 && field_addBeneficiaryDOB.length !== 0 && field_addBeneficiaryPOB.length !== 0 && field_addBeneficiaryNationality.length !== 0 && field_addBeneficiarySex.length !== 0 && field_addBeneficiaryRelationToDeceased.length !== 0 && field_addBeneficiaryOccupation.length !== 0 && field_addBeneficiaryEmployerName.length !== 0 && field_addBeneficiary_relatives1.length !== 0 && field_add_Beneficiary_add_relatives2.length !== 0 && $("#invalidCheck_basicAddBeneficiary").is(":checked") && $("#invalidCheck_privacyAddBeneficiary").is(":checked") && validateEmailAddBeneficiary(field_addBeneficiaryEmailAddress) && numAddBeniFirstName == false && speciAddBeniFirstName == false && numAddBeniMiddleName == false && speciAddBeniMiddleName == false && numAddBeniLastName == false && speciAddBeniLastName == false && numAddBeniMobile == true && futaddBeneficiaryDOB == true) {
    dataBen = {
      field_addBeneficiaryFirstName,
      field_addBeneficiaryMiddleName,
      field_addBeneficiaryLastName,
      field_addBeneficiaryMobileNum,
      field_addBeneficiaryEmailAddress,
      field_addBeneficiaryHomeAddress,
      field_addBeneficiaryDOB,
      field_addBeneficiaryPOB,
      field_addBeneficiaryNationality,
      field_addBeneficiarySex,
      field_addBeneficiaryRelationToDeceased,
      field_addBeneficiaryEmployerName,
      field_addBeneficiaryOccupation,
      field_addBeneficiary_relatives1,
      field_add_Beneficiary_add_relatives2,
      country_code: $("select#field_addBeneficiaryMobileNumberSelect option").filter(":selected").val(),
      basic_checkbox: $("#invalidCheck_basicAddBeneficiary").is(":checked"),
      privacy_checkbox: $("#invalidCheck_privacyAddBeneficiary").is(":checked"),
      privacy_consent_beneficiary_1: $("#privacy_consent_beneficiary_1").is(":checked"),
      privacy_consent_beneficiary_2: $("#privacy_consent_beneficiary_2").is(":checked")
    }

    let beneficiary = {}

    ;(beneficiary["beneficiaryNo"] = beneficiaryCount.toString()),
      (beneficiary["firstName"] = field_addBeneficiaryFirstName.toUpperCase()),
      (beneficiary["middleName"] = field_addBeneficiaryMiddleName.toUpperCase()),
      (beneficiary["lastName"] = field_addBeneficiaryLastName.toUpperCase()),
      (beneficiary["dateOfBirth"] = field_addBeneficiaryDOB.split("-")[1] + "/" + field_addBeneficiaryDOB.split("-")[2] + "/" + field_addBeneficiaryDOB.split("-")[0]),
      (beneficiary["countryCode"] = $("select#field_addBeneficiaryMobileNumberSelect option").filter(":selected").val()),
      (beneficiary["phoneNumber"] = field_addBeneficiaryMobileNum),
      (beneficiary["emailAddress"] = field_addBeneficiaryEmailAddress),
      (beneficiary["homeAddress"] = field_addBeneficiaryHomeAddress),
      (beneficiary["placeOfBirth"] = field_addBeneficiaryPOB),
      (beneficiary["nationality"] = field_addBeneficiaryNationality),
      (beneficiary["sex"] = field_addBeneficiarySex),
      (beneficiary["relationship"] = field_addBeneficiaryRelationToDeceased),
      // beneficiary["documentFolder"] = `/CLAIMS/BPLAC/${referenceNumber}`,
      (beneficiary["payoutOption"] = payoutOption),
      (beneficiary["employer"] = field_addBeneficiaryEmployerName),
      (beneficiary["governmentOfficial"] = field_addBeneficiary_relatives1),
      (beneficiary["governmentOfficialRelative"] = field_add_Beneficiary_add_relatives2),
      (beneficiary["occupation"] = field_addBeneficiaryOccupation),
      (beneficiary["check1"] = dataBen.privacy_consent_beneficiary_1),
      (beneficiary["check2"] = dataBen.privacy_consent_beneficiary_2)
    BeneficiaryList.push(beneficiary)

    // $("#customer_Name").text(`Hi ${customName}. Hang in there as we process your request. Expect an SMS from us within 7 to 10 working days on the status of your request.`)
    console.log('beneficiaryCount 1153---', beneficiaryCount);
    if (beneficiaryCount == 1) {
      $("#customer_Name").text(`Hi ${customName}. Hang in there as we process your request. Expect an SMS from us within 7 to 10 working days on the status of your request.`)
    }else {
      $("#customer_Name").text(`Hang in there as we process your request. Expect an SMS from us within 7 to 10 working days on the status of your request.`)
    }
    if (buttonCount == 1) {
      data1 = dataBen
      console.log("data1", data1)
    }

    if (buttonCount == 2) {
      data2 = dataBen
      console.log("data2", data2)
    }

    if (buttonCount == 3) {
      data3 = dataBen
      console.log("data3", data3)
    }

    if (buttonCount == 4) {
      data4 = dataBen
      console.log("data4", data4)
    }

    if (buttonCount == 5) {
      data5 = dataBen
      console.log("data5", data5)
    }

    if (buttonCount == 6) {
      data6 = dataBen
      console.log("data6", data6)
    }

    dataReset("field_addBeneficiaryFirstName", "field_addBeneficiaryMiddleName", "field_addBeneficiaryLastName", "field_addBeneficiaryMobileNum", "field_addBeneficiaryEmailAddress", "field_addBeneficiaryHomeAddress", "field_addBeneficiaryDOB", "field_addBeneficiaryPOB", "field_addBeneficiaryNationality", "field_addBeneficiarySex", "field_addBeneficiaryRelationToDeceased", "field_addBeneficiaryEmployerName", "field_addBeneficiaryOccupation", "field_addBeneficiary_relatives1", "field_add_Beneficiary_add_relatives2")
    uploadDataReset()
    // $('#stepper_intro').hide();
    $("#death_data_privacy").hide()
    $("#addBeneficiary").hide()
    $("#addBeneficiarypayment").show()
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#step3").remove("active")
    /*  $('#requirements')[0].scrollIntoView(true); */

    /*    console.log('Data -> ', dataBen) */
  } else {
    $("#popUp").modal("show")
  }
}

function specialcharacterValidation(input) {
  var regex = /^[A-Za-z0-9 ]+$/
  var firstNameValid = regex.test(input)
  if (!firstNameValid) {
    return true
  } else {
    return false
  }
}

function numberValidation(input) {
  var regex = /^([^0-9]*)$/
  var firstNameValid = regex.test(input)
  if (!firstNameValid) {
    return true
  } else {
    return false
  }
}

function onlyNumberValidate(input) {
  var regex = /^[0-9]*$/
  var firstNameValid = regex.test(input)
  if (firstNameValid) {
    return true
  } else {
    return false
  }
}

function process(date) {
  var parts = date.split("-")
  if (parts[2].length == 4) {
    return new Date(parts[2], parts[1] - 1, parts[0])
  } else {
    return new Date(parts[0], parts[1] - 1, parts[2])
  }
}

//comparing two dates
function compareFun(DOB, DOID) {
  if (DOB.length != 0 && DOID.length != 0) {
    if (process(DOB) <= process(DOID)) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function handleForm(event) {
  event.preventDefault()
  var field_firstName = $("#field_firstName").val()
  var field_middleName = $("#field_middleName").val()
  var field_lastName = $("#field_lastName").val()
  var field_lastName_Suffix = $("#field_lastName_Suffix").val()
  var field_DOB = $("#field_DOB").val()
  var field_DOID = $("#field_DOID").val()
  var field_NatureLoss = $("#nature_Loss").val()
  var field_BeneficiaryFirstName = $("#field_BeneficiaryFirstName").val()
  var field_BeneficiaryMiddleName = $("#field_BeneficiaryMiddleName").val()
  var field_BeneficiaryLastName = $("#field_BeneficiaryLastName").val()
  var field_BeneficiaryMobileNum = $("#field_BeneficiaryMobileNum").val()
  var field_BeneficiaryEmailAddress = $("#field_BeneficiaryEmailAddress").val()
  var field_BeneficiaryHomeAddress = $("#field_BeneficiaryHomeAddress").val()
  var field_BeneficiaryDOB = $("#field_BeneficiaryDOB").val()
  var field_BeneficiaryPOB = $("#field_BeneficiaryPOB").val()
  var field_BeneficiaryNationality = $("#field_BeneficiaryNationality").val()
  var field_BeneficiarySex = $("#field_BeneficiarySex").val()
  var field_BenificiaryOccupation = $("#field_BeneficiaryOccupation").val()
  var field_BeneficiaryRelationToDeceased = $("#field_BeneficiaryRelationToDeceased").val()
  var field_BeneficiaryEmployerName = $("#field_BeneficiaryEmployerName").val()
  var field_Beneficiary_relatives1 = $("#field_Beneficiary_relatives1").val()
  var field_Beneficiary_relatives2 = $("#field_Beneficiary_relatives2").val()

  var specFirstName = specialcharacterValidation(field_firstName)
  var specMiddleName = specialcharacterValidation(field_middleName)
  var specLastName = specialcharacterValidation(field_lastName)
  var numFirstName = numberValidation(field_firstName)
  var numMiddleName = numberValidation(field_middleName)
  var numLastName = numberValidation(field_lastName)
  var speciBeniFirstName = specialcharacterValidation(field_BeneficiaryFirstName)
  var numBeniFirstName = numberValidation(field_BeneficiaryFirstName)
  var numberMobile = onlyNumberValidate(field_BeneficiaryMobileNum)
  var speciBeniMiddleName = specialcharacterValidation(field_BeneficiaryMiddleName)
  var numBeniMiddleName = numberValidation(field_BeneficiaryMiddleName)
  var speciBeniLastName = specialcharacterValidation(field_BeneficiaryLastName)
  var numBeniLastName = numberValidation(field_BeneficiaryLastName)
  /*  var numEmployerName = numberValidation(field_BeneficiaryEmployerName);
     var specEmployerName = specialcharacterValidation(field_BeneficiaryEmployerName); */
  var specSuffix = false
  var numSuffix = false
  var lenLastNameSuffix = false

  if (field_lastName_Suffix != 0) {
    specSuffix = specialcharacterValidation(field_lastName_Suffix)
    numSuffix = numberValidation(field_lastName_Suffix)
    lenLastNameSuffix = fieldCheckLength(field_lastName_Suffix, 3)
  }
  var comapareDates = compareFun(field_DOB, field_DOID)

  var lenFirstName = fieldCheckLength(field_firstName, 25)
  var lenMiddleName = fieldCheckLength(field_middleName, 25)
  var lenLastName = fieldCheckLength(field_lastName, 25)
  var lenBeneficiaryFirstName = fieldCheckLength(field_BeneficiaryFirstName, 30)
  var lenBeneficiaryMiddleName = fieldCheckLength(field_BeneficiaryMiddleName, 30)
  var lenBeneficiaryLastName = fieldCheckLength(field_BeneficiaryLastName, 30)
  var lenMobileNum = fieldCheckLength(field_BeneficiaryMobileNum, 10)
  var lenBeneficiaryHomeAddress = fieldCheckLength(field_BeneficiaryHomeAddress, 250)
  var lenBeneficiaryPOB = fieldCheckLength(field_BeneficiaryPOB, 120)
  var lenBeneficiaryNationality = fieldCheckLength(field_BeneficiaryNationality, 120)
  var lenBeneficiaryRelationToDeceased = fieldCheckLength(field_BeneficiaryRelationToDeceased, 50)
  var lenBeneficiaryEmployerName = fieldCheckLength(field_BeneficiaryEmployerName, 30)
  var checkDOb = currentDate(field_BeneficiaryDOB, "")
  var relationKeyword = checkKeyword(field_BeneficiaryRelationToDeceased, "")

  if (field_DOB.length !== 0) {
    var futDOB = futureDate(field_DOB)
    var futExistDOB = futureDateDOB(field_DOB)
  }

  if (field_DOID.length !== 0) {
    var futDOID = futureDate(field_DOID)
  }

  if (field_BeneficiaryDOB.length !== 0) {
    var futBeneficiaryDOB = futureDate(field_BeneficiaryDOB)
    /*  var futExistBeneficiaryDOB = futureDateDOB(field_BeneficiaryDOB); */
  }

  var field_NatureOfLoss = $("select#nature_Loss option").filter(":selected").val()

  //if(field_NatureOfLoss == 'Illness') {
  if (0 == field_NatureOfLoss.localeCompare("Illness")) {
    document.getElementById("file_Upload_2").disabled = true
    document.getElementById("file_Upload_2").style.cursor = "no-drop"
    document.getElementById("file_Upload_2").style.opacity = "0.4"
    document.getElementById("police_report").style.border = "none"

    optiondisable = 2
  } else {
    document.getElementById("file_Upload_2").disabled = false
    document.getElementById("file_Upload_2").style.cursor = "pointer"
    document.getElementById("file_Upload_2").style.opacity = "0"
    document.getElementById("police_report").style.border = "none"
    optiondisable = 1
  }

  if (checkDOb) {
    optionAge = true
  }

  if (relationKeyword) {
    relation = true
  }

  if (field_firstName.length === 0) {
    $("#err_field_firstName").text("Field is empty")
    $("#err_field_firstName").show()
  } else if (lenFirstName) {
    $("#err_field_firstName").text("Maximum 25 characters allowed!")
    $("#err_field_firstName").show()
  } else if (specFirstName == true) {
    $("#err_field_firstName").text("Special character is not allowed")
    $("#err_field_firstName").show()
  } else if (numFirstName) {
    $("#err_field_firstName").text("Number is not allowed")
    $("#err_field_firstName").show()
  } else {
    $("#err_field_firstName").text("")
    $("#err_field_firstName").hide()
  }

  if (field_middleName.length === 0) {
    $("#err_field_middleName").text("Field is empty")
    $("#err_field_middleName").show()
  } else if (lenMiddleName) {
    $("#err_field_middleName").text("Maximum 25 characters allowed!")
    $("#err_field_middleName").show()
  } else if (specMiddleName) {
    $("#err_field_middleName").text("Special character is not allowed")
    $("#err_field_middleName").show()
  } else if (numMiddleName) {
    $("#err_field_middleName").text("Number is not allowed")
    $("#err_field_middleName").show()
  } else {
    $("#err_field_middleName").text("")
    $("#err_field_middleName").hide()
  }

  if (field_lastName.length === 0) {
    $("#err_field_lastName").text("Field is empty")
    $("#err_field_lastName").show()
  } else if (lenLastName) {
    $("#err_field_lastName").text("Maximum 25 characters allowed!")
    $("#err_field_lastName").show()
  } else if (specLastName) {
    $("#err_field_lastName").text("Special character is not allowed")
    $("#err_field_lastName").show()
  } else if (numLastName) {
    $("#err_field_lastName").text("Number is not allowed")
    $("#err_field_lastName").show()
  } else {
    $("#err_field_lastName").text("")
    $("#err_field_lastName").hide()
  }

  if (field_lastName_Suffix.length === 0) {
    $("#err_field_lastName_Suffix").text("")
    $("#err_field_lastName_Suffix").hide()
  } else if (lenLastNameSuffix) {
    $("#err_field_lastName_Suffix").text("Maximum 3 characters allowed!")
    $("#err_field_lastName_Suffix").show()
  } else if (specSuffix) {
    $("#err_field_lastName_Suffix").text("Special character is not allowed")
    $("#err_field_lastName_Suffix").show()
  } else if (numSuffix) {
    $("#err_field_lastName_Suffix").text("Number is not allowed")
    $("#err_field_lastName_Suffix").show()
  } else {
    $("#err_field_lastName_Suffix").text("")
    $("#err_field_lastName_Suffix").hide()
  }

  if (field_DOB.length === 0) {
    $("#err_field_DOB").text("Field is empty")
    $("#err_field_DOB").show()
  } else if (!futDOB) {
    $("#err_field_DOB").text("Future date is  not Accepted!")
    $("#err_field_DOB").show()
  } else if (!futExistDOB) {
    $("#err_field_DOB").text("Current date is  not Applicable!")
    $("#err_field_DOB").show()
  } else {
    $("#err_field_DOB").text("")
    $("#err_field_DOB").hide()
  }

  if (field_DOID.length === 0) {
    $("#err_field_DOID").text("Field is empty")
    $("#err_field_DOID").show()
  } else if (!futDOID) {
    $("#err_field_DOID").text("Future date is  not Accepted!")
    $("#err_field_DOID").show()
  } else if (!comapareDates) {
    $("#err_field_DOID").text("Insured's death date can not be smaller than DOB")
    $("#err_field_DOID").show()
  } else {
    $("#err_field_DOID").text("")
    $("#err_field_DOID").hide()
  }

  if (field_NatureLoss.length === 0) {
    $("#err_natural_loss").text("Field is empty")
    $("#err_natural_loss").show()
  } else {
    $("#err_natural_loss").text("")
    $("#err_natural_loss").hide()
  }

  if (field_BeneficiaryFirstName.length === 0) {
    $("#err_field_BeneficiaryFirstName").text("Field is empty")
    $("#err_field_BeneficiaryFirstName").show()
  } else if (lenBeneficiaryFirstName) {
    $("#err_field_BeneficiaryFirstName").text("Maximum 30 characters allowed!")
    $("#err_field_BeneficiaryFirstName").show()
  } else if (speciBeniFirstName == true) {
    $("#err_field_BeneficiaryFirstName").text("Special character is not allowed")
    $("#err_field_BeneficiaryFirstName").show()
  } else if (numBeniFirstName) {
    $("#err_field_BeneficiaryFirstName").text("Number is not allowed")
    $("#err_field_BeneficiaryFirstName").show()
  } else {
    $("#err_field_BeneficiaryFirstName").text("")
    $("#err_field_BeneficiaryFirstName").hide()
  }

  if (field_BeneficiaryMiddleName.length === 0) {
    $("#err_field_BeneficiaryMiddleName").text("Field is empty")
    $("#err_field_BeneficiaryMiddleName").show()
  } else if (lenBeneficiaryMiddleName) {
    $("#err_field_BeneficiaryMiddleName").text("Maximum 30 characters allowed!")
    $("#err_field_BeneficiaryMiddleName").show()
  } else if (speciBeniMiddleName == true) {
    $("#err_field_BeneficiaryMiddleName").text("Special character is not allowed")
    $("#err_field_BeneficiaryMiddleName").show()
  } else if (numBeniMiddleName) {
    $("#err_field_BeneficiaryMiddleName").text("Number is not allowed")
    $("#err_field_BeneficiaryMiddleName").show()
  } else {
    $("#err_field_BeneficiaryMiddleName").text("")
    $("#err_field_BeneficiaryMiddleName").hide()
  }

  if (field_BeneficiaryLastName.length === 0) {
    $("#err_field_BeneficiaryLastName").text("Field is empty")
    $("#err_field_BeneficiaryLastName").show()
  } else if (lenBeneficiaryLastName) {
    $("#err_field_BeneficiaryLastName").text("Maximum 30 characters allowed!")
    $("#err_field_BeneficiaryLastName").show()
  } else if (speciBeniLastName == true) {
    $("#err_field_BeneficiaryLastName").text("Special character is not allowed")
    $("#err_field_BeneficiaryLastName").show()
  } else if (numBeniLastName) {
    $("#err_field_BeneficiaryLastName").text("Number is not allowed")
    $("#err_field_BeneficiaryLastName").show()
  } else {
    $("#err_field_BeneficiaryLastName").text("")
    $("#err_field_BeneficiaryLastName").hide()
  }

  if (field_BeneficiaryMobileNum.length === 0) {
    $("#err_field_BeneficiaryMobileNum").text("Field is empty")
    $("#err_field_BeneficiaryMobileNum").show()
  } else if (lenMobileNum) {
    $("#err_field_BeneficiaryMobileNum").text("Maximum 10 characters allowed!")
    $("#err_field_BeneficiaryMobileNum").show()
  } else if (!numberMobile) {
    $("#err_field_BeneficiaryMobileNum").text("Only number is allowed!")
    $("#err_field_BeneficiaryMobileNum").show()
  } else if (field_BeneficiaryMobileNum.length !== 10) {
    $("#err_field_BeneficiaryMobileNum").text("Minimum 10 number required!")
    $("#err_field_BeneficiaryMobileNum").show()
  } else {
    $("#err_field_BeneficiaryMobileNum").text("")
    $("#err_field_BeneficiaryMobileNum").hide()
  }

  if (field_BeneficiaryEmailAddress.length === 0) {
    $("#err_field_BeneficiaryEmailAddress").text("Field is empty")
    $("#err_field_BeneficiaryEmailAddress").show()
  } else {
    validateEmail(field_BeneficiaryEmailAddress)
  }

  if (field_BeneficiaryHomeAddress.length === 0) {
    $("#err_field_BeneficiaryHomeAddress").text("Field is empty")
    $("#err_field_BeneficiaryHomeAddress").show()
  } else if (lenBeneficiaryHomeAddress) {
    $("#err_field_BeneficiaryHomeAddress").text("Maximum 250 characters allowed!")
    $("#err_field_BeneficiaryHomeAddress").show()
  } else {
    $("#err_field_BeneficiaryHomeAddress").text("")
    $("#err_field_BeneficiaryHomeAddress").hide()
  }

  if (field_BeneficiaryDOB.length === 0) {
    $("#err_field_BeneficiaryDOB").text("Field is empty")
    $("#err_field_BeneficiaryDOB").show()
  } else if (!futBeneficiaryDOB) {
    $("#err_field_BeneficiaryDOB").text("Future date is  not Accepted!")
    $("#err_field_BeneficiaryDOB").show()
  } else {
    $("#err_field_BeneficiaryDOB").text("")
    $("#err_field_BeneficiaryDOB").hide()
  }

  if (field_BeneficiaryPOB.length === 0) {
    $("#err_field_BeneficiaryPOB").text("Field is empty")
    $("#err_field_BeneficiaryPOB").show()
  } else if (lenBeneficiaryPOB) {
    $("#err_field_BeneficiaryPOB").text("Maximum 120 characters allowed!")
    $("#err_field_BeneficiaryPOB").show()
  } else {
    $("#err_field_BeneficiaryPOB").text("")
    $("#err_field_BeneficiaryPOB").hide()
  }

  if (field_BeneficiaryNationality.length === 0) {
    $("#err_field_BeneficiaryNationality").text("Field is empty")
    $("#err_field_BeneficiaryNationality").show()
  } else if (lenBeneficiaryNationality) {
    $("#err_field_BeneficiaryNationality").text("Maximum 120 characters allowed!")
    $("#err_field_BeneficiaryNationality").show()
  } else {
    $("#err_field_BeneficiaryNationality").text("")
    $("#err_field_BeneficiaryNationality").hide()
  }

  if (field_BeneficiarySex.length === 0) {
    $("#err_field_BeneficiarySex").text("Field is empty")
    $("#err_field_BeneficiarySex").show()
  } else {
    $("#err_field_BeneficiarySex").text("")
    $("#err_field_BeneficiarySex").hide()
  }

  if (field_BenificiaryOccupation.length === 0) {
    $("#err_field_BeneficiaryOccupation").text("Field is empty")
    $("#err_field_BeneficiaryOccupation").show()
  } else {
    $("#err_field_BeneficiaryOccupation").text("")
    $("#err_field_BeneficiaryOccupation").hide()
  }

  if (field_Beneficiary_relatives1.length === 0) {
    $("#err_field_Beneficiary_relatives1").text("Field is empty")
    $("#err_field_Beneficiary_relatives1").show()
  } else {
    $("#err_field_Beneficiary_relatives1").text("")
    $("#err_field_Beneficiary_relatives1").hide()
  }

  if (field_Beneficiary_relatives2.length === 0) {
    $("#err_field_Beneficiary_relatives2").text("Field is empty")
    $("#err_field_Beneficiary_relatives2").show()
  } else {
    $("#err_field_Beneficiary_relatives2").text("")
    $("#err_field_Beneficiary_relatives2").hide()
  }

  if (field_BeneficiaryRelationToDeceased.length === 0) {
    $("#err_field_BeneficiaryRelationToDeceased").text("Field is empty")
    $("#err_field_BeneficiaryRelationToDeceased").show()
  } else if (lenBeneficiaryRelationToDeceased) {
    $("#err_field_BeneficiaryRelationToDeceased").text("Maximum 50 characters allowed!")
    $("#err_field_BeneficiaryRelationToDeceased").show()
  } else {
    $("#err_field_BeneficiaryRelationToDeceased").text("")
    $("#err_field_BeneficiaryRelationToDeceased").hide()
  }

  if (field_BeneficiaryEmployerName.length === 0) {
    $("#err_field_BeneficiaryEmployerName").text("Field is empty")
    $("#err_field_BeneficiaryEmployerName").show()
  } /*   else if(specEmployerName ) {
        $("#err_field_BeneficiaryEmployerName").text('Special character is not allowed');
        $("#err_field_BeneficiaryEmployerName").show();
    } else if (numEmployerName ) {
        $("#err_field_BeneficiaryEmployerName").text('Number is not allowed');
        $("#err_field_BeneficiaryEmployerName").show();
    }   */ else if (lenBeneficiaryEmployerName) {
    $("#err_field_BeneficiaryEmployerName").text("Maximum 250 characters allowed!")
    $("#err_field_BeneficiaryEmployerName").show()
  } else {
    $("#err_field_BeneficiaryEmployerName").text("")
    $("#err_field_BeneficiaryEmployerName").hide()
  }

  if (!$("#invalidCheck_basic").is(":checked")) {
    $("#err_invalidCheck_basic").text("Please select the field")
    $("#err_invalidCheck_basic").show()
  } else {
    $("#err_invalidCheck_basic").text("")
    $("#err_invalidCheck_basic").hide()
  }

  if (!$("#invalidCheck_privacy").is(":checked")) {
    $("#err_invalidCheck_privacy").text("Please select the field")
    $("#err_invalidCheck_privacy").show()
  } else {
    $("#err_invalidCheck_privacy").text("")
    $("#err_invalidCheck_privacy").hide()
  }

  if ($("#inlineRadio1").is(":checked") || $("#inlineRadio2").is(":checked")) {
    $("#err_field_BeneficiaryPEP").text("")
    $("#err_field_BeneficiaryPEP").hide()
  } else {
    $("#err_field_BeneficiaryPEP").text("Please select the field")
    $("#err_field_BeneficiaryPEP").show()
  }

  if (field_firstName.length !== 0 && field_middleName.length !== 0 && field_lastName.length !== 0 && field_DOB.length !== 0 && field_DOID.length !== 0 && field_NatureLoss.length !== 0 && field_BeneficiaryFirstName.length !== 0 && field_BeneficiaryMiddleName.length !== 0 && field_BeneficiaryLastName.length !== 0 && field_BeneficiaryMobileNum.length == 10 && field_BeneficiaryEmailAddress.length !== 0 && field_BeneficiaryHomeAddress.length !== 0 && field_BeneficiaryDOB.length !== 0 && field_BeneficiaryPOB.length !== 0 && field_BeneficiaryNationality.length !== 0 && field_BeneficiarySex.length !== 0 && field_BeneficiaryRelationToDeceased.length !== 0 && field_BenificiaryOccupation.length !== 0 && field_BeneficiaryEmployerName.length !== 0 && $("#invalidCheck_basic").is(":checked") && $("#invalidCheck_privacy").is(":checked") && validateEmail(field_BeneficiaryEmailAddress) && specFirstName == false && specMiddleName == false && specLastName == false && numFirstName == false && numMiddleName == false && numLastName == false && speciBeniFirstName == false && numBeniFirstName == false && numberMobile == true && speciBeniMiddleName == false && numBeniMiddleName == false && speciBeniLastName == false && numBeniLastName == false && futDOB == true && futExistDOB == true && futDOID == true && numSuffix == false && specSuffix == false && field_Beneficiary_relatives1.length !== 0 && field_Beneficiary_relatives2.length !== 0 && comapareDates == true) {
    const data = {
      field_firstName,
      field_middleName,
      field_lastName,
      field_lastName_Suffix,
      field_DOB,
      field_DOID,
      field_BeneficiaryFirstName,
      field_BeneficiaryMiddleName,
      field_BeneficiaryLastName,
      field_BeneficiaryMobileNum,
      field_BeneficiaryEmailAddress,
      field_BeneficiaryHomeAddress,
      field_BeneficiaryDOB,
      field_BeneficiaryPOB,
      field_BeneficiaryNationality,
      BeneficiarySex: $("select#field_BeneficiarySex option").filter(":selected").val(),
      field_BenificiaryOccupation,
      field_BeneficiaryRelationToDeceased,
      country_code: $("select#field_BeneficiaryMobileNumberSelect option").filter(":selected").val(),
      basic_checkbox: $("#invalidCheck_basic").is(":checked"),
      privacy_checkbox: $("#invalidCheck_privacy").is(":checked"),
      privacy_consent_1: $("#privacy_consent_1").is(":checked"),
      privacy_consent_2: $("#privacy_consent_2").is(":checked")
      // privacy_consent_3: $("#privacy_consent_3").is(":checked")
    }

    InsuredInformation["firstName"] = field_firstName.toUpperCase()
    InsuredInformation["middleName"] = field_middleName.toUpperCase()
    InsuredInformation["lastName"] = field_lastName.toUpperCase()
    InsuredInformation["suffix"] = field_lastName_Suffix.toUpperCase()
    InsuredInformation["dateOfBirth"] = field_DOB.split("-")[1] + "/" + field_DOB.split("-")[2] + "/" + field_DOB.split("-")[0]
    InsuredInformation["insuredsDeath"] = field_DOID.split("-")[1] + "/" + field_DOID.split("-")[2] + "/" + field_DOID.split("-")[0]
    document.getElementById("user_mobile").innerHTML = field_BeneficiaryMobileNum.replace(/.(?=.{4})/g, "*")
    basicInformation["causeOfLoss"] = field_NatureLoss

    let beneficiary = {}

    ;(beneficiary["beneficiaryNo"] = beneficiaryCount.toString()),
      (beneficiary["firstName"] = field_BeneficiaryFirstName.toUpperCase()),
      (beneficiary["middleName"] = field_BeneficiaryMiddleName.toUpperCase()),
      (beneficiary["lastName"] = field_BeneficiaryLastName.toUpperCase()),
      (beneficiary["dateOfBirth"] = field_BeneficiaryDOB.split("-")[1] + "/" + field_BeneficiaryDOB.split("-")[2] + "/" + field_BeneficiaryDOB.split("-")[0]),
      (beneficiary["countryCode"] = $("select#field_BeneficiaryMobileNumberSelect option").filter(":selected").val()),
      (beneficiary["phoneNumber"] = field_BeneficiaryMobileNum),
      (beneficiary["emailAddress"] = field_BeneficiaryEmailAddress),
      (beneficiary["homeAddress"] = field_BeneficiaryHomeAddress),
      (beneficiary["placeOfBirth"] = field_BeneficiaryPOB),
      (beneficiary["nationality"] = field_BeneficiaryNationality),
      (beneficiary["sex"] = $("select#field_BeneficiarySex option").filter(":selected").val()),
      (beneficiary["relationship"] = field_BeneficiaryRelationToDeceased),
      // beneficiary["documentFolder"] = `/CLAIMS/BPLAC/${referenceNumber}`,
      (beneficiary["payoutOption"] = payoutOption),
      (beneficiary["employer"] = field_BeneficiaryEmployerName),
      (beneficiary["governmentOfficial"] = $("select#field_Beneficiary_relatives1 option").filter(":selected").val()),
      (beneficiary["governmentOfficialRelative"] = $("select#field_Beneficiary_relatives2 option").filter(":selected").val()),
      (beneficiary["occupation"] = field_BenificiaryOccupation),
      (beneficiary["check1"] = data.privacy_consent_1),
      (beneficiary["check2"] = data.privacy_consent_2),
      BeneficiaryList.push(beneficiary)

    /*  dataReset("field_firstName", "field_firstName", "field_middleName", "field_lastName", "field_lastName_Suffix", "field_DOB", "field_DOID", "field_BeneficiaryFirstName", "field_BeneficiaryMiddleName", "field_BeneficiaryLastName", "field_BeneficiaryMobileNum", "field_BeneficiaryEmailAddress", "field_BeneficiaryHomeAddress", "field_BeneficiaryDOB", "field_BeneficiaryPOB", "field_BeneficiaryNationality", "field_BeneficiarySex", "field_BeneficiaryRelationToDeceased", "field_Beneficiary_relatives1", "field_Beneficiary_relatives2") */

    $("#step1").addClass("done")
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#form_wrapper").hide()
    $("#death_data_privacy").hide()
    $("#payment").show()
    customName = field_BeneficiaryFirstName
    // $("#customer_Name").text(`Hi ${field_BeneficiaryFirstName}. Hang in there as we process your request. Expect an SMS from us within 7 to 10 working days on the status of your request.`)
    if(  beneficiaryCount ==1 ) {
      $("#customer_Name").text(`Hi ${field_BeneficiaryFirstName}. Hang in there as we process your request. Expect an SMS from us within 7 to 10 working days on the status of your request.`)
    }else {
      $("#customer_Name").text(`Hang in there as we process your request. Expect an SMS from us within 7 to 10 working days on the status of your request.`)
    }
    console.log('beneficiaryCount 1738---', beneficiaryCount)
    console.log("Data -> ", data)
  } else if (comapareDates == false && (field_DOB !== "" || field_DOID !== "")) {
    $("#popUp_DOB").modal("show")
  } else {
    $("#popUp").modal("show")
  }
}

function dataReset() {
  let args = arguments
  for (let i = 0; i < args.length; i++) {
    $(`#${args[i]}`).val("")
  }
}

function uploadDataReset() {
  $("#file_Upload_Tick_1").hide()
  $("#file_Upload_Tick_2").hide()
  $("#file_Upload_Tick_3").hide()
  $("#file_Upload_Tick_4").hide()
  $("#file_Upload_Tick_5").hide()
  $("#file_Upload_Tick_6").hide()
  $("#file_Upload_Tick_7").hide()

  // $('#file_Upload_7').hide();
  $("#warning_parent").hide()
  $("#upload_warning").text("")

  $("#invalidCheck_basicAddBeneficiary").prop("checked", false)
  $("#invalidCheck_privacyAddBeneficiary").prop("checked", false)

  $("#field_addBeneficiary_relatives1").prop("checked", false)
  $("#field_add_Beneficiary_add_relatives2").prop("checked", false)
}

function fileUploadDataReset() {
  $("#file_Upload_Tick_9").hide()
  $("#file_Upload_Tick_10").hide()
  $("#file_Upload_Tick_11").hide()
  $("#file_Upload_Tick_12").hide()

  file9.value = ""
  file10.value = ""
  file11.value = ""
  file12.value = ""

  $("#warning_parent_addBeneficiary").hide()
  $("#addBeneficiary_upload_warning").text("")
}

function removeErr(event) {
  $(`#err_${event.target.id}`).text("")
  $(`#err_${event.target.id}`).hide()
}

const proceedScan = async (fileObj, button, pageid) => {
  console.log(button)
  console.log("code is here")
  $(`#file_loader_icon_${button}`).show()
  let baseData = await toBase64(fileObj)
  const regex = /data:application\/pdf;base64,/gi
  let newBaseData = baseData.replace(regex, "")
  await checkForVirus(newBaseData)
    .then(response => response.text())
    .then(result => {
      let parsedJson = JSON.parse(result)
      console.log(parsedJson)
      if (parsedJson.hasVirus) {
        console.log("Netering")
        if (pageid == 1) {
          $("#warning_parent").show()
          $("#upload_warning").text("We detected a virus/malware in your uploaded documents. Please re-upload clean, virus-free documents to proceed.")
        }
        if (pageid == 2) {
          $("#warning_parent_acct").show()
          $("#upload_warning_acct").text("We detected a virus/malware in your uploaded documents. Please re-upload clean, virus-free documents to proceed.")
        }
        if (pageid == 3) {
          $("#warning_parent_addBeneficiaryacct").show()
          $("#upload_warning_addBeneficiaryacct").text("We detected a virus/malware in your uploaded documents. Please re-upload clean, virus-free documents to proceed.")
        }
        if (pageid == 4) {
          $("#warning_parent_addBeneficiary").show()
          $("#addBeneficiary_upload_warning").text("We detected a virus/malware in your uploaded documents. Please re-upload clean, virus-free documents to proceed.")
        }

        $(`#file_loader_icon_${button}`).hide()
        $(`#file_Upload_Tick_${button}`).hide()
        $(`#file_upload_cancle_${button}`).show()

        return
      } else {
        scanDoc = true
        $("#warning_parent").hide()
        $("#warning_parent_acct").hide()
        $("#warning_parent_act").hide()
        $("#warning_parent_addBeneficiary").hide()
        $("#warning_parent_addBeneficiaryacct").hide()
        $(`#file_loader_icon_${button}`).hide()
        $(`#file_Upload_Tick_${button}`).show()
        $(`#file_upload_cancle_${button}`).hide()
        $("#upload_feedback_label").hide()
        $("#upload_feedback_label8").hide()
        return
      }
    })
    .catch(error => {
      console.log("error", error)

      if (pageid == 1) {
        $("#warning_parent").show()
        $("#upload_warning").text("Looks like the file you are trying to upload is Virus infected. Please upload a virus free document.")
      }
      if (pageid == 2) {
        $("#warning_parent_acct").show()
        $("#upload_warning_acct").text("Looks like the file you are trying to upload is Virus infected. Please upload a virus free document.")
      }
      if (pageid == 3) {
        $("#warning_parent_addBeneficiaryacct").show()
        $("#upload_warning_addBeneficiaryacct").text("Looks like the file you are trying to upload is Virus infected. Please upload a virus free document.")
      }
      if (pageid == 4) {
        $("#warning_parent_addBeneficiary").show()
        $("#addBeneficiary_upload_warning").text("Looks like the file you are trying to upload is Virus infected. Please upload a virus free document.")
      }

      $(`#file_loader_icon_${button}`).hide()
      $(`#file_Upload_Tick_${button}`).hide()
      $(`#file_upload_cancle_${button}`).show()

      return
    })
}
const fileCheck = (file, button, pageid, formData, fileName) => {
  console.log(button)
  var _URL = window.URL || window.webkitURL
  console.log("FILE OBJECT -> ", file)
  var img = new Image()
  console.log("Before on load --> ")
  img.onload = async function () {
    console.log("inside image load --> ")
    console.log(this.width + " " + this.height)
    if (this.width < 400 && this.height < 400) {
      if (pageid == 1) {
        $(`#warning_parent`).show()
        $("#upload_warning").text("Sorry, we noticed that your uploaded documents are unreadable. Please reupload a clearer copy of your documents to proceed.")
        console.log("Image is bad")
      }
      if (pageid == 2) {
        $(`#warning_parent_acct`).show()
        $("#upload_warning_acct").text("Sorry, we noticed that your uploaded documents are unreadable. Please reupload a clearer copy of your documents to proceed.")
        console.log("Image is bad")
      }
      if ((pageid = 3)) {
        $(`#warning_parent_addBeneficiaryacct`).show()
        $("#upload_warning_addBeneficiaryacct").text("Sorry, we noticed that your uploaded documents are unreadable. Please reupload a clearer copy of your documents to proceed.")
        console.log("Image is bad")
      }
      if ((pageid = 4)) {
        $(`#warning_parent_addBeneficiary`).show()
        $("#addBeneficiary_upload_warning").text("Sorry, we noticed that your uploaded documents are unreadable. Please reupload a clearer copy of your documents to proceed.")
        console.log("Image is bad")
      }

      $(`#file_loader_icon_${button}`).hide()
      $(`#file_Upload_Tick_${button}`).hide()
      $(`#file_upload_cancle_${button}`).show()
    } else {
      console.log("This is right JPG")
      await proceedScan(file, button)
      if (scanDoc == true) {
        handleFileUpload(formData, fileName)
        scanDoc = false
      }
    }
  }
  img.onerror = function () {
    console.log("inside image error")
    alert("not a valid file: " + file.type)
  }
  img.src = _URL.createObjectURL(file)
}

const isFileSizeValid = file => {
  if (file.size == 0) {
    fileSizeZero = true
    return false
    //
  } else if (file.size < 5242880) {
    return true
  }
  return false
}

file1.onchange = async function (e) {
  docType = "DIDC033"
  tranType = "OCON-MAJ"
  $("#file_upload_cancle_1").hide()
  $("#file_Upload_Tick_1").hide()
  console.log("Starting")
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 1
      var pageId = 1
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Death certificate of the deceased")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Death certificate of the deceased")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_1").hide()
          $("#file_Upload_Tick_1").hide()
          $("#file_upload_cancle_1").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_1").hide()
          $("#file_Upload_Tick_1").hide()
          $("#file_upload_cancle_1").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent").show()
      $("#file_Upload_Tick_1").hide()
      $("#file_upload_cancle_1").show()
      $("#upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file2.onchange = async function (e) {
  docType = "DIDC007"
  tranType = "PIR-MAJ"
  $("#file_upload_cancle_2").hide()
  $("#file_Upload_Tick_2").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 2
      var pageId = 1
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Police Investigation Report")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Police Investigation Report")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_2").hide()
          $("#file_Upload_Tick_2").hide()
          $("#file_upload_cancle_2").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_2").hide()
          $("#file_Upload_Tick_2").hide()
          $("#file_upload_cancle_2").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }

      break
    default:
      $("#warning_parent").show()
      $("#file_Upload_Tick_2").hide()
      $("#file_upload_cancle_2").show()
      $("#upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file3.onchange = async function (e) {
  docType = "DIDC001"
  tranType = "OVIF-MAJ"
  $("#file_upload_cancle_3").hide()
  $("#file_Upload_Tick_3").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 3
      var pageId = 1
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimants valid Government ID (Front)")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimants valid Government ID (Front)")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_3").hide()
          $("#file_Upload_Tick_3").hide()
          $("#file_upload_cancle_3").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_3").hide()
          $("#file_Upload_Tick_3").hide()
          $("#file_upload_cancle_3").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent").show()
      $("#file_Upload_Tick_3").hide()
      $("#file_upload_cancle_3").show()
      $("#upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file4.onchange = async function (e) {
  docType = "DIDC001"
  tranType = "OVIB-MAJ"
  $("#file_upload_cancle_4").hide()
  $("#file_Upload_Tick_4").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 4
      var pageId = 1
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimants valid Government ID (Back)")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimants valid Government ID (Back)")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_4").hide()
          $("#file_Upload_Tick_4").hide()
          $("#file_upload_cancle_4").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_4").hide()
          $("#file_Upload_Tick_4").hide()
          $("#file_upload_cancle_4").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent").show()
      $("#file_Upload_Tick_4").hide()
      $("#file_upload_cancle_4").show()
      $("#upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file5.onchange = async function (e) {
  docType = "DIDC010"
  tranType = "MC-MAJ"
  $("#file_upload_cancle_5").hide()
  $("#file_Upload_Tick_5").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 5
      var pageId = 1
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Marriage Contract")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)

          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Marriage Contract")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_5").hide()
          $("#file_Upload_Tick_5").hide()
          $("#file_upload_cancle_5").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_5").hide()
          $("#file_Upload_Tick_5").hide()
          $("#file_upload_cancle_5").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent").show()
      $("#file_Upload_Tick_5").hide()
      $("#file_upload_cancle_5").show()
      $("#upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file6.onchange = async function (e) {
  docType = "DIDC016"
  tranType = "BCMB-MAJ"
  $("#file_upload_cancle_6").hide()
  $("#file_Upload_Tick_6").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 6
      var pageId = 1
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimant Birth Certificate")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimant Birth Certificate")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_6").hide()
          $("#file_Upload_Tick_6").hide()
          $("#file_upload_cancle_6").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_6").hide()
          $("#file_Upload_Tick_6").hide()
          $("#file_upload_cancle_6").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent").show()
      $("#file_Upload_Tick_6").hide()
      $("#file_upload_cancle_6").show()
      $("#upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file7.onchange = async function (e) {
  docType = "DIBA001"
  tranType = "BA-MAJ"
  $("#file_upload_cancle_7").hide()
  $("#file_Upload_Tick_7").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 7
      var pageId = 2
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}

          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Proof of Bank Account")

          addFileToList(accident, `${fileName}.pdf`)

          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}

          ;(accident["beneficiaryNo"] = beneficiaryCount), (accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Proof of Bank Account")

          addFileToList(accident, `${fileName}.pdf`)

          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_7").hide()
          $("#file_Upload_Tick_7").hide()
          $("#file_upload_cancle_7").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_7").hide()
          $("#file_Upload_Tick_7").hide()
          $("#file_upload_cancle_7").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent_acct").show()
      $("#file_Upload_Tick_7").hide()
      $("#file_upload_cancle_7").show()
      $("#upload_warning_acct").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file8.onchange = async function (e) {
  docType = "DIBA001"
  tranType = `BA[${beneficiaryCount}]-MAJ`
  $("#file_upload_cancle_8").hide()
  $("#file_Upload_Tick_8").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 8
      var pageId = 3
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Proof of Bank Account")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Proof of Bank Account")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_8").hide()
          $("#file_Upload_Tick_8").hide()
          $("#file_upload_cancle_8").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_8").hide()
          $("#file_Upload_Tick_8").hide()
          $("#file_upload_cancle_8").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent_addBeneficiaryacct").show()
      $("#file_Upload_Tick_8").hide()
      $("#file_upload_cancle_8").show()
      $("#upload_warning_addBeneficiaryacct").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file9.onchange = async function (e) {
  docType = "DIDC001"
  tranType = `OVIF[${beneficiaryCount}]-MAJ`
  $("#file_upload_cancle_9").hide()
  $("#file_Upload_Tick_9").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 9
      var pageId = 4
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimants valid Government ID (Front)")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimants valid Government ID (Front)")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_9").hide()
          $("#file_Upload_Tick_9").hide()
          $("#file_upload_cancle_9").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_9").hide()
          $("#file_Upload_Tick_9").hide()
          $("#file_upload_cancle_9").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent_addBeneficiary").show()
      $("#file_Upload_Tick_9").hide()
      $("#file_upload_cancle_9").show()
      $("#addBeneficiary_upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file10.onchange = async function (e) {
  docType = "DIDC001"
  tranType = `OVIB[${beneficiaryCount}]-MAJ`
  $("#file_upload_cancle_10").hide()
  $("#file_Upload_Tick_10").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 10
      var pageId = 4
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimants valid Government ID (Back)")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimants valid Government ID (Back)")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_10").hide()
          $("#file_Upload_Tick_10").hide()
          $("#file_upload_cancle_10").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_10").hide()
          $("#file_Upload_Tick_10").hide()
          $("#file_upload_cancle_10").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent_addBeneficiary").show()
      $("#file_Upload_Tick_10").hide()
      $("#file_upload_cancle_10").show()
      $("#addBeneficiary_upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file11.onchange = async function (e) {
  docType = "DIDC001"
  tranType = `MC[${beneficiaryCount}]-MAJ`
  $("#file_upload_cancle_11").hide()
  $("#file_Upload_Tick_11").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 11
      var pageId = 4
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Marriage Contract")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Marriage Contract")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_11").hide()
          $("#file_Upload_Tick_11").hide()
          $("#file_upload_cancle_11").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_11").hide()
          $("#file_Upload_Tick_11").hide()
          $("#file_upload_cancle_11").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent_addBeneficiary").show()
      $("#file_Upload_Tick_11").hide()
      $("#file_upload_cancle_11").show()
      $("#addBeneficiary_upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file12.onchange = async function (e) {
  docType = "DIDC001"
  tranType = `BCMB[${beneficiaryCount}]-MAJ`
  $("#file_upload_cancle_12").hide()
  $("#file_Upload_Tick_12").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 12
      var pageId = 4
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimant Birth Certificate")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          fileCheck(file, buttonNum, pageId, formData, fileName)
        } else {
          proceedScan(file, buttonNum, pageId)
          let fileName = referenceNumber + "-" + docType + "-" + tranType

          let accident = {}
          accident["beneficiaryNo"] = beneficiaryCount
          ;(accident["filename"] = `${fileName}.pdf`), (accident["docType"] = "PDF"), (accident["docTypeCode"] = docType), (accident["documentDescription"] = "Claimant Birth Certificate")

          addFileToList(accident, `${fileName}.pdf`)
          const formData = new FormData()
          formData.append("file", file, fileName + `.${ext}`)
          handleFileUpload(formData, fileName)
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_12").hide()
          $("#file_Upload_Tick_12").hide()
          $("#file_upload_cancle_12").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_12").hide()
          $("#file_Upload_Tick_12").hide()
          $("#file_upload_cancle_12").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent_addBeneficiary").show()
      $("#file_Upload_Tick_12").hide()
      $("#file_upload_cancle_12").show()
      $("#addBeneficiary_upload_warning").text("Your documents should only be in .jpg, or .pdf formats and should not be larger than 5MB. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}

file13.onchange = async function (e) {
  $("#file_upload_cancle_13").hide()
  $("#file_Upload_Tick_13").hide()
  var ext = this.value.match(/\.([^\.]+)$/)[1]
  switch (ext) {
    case "jpg":
    case "pdf":
      var file = this.files[0]
      var buttonNum = 13
      var sizevalid = isFileSizeValid(file, buttonNum)
      if (sizevalid) {
        if (ext == "jpg") {
          // var isFileBlur =
          // if (isFileBlur == false) {
          fileCheck(file, buttonNum)
          file1Buffer = await getBuffer(file)
          console.log("file buffer : ")
          console.log(file1Buffer)
          filesMap["file13"] = file1Buffer
          // }
        } else {
          proceedScan(file, buttonNum)
          file1Buffer = await getBuffer(file)
          console.log("file buffer : ")
          console.log(file1Buffer)
          filesMap["file13"] = file1Buffer
        }
      } else {
        if (fileSizeZero) {
          fileSizeZero = false
          $("#warning_parent").show()
          $("#file_loader_icon_13").hide()
          $("#file_Upload_Tick_13").hide()
          $("#file_upload_cancle_13").show()
          $("#upload_warning").text("Your file seems to be empty. Please check your file and its contents, then re-upload to proceed. Note: You may only upload documents not exceeding 5MB in size.")
        } else {
          $("#warning_parent").show()
          $("#file_loader_icon_13").hide()
          $("#file_Upload_Tick_13").hide()
          $("#file_upload_cancle_13").show()
          $("#upload_warning").text("The file size of your documents should not be larger than 5MB. Please re-upload the correct file size to proceed.")
        }
      }
      break
    default:
      $("#warning_parent").show()
      $("#file_Upload_Tick_13").hide()
      $("#file_upload_cancle_13").show()
      $("#upload_warning").text("You may only upload documents that are in .jpg, .pdf formats and must not exceed 5MB in file size. Please re-upload in the correct format and file size to proceed.")
      this.value = ""
  }
}
function addBank(event) {
  event.preventDefault()
  $("#account_details").hide()
  $("#requirements").hide()
  $("#account_details1").show()
  /*   $('#account_details1')[0].scrollIntoView(true); */
}
function dataResetInfo(data) {
  for (const [key, value] of Object.entries(data)) {
    $(`#${key}`).val("")
  }
}

function addBeneficiary(event) {
  event.preventDefault()
  if (screenCount !== 0 && traverse == 0) {
    $("#missingDetails").modal("show")
  } else {
    if (!file1.value || $("#file_Upload_Tick_1").is(":hidden")) {
      $("#warning_parent").show()
      $("#upload_warning").text("Please upload your Death Certificate of the Deceased")
      $("#popUp").modal("show")
      return
    }

    if (optiondisable == 1) {
      if (!file2.value || $("#file_Upload_Tick_2").is(":hidden")) {
        $("#warning_parent").show()
        $("#upload_warning").text("Please upload your Police or Narration Report!")
        $("#popUp").modal("show")
        return
      }
    }

    if (!file3.value || $("#file_Upload_Tick_3").is(":hidden")) {
      $("#warning_parent").show()
      $("#upload_warning").text("Please upload your Valid Government ID (Front)")
      $("#popUp").modal("show")
      return
    }

    if (!file4.value || $("#file_Upload_Tick_4").is(":hidden")) {
      $("#warning_parent").show()
      $("#upload_warning").text("Please upload your Valid Government ID (Back)")
      $("#popUp").modal("show")
      return
    }

    if (relation == true) {
      if (!file5.value || $("#file_Upload_Tick_5").is(":hidden")) {
        $("#warning_parent").show()
        $("#upload_warning").text("Please upload your Marriage Contract")
        $("#popUp").modal("show")
        return
      }
    }

    if (optionAge == true) {
      if (!file6.value || $("#file_Upload_Tick_6").is(":hidden")) {
        $("#warning_parent").show()
        $("#upload_warning").text("Please upload your Birth Certificate")
        $("#popUp").modal("show")
        return
      }
    }

    if (!$("#upload_invalidCheck_2").is(":checked")) {
      $("#upload_warning").text("Please don’t forget to tick the box to confirm the accuracy of your submitted documents.")
      $("#warning_parent").show()
      $("#popUp").modal("show")
      return
    }

    $("#upload_warning").text("")
    $("#warning_parent").hide()
    upload_data = {
      upload_file_1: file1.value,
      upload_file_2: file2.value,
      upload_file_3: file3.value,
      upload_file_4: file4.value,
      upload_file_5: file5.value,
      upload_file_6: file6.value,
      insurance_Checkbox: $("#upload_invalidCheck_2").is(":checked")
    }

    buttonCount = buttonCount + 1
    $("#privacy_consent_1").prop("checked", false)
    $("#privacy_consent_2").prop("checked", false)
    // $('#privacy_consent_3').prop('checked', false);

    $("#step1").addClass("active")
    $("#step2").removeClass("active")
    $("#step2>div").removeClass("active")
    $("#addBeneficiary").show()
    $("#requirements").hide()

    optionAge = false
    relation = false
    console.log("upload data --> ", upload_data)

    /*  $('#addBeneficiary')[0].scrollIntoView(true); */
  }
}

function addBeneficiaryNew(event) {
  event.preventDefault()

  if (screenCount !== 0 && traverse == 0) {
    $("#missingDetails").modal("show")
  } else {
    if (screenCount !== 0 && traverse !== 0) {
      screenCount = 0
    }
    if (!file9.value || $("#file_Upload_Tick_9").is(":hidden")) {
      $("#warning_parent_addBeneficiary").show()
      $("#addBeneficiary_upload_warning").text("Please upload your Valid Government ID (Font)!")
      $("#popUp").modal("show")
      return
    }

    if (!file10.value || $("#file_Upload_Tick_10").is(":hidden")) {
      $("#warning_parent_addBeneficiary").show()
      $("#addBeneficiary_upload_warning").text("Please upload your Valid Government ID (Back)!")
      $("#popUp").modal("show")
      return
    }

    if (relation) {
      if (!file11.value || $("#file_Upload_Tick_11").is(":hidden")) {
        $("#warning_parent_addBeneficiary").show()
        $("#addBeneficiary_upload_warning").text("Please upload your Valid Marriage Contract!")
        $("#popUp").modal("show")
        return
      }
    }

    if (optionAge) {
      if (!file12.value || $("#file_Upload_Tick_12").is(":hidden")) {
        $("#warning_parent_addBeneficiary").show()
        $("#addBeneficiary_upload_warning").text("Please upload your Valid Birth Certificate!")
        $("#popUp").modal("show")
        return
      }
    }

    buttonCount = buttonCount + 1
    bCount = buttonCount - 1
    optionAge = false
    relation = false
    if (buttonCount > 6) {
      buttonCount = 6
      $("#warning_parent_addBeneficiary").show()
      $("#addBeneficiary_upload_warning").text("Sorry. You have reached the maximum number of beneficiaries for your claim request. Should you wish to add more beneficiaries, send us an email through BPIAIA.customerservice@aia.com.")
      $(".btn2").prop("disable", true)
      $("#popUp").modal("show")
    } else {
      $("#addBeneficiary_upload_warning").text("")
      $("#warning_parent_addBeneficiary").hide()
      addBeni_upload_data = {
        upload_file_9: file9.value,
        upload_file_10: file10.value,
        upload_file_11: file11.value,
        upload_file_12: file12.value
        /*  insurance_Checkbox: $('#upload_invalidCheck_2').is(':checked') */
      }
      if (bCount == 1) {
        uppload_data1 = addBeni_upload_data
        console.log("uppload_data1", uppload_data1)
      }

      if (bCount == 2) {
        uppload_data2 = addBeni_upload_data
        console.log("uppload_data2", uppload_data2)
      }

      if (bCount == 3) {
        uppload_data3 = addBeni_upload_data
        console.log("uppload_data3", uppload_data3)
      }

      if (bCount == 4) {
        uppload_data4 = addBeni_upload_data
        console.log("uppload_data4", uppload_data4)
      }

      if (bCount == 5) {
        uppload_data5 = addBeni_upload_data
        console.log("uppload_data5", uppload_data5)
      }

      if (bCount == 6) {
        uppload_data6 = addBeni_upload_data
        setDataUpload(uppload_data6)
        console.log("uppload_data6", uppload_data6)
      }

      dataReset("field_addBenificiaryAccountName", "field_addBenificiaryAccountNumber", "field_addBenificiaryBank", "field_addBeneficiaryBranch", "field_addBeneficiaryCurrency", "upload_file_8")
      resetBank()
      fileUploadDataReset()

      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#step1").addClass("active")
      $("#step2").removeClass("active")
      $("#step2>div").removeClass("active")
      $("#addBeneficiary").show()
      $("#addBeneficiaryRequirements").hide()
    }
  }
}

function resetBank() {
  $("#from_addBeneficiarycurrency").val("Peso")
  $("#field_addBenificiaryBank").html("<option value='BPI'>Bank of the Philippine Islands - BPI</option><option value='BFB'>BPI Family Savings Bank - BFB</option>")
}

function screen() {
  buttonCount = screenCount
  screenCount = 0

  if (isEmpty(dataBen) == false) {
    dataResetInfo(dataBen)
  }

  if (isEmpty(addBenAccountInfo) == false) {
    dataResetInfo(addBenAccountInfo)
  }

  /*  dataResetInfo(addBeni_upload_data); */
  fileUploadDataReset()
  addBeneficiaryuploadDataReset()
  $("#invalidCheck_privacyAddBeneficiary").prop("checked", false)
  $("#invalidCheck_basicAddBeneficiary").prop("checked", false)

  if (buttonCount == 1) {
    if (isEmpty(data1) == true) {
      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#invalidCheck_privacyAddBeneficiary").prop("checked", false)
      $("#invalidCheck_basicAddBeneficiary").prop("checked", false)
      $("#step2").removeClass("active")
      $("#step2>div").removeClass("active")
      $("#addBeneficiary").show()
      $("#addBeneficiaryRequirements").hide()
      $("#requirements").hide()
    } else if (isEmpty(acct_data1) == true) {
      if (trackaddBenificiary1 == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        /*  $("#step2").removeClass("active");
                 $("#step2>div").removeClass("active"); */
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")

        $("#addBeneficiaryaccount_details").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else if (trackaddBenificiary1 == 1 && bpiCount == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")

        $("#addBeneficiaryPickUp").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else {
        bpiCount = 0
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")
        $("#file_Upload_Tick_9").hide()
        $("#file_Upload_Tick_10").hide()
        $("#file_Upload_Tick_11").hide()
        $("#file_Upload_Tick_12").hide()
        $("#addBeneficiaryRequirements").show()
        $("#requirements").hide()
      }
    } else if (isEmpty(uppload_data1) == true) {
      $("#step2").addClass("active")
      $("#step2>div").addClass("active")
      $("#step3").remove("active")
      $("#file_Upload_Tick_9").hide()
      $("#file_Upload_Tick_10").hide()
      $("#file_Upload_Tick_11").hide()
      $("#file_Upload_Tick_12").hide()
      $("#addBeneficiaryRequirements").show()
      $("#requirements").hide()
    } else {
      console.log("In condition")
    }
  } else if (buttonCount == 2) {
    if (isEmpty(data2) == true) {
      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#invalidCheck_privacyAddBeneficiary").prop("checked", false)
      $("#invalidCheck_basicAddBeneficiary").prop("checked", false)
      $("#step2").removeClass("active")
      $("#step2>div").removeClass("active")
      $("#addBeneficiary").show()
      $("#addBeneficiaryRequirements").hide()
      $("#requirements").hide()
    } else if (isEmpty(acct_data2) == true) {
      if (trackaddBenificiary2 == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        /*  $("#step2").removeClass("active");
                 $("#step2>div").removeClass("active"); */
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")

        $("#addBeneficiaryaccount_details").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else if (trackaddBenificiary2 == 1 && bpiCount == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        /*  $("#step2").removeClass("active");
                 $("#step2>div").removeClass("active"); */
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")

        $("#addBeneficiaryPickUp").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else {
        bpiCount = 0
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")
        $("#file_Upload_Tick_9").hide()
        $("#file_Upload_Tick_10").hide()
        $("#file_Upload_Tick_11").hide()
        $("#file_Upload_Tick_12").hide()
        $("#addBeneficiaryRequirements").show()
        $("#requirements").hide()
      }
    } else if (isEmpty(uppload_data2) == true) {
      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#step2").addClass("active")
      $("#step2>div").addClass("active")
      $("#step3").remove("active")
      $("#file_Upload_Tick_9").hide()
      $("#file_Upload_Tick_10").hide()
      $("#file_Upload_Tick_11").hide()
      $("#file_Upload_Tick_12").hide()
      $("#addBeneficiaryRequirements").show()
      $("#requirements").hide()
    } else {
      console.log("In condition")
    }
  } else if (buttonCount == 3) {
    if (isEmpty(data3) == true) {
      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#invalidCheck_privacyAddBeneficiary").prop("checked", false)
      $("#invalidCheck_basicAddBeneficiary").prop("checked", false)
      $("#step2").removeClass("active")
      $("#step2>div").removeClass("active")
      $("#addBeneficiary").show()
      $("#addBeneficiaryRequirements").hide()
      $("#requirements").hide()
    } else if (isEmpty(acct_data3) == true) {
      if (trackaddBenificiary3 == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        /*  $("#step2").removeClass("active");
                 $("#step2>div").removeClass("active"); */
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")

        $("#addBeneficiaryaccount_details").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else if (trackaddBenificiary3 == 1 && bpiCount == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        /*  $("#step2").removeClass("active");
                 $("#step2>div").removeClass("active"); */
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")
        $("#addBeneficiaryPickUp").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else {
        bpiCount = 0
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")
        $("#file_Upload_Tick_9").hide()
        $("#file_Upload_Tick_10").hide()
        $("#file_Upload_Tick_11").hide()
        $("#file_Upload_Tick_12").hide()
        $("#addBeneficiaryRequirements").show()
        $("#requirements").hide()
      }
    } else if (isEmpty(uppload_data3) == true) {
      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#step2").addClass("active")
      $("#step2>div").addClass("active")
      $("#step3").remove("active")
      $("#file_Upload_Tick_9").hide()
      $("#file_Upload_Tick_10").hide()
      $("#file_Upload_Tick_11").hide()
      $("#file_Upload_Tick_12").hide()
      $("#addBeneficiaryRequirements").show()
      $("#requirements").hide()
    } else {
      console.log("IN condition")
    }
  } else if (buttonCount == 4) {
    if (isEmpty(data4) == true) {
      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#invalidCheck_privacyAddBeneficiary").prop("checked", false)
      $("#invalidCheck_basicAddBeneficiary").prop("checked", false)
      $("#step2").removeClass("active")
      $("#step2>div").removeClass("active")
      $("#addBeneficiary").show()
      $("#addBeneficiaryRequirements").hide()
      $("#requirements").hide()
    } else if (isEmpty(acct_data4) == true) {
      if (trackaddBenificiary4 == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")

        $("#addBeneficiaryaccount_details").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else if (trackaddBenificiary4 == 1 && bpiCount == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")

        $("#addBeneficiaryPickUp").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else {
        bpiCount = 0
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")
        $("#file_Upload_Tick_9").hide()
        $("#file_Upload_Tick_10").hide()
        $("#file_Upload_Tick_11").hide()
        $("#file_Upload_Tick_12").hide()
        $("#addBeneficiaryRequirements").show()
        $("#requirements").hide()
      }
    } else if (isEmpty(uppload_data4) == true) {
      $("#step2").addClass("active")
      $("#step2>div").addClass("active")
      $("#step3").remove("active")
      $("#file_Upload_Tick_9").hide()
      $("#file_Upload_Tick_10").hide()
      $("#file_Upload_Tick_11").hide()
      $("#file_Upload_Tick_12").hide()
      $("#addBeneficiaryRequirements").show()
      $("#requirements").hide()
    } else {
      console.log("In condition")
    }
  } else if (buttonCount == 5) {
    if (isEmpty(data5) == true) {
      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#invalidCheck_privacyAddBeneficiary").prop("checked", false)
      $("#invalidCheck_basicAddBeneficiary").prop("checked", false)
      $("#step2").removeClass("active")
      $("#step2>div").removeClass("active")
      $("#addBeneficiary").show()
      $("#addBeneficiaryRequirements").hide()
      $("#requirements").hide()
    } else if (isEmpty(acct_data5) == true) {
      if (trackaddBenificiary5 == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        /*  $("#step2").removeClass("active");
                 $("#step2>div").removeClass("active"); */
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")
        $("#addBeneficiaryaccount_details").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else if (trackaddBenificiary5 == 1 && bpiCount == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")
        $("#addBeneficiaryPickUp").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else {
        bpiCount = 0
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")
        $("#file_Upload_Tick_9").hide()
        $("#file_Upload_Tick_10").hide()
        $("#file_Upload_Tick_11").hide()
        $("#file_Upload_Tick_12").hide()
        $("#addBeneficiaryRequirements").show()
        $("#requirements").hide()
      }
    } else if (isEmpty(uppload_data5) == true) {
      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#step2").addClass("active")
      $("#step2>div").addClass("active")
      $("#step3").remove("active")
      $("#file_Upload_Tick_9").hide()
      $("#file_Upload_Tick_10").hide()
      $("#file_Upload_Tick_11").hide()
      $("#file_Upload_Tick_12").hide()
      $("#addBeneficiaryRequirements").show()
      $("#requirements").hide()
    } else {
      console.log("IN condition")
    }
  } else if (buttonCount == 6) {
    if (isEmpty(data6) == true) {
      $("#privacy_consent_1").prop("checked", false)
      $("#privacy_consent_2").prop("checked", false)
      // $('#privacy_consent_3').prop('checked', false);
      $("#invalidCheck_privacyAddBeneficiary").prop("checked", false)
      $("#invalidCheck_basicAddBeneficiary").prop("checked", false)
      $("#step2").removeClass("active")
      $("#step2>div").removeClass("active")
      $("#addBeneficiary").show()
      $("#addBeneficiaryRequirements").hide()
      $("#requirements").hide()
    } else if (isEmpty(acct_data6) == true) {
      if (trackaddBenificiary6 == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")

        $("#addBeneficiaryaccount_details").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else if (trackaddBenificiary6 == 1 && bpiCount == 0) {
        $("#privacy_consent_1").prop("checked", false)
        $("#privacy_consent_2").prop("checked", false)
        // $('#privacy_consent_3').prop('checked', false);
        /*  $("#step2").removeClass("active");
                 $("#step2>div").removeClass("active"); */
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")

        $("#addBeneficiaryPickUp").show()
        $("#addBeneficiaryRequirements").hide()
        $("#requirements").hide()
      } else {
        bpiCount = 0
        $("#step2").addClass("active")
        $("#step2>div").addClass("active")
        $("#step3").remove("active")
        $("#file_Upload_Tick_9").hide()
        $("#file_Upload_Tick_10").hide()
        $("#file_Upload_Tick_11").hide()
        $("#file_Upload_Tick_12").hide()
        $("#addBeneficiaryRequirements").show()
        $("#requirements").hide()
      }
    } else if (isEmpty(uppload_data6) == true) {
      $("#step2").addClass("active")
      $("#step2>div").addClass("active")
      $("#step3").remove("active")
      $("#file_Upload_Tick_9").hide()
      $("#file_Upload_Tick_10").hide()
      $("#file_Upload_Tick_11").hide()
      $("#file_Upload_Tick_12").hide()
      $("#addBeneficiaryRequirements").show()
      $("#requirements").hide()
    } else {
      console.log("In Condition")
    }
  }
}

function buttonSubmitClicked(event) {
  event.preventDefault()
  if (screenCount !== 0 && traverse == 0) {
    $("#missingDetails").modal("show")
  } else {
    if (!file1.value || $("#file_Upload_Tick_1").is(":hidden")) {
      $("#warning_parent").show()
      $("#upload_warning").text("Please upload your Death Certificate of the Deceased")
      $("#popUp").modal("show")
      return
    }

    if (optiondisable == 1) {
      if (!file2.value || $("#file_Upload_Tick_2").is(":hidden")) {
        $("#warning_parent").show()
        $("#upload_warning").text("Please upload your Police or Narration Report!")
        $("#popUp").modal("show")
        return
      }
    }

    if (!file3.value || $("#file_Upload_Tick_3").is(":hidden")) {
      $("#warning_parent").show()
      $("#upload_warning").text("Please upload your Valid Government ID (Front)")
      $("#popUp").modal("show")
      return
    }

    if (!file4.value || $("#file_Upload_Tick_4").is(":hidden")) {
      $("#warning_parent").show()
      $("#upload_warning").text("Please upload your Valid Government ID (Back)")
      $("#popUp").modal("show")
      return
    }

    if (relation == true) {
      if (!file5.value || $("#file_Upload_Tick_5").is(":hidden")) {
        $("#warning_parent").show()
        $("#upload_warning").text("Please upload your Marriage Contract")
        $("#popUp").modal("show")
        console.log(" You ENtered Keyword ")
        return
      }
    }

    if (optionAge == true) {
      if (!file6.value || $("#file_Upload_Tick_6").is(":hidden")) {
        $("#warning_parent").show()
        $("#upload_warning").text("Please upload your Birth Certificate")
        $("#popUp").modal("show")
        return
      }
    }

    if (!$("#upload_invalidCheck_2").is(":checked")) {
      $("#upload_warning").text("Please don’t forget to tick the box to confirm the accuracy of your submitted documents.")
      $("#warning_parent").show()
      $("#popUp").modal("show")
      return
    }

    $("#upload_warning").text("")
    $("#warning_parent").hide()
    const upload_data = {
      upload_file_1: file1.value,
      upload_file_2: file2.value,
      upload_file_3: file3.value,
      upload_file_4: file4.value,
      upload_file_5: file5.value,
      upload_file_6: file6.value,
      insurance_Checkbox: $("#upload_invalidCheck_2").is(":checked")
    }
    // myDisable()
    // // timer().then(async () => {
    // $("#step2").addClass("done");
    // $("#step3_circle").addClass("md-step-step3-circle ");
    // $("#step3_span").addClass("md-step3-span");
    // $("#step3_reference").addClass("md-step3-span")
    // /*  $("#step3").addClass("active");
    // $("#step3>div").addClass("active"); */
    // /*  $("#step3").addClass("done"); */
    // $('#requirements').hide();
    // $('#process_confirmation').show();

    // });

    let FilesInformation = {}
    FilesInformation["FolderName"] = `/CLAIMS/BPLAC/${referenceNumber}`
    FilesInformation["FileList"] = filesList

    finalPayload["BasicInformation"] = basicInformation
    finalPayload["InsuredInformation"] = InsuredInformation
    finalPayload["BeneficiaryList"] = BeneficiaryList
    finalPayload["BankDetailsList"] = BankDetailsList
    finalPayload["FilesInformation"] = FilesInformation

    console.log("final payload : ")
    console.log(finalPayload)
    // if (otpSubmitted == false) { otpTimer(); } else {
    //     $('#requirements').hide();
    //     $('#process_confirmation').show();
    // }
    var nodes = document.getElementById("requirements").getElementsByTagName("*")
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].disabled = true
      nodes[i].style.cursor = "no-drop"
    }
    document.getElementById("requirements").style.opacity = "0.65"
    preSubmitCall()
    // window.parent.postMessage(JSON.stringify({
    //     event_code: 'ym-client-event', data: JSON.stringify({
    //         event: {
    //             code: "finalEvent",
    //             data: JSON.stringify(finalPayload)
    //         }
    //     })
    // }), '*');

    // console.log('upload data --> ', upload_data);
  }
}

function addBeneficiaryButtonClicked(event) {
  event.preventDefault()

  if (screenCount !== 0 && traverse == 0) {
    $("#missingDetails").modal("show")
  } else {
    if (!file9.value || $("#file_Upload_Tick_9").is(":hidden")) {
      $("#warning_parent_addBeneficiary").show()
      $("#addBeneficiary_upload_warning").text("Please upload your Valid Government ID (Front)!")
      $("#popUp").modal("show")
      return
    }

    if (!file10.value || $("#file_Upload_Tick_10").is(":hidden")) {
      $("#warning_parent_addBeneficiary").show()
      $("#addBeneficiary_upload_warning").text("Please upload your Valid Government ID (Back)!")
      $("#popUp").modal("show")
      return
    }

    if (relation) {
      if (!file11.value || $("#file_Upload_Tick_11").is(":hidden")) {
        $("#warning_parent_addBeneficiary").show()
        $("#addBeneficiary_upload_warning").text("Please upload your Valid Marriage Contract!")
        $("#popUp").modal("show")
        return
      }
    }

    if (optionAge) {
      if (!file12.value || $("#file_Upload_Tick_12").is(":hidden")) {
        $("#warning_parent_addBeneficiary").show()
        $("#addBeneficiary_upload_warning").text("Please upload your Valid Birth Certificate!")
        $("#popUp").modal("show")
        return
      }
    }

    optionAge = false
    relation = false
    $("#addBeneficiary_upload_warning").text("")
    $("#warning_parent_addBeneficiary").hide()
    const upload_data = {
      upload_file_9: file9.value,
      upload_file_10: file10.value,
      upload_file_11: file11.value,
      upload_file_12: file12.value
      /*  insurance_Checkbox: $('#upload_invalidCheck_2').is(':checked') */
    }

    // myDisable2()
    // timer2().then(async () => {
    //     $("#step2").addClass("done");
    //     $("#step3_circle").addClass("md-step-step3-circle ");
    //     $("#step3_span").addClass("md-step3-span");
    //     $("#step3_reference").addClass("md-step3-span")
    //     /*  $("#step3").addClass("active");
    //     $("#step3>div").addClass("active"); */
    //     /*  $("#step3").addClass("done"); */
    //     $('#addBeneficiaryRequirements').hide();
    //     $('#process_confirmation').show();
    //     console.log('upload data --> ', upload_data);
    // });
    let FilesInformation = {}
    FilesInformation["FolderName"] = `/CLAIMS/BPLAC/${referenceNumber}`
    FilesInformation["FileList"] = filesList

    finalPayload["BasicInformation"] = basicInformation
    finalPayload["InsuredInformation"] = InsuredInformation
    finalPayload["BeneficiaryList"] = BeneficiaryList
    finalPayload["BankDetailsList"] = BankDetailsList
    finalPayload["FilesInformation"] = FilesInformation
    var nodes = document.getElementById("addBeneficiaryRequirements").getElementsByTagName("*")
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].disabled = true
      nodes[i].style.cursor = "no-drop"
    }
    document.getElementById("addBeneficiaryRequirements").style.opacity = "0.65"
    preSubmitCall()
    // console.log("final payload : ")
    // console.log(finalPayload)
    // window.parent.postMessage(JSON.stringify({
    //     event_code: 'ym-client-event', data: JSON.stringify({
    //         event: {
    //             code: "finalEvent",
    //             data: JSON.stringify(finalPayload)
    //         }
    //     })
    // }), '*');
  }
}

function handleAccountInfo(event) {
  event.preventDefault()
  var field_AccountName = $("#field_AccountName").val()
  var field_AccountNumber = $("#field_AccountNumber").val()
  var field_Bank = $("#field_Bank").val()
  var field_Branch = $("#field_Branch").val()
  var speCharAccountName = specialcharacterValidation(field_AccountName)
  var numAccountName = numberValidation(field_AccountName)
  var specAccountNumber = specialcharacterValidation(field_AccountNumber)
  var numAccountNumber = onlyNumberValidate(field_AccountNumber)
  var lenAccountName = fieldCheckLength(field_AccountName, 90)
  var lenAccountNumber = fieldCheckLength(field_AccountNumber, 20)
  var lenBranch = fieldCheckLength(field_Branch, 50)

  if (field_AccountName.length === 0) {
    $("#err_field_AccountName").text("Field is empty")
    $("#err_field_AccountName").show()
    $("#popUp").modal("show")
  } else if (lenAccountName) {
    $("#err_field_AccountName").text("Maximum 90 characters allowed!")
    $("#err_field_AccountName").show()
    $("#popUp").modal("show")
  } else if (speCharAccountName) {
    $("#err_field_AccountName").text("special character is not allowed")
    $("#err_field_AccountName").show()
    $("#popUp").modal("show")
  } else if (numAccountName) {
    $("#err_field_AccountName").text("Number not allowed")
    $("#err_field_AccountName").show()
    $("#popUp").modal("show")
  } else {
    $("#err_field_AccountName").text("")
    $("#err_field_AccountName").hide()
  }

  if (field_AccountNumber.length === 0) {
    $("#err_field_AccountNumber").text("Field is empty")
    $("#err_field_AccountNumber").show()
    $("#popUp").modal("show")
  } else if (lenAccountNumber) {
    $("#err_field_AccountNumber").text("Maximum 20 characters allowed!")
    $("#err_field_AccountNumber").show()
    $("#popUp").modal("show")
  } else if (!numAccountNumber || specAccountNumber) {
    $("#err_field_AccountNumber").text("Only number is allowed")
    $("#err_field_AccountNumber").show()
    $("#popUp").modal("show")
  } else {
    $("#err_field_AccountNumber").text("")
    $("#err_field_AccountNumber").hide()
  }

  if (field_Bank.length <= 0) {
    $("#err_field_Bank").text("Field is empty")
    $("#err_field_Bank").show()
    $("#popUp").modal("show")
  } else {
    $("#err_field_Bank").text("")
    $("#err_field_Bank").hide()
  }

  if (field_Branch.length === 0) {
    $("#err_field_Branch").text("Field is empty")
    $("#err_field_Branch").show()
    $("#popUp").modal("show")
  } else if (lenBranch) {
    $("#err_field_Branch").text("Maximum 50 characters allowed")
    $("#err_field_Branch").show()
    $("#popUp").modal("show")
  } else {
    $("#err_field_Branch").text("")
    $("#err_field_Branch").hide()
  }

  if (!file7.value) {
    $("#upload_feedback_label").show()
    $("#upload_feedback_label").text("Please upload your Bank Account Ownership")
    $("#popUp").modal("show")
    return
  } else {
    $("#upload_feedback_label").hide()
    $("#upload_feedback_label").text("")
  }

  if (field_AccountName.length !== 0 && field_AccountNumber.length !== 0 && field_Bank.length !== 0 && field_Branch.length !== 0 && speCharAccountName == false && numAccountName == false && numAccountNumber == true && file7.value && !$("#file_Upload_Tick_7").is(":hidden")) {
    const data = {
      field_AccountName,
      field_AccountNumber,
      field_Bank,
      field_Branch,
      field_Currency: $("select#from_currency option").filter(":selected").val(),
      upload_file_7: file7.value
    }
    let beneficiaryAccount = {}
    ;(beneficiaryAccount["beneficiaryNo"] = beneficiaryCount), (beneficiaryAccount["bankName"] = field_Bank), (beneficiaryAccount["bankBranch"] = field_Branch), (beneficiaryAccount["accountNumber"] = field_AccountNumber), (beneficiaryAccount["accountName"] = field_AccountName), (beneficiaryAccount["accountCurrency"] = $("select#from_currency option").filter(":selected").val()), BankDetailsList.push(beneficiaryAccount)
    $("#step1").addClass("done")
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#account_details").hide()
    /*  $('#process_confirmation').show(); */
    $("#requirements").show()
    /* $('#requirements')[0].scrollIntoView(true);  */
    console.log("Data -> ", data)
  } else {
    $("#popUp").modal("show")
  }
}
function handleAddBankInfo(event) {
  event.preventDefault()
  isChangeInBankDetails = "Y"
  var field_AccountName1 = $("#field_AccountName1").val()
  var field_AccountNumber1 = $("#field_AccountNumber1").val()
  var field_currency1 = $("#from_currency1").val()
  var field_Bank1 = $("#field_Bank1").val()
  var field_Branch1 = $("#field_Branch1").val()
  var speCharAddAccountName = specialcharacterValidation(field_AccountName1)
  var numAddAccountName = numberValidation(field_AccountName1)
  var numAddAccountNumber = onlyNumberValidate(field_AccountNumber1)

  if (field_AccountName1.length === 0) {
    $("#err_field_AccountName1").text("Field is empty")
    $("#err_field_AccountName1").show()
  } else if (speCharAddAccountName) {
    $("#err_field_AccountName1").text("special character is not allowed")
    $("#err_field_AccountName1").show()
  } else if (numAddAccountName) {
    $("#err_field_AccountName1").text("Number not allowed")
    $("#err_field_AccountName1").show()
  } else {
    $("#err_field_AccountName1").text("")
    $("#err_field_AccountName1").hide()
  }

  if (field_AccountNumber1.length === 0) {
    $("#err_field_AccountNumber1").text("Field is empty")
    $("#err_field_AccountNumber1").show()
  } else if (!numAddAccountNumber) {
    $("#err_field_AccountNumber1").text("Only number is allowed")
    $("#err_field_AccountNumber1").show()
  } else {
    $("#err_field_AccountNumber1").text("")
    $("#err_field_AccountNumber1").hide()
  }

  if (field_currency1 <= 0) {
    $("#err_field_Currency1").text("Field is empty")
    $("#err_field_Currency1").show()
  } else {
    $("#err_field_Currency1").text("")
    $("#err_field_Currency1").show()
  }

  if (field_Bank1.length <= 0) {
    $("#err_field_Bank1").text("Field is empty")
    $("#err_field_Bank1").show()
  } else {
    $("#err_field_Bank1").text("")
    $("#err_field_Bank1").hide()
  }

  if (field_Branch1.length === 0) {
    $("#err_field_Branch1").text("Field is empty")
    $("#err_field_Branch1").show()
  } /*  else if (specCharAddBRANCH) {
    $("#err_field_Branch1").text('special character is not allowed');
    $("#err_field_Branch1").show();
  } else if (numAddBranch) {
    $("#err_field_Branch1").text('Number not allowed');
    $("#err_field_Branch1").show();
  }  */ else {
    $("#err_field_Branch1").text("")
    $("#err_field_Branch1").hide()
  }

  if (!file13.value) {
    $("#upload_feedback_label1").show()
    $("#upload_feedback_label1").text("Please upload your Bank Account Ownership")
  }

  if (field_AccountName1.length !== 0 && field_AccountNumber1.length !== 0 && field_currency1.length !== 0 && field_Bank1.length !== 0 && field_Branch1.length !== 0 && file7.length !== 0 && speCharAddAccountName == false && numAddAccountName == false && numAddAccountNumber == true) {
    const data = {
      field_AccountName1,
      field_AccountNumber1,
      field_Bank1,
      field_Branch1,
      field_Currency1: $("select#from_currency1 option").filter(":selected").val(),
      upload_file_13: file13.value
    }
    $("#step3_circle").addClass("md-step-step3-circle ")
    $("#step3_span").addClass("md-step3-span")
    $("#step3_reference").addClass("md-step3-span")
    /* $("#step3").addClass("active");
        $("#step3>div").addClass("active"); */
    /* $("#step3").addClass("done"); */
    $("#account_details1").hide()
    $("#process_confirmation").show()
    console.log("bank data -> ", data)
  }
}

/* Add Beneficiary Account Information */
function addBenificiaryAccountInfo(event) {
  event.preventDefault()
  var field_addBenificiaryAccountName = $("#field_addBenificiaryAccountName").val()
  var field_addBenificiaryAccountNumber = $("#field_addBenificiaryAccountNumber").val()
  var field_addBenificiaryBank = $("#field_addBenificiaryBank").val()
  var field_addBeneficiaryBranch = $("#field_addBeneficiaryBranch").val()
  var speCharAccountName = specialcharacterValidation(field_addBenificiaryAccountName)
  var numAccountName = numberValidation(field_addBenificiaryAccountName)
  var specAccountNumber = specialcharacterValidation(field_addBenificiaryAccountNumber)
  var numAccountNumber = onlyNumberValidate(field_addBenificiaryAccountNumber)
  var lenAccountName = fieldCheckLength(field_addBenificiaryAccountName, 90)
  var lenAccountNumber = fieldCheckLength(field_addBenificiaryAccountNumber, 20)
  var lenBranch = fieldCheckLength(field_addBeneficiaryBranch, 50)

  if (field_addBenificiaryAccountName.length === 0) {
    $("#err_field_addBenificiaryAccountName").text("Field is empty")
    $("#err_field_addBenificiaryAccountName").show()
    $("#popUp").modal("show")
  } else if (lenAccountName) {
    $("#err_field_addBenificiaryAccountName").text("Maximum 90 characters allowed!")
    $("#err_field_addBenificiaryAccountName").show()
    $("#popUp").modal("show")
  } else if (speCharAccountName) {
    $("#err_field_addBenificiaryAccountName").text("special character is not allowed")
    $("#err_field_addBenificiaryAccountName").show()
    $("#popUp").modal("show")
  } else if (numAccountName) {
    $("#err_field_addBenificiaryAccountName").text("Number not allowed")
    $("#err_field_addBenificiaryAccountName").show()
    $("#popUp").modal("show")
  } else {
    $("#err_field_addBenificiaryAccountName").text("")
    $("#err_field_addBenificiaryAccountName").hide()
  }

  if (field_addBenificiaryAccountNumber.length === 0) {
    $("#err_field_addBenificiaryAccountNumber").text("Field is empty")
    $("#err_field_addBenificiaryAccountNumber").show()
    $("#popUp").modal("show")
  } else if (lenAccountNumber) {
    $("#err_field_addBenificiaryAccountNumber").text("Maximum 20 characters allowed!")
    $("#err_field_addBenificiaryAccountNumber").show()
    $("#popUp").modal("show")
  } else if (!numAccountNumber || specAccountNumber) {
    $("#err_field_addBenificiaryAccountNumber").text("Only number is allowed")
    $("#err_field_addBenificiaryAccountNumber").show()
    $("#popUp").modal("show")
  } else {
    $("#err_field_addBenificiaryAccountNumber").text("")
    $("#err_field_addBenificiaryAccountNumber").hide()
  }

  if (field_addBenificiaryBank.length <= 0) {
    $("#err_field_addBenificiaryBank").text("Field is empty")
    $("#err_field_addBenificiaryBank").show()
    $("#popUp").modal("show")
  } else {
    $("#err_field_addBenificiaryBank").text("")
    $("#err_field_addBenificiaryBank").hide()
  }

  if (field_addBeneficiaryBranch.length === 0) {
    $("#err_field_addBeneficiaryBranch").text("Field is empty")
    $("#err_field_addBeneficiaryBranch").show()
    $("#popUp").modal("show")
  } else if (lenBranch) {
    $("#err_field_addBeneficiaryBranch").text("Maximum 50 characters allowed")
    $("#err_field_addBeneficiaryBranch").show()
    $("#popUp").modal("show")
  } else {
    $("#err_field_addBeneficiaryBranch").text("")
    $("#err_field_addBeneficiaryBranch").hide()
  }

  if (screenCount !== 0 && acctButtonCount == 0) {
    if (field_addBenificiaryAccountName.length !== 0 && field_addBenificiaryAccountNumber.length !== 0 && field_addBenificiaryBank.length !== 0 && field_addBeneficiaryBranch.length !== 0 && speCharAccountName == false && numAccountName == false && numAccountNumber == true) {
      if (buttonCount == 1) {
        console.log(acct_data1)
      }
      if (buttonCount == 2) {
        acct_data2 = addBenAccountInfo
        console.log(acct_data2)
      }
      if (buttonCount == 3) {
        acct_data3 = addBenAccountInfo
        console.log(acct_data3)
      }
      if (buttonCount == 4) {
        acct_data4 = addBenAccountInfo
        console.log(acct_data3)
      }
      if (buttonCount == 5) {
        acct_data5 = addBenAccountInfo
        console.log(acct_data5)
      }
      if (buttonCount == 6) {
        console.log(acct_data6)
      }
      $("#step1").addClass("done")
      $("#step2").addClass("active")
      $("#step2>div").addClass("active")
      $("#addBeneficiaryaccount_details").hide()
      $("#addBeneficiaryRequirements").show()
      console.log("Data -> ", addBenAccountInfo)
      dataReset("field_addBenificiaryAccountName", "field_addBenificiaryAccountNumber", "field_addBenificiaryBank", "field_addBeneficiaryBranch", "field_addBeneficiaryCurrency", "upload_file_8")
      addBeneficiaryuploadDataReset()
    }
  } else {
    if (!file8.value) {
      $("#upload_feedback_label8").show()
      $("#upload_feedback_label8").text("Please upload your Bank Account Ownership")
      $("#popUp").modal("show")
      return
    } else {
      $("#upload_feedback_label8").hide()
      $("#upload_feedback_label8").text("")
    }

    if (field_addBenificiaryAccountName.length !== 0 && field_addBenificiaryAccountNumber.length !== 0 && field_addBenificiaryBank.length !== 0 && field_addBeneficiaryBranch.length !== 0 && speCharAccountName == false && numAccountName == false && numAccountNumber == true && file8.value && !$("#file_Upload_Tick_8").is(":hidden")) {
      addBenAccountInfo = {
        field_addBenificiaryAccountName,
        field_addBenificiaryAccountNumber,
        field_addBenificiaryBank,
        field_addBeneficiaryBranch,
        field_addBeneficiaryCurrency: $("select#from_addBeneficiarycurrency option").filter(":selected").val(),
        upload_file_8: file8.value
      }

      let beneficiaryAccount = {}
      ;(beneficiaryAccount["beneficiaryNo"] = beneficiaryCount), (beneficiaryAccount["bankName"] = field_addBenificiaryBank), (beneficiaryAccount["bankBranch"] = field_addBeneficiaryBranch), (beneficiaryAccount["accountNumber"] = field_addBenificiaryAccountNumber), (beneficiaryAccount["accountName"] = field_addBenificiaryAccountName), (beneficiaryAccount["accountCurrency"] = $("select#from_addBeneficiarycurrency option").filter(":selected").val()), BankDetailsList.push(beneficiaryAccount)
      /* accountUploadDataReset(); */

      if (buttonCount == 1) {
        acct_data1 = addBenAccountInfo
        console.log("acct_data1", acct_data1)
      }

      if (buttonCount == 2) {
        acct_data2 = addBenAccountInfo
        console.log("acct_data2", acct_data2)
      }

      if (buttonCount == 3) {
        acct_data3 = addBenAccountInfo
        console.log("acct_data3", acct_data3)
      }

      if (buttonCount == 4) {
        acct_data4 = addBenAccountInfo
        console.log("acct_data4", acct_data3)
      }

      if (buttonCount == 5) {
        acct_data5 = addBenAccountInfo
        console.log("acct_data5", acct_data5)
      }

      if (buttonCount == 6) {
        acct_data6 = addBenAccountInfo
        console.log("acct_data6", acct_data6)
      }

      $("#step1").addClass("done")
      $("#step2").addClass("active")
      $("#step2>div").addClass("active")
      $("#addBeneficiaryaccount_details").hide()
      $("#addBeneficiaryRequirements").show()

      dataReset("field_addBenificiaryAccountName", "field_addBenificiaryAccountNumber", "field_addBenificiaryBank", "field_addBeneficiaryBranch", "field_addBeneficiaryCurrency", "upload_file_8", "field_addBeneficiary_relatives1", "field_add_Beneficiary_add_relatives2")

      addBeneficiaryuploadDataReset()
    } else {
      $("#popUp").modal("show")
    }
  }
}

function addBeneficiaryuploadDataReset() {
  file8.value = ""
  $("#file_Upload_Tick_8").hide()
  $("#warning_parent_addBeneficiaryacct").hide()
  $("#upload_feedback_label8").hide()
  $("#upload_warning_addBeneficiaryacct").text("")
}

// function getBankDetails() {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     var raw = JSON.stringify({ "companyName": "BPLAC", "webReferenceNumber": referenceNumber });
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw
//     };
//     fetch("http://localhost:3000/disbursement_details", requestOptions).then((response) => response.json())
//         .then(response => {

//             if (response.returnCode == '0') {
//                 if (response.accountName != '') {

//                     document.getElementById('have_bank_details').innerHTML = 'Here are your bank details that we have on file. If you wish to update your bank details, click CHANGE BANK ACCOUNT.'
//                     field_AccountName = response.accountName;
//                     document.getElementById('field_AccountName').value = field_AccountName;

//                     field_AccountNumber = response.maskedAccountNumber.replace(/.(?=.{4})/g, '*');
//                     document.getElementById('field_AccountNumber').value = field_AccountNumber;

//                     field_Bank = response.bankName;

//                     field_Currency = response.accountCurrency;
//                     $("#from_currency option").each(function () {
//                         if ($(this).text() == field_Currency) {
//                             $(this).attr('selected', 'selected');
//                         }
//                     });

//                     if (field_Currency.toLowerCase() == "peso") {

//                         $("#field_Bank").html(
//                             "<option value='Bank of the Philippine Islands - BPI'>Bank of the Philippine Islands - BPI</option><option value='BPI Family Savings Bank - BFB'>BPI Family Savings Bank - BFB</option>"
//                         );
//                         $("#field_Bank option").each(function () {

//                             if ($(this).text().split('-')[1].toLowerCase().trim() == field_Bank.toLowerCase().trim()) {

//                                 $(this).attr('selected', 'selected');
//                             }
//                         });
//                     }
//                     else if (field_Currency.toLowerCase() == "usd") {
//                         $("#field_Bank").html(
//                             "<option value='Bank of the Philippine Islands - BPI'>Bank of the Philippine Islands - BPI</option>"
//                         );
//                         $("#field_Bank option").each(function () {

//                             if ($(this).text().split('-')[1].toLowerCase().trim() == field_Bank.toLowerCase().trim()) {

//                                 $(this).attr('selected', 'selected');
//                             }
//                         });
//                     }

//                 }

//             }
//             else {
//                 $('#change_bank_account').hide()
//             }
//         }).catch(error => {
//             console.log(error)
//         });
// }

function bankTranfer() {
  document.getElementById("ref_number").innerHTML = referenceNumber
  payoutOption = "CTA"
  // getBankDetails();
  let index = BeneficiaryList.findIndex(ele => ele["beneficiaryNo"] == "1")
  let benObject = BeneficiaryList[index]
  benObject["payoutOption"] = payoutOption
  BeneficiaryList[index] = benObject

  trackBenificiary = 0
  $("#payment").hide()
  $("#account_details").show()
  $("#step1").addClass("done")
  $("#step2").addClass("active")
  $("#step2>div").addClass("active")
}

function addBeneficiarybankTranfer() {
  payoutOption = "CTA"

  let index = BeneficiaryList.findIndex(ele => ele["beneficiaryNo"] == beneficiaryCount.toString())
  let benObject = BeneficiaryList[index]
  benObject["payoutOption"] = payoutOption
  BeneficiaryList[index] = benObject

  trackaddBenificiary = 0
  if (buttonCount == 1) {
    trackaddBenificiary1 = trackaddBenificiary
  }
  if (buttonCount == 2) {
    trackaddBenificiary2 = trackaddBenificiary
  }
  if (buttonCount == 3) {
    trackaddBenificiary3 = trackaddBenificiary
  }
  if (buttonCount == 4) {
    trackaddBenificiary4 = trackaddBenificiary
  }
  if (buttonCount == 5) {
    trackaddBenificiary5 = trackaddBenificiary
  }
  if (buttonCount == 6) {
    trackaddBenificiary6 = trackaddBenificiary
  }
  $("#addBeneficiarypayment").hide()
  $("#addBeneficiaryaccount_details").show()
  $("#step2").addClass("active")
  $("#step2>div").addClass("active")
}

function pickUp() {
  document.getElementById("ref_number").innerHTML = referenceNumber
  payoutOption = "PUA"
  trackBenificiary = 1
  let index = BeneficiaryList.findIndex(ele => ele["beneficiaryNo"] == "1")
  let benObject = BeneficiaryList[index]
  benObject["payoutOption"] = payoutOption
  BeneficiaryList[index] = benObject

  $("#payment").hide()
  $("#pickUp").show()
  $("#step1").addClass("done")
  $("#step2").addClass("active")
  $("#step2>div").addClass("active")
}

function addBeneficiaryPickup() {
  payoutOption = "PUA"
  let index = BeneficiaryList.findIndex(ele => ele["beneficiaryNo"] == beneficiaryCount.toString())
  let benObject = BeneficiaryList[index]
  benObject["payoutOption"] = payoutOption
  BeneficiaryList[index] = benObject

  trackaddBenificiary = 1
  if (buttonCount == 1) {
    trackaddBenificiary1 = trackaddBenificiary
  }
  if (buttonCount == 2) {
    trackaddBenificiary2 = trackaddBenificiary
  }
  if (buttonCount == 3) {
    trackaddBenificiary3 = trackaddBenificiary
  }
  if (buttonCount == 4) {
    trackaddBenificiary4 = trackaddBenificiary
  }
  if (buttonCount == 5) {
    trackaddBenificiary5 = trackaddBenificiary
  }
  if (buttonCount == 6) {
    trackaddBenificiary6 = trackaddBenificiary
  }
  $("#addBeneficiarypayment").hide()
  $("#addBeneficiaryPickUp").show()
  $("#step2").addClass("active")
  $("#step2>div").addClass("active")
}

function goBack() {
  console.log("go back!!!")
  $("#step2").removeClass("active")
  $("#step2>div").removeClass("active")
  $("#step2").removeClass("done")
  $("#account_details").hide()
  $("#form_wrapper").show()
  $("#death_data_privacy").show()
  /* $('#form_wrapper')[0].scrollIntoView(true); */
}

function goBack1() {
  if (trackBenificiary == 0) {
    console.log("go back!!!")
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#requirements").hide()
    $("#account_details").show()
    $("#file_Upload_Tick_7").show()
  } else {
    console.log("go back!!!")
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#requirements").hide()
    $("#pickUp").show()
  }
}

function goBackPickUp() {
  $("#step2").removeClass("active")
  $("#step2>div").removeClass("active")
  $("#step2").removeClass("done")
  $("#pickUp").hide()
  $("#form_wrapper").show()
}

function checkUploadDocument() {
  if (upload_data.upload_file_1 !== "") {
    $("#file_Upload_Tick_1").show()
  }
  if (upload_data.upload_file_2 !== "") {
    $("#file_Upload_Tick_2").show()
  }
  if (upload_data.upload_file_3 !== "") {
    $("#file_Upload_Tick_3").show()
  }
  if (upload_data.upload_file_4 !== "") {
    $("#file_Upload_Tick_4").show()
  }
  if (upload_data.upload_file_5 !== "") {
    $("#file_Upload_Tick_5").show()
  }
  if (upload_data.upload_file_6 !== "") {
    $("#file_Upload_Tick_6").show()
  }
}

function checkUploadDocumentBene(data) {
  if (data.upload_file_9 !== "") {
    $("#file_Upload_Tick_9").show()
  }
  if (data.upload_file_10 !== "") {
    $("#file_Upload_Tick_10").show()
  }
  if (data.upload_file_11 !== "") {
    $("#file_Upload_Tick_11").show()
  }
  if (data.upload_file_12 !== "") {
    $("#file_Upload_Tick_12").show()
  }
}

function goBackAddBeneficiary() {
  traverse = 0

  if (screenCount < 1) {
    screenCount = buttonCount
  }
  console.log("go AddBeneficiary")
  buttonCount = buttonCount - 1
  $("input").attr("title", "")

  if (buttonCount == 0) {
    $("#step1").removeClass("done")
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#requirements").show()
    $("#addBeneficiary").hide()
    checkUploadDocument()
  }
  if (buttonCount > 0 && buttonCount < 7) {
    $("#step1").removeClass("done")
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#addBeneficiaryRequirements").show()
    $("#addBeneficiary").hide()

    if (buttonCount == 1) {
      fileUploadDataReset()
      setDataUpload(uppload_data1)
      checkUploadDocumentBene(uppload_data1)
    }

    if (buttonCount == 2) {
      fileUploadDataReset()
      setDataUpload(uppload_data2)
      checkUploadDocumentBene(uppload_data2)
    }

    if (buttonCount == 3) {
      fileUploadDataReset()
      setDataUpload(uppload_data3)
      checkUploadDocumentBene(uppload_data3)
    }

    if (buttonCount == 4) {
      fileUploadDataReset()
      setDataUpload(uppload_data4)
      checkUploadDocumentBene(uppload_data4)
    }

    if (buttonCount == 5) {
      fileUploadDataReset()
      setDataUpload(uppload_data5)
      checkUploadDocumentBene(uppload_data5)
    }
  }
}

function goBack2() {
  $("#step2").removeClass("active")
  $("#step2>div").removeClass("active")
  $("#step2").removeClass("done")
  $("#addBeneficiaryaccount_details").hide()
  $("#addBeneficiary").show()
  $("#invalidCheck_privacyAddBeneficiary").prop("checked", true)
  $("#invalidCheck_basicAddBeneficiary").prop("checked", true)
  if (screenCount < 1) {
    screenCount = buttonCount
    console.log("GET IT SCREEN COUNT")
  }
  if (buttonCount == 1) {
    setDataBeneficiary(data1)
  }

  if (buttonCount == 2) {
    setDataBeneficiary(data2)
  }

  if (buttonCount == 3) {
    setDataBeneficiary(data3)
  }

  if (buttonCount == 4) {
    setDataBeneficiary(data4)
  }

  if (buttonCount == 5) {
    setDataBeneficiary(data5)
  }

  if (buttonCount == 6) {
    setDataBeneficiary(data6)
  }
}

function goBackAddPickup() {
  $("#step2").removeClass("active")
  $("#step2>div").removeClass("active")
  $("#step2").removeClass("done")
  $("#addBeneficiaryPickUp").hide()
  $("#addBeneficiary").show()
  $("#invalidCheck_privacyAddBeneficiary").prop("checked", true)
  $("#invalidCheck_basicAddBeneficiary").prop("checked", true)
  if (screenCount < 1) {
    screenCount = buttonCount
    console.log("GET IT SCREEN COUNT")
  }
  if (buttonCount == 1) {
    setDataBeneficiary(data1)
  }

  if (buttonCount == 2) {
    setDataBeneficiary(data2)
  }

  if (buttonCount == 3) {
    setDataBeneficiary(data3)
  }

  if (buttonCount == 4) {
    setDataBeneficiary(data4)
  }

  if (buttonCount == 5) {
    setDataBeneficiary(data5)
  }

  if (buttonCount == 6) {
    setDataBeneficiary(data6)
  }
}

function goBack3() {
  if (screenCount < 1) {
    screenCount = buttonCount
    console.log("GET IT SCREEN COUNT")
  }
  $("input").attr("title", "")

  if (buttonCount == 1 && trackaddBenificiary1 == 0) {
    setDataBeneficiary(acct_data1)
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#addBeneficiaryRequirements").hide()
    $("#addBeneficiaryaccount_details").show()
    $("#file_Upload_Tick_8").show()
  } else if (buttonCount == 2 && trackaddBenificiary2 == 0) {
    setDataBeneficiary(acct_data2)
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#addBeneficiaryRequirements").hide()
    $("#addBeneficiaryaccount_details").show()
    $("#file_Upload_Tick_8").show()
  } else if (buttonCount == 3 && trackaddBenificiary3 == 0) {
    setDataBeneficiary(acct_data3)
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#addBeneficiaryRequirements").hide()
    $("#addBeneficiaryaccount_details").show()
    $("#file_Upload_Tick_8").show()
  } else if (buttonCount == 4 && trackaddBenificiary4 == 0) {
    setDataBeneficiary(acct_data4)
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#addBeneficiaryRequirements").hide()
    $("#addBeneficiaryaccount_details").show()
    $("#file_Upload_Tick_8").show()
  } else if (buttonCount == 5 && trackaddBenificiary5 == 0) {
    setDataBeneficiary(acct_data5)
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#addBeneficiaryRequirements").hide()
    $("#addBeneficiaryaccount_details").show()
    $("#file_Upload_Tick_8").show()
  } else if (buttonCount == 6 && trackaddBenificiary6 == 0) {
    setDataBeneficiary(acct_data6)
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#addBeneficiaryRequirements").hide()
    $("#addBeneficiaryaccount_details").show()
    $("#file_Upload_Tick_8").show()
  } else {
    $("#step2").addClass("active")
    $("#step2>div").addClass("active")
    $("#addBeneficiaryRequirements").hide()
    $("#addBeneficiaryPickUp").show()
  }
}

function setDataUpload(data) {
  for (const [key, value] of Object.entries(data)) {
    $(`#${key}`).val(`${value}`)
  }
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

function setDataBeneficiary(data) {
  for (const [key, value] of Object.entries(data)) {
    if (key == "field_addBenificiaryBank") {
      $("#field_addBenificiaryBank").html(`<option value='${value}'>${value}</option>`)
    } else if (key == "field_addBeneficiaryCurrency") {
      $("#from_addBeneficiarycurrency").val(`${value}`)
    } else {
      $(`#${key}`).val(`${value}`)
    }
  }
}

function pickup_Bpi() {
  $("#pickUp").hide()
  $("#requirements").show()
  /* $('#process_confirmation').show(); */
  $("#step1").addClass("done")
  $("#step2").addClass("active")
  $("#step2>div").addClass("active")
}

function addBeneficiaryPickup_Bpi() {
  bpiCount = 1
  $("#addBeneficiaryPickUp").hide()
  $("#addBeneficiaryRequirements").show()
  /*  $("#step3_circle").addClass("md-step-step3-circle ");
     $("#step3_span").addClass("md-step3-span");
     $("#step3_reference").addClass("md-step3-span") */
  /* $('#process_confirmation').show(); */
  /*  $("#step3").addClass("active");
     $("#step3>div").addClass("active"); */
  /*   $("#step3").addClass("done"); */
}

function openlink() {
  window.open("https://www.google.com/maps/search/bpi+branch+locator/@14.6079731,120.9860096,14z/data=!3m1!4b1")
}

function validateEmailAddBeneficiary(my_email) {
  var ind0 = my_email.indexOf("@")
  var my_username = my_email.slice(0, ind0)
  var ind = my_email.indexOf("@")
  var my_domain = my_email.substr(ind + 1)
  var ind3 = my_domain.indexOf(".")
  var my_final_domain = my_domain.slice(0, ind3)
  var ind1 = my_domain.indexOf(".")
  var my_extension = my_domain.slice(ind1 + 1, my_domain.length)

  var usernamesize = stringlength(my_username, 2, 30)
  var domainsize = stringlength(my_final_domain, 2, 10)
  var extension = stringlength(my_extension, 2, 3)

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  if (reg.test(my_email) == false) {
    $("#err_field_addBeneficiaryEmailAddress").text("Invalid Email")
    $("#err_field_addBeneficiaryEmailAddress").show()
    return false
  } else {
    if (!usernamesize) {
      $("#err_field_addBeneficiaryEmailAddress").text("UserName should have minimum 2 and maximum 30 character")
      $("#err_field_addBeneficiaryEmailAddress").show()
      return false
    } else if (!domainsize) {
      $("#err_field_addBeneficiaryEmailAddress").text("Domain should have minimum 2 and maximum 10 character")
      $("#err_field_addBeneficiaryEmailAddress").show()
      return false
    } else if (!extension) {
      $("#err_field_addBeneficiaryEmailAddress").text("Extension should have minimum 2 and maximum 3 characters")
      $("#err_field_addBeneficiaryEmailAddress").show()
      return false
    } else {
      $("#err_field_addBeneficiaryEmailAddress").text("")
      $("#err_field_addBeneficiaryEmailAddress").hide()
      return true
    }
  }
}

function validateEmail(my_email) {
  var ind0 = my_email.indexOf("@")
  var my_username = my_email.slice(0, ind0)
  var ind = my_email.indexOf("@")
  var my_domain = my_email.substr(ind + 1)
  var ind3 = my_domain.indexOf(".")
  var my_final_domain = my_domain.slice(0, ind3)
  var ind1 = my_domain.indexOf(".")
  var my_extension = my_domain.slice(ind1 + 1, my_domain.length)

  var usernamesize = stringlength(my_username, 2, 30)
  var domainsize = stringlength(my_final_domain, 2, 10)
  var extension = stringlength(my_extension, 2, 3)

  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  if (reg.test(my_email) == false) {
    $("#err_field_BeneficiaryEmailAddress").text("Invalid Email")
    $("#err_field_BeneficiaryEmailAddress").show()
    return false
  } else {
    if (!usernamesize) {
      $("#err_field_BeneficiaryEmailAddress").text("UserName should have minimum 2 and maximum 30 character")
      $("#err_field_BeneficiaryEmailAddress").show()
      return false
    } else if (!domainsize) {
      $("#err_field_BeneficiaryEmailAddress").text("Domain should have minimum 2 and maximum 10 character")
      $("#err_field_BeneficiaryEmailAddress").show()
      return false
    } else if (!extension) {
      $("#err_field_BeneficiaryEmailAddress").text("Extension should have minimum 2 and maximum 3 characters")
      $("#err_field_BeneficiaryEmailAddress").show()
      return false
    } else {
      $("#err_field_BeneficiaryEmailAddress").text("")
      $("#err_field_BeneficiaryEmailAddress").hide()
      return true
    }
  }
}

function stringlength(inputtxt, minlength, maxlength) {
  var field = inputtxt
  var mnlen = minlength
  var mxlen = maxlength

  if (field.length < mnlen || field.length > mxlen) {
    return false
  } else {
    return true
  }
}

function acctButton() {
  if (screenCount !== 0) {
    acctButtonCount = 1
  }
}

//drop-2 methods
var duration
var remaining = 120 // 2 mins timer
var resendCount = 0
var otpModal = document.getElementById("otpPopUp")
var otpExpModal = document.getElementById("otpExpiry")
var invalidOtpModal = document.getElementById("invalidOtp")
var maxResendOtp = document.getElementById("maxResendOtp")
var invalidOtp = 0

// otp timer function
function otpTimer() {
  document.getElementById("otp-btn").style.display = "block"
  document.getElementById("otp-invalid-btn").style.display = "block"
  document.getElementById("otp-expiry-btn").style.display = "block"
  document.getElementById("loader-btn").style.display = "none"
  document.getElementById("loader-btn-expiry").style.display = "none"
  document.getElementById("loader-btn-invalid").style.display = "none"
  if (resendCount <= 5) {
    $("#otpPopUp").modal("show")
    if (remaining == 120) {
      duration = setInterval(otpTimer, 1000)
    }
    var m = Math.floor(remaining / 60)
    var s = remaining % 60
    m = m < 10 ? "0" + m : m
    s = s < 10 ? "0" + s : s
    document.getElementById("otpTimer").innerHTML = m + ":" + s
    remaining -= 1
    if (remaining == 0) {
      //  timeout stuff here
      removeTimer()
      $("#otpPopUp").modal("hide") // to hide otp modal on timer exceed
      $("#otpExpiry").modal("show") //show otp expiry  modal on timer exceed
    }
  } else {
    $("#otpExpiry").modal("hide")
    $("#invalidOtp").modal("hide")
    $("#maxResendOtp").modal("show")
  }
}

// to refresh the otp otp timer

function removeTimer() {
  clearInterval(duration)
  document.getElementById("otpTimer").innerHTML = ""
  remaining = 120
}

function resendOtp(type) {
  removeTimer()
  resendCount++
  if (resendCount > 5) {
    // on reaching max resend (5 times)
    $("#otpPopUp").modal("hide")
    $("#invalidOtp").modal("hide")
    $("#maxResendOtp").modal("show")
    $("#otpExpiry").modal("hide")
  } else {
    if (type == "otpExpire") {
      document.getElementById("otp-expiry-btn").style.display = "none"
      document.getElementById("loader-btn-expiry").style.display = "block"
    } else if (type == "invalidInput") {
      document.getElementById("otp-invalid-btn").style.display = "none"
      document.getElementById("loader-btn-invalid").style.display = "block"
    }
    document.getElementById("otp-btn").style.display = "none"
    document.getElementById("loader-btn").style.display = "block"
    var source = "Death"
    var validateOtpPayload = {}
    removeTimer()
    var raw = JSON.stringify({
      companyName: "BPLAC",
      webReferenceNumber: referenceNumber
    })
    validateOtpPayload["source"] = source
    validateOtpPayload["data"] = raw

    window.parent.postMessage(
      JSON.stringify({
        event_code: "ym-client-event",
        data: JSON.stringify({
          event: {
            code: "resetOtp",
            data: validateOtpPayload
          }
        })
      }),
      "*"
    )

    window.addEventListener("message", function (eventData) {
      console.log("receiving otp event in acc")
      // console.log(event.data.event_code)
      try {
        if (eventData.data) {
          let event = JSON.parse(eventData.data)
          if (event.event_code == "resetResponse") {
            //sucess
            console.log(event.data)

            if (event.data.returnCode == "0" || event.data.retCode == "0") {
              $("#invalidOtp").modal("hide")
              $("#otpExpiry").modal("hide")
              if (type != "resend") {
                $("#otpPopUp").modal("show")
              }
              document.getElementById("otp").value = ""
              otpTimer()
            } else {
              $("#otpExpiry").modal("hide")
              document.getElementById("returnMessage").innerHTML = event.data.returnMessage
              $("#invalidReturnCode").modal("show")
              // $('#otpPopUp').modal('hide');
            }
          } else {
            // $('#otpPopUp').modal('hide');
          }
        } else {
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
  //             else {
  //                 // $('#otpPopUp').modal('hide');
  //                 // $('#requirements').hide();
  //                 // $('#payment').show();

  //             }

  //         }).catch(error => {
  //             console.log(error)
  //         });
  //     $('#otpExpiry').modal('hide');

  // }

  //--bfre integrtn--//

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
function closeModal() {
  removeTimer()
  document.getElementById("otp").value = ""
  $("#otpPopUp").modal("hide")
  $("#otpExpiry").modal("hide")
}

function submitOtp() {
  document.getElementById("otp-btn").style.display = "none"
  document.getElementById("loader-btn").style.display = "block"
  var source = "Death"
  var validateOtpPayload = {}
  removeTimer()
  var raw = JSON.stringify({
    oneTimePINInformation: {
      companyName: "BPLAC",
      webReferenceNumber: referenceNumber,
      oneTimePIN: document.getElementById("otp").value
    }
  })
  validateOtpPayload["source"] = source
  validateOtpPayload["data"] = raw

  window.parent.postMessage(
    JSON.stringify({
      event_code: "ym-client-event",
      data: JSON.stringify({
        event: {
          code: "validateOtp",
          data: validateOtpPayload
        }
      })
    }),
    "*"
  )

  window.addEventListener("message", function (eventData) {
    console.log("receiving otp event in death")
    // console.log(event.data.event_code)
    try {
      if (eventData.data) {
        let event = JSON.parse(eventData.data)
        if (event.event_code == "validationResponse") {
          //sucess
          console.log(event.data)
          if (event.data.returnCode == "0" || event.data.retCode == "0") {
            $("#otpPopUp").modal("hide")

            otpSubmitted = true
            document.getElementById("otp").value = ""
            finalSubmitCall()
          } else if (event.data.returnCode == "1" || event.data.returnCode == "2") {
            invalidOtp++
            if (invalidOtp <= 3) {
              $("#otpPopUp").modal("hide")
              $("#invalidOtp").modal("show")
            } else {
              $("#otpPopUp").modal("hide")
              $("#invalidOtp").modal("hide")
              $("#maxInvalidOtp").modal("show")
            }
            document.getElementById("otp").value = ""
          } else {
            document.getElementById("returnMessage").innerHTML = event.data.returnMessage
            $("#invalidReturnCode").modal("show")
          }
        } else {
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
  //             $('#process_confirmation').show();
  //             otpSubmitted = true;
  //         }
  //         else {
  //             invalidOtp++;
  //             if (invalidOtp < 3) {
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

  //--bfre integration--//

  // var dummy_otp = '1234'
  // removeTimer();

  // if (document.getElementById('otp').value != dummy_otp) {
  //     invalidOtp++;
  //     if (invalidOtp < 3) {
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
  //     $('#process_confirmation').show();
  // }
  // document.getElementById('otp').value = '';
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
  window.location.href = "main"
}

//drop-2 methods
