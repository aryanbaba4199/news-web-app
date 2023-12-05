import axios from 'axios';

const apiKey = 'process.env.API'

export default async function handler(req, res) {
  const { data } = await axios.get(' https://newsapi.org/v2/top-headlines', {
    params: {
      country: 'in',
      apiKey: process.env.NEWS_API,
    },
  });
  console.log(data);
  res.status(200).json(data.articles);
}
