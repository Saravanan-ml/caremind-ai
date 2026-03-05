let symptoms = []

function addSymptom(){

let input = document.getElementById("symptomInput")

let symptom = input.value.trim()

if(symptom === "") return

symptoms.push(symptom)

let li = document.createElement("li")

li.innerText = symptom

document.getElementById("symptomList").appendChild(li)

input.value=""

}

async function predict(){

if(symptoms.length === 0){

alert("Please add symptoms first")

return

}

document.getElementById("disease").innerText="Predicting..."
document.getElementById("confidence").innerText="-"
document.getElementById("referral").innerText="-"

try{

let response = await fetch("http://127.0.0.1:8000/predict",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
symptoms:symptoms
})

})

let data = await response.json()

document.getElementById("disease").innerText =
data.predicted_disease

document.getElementById("confidence").innerText =
(data.confidence_score*100).toFixed(2)+"%"

document.getElementById("referral").innerText =
data.referral_decision

let bar = document.getElementById("confidenceFill")

bar.style.width = (data.confidence_score*100)+"%"

}catch(error){

console.log(error)

alert("Error connecting to server")

}

}