const express = require('express');
const app = express();
const cors = require('cors');
const { execFile } = require('child_process');
app.use(cors());
app.use(express.json());

// const fetch = require('node-fetch');
const path = require('path');
// const router = require('router');

const staticPath = path.join(__dirname, '..', 'client');
app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'html/index.html'));
});
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(staticPath, 'html/index.html'));
});
app.get('/blog.html', (req, res) => {
    res.sendFile(path.join(staticPath, 'html/blog.html'));
});
app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(staticPath, 'html/contact.html'));
}); 
app.get('/about.html', (req, res) => {
    res.sendFile(path.join(staticPath, 'html/about.html'));
}); 
// const { getChatCompletion } = require('./chat');
const { getChatCompletion } = require('./chat');

// OpenAI API 엔드포인트
app.post('/api/gpt-essay-review', async (req, res) => {
    
    console.log("OpenAI API");
    try {
        console.log("OpenAI API request received");

        const messages = req.body.messages;

        const response = await getChatCompletion(messages);
        console.log(response)
        if (response) {
            res.send(response);
        } else {
            res.status(500).json({ error: 'No response from OpenAI API' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
