const form = document.querySelector("#ticketForm");
const typeSelect = document.querySelector("#type");
const codeContainer = document.querySelector("#codeContainer");
const codeLabel = document.querySelector("#codeLabel");
const codeInput = document.querySelector("#code");
const output = document.querySelector("#output");

// Show the hidden div and change the label based on Student or Guest
function updateCodeField() {
  const value = typeSelect.value;

  if (value === "student") {
    codeContainer.hidden = false;
    codeLabel.textContent = "Student I#";
    codeInput.required = true;
  } else if (value === "guest") {
    codeContainer.hidden = false;
    codeLabel.textContent = "Access Code";
    codeInput.required = true;
  } else {
    codeContainer.hidden = true;
    codeInput.required = false;
  }
  codeInput.value = "";
}

typeSelect.addEventListener("change", updateCodeField);
updateCodeField();

// Get today's date as "yyyy-mm-dd" in local time so it matches the date input
function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// The date has to be later than today (today itself doesn't count)
function isLaterThanToday(value) {
  return value > getTodayString();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.innerHTML = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.type.value;
  const eventDate = form.eventDate.value;
  const code = form.code.value.trim();

  const errors = [];

  // Validate the input
  if (!firstName) errors.push("Please enter your first name");
  if (!lastName) errors.push("Please enter your last name");
  if (!email || !form.email.checkValidity()) errors.push("Please enter a valid email");
  if (!type) errors.push("Please choose a type");

  if (!eventDate) {
    errors.push("Please choose an event date");
  } else if (!isLaterThanToday(eventDate)) {
    errors.push("Event date must be later than today");
  }

  // Student I# must be exactly 9 digits
  if (type === "student" && !/^\d{9}$/.test(code)) {
    errors.push("Student I# must be 9 digits");
  }

  // Guest must enter the event code
  if (type === "guest" && code !== "EVENT131") {
    errors.push("Access Code is not valid");
  }

  // Show all the errors below the form
  if (errors.length > 0) {
    output.innerHTML = errors.map(error => `<p class="error">${error}</p>`).join("");
    return;
  }

  output.innerHTML = `
  <h2>Ticket Created</h2>
  <p>${firstName} ${lastName}</p>
  <p>${email}</p>
  <p>${type}</p>
  <p>${eventDate}</p>
  `;

  form.reset();
  updateCodeField();
});
