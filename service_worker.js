'use strict';
//Service worked used to create the communication between the popup and the page 
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.from === 'popup' && request.action === 'getPageDetails') {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs.length === 0) {
          sendResponse({ error:true,msg:"No active tab found." });
          return;
        }
        chrome.tabs.sendMessage(tabs[0].id, { action: "getPageDetails", from:"service-worker" }, response => {
          if (chrome.runtime.lastError) {
            sendResponse({ error:true,msg:chrome.runtime.lastError.message });

          } else {
            sendResponse(response);
          }
        });
      });
      return true;
    }
  });