import express from "express";
import {
  getPostRoute,
  getLatestPosts,
  countLatestPosts,
  getTrendingPosts,
  countTrendingPosts,
  filterPostsByCategory,
  searchPosts,
  countSearchPosts,
  getPost,
  likePost,
  isLiked
} from "../controllers/post.controller.js";
import { isLoggedIn } from "../config/isLoggedIn.js";

const router = express.Router();

router.post("/create", isLoggedIn, getPostRoute);

router.post("/latest", getLatestPosts);

router.post("/latest/count", countLatestPosts);

router.post("/trending", getTrendingPosts);

router.post("/trending/count", countTrendingPosts);

router.post("/category", filterPostsByCategory);

router.post("/category/count", filterPostsByCategory);

router.post("/search", searchPosts);

router.post("/search/count", countSearchPosts);

router.post("/get", getPost)

router.post("/like", isLoggedIn, likePost)

router.post("/isLiked", isLoggedIn, isLiked)

export default router;
