const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    
  },
  email : {
    type: String,
    required: true,
    
  },
  userName: {
    type: String,
    required: true,
  },
  favoriteArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'article',
  }],
});

const UserRegModel = mongoose.models.UserReg || mongoose.model("UserReg", userSchema);

export default UserRegModel;
