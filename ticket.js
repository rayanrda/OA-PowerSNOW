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




//Check if input have been changed 
var change_made = false;
document.querySelectorAll('input, textarea, select').forEach(element => {
    element.addEventListener('change', (event) => {
        change_made = true;
    });
});

//Remove actual onclick behaviour for "Asses" button 
document.querySelector("#u_submit_action").onclick = () => { };
//Add click listener to save before doing assesing
document.querySelector("#u_submit_action").addEventListener('click', (event) => {
    if(change_made){
        let confirm_result = confirm("It looks like you’ve made some changes. Are you sure you want to continue without saving?")
        if(confirm_result == false){
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    }
    var u_submit_action=window.u_submit_action;
    processSubmit();
    return false;

});
