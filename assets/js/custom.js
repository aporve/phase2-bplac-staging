window.addEventListener('message', function (eventData) {
    console.log("CHECKING FOR EVENT : SHIV");
    console.log(eventData);
    try {
        if (JSON.parse(eventData.data)) {
            let event = JSON.parse(eventData.data);
            console.log(event)
            let sourceIframe;
            if (event.event_code === 'custom-event') {
                iframe = document.getElementById('ymIframeId');
                var eventData = event.data.data;
                console.log(eventData);
                switch (event.data.code) {
                    case "otp":
                        console.log("Within event block");
                        console.log(event.data)

                        var sourceFrame = null; // this is the IFRAME which send the postMessage

                        setTimeout(() => {
                            // myiframe.contentWindow.postMessage('otp', '*');
                            let myiframe = window.frames['ymIframe'].document.getElementById('webviewId')
                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'hello', data: JSON.stringify({
                                    event: {
                                        code: "personalinfo",
                                        data: 'Hi there user'
                                    }
                                })
                            }), '*');
                        }, 2000);

                        return;
                    case "surveryResponse":
                        console.log("within survery response")
                        console.log(event.data.data)
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById('webviewId')

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'surveryResponse', data:
                                    event.data.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "validationResponse":
                        console.log("validate otp custom JS")

                        sourceIframe = 'webviewAccidentId';

                        switch (event.data.data.source) {
                            case 'Illness':
                                sourceIframe = "webviewIllnessId";
                                break;
                            case 'Death':
                                sourceIframe = "webviewDeathId";
                                break;
                            default:
                                sourceIframe = sourceIframe;
                                break;
                        }

                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById(sourceIframe)

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'validationResponse', data:
                                    event.data.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "resetResponse":
                        console.log("reset custom JS")

                        sourceIframe = 'webviewAccidentId';

                        switch (event.data.data.source) {
                            case 'Illness':
                                sourceIframe = "webviewIllnessId";
                                break;
                            case 'Death':
                                sourceIframe = "webviewDeathId";
                                break;
                            default:
                                sourceIframe = sourceIframe;
                                break;
                        }
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById(sourceIframe)

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'resetResponse', data:
                                    event.data.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "payoutDetails":
                        console.log("payout custom JS")

                        sourceIframe = 'webviewAccidentId';

                        switch (event.data.data.source) {
                            case 'Illness':
                                sourceIframe = "webviewIllnessId";
                                break;
                            case 'Death':
                                sourceIframe = "webviewDeathId";
                                break;
                            default:
                                sourceIframe = sourceIframe;
                                break;
                        }
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById(sourceIframe)

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'payoutDetails', data:
                                    event.data.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "uploadSuccess":
                        console.log("upload custom JS")

                        sourceIframe = 'webviewAccidentId';

                        switch (event.data.data.source) {
                            case 'Illness':
                                sourceIframe = "webviewIllnessId";
                                break;
                            case 'Death':
                                sourceIframe = "webviewDeathId";
                                break;
                            default:
                                sourceIframe = sourceIframe;
                                break;
                        }
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById(sourceIframe)

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'uploadSuccess', data:
                                    event.data.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "submitSuccess":
                        console.log("submit custom JS")

                        sourceIframe = 'webviewAccidentId';
                        console.log(event.data.data)

                        switch (event.data.data.source) {
                            case 'Illness':
                                sourceIframe = "webviewIllnessId";
                                break;
                            case 'Death':
                                sourceIframe = "webviewDeathId";
                                break;
                            default:
                                sourceIframe = sourceIframe;
                                break;
                        }
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById(sourceIframe)

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'submitSuccess', data:
                                    event.data.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "preSubmitResponse":
                        console.log("pre submit custom JS")

                        sourceIframe = 'webviewAccidentId';
                        console.log(event.data.data)

                        switch (event.data.data.source) {
                            case 'Illness':
                                sourceIframe = "webviewIllnessId";
                                break;
                            case 'Death':
                                sourceIframe = "webviewDeathId";
                                break;
                            default:
                                sourceIframe = sourceIframe;
                                break;
                        }
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById(sourceIframe)

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'preSubmitResponse', data:
                                    event.data.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "finalSubmitResponse":
                        console.log("final submit custom JS")

                        sourceIframe = 'webviewAccidentId';
                        console.log("final submit : ")
                        console.log(event.data.data)
                        console.log(event.data.data.source)

                        switch (event.data.data.source) {
                            case 'Illness':
                                sourceIframe = "webviewIllnessId";
                                break;
                            case 'Death':
                                sourceIframe = "webviewDeathId";
                                break;
                            default:
                                sourceIframe = sourceIframe;
                                break;
                        }
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById(sourceIframe)

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'finalSubmitResponse', data:
                                    event.data.data.data
                            }), '*');
                        }, 2000);
                        return;
                    case "claimStatusResponse":
                        console.log("claim status custom JS")

                        // sourceIframe = 'webviewAccidentId';

                        // switch (event.data.data.source)
                        // {
                        //     case 'Illness':
                        //         sourceIframe = "webviewIllnessId";
                        //         break;
                        //     case 'Death':
                        //         sourceIframe = "webviewDeathId";
                        //         break;
                        //     default:
                        //         sourceIframe = sourceIframe;
                        //         break;
                        // }
                        console.log(event.data.data.data)
                        setTimeout(() => {
                            let myiframe = window.frames['ymIframe'].document.getElementById("webviewId")

                            myiframe.contentWindow.postMessage(JSON.stringify({
                                event_code: 'claimStatusResponse', data:
                                    event.data.data.data
                            }), '*');
                        }, 2000);
                        return;
                    default:
                        console.log('No event handler defined for ' + event.data.code);
                        return;
                }
            }
        }

    } catch (error) {
        return;
    }
}, false);