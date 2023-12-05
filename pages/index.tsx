// index.js
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Header/heaader";
import { useSelector, useDispatch } from 'react-redux';
import { setNews } from '../redux/slice';
import axios from 'axios';
import NewsItem from '@/components/News/news';

const Index = () => {
  const [isGridView, setGridView] = useState(true); // Set default to true for grid view

  // ------------toggle Button ------------------
  const toggleView = () => {
    setGridView((prev) => !prev);
  };

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

  // -------Getting News --------------------
  const newsData = useSelector((state) => state.news.news);

  return (
    <>
      <Navbar />

      <div className='container mx-auto px-4 lg:px-8'>
        <button onClick={toggleView}>
          {isGridView ? 'Switch to List View' : 'Switch to Grid View'}
        </button>

        <div className={isGridView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : ''}>
          {newsData?.length > 0 && newsData?.map((article: any) => (
            <NewsItem key={article.id} article={article} isGridView={isGridView} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
