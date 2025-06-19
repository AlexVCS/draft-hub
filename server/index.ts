import { Hono } from 'hono';
import { cors } from 'hono/cors'

type Bindings = {
  SECRET_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/env', (c) => {
  const SECRET_KEY = c.env.SECRET_KEY
  return c.text(SECRET_KEY)
})


app.use('/*',
  cors({
    origin: ['http://localhost:5173', 'https://nbadrafthub25.netlify.app'],
  })
)


app.get('/', async function getProspects(c) {
  try {
    const SECRET_KEY = c.env.SECRET_KEY
    const url = 'https://api.sportradar.com/draft/nba/trial/v1/en/2025/prospects.json';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-api-key': SECRET_KEY
      }
    };

    const response = await fetch(url, options)
    const formatResponse = await response.json()
    const results = formatResponse.prospects
    return c.json({ prospects: results })    
  } catch (error) {
    console.error('Full error:', error);
    c.status(500)
    return c.json({ error: `Could not grab data: ${error.message}` })
  }
})

app.get('/topprospects', async function getTopProspects(c) {
  try {
    const SECRET_KEY = c.env.SECRET_KEY
    const url = 'https://api.sportradar.com/draft/nba/trial/v1/en/2025/top_prospects.json';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-api-key': SECRET_KEY
      }
    };

    const response = await fetch(url, options)
    const formatResponse = await response.json()
    const results = formatResponse.prospects
    return c.json({ prospects: results })    
  } catch (error) {
    console.error('Full error:', error);
    c.status(500)
    return c.json({ error: `Could not grab data: ${error.message}` })
  }
})


app.get('/images', async function getPlayerImages(c) {
  try {
    const SECRET_KEY = c.env.SECRET_KEY
    const url = 'https://api.sportradar.com/nba-images-t3/getty_premium/headshots/players/2025/manifest.json';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-api-key': SECRET_KEY
      }
    };

    const response = await fetch(url, options)
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