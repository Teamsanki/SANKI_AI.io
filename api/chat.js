const axios = require('axios');

// API endpoint handler
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const userMessage = req.body.message;
        const openaiApiKey = process.env.OPENAI_API_KEY; // Store API Key in Vercel/Netlify secrets

        try {
            // Making the API call to OpenAI's Chat API
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: userMessage },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${openaiApiKey}`,
                    },
                }
            );
            // Sending the API response back to the frontend
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch response from OpenAI" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
