import connectDb from '../../utils/db';
import articleModel from "../../models/article";
import userReg from "../../models/user";
import mongoose from 'mongoose';

export default async function handler(req, res) {
    await connectDb();
    if (req.method === 'POST') {
        try{
            const {article, userId} = await req.body;
            
            const newArticle = new articleModel({
                author : article.author,
                title : article.title,
                description : article.description,
                url : article.url,
                urlToImage : article.urlToImage,
                pulishedAt : article.pulishedAt,
                content : article.content,
                source : article.source,
            });
            const savedArticle = await newArticle.save();
            
            const user = await userReg.findOne({userId});
            console.log(savedArticle._id);
            user.favoriteArticles.push(savedArticle._id);
            await user.save();
            console.log("Pushed");
            
            console.log("save article");
            res.status(200).json({message:"Article saved successfully"});
        }catch(err){
            console.log(err);
            res.status(500).json({message:"Error saving article"});
        }
    }
    if(req.method === 'DELETE') {
        try{
        const id = req.query.id;
        console.log(id);
        const deletingRes = await articleModel.findOneAndDelete({url: id});
        console.log("deleted", deletingRes);
        res.status(200).json({message:"Article deleted successfully"});
        }catch(err){
            console.error(err.message)
            res.status(500).json({message : "Error in deleting article"});
        }
    }
}