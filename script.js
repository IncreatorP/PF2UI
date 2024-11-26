const container = document.getElementById('entry-container');
const fields = container.querySelectorAll('input, select');
const outputDiv = document.getElementById('output');
const elementsList = document.getElementById('elements-list');
let elements = []; // List of entered elements
let lastName = "Detail"; // Default Name
let lastProfile = "slat"; // Default Profile

// Store current values
const values = {};

// Initialize and add event listeners
fields.forEach(field => {
  values[field.id] = field.value;
  field.addEventListener('focus', () => field.select());

  field.addEventListener('input', event => {
    values[event.target.id] = event.target.value || event.target.defaultValue;
    outputDiv.innerText = Object.values(values).join(', ');
  });
});

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
    lastProfile = newElement["type"];
    elements.push(newElement);

    resetFormAfterEntry();
    displayElementsList();
  }
});

// Display the list of elements
function displayElementsList() {
  elementsList.innerHTML = elements
    .map((el, index) => `#${index + 1}: ${Object.entries(el).map(([k, v]) => `${k}: ${v}`).join(', ')}`)
    .join('<br>');
}

// Reset form after entry
function resetFormAfterEntry() {
  fields.forEach(field => {
    if (field.id === "textfield1") {
      field.value = lastName;
      field.focus();
    } else if (field.id === "profile") {
      field.value = lastProfile;
    } else if (["textfield2", "textfield3", "textfield4"].includes(field.id)) {
      field.value = "0";
    } else if (field.id === "textfield5") {
      field.value = "1";
    }
  });
}