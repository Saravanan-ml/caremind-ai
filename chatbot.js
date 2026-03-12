function sendMessage(){

let input = document.getElementById("userInput")
let message = input.value.trim().toLowerCase()

if(message==="") return

let chatBox = document.getElementById("chatBox")

chatBox.innerHTML += `<div class="user">${message}</div>`

let response = generateResponse(message)

chatBox.innerHTML += `<div class="bot">${response}</div>`

speak(response)

chatBox.scrollTop = chatBox.scrollHeight

input.value=""

}


/* Intelligent Response System */

function generateResponse(msg){

/* greetings */

if(msg.match(/\b(hi|hello|hey)\b/)){
return "Hello! I'm CareMind AI medical assistant. Tell me your symptoms and I will try to guide you."
}


/* thanks */

if(msg.includes("thank")){
return "You're welcome. I'm here to help you stay healthy."
}


/* hospital suggestions */

if(msg.includes("hospital") || msg.includes("doctor")){
return "If symptoms are severe, visiting a hospital is recommended. You can consult a nearby general physician or emergency department. If breathing difficulty or severe chest pain occurs, seek medical help immediately."
}


/* pneumonia question */

if(msg.includes("pneumonia")){
return "Pneumonia is a lung infection that may cause cough, fever, chest pain and breathing difficulty. It is important to consult a doctor for diagnosis and treatment."
}


/* symptom detection */

let symptoms = []

if(msg.includes("fever")) symptoms.push("fever")
if(msg.includes("cough")) symptoms.push("cough")
if(msg.includes("vomiting")) symptoms.push("vomiting")
if(msg.includes("nausea")) symptoms.push("nausea")
if(msg.includes("headache")) symptoms.push("headache")
if(msg.includes("stomach pain")) symptoms.push("stomach pain")
if(msg.includes("diarrhea")) symptoms.push("diarrhea")
if(msg.includes("fatigue")) symptoms.push("fatigue")
if(msg.includes("shortness of breath")) symptoms.push("breathing difficulty")
if(msg.includes("chest pain")) symptoms.push("chest pain")


if(symptoms.length>0){

let diseaseHint = "These symptoms may be related to viral infection, flu, stomach infection, or respiratory illness."

if(symptoms.includes("fever") && symptoms.includes("cough")){
diseaseHint="These symptoms may indicate flu, viral infection, bronchitis, or pneumonia."
}

if(symptoms.includes("vomiting") || symptoms.includes("stomach pain")){
diseaseHint="These symptoms may indicate food poisoning or stomach infection."
}

return `I noticed the following symptoms: ${symptoms.join(", ")}. ${diseaseHint} For accurate prediction, please enter these symptoms in the AI disease prediction system on the main page.`
}


/* fallback */

return "I understand your concern. Could you please describe your symptoms in more detail so I can assist you better?"

}


/* Voice Response */

function speak(text){

let speech = new SpeechSynthesisUtterance(text)

speech.lang = "en-US"

speech.rate = 1

speech.pitch = 1

speechSynthesis.speak(speech)

}


/* Voice Input */

function startVoiceChat(){

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition

if(!SpeechRecognition){
alert("Voice recognition works best in Google Chrome.")
return
}

const recognition = new SpeechRecognition()

recognition.lang="en-US"

recognition.start()

recognition.onresult=function(event){

let speechText = event.results[0][0].transcript

document.getElementById("userInput").value = speechText

sendMessage()

}

}


/* Enter key support */

document.getElementById("userInput")
.addEventListener("keypress",function(event){

if(event.key==="Enter"){
event.preventDefault()
sendMessage()
}

})