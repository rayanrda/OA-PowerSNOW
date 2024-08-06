//THIS FILE WILL RUN INSIDE THE IFRAME TO BE ABLE TO ACESS THE "gcm" OBJECT WHICH MANAGE THE CONTECT MENU CLICK
const number = document.querySelectorAll("input[aria-label='Number']")[0].value;
const title = document.getElementById("sys_displayValue").value;
const origin = window.location.origin;
if (number !== undefined && title !== undefined) {
    gcm.addHref("Copy URL (New)", `copyToClipboard('${origin}/task.do?sysparm_query=number=${number.replace(/[&<>"']/g, "")}')`);
}

const links = document.querySelectorAll("a");
links.forEach((v, k) => {
    match = v.innerText.match(/[A-Z]{4}[0-9]{7,}/g)
    if (match) {
        v.href = `${origin}/task.do?sysparm_query=number=${match[0]}`
    }
});

//SAVE ON CTRL+S
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        var sysverb_update_and_stay = window.sysverb_update_and_stay;
        clickDemandSaveButton();
        return false;
    }
});


