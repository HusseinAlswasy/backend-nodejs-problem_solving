
import User from "./userModel.js";
import postModel from "./postModel.js";
import Comment from "./commentModel.js";

User.hasMany(postModel,{foreignKey:"userId"});

User.hasMany(Comment,{foreignKey:"userId"});

postModel.hasMany(Comment,{foreignKey:"postId"});

postModel.belongsTo(User,{foreignKey:"userId"})

Comment.belongsTo(postModel, { foreignKey: "postId" });

Comment.belongsTo(User, { foreignKey: "userId" });

export { User, postModel as Post, Comment };
