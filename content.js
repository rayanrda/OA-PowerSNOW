'use strict';
//Get the content from the page and send it to the extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ((request.from === 'service-worker') && (request.action === 'getPageDetails')) {

        if (document.querySelectorAll("input[aria-label='Number']")[0] !== undefined) {
            var values = {
                number: document.querySelectorAll("input[aria-label='Number']")[0].value.replace(/[&<>"']/g, ""),
                title: document.getElementById("sys_displayValue").value.replace(/[&<>"']/g, ""),
                origin: window.location.origin
            };

            sendResponse(values);
        }
    }
});



