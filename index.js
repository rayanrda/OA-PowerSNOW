//THIS SCRIPT WILL POPULATE THE EXTENSION POPUP WITH THE CONTENT SENDED BY "content.js"

  document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ action: "getPageDetails", from:"popup"}, response => {
      if (!chrome.runtime.lastError && response !== null ) {
        if(response.error == undefined || response.error !== true){

          if(response.number !== "" && response.title !== ""){
          document.getElementById("NotFound").style.display = "none";
      
          document.getElementById("Found").style.display = "block";
          document.getElementById("number").innerText = response.number
          document.getElementById("number").href = `${response.origin}/task.do?sysparm_query=number=${response.number}` 
          
          document.getElementById("title").innerText = response.title 

          document.getElementById("title").href = `${response.origin}/task.do?sysparm_query=number=${response.number}` 
          }
      
        }
      }
    });
  });