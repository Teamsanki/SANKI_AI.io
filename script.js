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
