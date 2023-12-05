// NewsDetail.js

import React from "react";

const NewsDetail = ({ article }) => {
  return (
    <>
      
      <div className="flex items-center justify-center flex-col bg-slate mt-8">
        <div className="p-8 rounded-lg max-w-full md:max-w-[90%] flex flex-col justify-center items-center w-full bg-slate-200">
          <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
          <p className="text-gray-600 mb-4">{article.description}</p>
          <img
            src={article.urlToImage}
            className="w-full rounded-lg md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto mb-4"
            alt={article.title}
          />
          <p className="text-gray-800">{article.content}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-500 hover:underline mt-4"
          >
            Read Full Article
          </a>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
