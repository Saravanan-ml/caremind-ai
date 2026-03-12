let symptoms = []

/* Add Symptom */

function addSymptom(){

let input = document.getElementById("symptomInput")

let symptom = input.value.trim().toLowerCase()

if(symptom === "") return

/* Prevent duplicate symptoms */

if(symptoms.includes(symptom)){
alert("Symptom already added")
input.value=""
return
}

symptoms.push(symptom)

let li = document.createElement("li")

li.innerText = symptom

document.getElementById("symptomList").appendChild(li)

input.value=""

}


/* Predict Disease */

async function predict(){

if(symptoms.length === 0){

alert("Please add symptoms first")

return

}

document.getElementById("disease").innerText="Analyzing..."

try{

let response = await fetch(
"https://caremind-ai.onrender.com/predict",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
symptoms:symptoms
})

})

let data = await response.json()

let percent = (data.confidence_score*100).toFixed(2)

/* Show prediction */

document.getElementById("disease").innerText = data.predicted_disease

document.getElementById("confidence").innerText = " — " + percent + "%"

/* Update confidence bar */

document.getElementById("confidenceFill").style.width = percent + "%"

/* Recommendation */

document.getElementById("referral").innerText = data.referral_decision

/* Possible diseases */

let list = document.getElementById("possibleDiseases")

list.innerHTML=""

data.possible_diseases.forEach(d=>{

let li = document.createElement("li")

li.innerHTML = `<i class="fa-solid fa-virus"></i> ${d}`

list.appendChild(li)

})

}catch(error){

console.error(error)

alert("Server waking up. Try again in a few seconds.")

}

}


/* Voice Input Feature */

function startVoiceInput(){

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition

/* Check browser support */

if(!SpeechRecognition){

alert("Voice recognition works best in Google Chrome or Microsoft Edge.")

return

}

const recognition = new SpeechRecognition()

recognition.lang = "en-US"

recognition.interimResults = false

recognition.maxAlternatives = 1

recognition.start()

recognition.onresult = function(event){

let speechText = event.results[0][0].transcript.toLowerCase()

/* Put speech into input box */

document.getElementById("symptomInput").value = speechText

}

recognition.onerror = function(event){

console.error(event.error)

alert("Microphone error. Please allow microphone access.")

}

}


/* Allow Enter Key to Add Symptom */

document.getElementById("symptomInput")
.addEventListener("keypress", function(event){

if(event.key === "Enter"){

event.preventDefault()

addSymptom()

}

})