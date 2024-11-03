let appliances = [];

function addAppliance() {
    const applianceName = document.getElementById('appliance-select').value;
    const hours = document.getElementById('hours').value;
    const quantity = document.getElementById('quantity').value;

    if (applianceName && hours && quantity) {
        const appliance = {
            name: applianceName,
            hours: hours,
            quantity: quantity
        };
        appliances.push(appliance);
        renderApplianceList();
        clearApplianceFields();
    } else {
        alert("Please fill out all fields.");
    }
}

function renderApplianceList() {
    const applianceList = document.getElementById('appliance-list');
    applianceList.innerHTML = '';

    appliances.forEach((appliance, index) => {
        const li = document.createElement('li');
        li.textContent = `${appliance.quantity} ${appliance.name}(s) for ${appliance.hours} hrs`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => removeAppliance(index);
        li.appendChild(deleteButton);
        applianceList.appendChild(li);
    });
}

function removeAppliance(index) {
    appliances.splice(index, 1);
    renderApplianceList();
}

function clearApplianceFields() {
    document.getElementById('hours').value = '';
    document.getElementById('quantity').value = '';
}

async function loadAppliances() {
    const response = await fetch('/appliances');
    const availableAppliances = await response.json();
    const applianceSelect = document.getElementById('appliance-select');
    applianceSelect.innerHTML = '';
    
    availableAppliances.forEach(appliance => {
        const option = document.createElement('option');
        option.value = appliance.name;
        option.textContent = `${appliance.name} - ${appliance.watts} watts`;
        applianceSelect.appendChild(option);
    });
}

async function saveLocation() {
    const locationName = document.getElementById('location-name').value;
    const locationState = document.getElementById('location-state').value;

    if (!locationName) {
        alert("Location name is required.");
        return;
    }

    const locationData = {
        name: locationName,
        state: locationState,
        appliances: appliances
    };

    // Make a POST request to save location
    const response = await fetch('/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationData)
    });

    if (response.ok) {
        alert("Location saved successfully!");
        // Redirect or clear the form
    } else {
        alert("Error saving location.");
    }
}

function cancelEdit() {
    window.location.href = '/locations';  // Redirect back to location list
}

document.addEventListener('DOMContentLoaded', loadAppliances);
