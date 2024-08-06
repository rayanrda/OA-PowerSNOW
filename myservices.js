//THIS FILE WILL WORK ONLY ON MYSERVICE IN ORDER TO REPLACE ACTUAL TITLE WITH LINK TO THE ACTUAL TICKET 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ((request.from === 'service-worker') && (request.action === 'getPageDetails')) {

        var values = {
            number: "",
            title: "",
            origin: window.location.origin
        };

        sendResponse(values);
    }

});

var observeDOMChange = (obj, callback) => {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
        var mutationObserver = new MutationObserver(callback)

        mutationObserver.observe(obj, { childList: true, subtree: true })
        return mutationObserver
    }

    else if (window.addEventListener) {
        obj.addEventListener('DOMNodeInserted', callback, false)
        obj.addEventListener('DOMNodeRemoved', callback, false)
    }
}

const origin = window.location.origin;

observeDOMChange(document.querySelector("body"), function (mutations) {
    let number = undefined;
    let title = undefined;
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            
            if (node.classList !== undefined && node.classList.contains("drawer-wrapper")) {
        
            node.childNodes.forEach(child => {
                if (child.classList !== undefined && child.classList.contains("ticket-grid-container")) {
                    child.childNodes.forEach(parent => {
                        if (parent.classList !== undefined && parent.classList.contains("items-center")) {
                            parent.childNodes.forEach(el => {
                                if(el.classList !== undefined && el.classList.contains("ticket-number")){
                                    number = el;
                                }
                                if(el.classList !== undefined && el.classList.contains("ticket-heading")){
                                    title = el;
                                }
                            });
                            return;
                        }
                    });
                    return;
                }

            });
        return
        }
        });
    });
    if(number !== undefined && title!== undefined){
        title.innerHTML = `<a target="_blank" href="${origin}/task.do?sysparm_query=number=${number.innerText.replace("#","").replace(/[&<>"']/g,"")}">${title.innerText.replace(/[&<>"']/g,"")}</a>`;
        number.innerHTML = `<a target="_blank" href="${origin}/task.do?sysparm_query=number=${number.innerText.replace("#","").replace(/[&<>"']/g,"")}">${number.innerText.replace(/[&<>"']/g,"")}</a>`;
    
    }
});
