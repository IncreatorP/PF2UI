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
  elementsList.innerHTML = ''; // Clear the list

  elements.forEach((el, index) => {
    const entry = document.createElement('div');
    entry.classList.add('entry');

    const content = document.createElement('div');
    content.classList.add('content');
    content.textContent = `#${index + 1}: ${Object.entries(el).map(([k, v]) => `${k}: ${v}`).join(', ')}`;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
      elements.splice(index, 1); // Remove the element from the array
      displayElementsList(); // Refresh the display
    });

    entry.appendChild(content);
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
      field.value = lastProfile;
    } else if (["textfield2", "textfield3", "textfield4"].includes(field.id)) {
      field.value = "0";
    } else if (field.id === "textfield5") {
      field.value = "1";
    }
  });
}