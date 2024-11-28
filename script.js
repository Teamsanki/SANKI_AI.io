// Function to simulate chatbot response
function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") {
        return;
    }

    // Display user message
    displayMessage(userInput, "user");

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Simulate AI response after a short delay
    setTimeout(() => {
        let botResponse = getAIResponse(userInput);
        displayMessage(botResponse, "bot");
    }, 1000);
}

// Function to display messages in the chat box
function displayMessage(message, sender) {
    var chatBox = document.getElementById("chat-box");
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
    messageDiv.innerHTML = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Function to generate AI-like response (basic example)
function getAIResponse(userMessage) {
    const responses = {
        "hello": "Hi there! How can I assist you today?",
        "how are you": "I’m doing well, thank you for asking! How can I help you?",
        "image": "I can help you generate images! What would you like to create?",
        "bye": "Goodbye! Have a wonderful day ahead!"
    };

    userMessage = userMessage.toLowerCase();

    // Return a response based on the user input
    return responses[userMessage] || "I’m not sure how to respond to that. Could you please ask something else?";
}
