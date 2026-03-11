let symptoms = []

function addSymptom(){

    let input = document.getElementById("symptomInput")
    let symptom = input.value.trim().toLowerCase()

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

    // show loading text
    document.getElementById("disease").innerText="Connecting to AI server..."
    document.getElementById("confidence").innerText=""
    document.getElementById("referral").innerText=""
    document.getElementById("possibleDiseases").innerHTML=""

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

        if(!response.ok){
            throw new Error("Server not responding")
        }

        let data = await response.json()

        console.log("API Response:", data)

        // confidence
        let percent = (data.confidence_score * 100).toFixed(2)

        document.getElementById("disease").innerText =
        data.predicted_disease || "Unknown"

        document.getElementById("confidence").innerText =
        " — " + percent + "%"

        document.getElementById("confidenceFill").style.width =
        percent + "%"

        document.getElementById("referral").innerText =
        data.referral_decision || "Consult doctor"

        // possible diseases
        let list = document.getElementById("possibleDiseases")
        list.innerHTML=""

        if(data.possible_diseases && data.possible_diseases.length > 0){

            data.possible_diseases.forEach(d=>{

                let li = document.createElement("li")

                li.innerText = d

                list.appendChild(li)

            })

        }else{

            let li=document.createElement("li")
            li.innerText="No related diseases available"
            list.appendChild(li)

        }

    }catch(error){

        console.error(error)

        alert("AI server is waking up. Please try again in a few seconds.")

    }

}