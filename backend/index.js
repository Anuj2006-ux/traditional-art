const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const filePath = req.file.path;

    const form = new FormData();
    form.append('image', fs.createReadStream(filePath));

    const response = await axios.post('https://api.deepai.org/api/toonify', form, {
      headers: {
        'Api-Key': 'YOUR_API_KEY_HERE',
        ...form.getHeaders()
      }
    });

    fs.unlinkSync(filePath); // cleanup
    res.json({ output_url: response.data.output_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to convert image' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
