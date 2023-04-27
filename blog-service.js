const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//config mongoose models
const PostSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    postDate: Date,
    featureImage: String,
    published: Boolean,
    category: String
})

const CategorySchema = new Schema({
    category: {
        type: String,
        required: true
    }
})

let Post = mongoose.model('Post', PostSchema);
let Category = mongoose.model('Category', CategorySchema);


module.exports.getAllPosts = () => {
    return new Promise((resolve, reject) => {
        Post.find().sort({ postDate: -1 })
            .then(data => {
                resolve(data)
            }).catch(err => {
                reject("no results returned")
            })
    })
}

module.exports.getPublishedPosts = () => {
    return new Promise((resolve, reject) => {
        Post.find({ published: true }).sort({ postDate: -1 })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject("no results returned")
            })
    })
}

module.exports.getPublishedPostsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        Post.find({ category: category, published: true }).sort({ postDate: -1 })
            .then(data => {
                resolve(data)
            }).catch(err => {
                reject("no results returned")
            })
    })

}

module.exports.getCategories = () => {
    return new Promise((resolve, reject) => {
        Category.find().sort({ category: 1 })
            .then(data => {
                resolve(data)
            }).catch(err => {
                reject("no results returned")
            })
    })
}

module.exports.getPostsByCategory = (category) => {
    return new Promise((resolve, reject) => {
        Post.find({ category: category }).sort({ postDate: -1 })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject("no results returned")
            })
    })
}

module.exports.getPostsByMinDate = (minDate) => {
    return new Promise((resolve, reject) => {
        Post.find({ postDate: { $gte: new Date(minDate) } }).sort({ postDate: -1 })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject("no results returned")
            })
    })
}

module.exports.getPostsById = (postID) => {
    return new Promise((resolve, reject) => {
        Post.find({ _id: postID })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject("no results returned")
            })
    })
}

module.exports.addPost = (newPost) => {
    return new Promise((resolve, reject) => {
        newPost.postDate = new Date()
        for (const key in newPost) {
            if (newPost.key === "") {
                newPost.key = null
            }
        }

        let post = new Post({
            body: newPost.body,
            title: newPost.title,
            postDate: newPost.postDate,
            featureImage: newPost.featureImage,
            published: newPost.published === "on" ? true : false,
            category: newPost.category,
        })

        post.save()
            .then(() => {
                console.log("Operation success")
                resolve("new post is created")
            }).catch(err => {
                console.log(`Operation failed: ${err}`)
                reject("unable to create new post")
            })
    })
}

//add a new category
module.exports.addCategory = (newCategory) => {
    return new Promise((resolve, reject) => {
        for (const key in newCategory) {
            if (newCategory.key === "") {
                newCategory.key = null
            }
        }

        let category = new Category({
            category: newCategory.category
        })

        category.save()
            .then(() => {
                console.log("Operation success")
                resolve("new category is created")
            }).catch(err => {
                console.log(`Operation failed: ${err}`)
                reject("unable to create new category")
            })
    })
}

//delete Category & Post
module.exports.deleteCategoryById = (idNum) => {
    return new Promise((resolve, reject) => {
        Category.deleteOne({ _id: idNum })
            .then(() => {
                console.log("Operation success")
                resolve("the category is deleted")
            })
            .catch(err => {
                console.log(`Operation failed: ${err}`)
                reject("unable to delete the category")
            })
    })
}

module.exports.deletePostById = (idNum) => {
    return new Promise((resolve, reject) => {
        Post.deleteOne({ _id: idNum })
            .then(() => {
                console.log("Operation success")
                resolve("the post is deleted")
            }).catch(err => {
                console.log(`Operation failed: ${err}`)
                reject("unable to delete the post")
            })
    })
}