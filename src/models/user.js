import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.*\@.*\..*/, "Please use a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        birth: {
            type: Date,
        },
        posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    }
);

UserSchema.pre('remove', async (next) => {
    await this.model('Post').deleteMany({ author: this._id });
    await this.model('Comment').deleteMany({ author: this._id });
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;
