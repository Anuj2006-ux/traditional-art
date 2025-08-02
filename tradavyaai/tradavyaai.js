const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/search-met', async (req, res) => {
  const { caption } = req.body;
  if (!caption) {
    return res.status(400).json({ error: 'Caption is required' });
  }

  try {
    // Step 1: Search for object IDs matching the caption
    const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(caption)}&hasImages=true`;
    const { data: searchData } = await axios.get(searchUrl);

    if (!searchData.objectIDs || searchData.objectIDs.length === 0) {
      return res.json({ results: [] });
    }

    // Step 2: Fetch details for the top 20 results for better filtering
    const objectIDs = searchData.objectIDs.slice(0, 20);
    const promises = objectIDs.map(id =>
      axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
    );
    const objectsResp = await Promise.all(promises);

    // Step 3: Prepare a list of main words from the caption (ignoring very short words)
    const mainWords = caption
      .toLowerCase()
      .split(/\s+/)
      .filter(w => w.length > 2);

    // Step 4: Score and filter the results for accuracy
    const scored = objectsResp
      .map(obj => {
        const art = obj.data;
        let score = 0;
        for (const word of mainWords) {
          if (
            (art.title && art.title.toLowerCase().includes(word)) ||
            (art.objectName && art.objectName.toLowerCase().includes(word)) ||
            (art.artistDisplayName && art.artistDisplayName.toLowerCase().includes(word)) ||
            (art.tags && Array.isArray(art.tags) && art.tags.some(tag => tag.term && tag.term.toLowerCase().includes(word)))
          ) {
            score += 1;
          }
        }
        return {
          objectID: art.objectID,
          title: art.title,
          artist: art.artistDisplayName,
          objectDate: art.objectDate,
          image: art.primaryImageSmall,
          objectURL: art.objectURL,
          score
        };
      })
      .filter(art => art.image && art.score > 0) // Only include results with images and at least 1 matching word
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, 5); // Return top 5

    res.json({ results: scored });
  } catch (error) {
    console.error('Error fetching from MetMuseum API:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Error fetching from MetMuseum API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});