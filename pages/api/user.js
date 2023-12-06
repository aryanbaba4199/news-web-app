import UserReg from "../../models/user";
import ConnectDB from "../../utils/db";

export default async function handler(req, res) {
  await ConnectDB();
  if (req.method === "POST") {
    const { email, userName, userId } = req.body;

    try {
      const existingUser = await UserReg.findOne({ email });

      if (existingUser) {
        res.status(200).json("Email Already Registered");
      } else {
        if (!userId || !email || !userName) {
          return res.status(400).json("Missing required fields");
        }

        const user = new UserReg({
          userId,
          email,
          userName,
        });

        await user.save();
        res.status(201).json({ message: "User Saved successfully" });
      }
    } catch (err) {
      if (err.code === 11000) {
        res.status(200).json("Email Already Registered");
      } else {
        console.log(err);
        res.status(500).json({ message: err.message });
      }
    }
  }
    const id = req.query.id;
    if(req.method === "GET" && id !== undefined) {

      try {
        const user = await UserReg.findOne({userId: id});
        if(user){
          const favArray = await user.favoriteArticles;
          
          res.status(200).json({favArray});
        }
        else{
          res.status(404).json({message: "User Not Found"});
        }
      } catch (error) {
        res.status(500).json({message: error.message});
      }
      
    }
}
