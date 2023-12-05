import axios from 'axios';

const apiKey = process.env.NEWS_API

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'in',
        apiKey: process.env.NEWS_API,
      },
    });
    
    res.status(200).json(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

