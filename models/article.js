
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    author : {
        type : String,
    },
    content : {
        type :String,
    },
    description : {
        type : String,
    },
    publishedAt : {
        type : String,
    },
    source : {
        type : []
    },
    title : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    urlToImage : {
        type : String,
    }




})
const ArticleModel = mongoose.models.article || mongoose.model("article", articleSchema);
export default ArticleModel;