// index.js
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Header/heaader";
import { useSelector, useDispatch } from 'react-redux';
import { setNews, RootState } from '../redux/slice'; // Import RootState
import axios from 'axios';
import NewsItem from '@/components/News/news';

const Index = () => {
  const [isGridView, setGridView] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        const news = response.data;
        dispatch(setNews(news));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [dispatch]);
  
  const newsData = useSelector((state) => state.news.news); // Specify RootState type
  if(isLoading){
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <div className="animate-spin h-8 w-8  border-t-4 mx-8 rounded-full border-slate-950"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className='container mx-auto px-4 lg:px-8'>
        <button onClick={() => setGridView(prev => !prev)}>
          {isGridView ? 'Switch to List View' : 'Switch to Grid View'}
        </button>

        <div className={isGridView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : ''}>
          {newsData?.length > 0 && newsData?.map((article) => (
            <NewsItem key={article.id} article={article} isGridView={isGridView} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
