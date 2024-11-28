// OpenAI API Key (Add your own key here)
const API_KEY = "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";

// Function to send a message
async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (!userInput) return;

    // Display user's message
    displayMessage(userInput, "user");

    // Clear input field
    document.getElementById("user-input").value = "";

    // Fetch AI response
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: userInput },
                ],
            }),
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;

        displayMessage(botReply, "bot");
    } catch (error) {
        displayMessage("Oops! Something went wrong. Please try again later.", "bot");
    }
}

// Function to display a message in the chatbox
function displayMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

    const textNode = document.createTextNode(message);
    messageDiv.appendChild(textNode);

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
