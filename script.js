let symptoms = []

function addSymptom(){

let input=document.getElementById("symptomInput")

let symptom=input.value.trim().toLowerCase()

if(symptom==="") return

symptoms.push(symptom)

let li=document.createElement("li")

li.innerText=symptom

document.getElementById("symptomList").appendChild(li)

input.value=""

}


async function predict(){

if(symptoms.length===0){

alert("Please add symptoms first")

return

}

document.getElementById("disease").innerText="Analyzing..."

try{

let response=await fetch(
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

let data=await response.json()

console.log(data)

let percent=(data.confidence_score*100).toFixed(2)

document.getElementById("disease").innerText=data.predicted_disease

document.getElementById("confidence").innerText=" — "+percent+"%"

document.getElementById("confidenceFill").style.width=percent+"%"

document.getElementById("referral").innerText=data.referral_decision

let list=document.getElementById("possibleDiseases")

list.innerHTML=""

data.possible_diseases.forEach(d=>{

let li=document.createElement("li")

li.innerHTML=`<i class="fa-solid fa-virus"></i> ${d}`

list.appendChild(li)

})

}catch(error){

console.error(error)

alert("Server waking up. Try again in few seconds.")

}

}