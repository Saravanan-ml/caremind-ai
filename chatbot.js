function sendMessage(){

let input = document.getElementById("userInput")
let message = input.value.toLowerCase().trim()

if(message === "") return

let chatBox = document.getElementById("chatBox")

// Show user message
chatBox.innerHTML += `<div class="user">${message}</div>`

let reply = "I am here to help with medical questions."

/* =========================
SYMPTOM ANALYSIS
========================= */

if(
message.includes("fever") &&
message.includes("cough")
){

reply = `
You may be experiencing symptoms related to:
• Flu  
• Viral infection  
• Bronchitis  
• COVID-19  

💡 Suggestions:
• Drink plenty of fluids  
• Take rest  
• Monitor your temperature  

🏥 If symptoms persist more than 2-3 days, please visit a nearby hospital or consult a doctor.

You can also try the AI disease prediction tool on the main page for more analysis.
`
}

else if(
message.includes("chest pain") ||
message.includes("shortness of breath")
){

reply = `
⚠ Chest pain or breathing difficulty can be serious.

Possible causes may include:
• Respiratory infection  
• Pneumonia  
• Asthma  
• Cardiac issues  

🏥 It is recommended to seek medical attention immediately.

Please visit the nearest hospital or emergency department.
`
}

else if(
message.includes("vomiting") ||
message.includes("nausea") ||
message.includes("stomach pain")
){

reply = `
These symptoms may indicate:

• Gastroenteritis  
• Food poisoning  
• Stomach infection  

💡 Suggestions:
• Drink oral rehydration fluids  
• Eat light food  
• Avoid oily food

🏥 If vomiting continues for more than 24 hours, consult a doctor.
`
}

else if(
message.includes("headache") &&
message.includes("fever")
){

reply = `
Fever with headache may be related to:

• Viral infection  
• Flu  
• Dengue  

💡 Please rest and stay hydrated.

🏥 If severe headache or high fever occurs, please visit a hospital for evaluation.
`
}

/* =========================
GENERAL QUESTIONS
========================= */

else if(
message.includes("what should i do") ||
message.includes("what can i do")
){

reply = `
Here are some general health tips:

• Stay hydrated  
• Get enough rest  
• Monitor your symptoms  
• Avoid self-medication

🏥 If symptoms worsen or last more than 2-3 days, please consult a healthcare professional.

You may also use the CareMind AI predictor on the main page to check possible diseases.
`
}

else if(
message.includes("hospital") ||
message.includes("doctor")
){

reply = `
If you are experiencing severe symptoms, it is best to visit a healthcare provider.

🏥 You can consult:

• Government hospitals
• Private clinics
• Emergency care centers

If symptoms are urgent (breathing difficulty, severe chest pain, high fever), please seek immediate medical attention.
`
}

/* =========================
DISEASE EXPLANATION
========================= */

else if(message.includes("dengue")){
reply = `
Dengue is a mosquito-borne viral infection.

Common symptoms include:
• High fever
• Severe headache
• Joint pain
• Fatigue

🏥 If symptoms worsen, consult a doctor immediately.
`
}

else if(message.includes("pneumonia")){
reply = `
Pneumonia is a lung infection that causes:

• Cough
• Fever
• Chest pain
• Difficulty breathing

🏥 Medical treatment may be required, so please consult a doctor.
`
}

/* =========================
DEFAULT RESPONSE
========================= */

else{

reply = `
I understand your question.

For disease prediction, please enter your symptoms in the AI prediction system on the main page.

If you are experiencing health issues, I recommend consulting a qualified medical professional.
`

}

// Show bot reply
chatBox.innerHTML += `<div class="bot">${reply}</div>`

chatBox.scrollTop = chatBox.scrollHeight

input.value=""

}