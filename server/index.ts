import { Hono } from 'hono';
import { cors } from 'hono/cors'
import prospectData from '../prospects.json'
import topProspectData from '../topProspects.json'

type Bindings = {
  SECRET_KEY: string
  YOUTUBE_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/env', (c) => {
  return c.json({
    secret_key_exists: !!c.env.SECRET_KEY,
    youtube_key_exists: !!c.env.YOUTUBE_KEY,
    secret_key_value: c.env.SECRET_KEY ? 'exists' : 'undefined',
    youtube_key_value: c.env.YOUTUBE_KEY ? 'exists' : 'undefined'
  })
})


app.use('/*',
  cors({
    origin: ['http://localhost:5173', 'https://nbadrafthub25.netlify.app'],
  })
)


app.get('/', async function getProspects(c) {
  try {
    const results = prospectData.prospects;
    return c.json({ prospects: results }); 
  } catch (error) {
    console.error('Full error:', error);
    c.status(500)
    return c.json({ error: `Could not grab data: ${error.message}` })
  }
})

app.get('/topprospects', async function getTopProspects(c) {
  try {
    const results = topProspectData.prospects;
    return c.json({ prospects: results });  
  } catch (error) {
    console.error('Full error:', error);
    c.status(500)
    return c.json({ error: `Could not grab data: ${error.message}` })
  }
})


app.get('/player/:playerName/videos', async function getPlayerVideos(c) {
  try {
    const YOUTUBE_KEY = c.env.YOUTUBE_KEY
    const playerName= c.req.param('playerName')
    const query = `${playerName} highlights`;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_KEY}`;
    const response = await fetch(url)
    const formatResponse = await response.json()
    const results = formatResponse
    return c.json({ results })
  } catch (error) {
    console.error('Full error:', error);
    c.status(500)
    return c.json({ error: `Could not grab data: ${error.message}` })
  }
})

export default app