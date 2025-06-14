const messageInputs = document.querySelector("#message-inputs");
const chatBodys = document.querySelector("#chatbot-bodys");
const initialHeights = messageInputs.scrollHeight;
messageInputs.style.borderRadius = "40px 40px 40px 40px";
messageInputs.style.maxHeight = "180px";


const API_KEY = "AIzaSyC2hENtMt7gLQLU38m5x5lx9E05__H1qH4";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const userData = {
  message: null,
  file:{
    data: null
  }
}

const generateBotresponse = async (incomingBotmessagediv) => {
  const messageElement = incomingBotmessagediv.querySelector(".message-texts");
  const requestOptions = {
    method: "POST",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: userData.message
        }]
      }]
    })
  }
  try {
   const response = await fetch(API_URL, requestOptions);
   const data = await response.json();
   if(!response.ok)throw new Error(data.error.message);

   const apiResponsetext = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "**$1**").replace(/\* /g, '\n ').replace(/\*/g, ' ').replace(/\s{2,}/g, " ").replace(/\./g, '.\r\n').trim();
   messageElement.innerHTML = apiResponsetext;
  } catch (error) {
    console.log(error);
    messageElement.innerHTML = error.message;
    messageElement.style.color = "#ff0000";
  } finally {
    userData.file = {};
    incomingBotmessagediv.classList.remove("think");
    chatBodys.scrollTo({ top: chatBodys.scrollHeight, behavior: "smooth"});
  }
}

const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("messages", ...classes);
  div.innerHTML = content;
  return div;
}

const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInputs.value.trim();
  messageInputs.value = "";
  messageInputs.dispatchEvent(new Event("input"));
  const messageContent = `<div class="message-texts"></div>
  ${userData.file.data ? `${userData.file.data}` : ""}`;
  const outgoingMessagediv = createMessageElement(messageContent, "user-messages");
  outgoingMessagediv.querySelector(".message-texts").textContent = userData.message;
  chatBodys.appendChild(outgoingMessagediv);
  chatBodys.scrollTo({
    top: chatBodys.scrollHeight,
    behavior: "smooth"
  });

  setTimeout(()=>{
    const messageContent = `
    <i class="rob-avatar"></i>
    <div class="message-texts">
     <div class="think-indicator">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
     </div>
    </div>
    `;

    const incomingBotmessagediv = createMessageElement(messageContent, "bot-messages", "think");
    chatBodys.appendChild(incomingBotmessagediv);
    chatBodys.scrollTo({
      top: chatBodys.scrollHeight,
      behavior: "smooth"
    });
    generateBotresponse(incomingBotmessagediv);
  }, 600);

}

messageInputs.addEventListener("keydown",(e)=>{
  const userMessages = e.target.value.trim();
  if(e.key === "Enter" && userMessages && !e.shiftKey && window.innerWidth > 1){
    handleOutgoingMessage(e);
  }
});


messageInputs.addEventListener("input", () => {
messageInputs.style.height = `${initialHeights}px`;
messageInputs.style.height = `${messageInputs.scrollHeight}px`;
document.querySelector(".chat-forms").style.borderRadius = messageInputs.scrollHeight > initialHeights ? "15px" : "32px";
});
