// index.js
import React, { useEffect } from 'react';
import Navbar from "@/components/Header/heaader";
import { useSelector, useDispatch } from 'react-redux';
import { setNews } from '../redux/slice';
import axios from 'axios';

const Index = () => {

  const newsData = async () => {
   await useSelector((state) => state.news.news);  
  }
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        const news = response.data;
        dispatch(setNews(news));

      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();

  }, [dispatch]);
  newsData();



  return (
    <>
      <Navbar />
      <div>Index</div>
    </>
  );
};

export default Index;
