const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

const PORT = 5000;

// Search route
app.get('/search', async (req, res) => {
  const query = req.query.q || 'indian painting';
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${encodeURIComponent(query)}`;

  try {
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
});

// Fetch individual object
app.get('/object/:id', async (req, res) => {
  const { id } = req.params;
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;

  try {
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    console.error('Object fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch object' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
