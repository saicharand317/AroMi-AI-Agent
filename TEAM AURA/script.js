/**
 * Navigates between the steps of the wellness wizard
 */
function goToStep(stepNumber) {
    const nameInput = document.getElementById('regName');
    const name = nameInput.value.trim();

    if(!name && stepNumber === 2) {
        alert("Please tell us your name first!");
        nameInput.focus();
        return;
    }

    // Update the UI with the user's name
    document.getElementById('userNameDisplay').innerText = name;

    // Hide all steps and show the target step
    document.querySelectorAll('.glass').forEach(el => el.classList.add('hidden'));
    document.getElementById('step' + stepNumber).classList.remove('hidden');
}

/**
 * Calculates BMI and generates the health plan
 */
function generatePlan() {
    // Inputs from Step 1
    const height = parseFloat(document.getElementById('regHeight').value) / 100; // to meters
    const weight = parseFloat(document.getElementById('regWeight').value);
    
    // Inputs from Step 2
    const steps = parseInt(document.getElementById('inputSteps').value) || 0;
    const sleep = parseFloat(document.getElementById('inputSleep').value) || 0;
    const water = parseFloat(document.getElementById('inputWater').value) || 0;

    // UI Elements
    const foodList = document.getElementById('foodRecs');
    const workList = document.getElementById('exerciseRecs');
    const waterMsg = document.getElementById('waterRecs');
    const summary = document.getElementById('aiSummary');

    // Simple BMI Calculation: weight / (height * height)
    let bmiValue = 0;
    let bmiCategory = "";
    if(height > 0 && weight > 0) {
        bmiValue = (weight / (height * height)).toFixed(1);
        bmiCategory = bmiValue < 18.5 ? "Underweight" : bmiValue < 25 ? "Normal weight" : "Overweight";
    }

    // 1. Activity & Nutrition Logic
    if(steps < 5000) {
        foodList.innerHTML = `
            <li>• Limit carbohydrate intake</li>
            <li>• Focus on lean proteins (Lentils, Eggs)</li>
            <li>• Drink Green Tea to boost metabolism</li>`;
        workList.innerHTML = `
            <li>• 20 min Brisk Walk</li>
            <li>• 3 sets of Bodyweight Squats</li>
            <li>• Standing Leg Stretches</li>`;
        summary.innerText = `Your activity level is low. `;
    } else {
        foodList.innerHTML = `
            <li>• Complex Carbs (Oats, Quinoa)</li>
            <li>• High fiber vegetables</li>
            <li>• Post-workout Magnesium-rich snacks</li>`;
        workList.innerHTML = `
            <li>• 30 min Cardiovascular Exercise</li>
            <li>• Core Strengthening (Planks)</li>
            <li>• Full Body Dynamic Stretching</li>`;
        summary.innerText = `Excellent consistency! `;
    }

    // 2. Hydration Analysis
    if(water < 2) {
        waterMsg.innerHTML = "⚠️ <span class='text-red-600 font-bold'>Critical Dehydration:</span> Low water intake. Aim for 3.5L.";
    } else if(water < 3.5) {
        waterMsg.innerHTML = "✅ <span class='text-sky-600 font-bold'>Moderate Hydration:</span> Good effort, but try to add 0.5L more.";
    } else {
        waterMsg.innerHTML = "🌟 <span class='text-green-600 font-bold'>Optimal Hydration:</span> Perfect! Your recovery will be faster.";
    }

    // 3. Final Summary Construction
    let insights = `Based on your stats, your BMI is ${bmiValue || 'N/A'} (${bmiCategory}). `;
    insights += sleep < 6 
        ? "[WARNING]: Sleep is too low. Aim for 7-9 hours for hormonal health." 
        : "Your sleep quality is contributing well to your recovery.";
    
    summary.innerText += insights;

    goToStep(3);
}