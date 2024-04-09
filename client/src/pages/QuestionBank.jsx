import React, { useEffect, useState } from "react";
import { motion, stagger } from "framer-motion";
import axios from "axios";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Ambient from "../components/Ambient";
import { FilterPaginationData } from "../common/FilterPaginationData";
import NoDataMessage from "../components/NoDataMessage";
import LoadMoreButton from "../components/LoadMoreButton";
import PostAmbient from "../components/PostAmbient";

const Solutions = () => {

  return (
    <>
        <PostAmbient banner="https://i.pinimg.com/236x/55/72/2f/55722f58e29ce8299db6cc525c346bf5.jpg" />

      <div className="px-10">
        <h1 className="font-candela text-3xl">Question Bank</h1>

      </div>
    </>
  );
};

export default Solutions;
