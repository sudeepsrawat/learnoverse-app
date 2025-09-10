require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://Admin:Admin@clusterlearno.dr23lci.mongodb.net/learnoverse?retryWrites=true&w=majority'
const DB_NAME = process.env.MONGODB_DB || 'learnoverse';
const COLL = process.env.COLLECTION || 'videos';
const YT_API_KEY = process.env.YT_API_KEY;
const PORT = process.env.PORT || 4000;

if (!MONGODB_URI || !YT_API_KEY) {
  console.error('MONGODB_URI and YT_API_KEY required in .env');
  process.exit(1);
}

let dbClient;
async function connectDB() {
  dbClient = new MongoClient(MONGODB_URI);
  await dbClient.connect();
  console.log('✅ Connected to MongoDB');
}
connectDB().catch(err => { console.error(err); process.exit(1); });

function parseISO8601Duration(iso) {
  const re = /P(?:\d+Y)?(?:\d+M)?(?:\d+D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const m = iso.match(re);
  if (!m) return 0;
  const h = parseInt(m[1] || 0);
  const mm = parseInt(m[2] || 0);
  const s = parseInt(m[3] || 0);
  return h * 3600 + mm * 60 + s;
}

app.get('/videos', async (req, res) => {
  try {
    const coll = dbClient.db(DB_NAME).collection(COLL);
    const docs = await coll.find({}, { projection: { videoId: 1, _id: 0 } }).toArray();
    const ids = docs.map(d => d.videoId).filter(Boolean);
    if (ids.length === 0) return res.json([]);

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids.join(',')}&key=${YT_API_KEY}`;
    const r = await axios.get(url);

    const items = (r.data.items || []).map(item => {
      const snippet = item.snippet || {};
      const details = item.contentDetails || {};
      return {
        videoId: item.id,
        title: snippet.title,
        channelTitle: snippet.channelTitle,
        thumbnails: snippet.thumbnails,
        duration: details.duration,
        durationSec: parseISO8601Duration(details.duration),
      };
    });

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
