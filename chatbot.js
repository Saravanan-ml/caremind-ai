function sendMessage(){

let input = document.getElementById("userInput")
let message = input.value.toLowerCase().trim()

if(message === "") return

let chatBox = document.getElementById("chatBox")

// show user message
chatBox.innerHTML += `<div class="user">${message}</div>`

let reply = "I am here to help with medical questions."

/* =========================
SYMPTOM ANALYSIS
========================= */

if(message.includes("fever") && message.includes("cough")){

reply = `
You may be experiencing symptoms related to:

• Flu  
• Viral infection  
• Bronchitis  
• COVID-19  

💡 Suggestions:
• Drink plenty of fluids  
• Take adequate rest  
• Monitor your body temperature  

🏥 If symptoms continue for more than 2-3 days, please visit a hospital or consult a doctor.

You can also try the CareMind AI prediction tool on the main page.
`
}

else if(message.includes("fever") && message.includes("headache")){

reply = `
Fever with headache may indicate:

• Viral infection  
• Flu  
• Dengue  

💡 Suggestions:
• Stay hydrated  
• Take rest  

🏥 If high fever persists, please consult a doctor.
`
}

else if(message.includes("chest pain") || message.includes("shortness of breath")){

reply = `
⚠ Chest pain or breathing difficulty can be serious.

Possible causes may include:

• Respiratory infection  
• Pneumonia  
• Asthma  
• Heart-related issues  

🏥 Please seek medical attention immediately or visit the nearest hospital.
`
}

else if(message.includes("vomiting") || message.includes("nausea") || message.includes("stomach pain")){

reply = `
These symptoms may be related to:

• Gastroenteritis  
• Food poisoning  
• Stomach infection  

💡 Suggestions:
• Drink oral rehydration fluids  
• Eat light food  
• Avoid oily or spicy food  

🏥 If symptoms continue for more than 24 hours, consult a doctor.
`
}

else if(message.includes("fatigue") || message.includes("tired")){

reply = `
Fatigue can occur due to:

• Infection  
• Stress  
• Lack of sleep  
• Nutritional deficiency  

💡 Try to rest well and stay hydrated.

🏥 If fatigue persists for several days, please consult a doctor.
`
}

/* =========================
DISEASE INFORMATION
========================= */

else if(message.includes("dengue")){

reply = `
Dengue is a mosquito-borne viral infection.

Common symptoms include:

• High fever  
• Severe headache  
• Joint pain  
• Fatigue  

🏥 Medical attention is recommended if symptoms worsen.
`
}

else if(message.includes("pneumonia")){

reply = `
Pneumonia is a lung infection that can cause:

• Cough  
• Fever  
• Chest pain  
• Difficulty breathing  

🏥 It usually requires medical treatment, so please consult a doctor.
`
}

else if(message.includes("malaria")){

reply = `
Malaria is caused by parasites transmitted through mosquito bites.

Common symptoms include:

• Fever  
• Chills  
• Sweating  
• Headache  

🏥 Medical treatment is necessary.
`
}

else if(message.includes("covid")){

reply = `
COVID-19 is a viral respiratory illness.

Common symptoms include:

• Fever  
• Cough  
• Fatigue  
• Breathing difficulty  

🏥 Please consult a healthcare professional if symptoms worsen.
`
}

/* =========================
GENERAL HEALTH QUESTIONS
========================= */

else if(message.includes("what can i do") || message.includes("what should i do")){

reply = `
Here are some general health tips:

• Stay hydrated  
• Get enough rest  
• Monitor your symptoms  
• Avoid self-medication  

🏥 If symptoms worsen or persist, please consult a doctor.

You may also use the CareMind AI predictor on the main page.
`
}

else if(message.includes("doctor") || message.includes("hospital")){

reply = `
If you are experiencing severe symptoms, it is best to visit a healthcare provider.

🏥 You may consult:

• Government hospitals  
• Private clinics  
• Emergency care centers  

If symptoms are urgent, please seek immediate medical attention.
`
}

/* =========================
GRATITUDE RESPONSES
========================= */

else if(message.includes("thank") || message.includes("thanks") || message.includes("thank you")){

reply = `
You're welcome! 😊

I'm glad I could help.

If you have more health questions or symptoms,
feel free to ask.

You can also use the CareMind AI prediction tool on the main page.
`
}

/* =========================
ACKNOWLEDGEMENT RESPONSES
========================= */

else if(message === "ok" || message === "okay" || message === "alright"){

reply = `
Alright 👍

If you have more medical questions,
I'm here to help.

You can also try the CareMind AI disease predictor.
`
}

/* =========================
GREETING
========================= */

else if(message.includes("hello") || message.includes("hi") || message.includes("hey")){

reply = `
Hello! 👋

I'm the CareMind Medical Assistant.

You can ask me about symptoms, diseases,
or general health advice.
`
}

/* =========================
DEFAULT RESPONSE
========================= */

else{

reply = `
I understand your question.

For accurate disease prediction,
please enter your symptoms in the
CareMind AI prediction system on the main page.

If symptoms are serious,
please consult a qualified medical professional.
`
}

// show bot message
chatBox.innerHTML += `<div class="bot">${reply}</div>`

// auto scroll
chatBox.scrollTop = chatBox.scrollHeight

// clear input
input.value = ""

}