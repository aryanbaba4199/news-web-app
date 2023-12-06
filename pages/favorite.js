import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";
import axios from "axios";
import Nav from "../components/Header/heaader";

const blankImg = "https://cdn-icons-png.flaticon.com/256/126/126471.png";
const fillImg = "https://cdn-icons-png.flaticon.com/256/2107/2107845.png";

const NewsDetail = () => {
  const router = useRouter();
  const [isFavorite, setFavorite] = useState(false);
  const [favuserArray, setFavArray] = useState([]);
  const [favArticles, setFavArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------Handling Favorite--------------
  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`/api/user?id=${userId}`);
        if (userRes.status === 200) {
          setFavArray(userRes.data.favArray);

          if (userRes.data.favArray.length > 0) {
            const articleRes = await axios.post(
              `/api/favorite?id=${"ArrayOfFavList"}`,
              {
                favArray: userRes.data.favArray,
              }
            );

            if (articleRes.status === 200) {
              setFavArticles(articleRes.data.articles);
            } else {
              console.error("Error fetching favorite articles");
            }
          }
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching data", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFavorite = async (id) => {
    try {
      const res = await axios.delete(`/api/favorite?id=${id}`);
      if (res.status === 200) {
        console.log("Removed favorite");
        router.push("/");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  if (loading) {
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
      <Nav />{" "}
      <div>
        {favArticles.length > 0 ? (
          favArticles.map((article) => (
            <div key={article._id}>
              <>
                <div className="flex items-center justify-center flex-col bg-slate mt-8">
                  <div className="p-8 rounded-lg max-w-full md:max-w-[90%] flex flex-col justify-center items-center w-full bg-slate-200">
                    <div className="flex w-full">
                      <h2 className="text-2xl font-bold w-[90%] mb-2">
                        {article.title}
                      </h2>
                      {/* Favorite Button  */}
                      <div className="flex justify-end justify-items-end mb-4 h-8 ml-2">
                        <button
                          onClick={() => handleFavorite(article._id)}
                          className="focus:outline-none "
                        >
                          <img
                            src={isFavorite ? blankImg : fillImg}
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
            </div>
          ))
        ) : (
          <h2>No favorite articles found.</h2>
        )}
      </div>
    </>
  );
};

export default NewsDetail;
