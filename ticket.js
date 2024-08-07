'use strict';
//Get ticket infos
const number = document.querySelectorAll("input[aria-label='Number']")[0].value;
const title = document.getElementById("sys_displayValue").value;
const origin = window.location.origin;

//Add new button to the header context menu
if (number !== undefined && title !== undefined) {
    gcm.addHref("Copy URL (New)", `copyToClipboard('${origin}/task.do?sysparm_query=number=${number.replace(/[&<>"']/g, "")}')`);
}

//Replace each link that have a demand number with the new url
const links = document.querySelectorAll("a");
links.forEach((v, k) => {
    match = v.innerText.match(/[A-Z]{4}[0-9]{7,}/g)
    if (match) {
        v.href = `${origin}/task.do?sysparm_query=number=${match[0]}`
    }
});

//Save on "CTRL+S"
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        var sysverb_update_and_stay = window.sysverb_update_and_stay;
        clickDemandSaveButton();
        return false;
    }
});



