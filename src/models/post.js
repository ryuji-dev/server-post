import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: String,
        likes: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)
PostSchema.pre('findByIdAndDelete', async function (next) {
    const user = await this.model('User').findByIdAndUpdate(this.author, {
        $pull: { posts: this._id }
    })

    await this.model('Comment').deleteMany({ author: this._id })
    next();
})

const Post = mongoose.model('Post', PostSchema);

export default Post;