const container = document.getElementById('entry-container');
const fields = container.querySelectorAll('input, select');
const outputDiv = document.getElementById('output');
const elementsList = document.getElementById('elements-list');
let elements = []; // List of entered elements
let lastName = "Detail"; // Default Name
let lastProfile = "slat"; // Default Profile

const translations = {
  slat: { en: "Slat", et: "Liist" },
  sheet: { en: "Sheet", et: "Leht" },
  "l-profile": { en: "L-profile", et: "L-profiil" },
};


// Store current values
const values = {};

// Initialize and add event listeners
fields.forEach(field => {
  values[field.id] = field.value;

  field.addEventListener('focus', () => {
    if (field.tagName === 'INPUT') field.select();
  });

  field.addEventListener('input', event => {
    values[event.target.id] = event.target.value || event.target.defaultValue;
    outputDiv.innerText = Object.values(values).join(', ');
  });
});

document.getElementById("language-select").addEventListener("change", event => {
  populateDropdown(event.target.value); // Populate dropdown based on selected language
});

// Initialize with a default language
populateDropdown("en");


// Submission logic
container.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();

    const newElement = {};
    container.querySelectorAll('.form-group').forEach(group => {
      const label = group.querySelector('label').innerText.toLowerCase();
      const input = group.querySelector('input, select');
      newElement[label] = input.value || input.defaultValue;
    });

    lastName = newElement["name"];
    lastProfile = newElement["type"]; // Remember the last used profile
    elements.push(newElement);

    resetFormAfterEntry();
    displayElementsList();
  }
});

// Display the list of elements
function displayElementsList() {
  elementsList.innerHTML = ''; // Clear the list

  elements.forEach((el, index) => {
    const entry = document.createElement('div');
    entry.classList.add('entry');

    // Create a bubble for each value
    Object.values(el).forEach((value, index) => {
      const bubble = document.createElement('div');

      bubble.textContent = value;
    
      // Check the current element number (index starts at 0)
      if (index > 1) {
        bubble.classList.add('bubble-number');
      } else {
        bubble.classList.add('bubble');        
      }
    
      entry.appendChild(bubble);
    });
    // Add delete button as a bubble
      const deleteButton = document.createElement('div');
      deleteButton.classList.add('bubble-delete');
      deleteButton.textContent = 'X';
      deleteButton.addEventListener('click', () => {
      elements.splice(index, 1); // Remove the element from the array
      displayElementsList(); // Refresh the display
    });

    entry.appendChild(deleteButton);
    elementsList.appendChild(entry);
  });
}
// Reset form after entry
function resetFormAfterEntry() {
  fields.forEach(field => {
    if (field.id === "textfield1") {
      field.value = lastName;
      field.focus();
    } else if (field.id === "profile") {
      if (field.value === "") { 
        field.value = lastProfile; // Set the value programmatically
        field.dispatchEvent(new Event('change')); // Trigger change event
      }
    } else if (["textfield2", "textfield3", "textfield4"].includes(field.id)) {
      field.value = "0";
    } else if (field.id === "textfield5") {
      field.value = "1";
    }
  });
}

function populateDropdown(language) {
  const dropdown = document.getElementById("profile");
  dropdown.innerHTML = ""; // Clear existing options

  Object.keys(translations).forEach(key => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = translations[key][language]; // Get the label for the current language
    dropdown.appendChild(option);
  });
}