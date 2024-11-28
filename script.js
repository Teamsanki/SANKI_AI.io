// Function to display user and bot messages
function displayMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-msg" : "bot-msg");
    messageDiv.innerHTML = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll to the latest message
}

// Function to send a message to the backend (serverless function)
async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    // Display the user's message
    displayMessage(userInput, "user");

    // Send the request to the serverless function
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;
        displayMessage(botReply, "bot");
    } catch (error) {
        displayMessage("Sorry, something went wrong. Try again later.", "bot");
    }
}
