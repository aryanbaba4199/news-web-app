import connectDb from "../../utils/db";
import articleModel from "../../models/article";
import userReg from "../../models/user";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { request } from "http";

export default async function handler(req, res) {
  const objectId = new ObjectId();
  await connectDb();
  const id = req.query.id;
  console.log(id);
  if (req.method === "POST") {
    if (id === "createFav") {
      try {
        const { article, userId } = await req.body;

        const newArticle = new articleModel({
          author: article.author,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          pulishedAt: article.pulishedAt,
          content: article.content,
          source: article.source,
        });
        const savedArticle = await newArticle.save();

        const user = await userReg.findOne({ userId });

        user.favoriteArticles.push(savedArticle._id);
        await user.save();
        console.log("Pushed");

        console.log("save article");
        res.status(200).json({ message: "Article saved successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error saving article" });
      }
    }

   
    // -------------Getting Users favorite articles --------------------
    else {
      try {
        const { favArray } = await req.body;
        const objectIdArray = favArray.map(
          (id) => new mongoose.Types.ObjectId(id)
        );
        const articles = await articleModel.find({
          _id: { $in: objectIdArray },
        });
        res.status(200).json({ articles });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error fetching articles" });
      }
    }
  }

  // -------------Deleting unchecked articles --------------------

  if (req.method === "DELETE") {
    try {
      const id = req.query.id;
     
      const deletingRes = await articleModel.findOneAndDelete({ _id: id }); // Use _id for filtering
      console.log("deleted", deletingRes);
      
      if (deletingRes) {
        res.status(200).json({ message: "Article deleted successfully" });
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Error in deleting article" });
    }
  }
}
