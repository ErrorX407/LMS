import { nanoid } from "nanoid";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const getPostRoute = (req, res) => {
  try {
    let authorId = req.user;

    if (!authorId) {
      return res.status(403).json({ Error: "User ID not found in request" });
    }

    let { title, category, banner, tags, content, draft, username } = req.body;

    if (!title) {
      return res
        .status(403)
        .json({ Error: "You must provide a title to publish a post." });
    }

    if (!draft) {
      if (!category) {
        return res
          .status(403)
          .json({ Error: "You must provide a category to publish a post." });
      }
      if (!banner) {
        return res
          .status(403)
          .json({ Error: "You must provide a post banner to publish it." });
      }
      if (!tags) {
        return res.status(403).json({
          Error: "You must provide at least one tag to publish a post.",
        });
      }
      if (!content.blocks.length) {
        return res
          .status(403)
          .json({ Error: "You must provide some content to publish a post." });
      }
    }

    tags = tags.map((tag) => tag.toLowerCase());

    // let post_id =
    //   title
    //     .replace(/[^a-zA-Z0-9]/g, " ")
    //     .replace(/\s+/g, "-")
    //     .trim() +
    //   "-" +
    //   nanoid(25);

    let post_id = `pub=${encodeURIComponent(username)}` + "_" + `category=${encodeURIComponent(category)}` + "_" + `pid=${nanoid(25)}`

    let post = new Post({
      title,
      content,
      tags,
      banner,
      category,
      author: authorId,
      post_id,
      draft: Boolean(draft),
    });

    post
      .save()
      .then((post) => {
        let incrementVal = draft ? 0 : 1;

        User.findOneAndUpdate(
          { _id: authorId },
          {
            $inc: { "account_info.total_posts": incrementVal },
            $push: { posts: post._id },
          }
        )
          .then((user) => {
            if (!user) {
              console.error("User not found");
              return res.status(404).json({ Error: "User not found" });
            }
            console.log("User updated successfully");
            res.status(200).json({ id: post.post_id });
          })
          .catch((err) => {
            console.error("Error updating user:", err);
            res
              .status(500)
              .json({ Error: "Failed to update total post number" });
          });
      })
      .catch((err) => {
        console.error("Error saving post:", err);
        res.status(500).json({ Error: err.message });
      });
  } catch (error) {
    console.error("Error in getPostRoute:", error);
    res.status(500).json({ Error: "Internal server error" });
  }
};

export const getLatestPosts = (req, res) => {
  let { page, maxLimit } = req.body;
  try {
    // let maxLimit = 6;

    Post.find({ draft: false })
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.fullName -_id"
      )
      .sort({ publishedAt: -1 })
      .select("post_id title category banner activity tags publishedAt -_id")
      .skip((page - 1) * maxLimit)
      .limit(maxLimit)
      .then((posts) => {
        return res.status(200).json({ posts });
      })
      .catch((err) => {
        console.error("Error fetching latest posts:", err);
        return res.status(500).json({ Error: err.message });
      });
  } catch (error) {
    console.error("Error in getLatestPosts:", error);
    res.status(500).json({ Error: "Internal server error" });
  }
};

export const countLatestPosts = (req, res) => {
  let { tags, query, author } = req.body;
  // category = category.toLowerCase();

  let findQuery;

  if (tags) {
    findQuery = { draft: false };
  } else if (query) {
    findQuery = { draft: false, title: new RegExp(query, "i") };
  } else if (author) {
    findQuery = { draft: false, author: author };
  }
  Post.countDocuments(findQuery)
    .then((count) => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ Error: err.message });
    });
};

export const getTrendingPosts = (req, res) => {
  let { page, maxLimit } = req.body;
  Post.find({ draft: false })
    .populate(
      "author",
      "personal_info.profile_img personal_info.username personal_info.fullName -_id"
    )
    .sort({
      "activity.total_reads": -1,
      "activity.total_likes": -1,
      // publishedAt: -1,
    })
    .select("post_id title category banner activity tags publishedAt -_id")
    .skip((page - 1) * maxLimit)
    .limit(maxLimit)
    .then((posts) => {
      return res.status(200).json({ posts });
    })
    .catch((err) => {
      return res.status(500).json({ Error: err.message });
    });
};

export const countTrendingPosts = (req, res) => {
  Post.countDocuments({ draft: false })
    .then((count) => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ Error: err.message });
    });
};

export const filterPostsByCategory = (req, res) => {
  let { category, page } = req.body;
  category = category.toLowerCase();

  try {
    let maxLimit = 10;

    Post.find({ category: { $regex: category, $options: "i" }, draft: false }) // Use regex for case-insensitive matching
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.fullName -_id"
      )
      .sort({ publishedAt: -1 })
      .select("post_id title category banner activity tags publishedAt -_id")
      .skip((page - 1) * maxLimit)
      .limit(maxLimit)
      .then((posts) => {
        if (posts.length === 0) {
          return res.status(500).json({
            Error: `No Post Found Having Category - ${category.toUpperCase()}`,
          });
        }
        return res.status(200).json({ posts });
      })
      .catch((err) => {
        console.error("Error filtering posts by tag:", err);
        return res.status(500).json({ Error: err.message });
      });
  } catch (error) {
    console.error("Error in filterPostsByTag:", error);
    res.status(500).json({ Error: "Internal server error" });
  }
};

export const countPostsByCategory = (req, res) => {
  let { category } = req.body;
  category = category.toLowerCase();
  let findQuery = {
    category: { $regex: category, $options: "i" },
    draft: false,
  };
  Post.countDocuments(findQuery)
    .then((count) => {
      if (count === 0) {
        // If no posts found, send appropriate message
        return res
          .status(404)
          .json({ message: "No posts found for the specified category." });
      }
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ Error: err.message });
    });
};

export const searchPosts = async (req, res) => {
  try {
    const { category, page, query, author } = req.body;

    let findQuery = { draft: false };

    if (category) {
      findQuery.category = { $regex: category, $options: "i" };
    } else if (query) {
      findQuery.title = new RegExp(query, "i");
    } else if (author) {
      findQuery.author = author;
    }

    const maxLimit = 20;
    const skip = (page - 1) * maxLimit;

    const posts = await Post.find(findQuery)
      .populate(
        "author",
        "personal_info.profile_img personal_info.username personal_info.fullName -_id"
      )
      .sort({ publishedAt: -1 })
      .select("post_id title category banner activity tags publishedAt -_id")
      .skip(skip)
      .limit(maxLimit);

    if (posts.length === 0) {
      return res.status(404).json({
        message: "🔍 Nothing found. Keep searching, you'll get there! 🕵️‍♂️🔎",
      });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    console.error("Error in searchPosts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const countSearchPosts = (req, res) => {
  let { category } = req.body;
  category = category.toLowerCase();
  let findQuery = {
    category: { $regex: category, $options: "i" },
    draft: false,
  };
  Post.countDocuments(findQuery)
    .then((count) => {
      return res.status(200).json({ totalDocs: count });
    })
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ Error: err.message });
    });
};

export const getPost = (req, res) => {
  let { post_id } = req.body;
  let incrementVal = 1;

  Post.findOneAndUpdate(
    { post_id },
    { $inc: { "activity.total_reads": incrementVal } }
  )
    .populate(
      "author",
      "personal_info.fullName personal_info.username personal_info.profile_img"
    )
    .select("title content activity tags banner category post_id publishedAt")
    .then((post) => {
      User.findOneAndUpdate(
        { "personal_info.username": post.author.personal_info.username },
        {
          $inc: { "account_info.total_reads": incrementVal },
        }
      ).catch((err) => {
        return res.status(500).json({ Error: err.message });
      });
      return res.status(200).json({ post });
    })
    .catch((err) => {
      return res.status(500).json({ Error: err.message });
    });
};

export const writtenPosts = (req, res) => {
  let user_id = req.user;

  let {page, draft, query, deletedDocCount} = req.body;

  let maxLimit = 5;
  let skipDocs = (page - 1) * maxLimit;

  if (deletedDocCount) {
    skipDocs -= deletedDocCount;
  }

  Post.find({author: user_id, draft, title: new RegExp(query, "i")})
  .skip(skipDocs)
  .limit(maxLimit)
  .sort({ publishedAt: -1 })
  .select(" title banner publishedAt post_id activity category draft -_id")
  .then(posts => {
    return res.status(200).json({ posts })
  })
  .catch((err) => {
    return res.status(500).json({ Error: err.message });
  });

};

export const writtenPostsCount = (req, res) => {
  let user_id = req.user;
  let {draft, query} = req.body;

  Post.countDocuments({author: user_id, draft, title: new RegExp(query, "i")})
  .then(count => {
     return res.status(200).json({ totalDocs: count })
   })
  .catch((err) => {
     return res.status(500).json({ Error: err.message });
   });
}

export const likePost = (req, res) => {
  let user_id = req.user;

  let { _id, isLikedByUser } = req.body;

  let incrementVal = !isLikedByUser ? 1 : -1;

  Post.findOneAndUpdate(
    { _id },
    { $inc: { "activity.total_likes": incrementVal } }
  ).then((post) => {
    if (!isLikedByUser) {
      let like = new Notification({
        type: "like",
        post: _id,
        notification_for: post.author,
        user: user_id,
      });

      like.save().then((notification) => {
        return res.status(200).json({ liked_by_user: true });
      });
      // .catch(err => {
      //    return res.status(500).json({Error: err.message})
      //  })
    } else {
      Notification.findOneAndDelete({ user: user_id, post: _id, type: "like" })
        .then((data) => {
          return res.status(200).json({ liked_by_user: false });
        })
        .catch((err) => {
          return res.status(500).json({ Error: err.message });
        });
    }
  });
};

export const isLiked = (req, res) => {
  let user_id = req.user;

  let { _id } = req.body;

  Notification.exists({ user: user_id, type: "like", post: _id })
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((err) => {
      return res.status(500).json({ Error: err.message });
    });
};
