const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Chat webhook endpoint
app.post('/webhook/d931c4a7-02f5-4359-918f-7ad3fae7b144/chat', (req, res) => {
  const { chatInput, sessionId } = req.body;

  // For testing, just echo back the message
  const response = `You said: ${chatInput}`;

  res.json({
    output: response,
    sessionId
  });
});

// Serve the example page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'example.html'));
});

const PORT = 5678;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser to see the chatbot`);
}); 