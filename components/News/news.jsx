import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/pages/auth/firebase";
import axios from "axios";

const blankImg = "https://cdn-icons-png.flaticon.com/256/126/126471.png";
const fillImg = "https://cdn-icons-png.flaticon.com/256/2107/2107845.png";

const NewsDetail = ({ article, isGridView }) => {
  const router = useRouter();
  const [isFavorite, setFavorite] = useState(false);

  // -------------Handling Favorite--------------
  const handleFavorite = async (article) => {
    if (auth) {
      if (!isFavorite) {
        //------------updating user-----------------
        let { email, userId, userName } = "";
        if (auth.currentUser?.displayName) email = auth.currentUser.email;
        userId = auth?.currentUser?.uid;
        userName = auth?.currentUser?.displayName;
        const res = await axios.post("/api/user", { email, userId, userName });
        if (res.status === 200) {
          console.log("Welcome back");
        } else if (res.status === 201) {
          console.log("Registration Successful");
        } else {
          console.error("Error in Storing user data");
        }

        // -------------saving favorite article in database---------------

        const savingres = await axios.post(`/api/favorite?id=${"createFav"}`, {
          article,
          userId,
        });
        if (savingres.status === 200) {
          setFavorite(true);
          console.log("Added to favorites");
        } else {
          console.log("Failed to add to favorites");
        }
      }
    } else {
      router.push("auth/signin");
    }
  };

  return (
    <>
      <div key={article.source.id} className="flex items-center justify-center flex-col bg-slate mt-8">
        <div className="p-8 rounded-lg max-w-full md:max-w-[90%] flex flex-col justify-center items-center w-full bg-slate-200">
          <div className="flex w-full">
            <h2 className="text-2xl font-bold w-[90%] mb-2">{article.title}</h2>
            {/* Favorite Button  */}
            <div className="flex justify-end justify-items-end mb-4 h-8 ml-2">
              <button
                onClick={() => handleFavorite(article)}
                className="focus:outline-none "
              >
                <img
                  src={isFavorite ? fillImg : blankImg}
                  alt="Favorite"
                  className="w-8 h-8 cursor-pointer"
                />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{article.description}</p>
          <img
            src={article.urlToImage}
            className="w-full rounded-lg md:w-2/3 lg:w-1/2 xl:w-1/3 h-auto mb-4"
            alt={article.title}
          />
          <p className="text-gray-800">{article.content}</p>
          <div className="flex">
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
      </div>
    </>
  );
};

export default NewsDetail;
