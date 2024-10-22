function validateInput(
  name: string,
  email: string,
  contact: string,
  subject: string,
  message: string
): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactPattern = /^\d{10}$/;

  if (!name || !email || !contact || !subject || !message) {
    alert("All fields are required.");
    return false;
  }
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!contactPattern.test(contact)) {
    alert("Please enter a valid contact number (10 digits).");
    return false;
  }
  return true;
}

async function sendData(data: object) {
  try {
    const response = await fetch(
      "https://67169f8a3fcb11b265d3284e.mockapi.io/api",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    console.log("Success:", result);
    alert("Form submitted successfully!");
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message.");
  }
}

document.getElementById("myForm")!.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("phone") as HTMLInputElement).value;
  const subject = (document.getElementById("subject") as HTMLInputElement)
    .value;
  const message = (document.getElementById("message") as HTMLTextAreaElement)
    .value;

  if (validateInput(name, email, contact, subject, message)) {
    const data = { name, email, contact, subject, message };
    sendData(data);
  }
});
