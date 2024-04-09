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
        <PostAmbient banner="https://i.pinimg.com/236x/db/70/7e/db707edb4b623713d06334b7ccc829a3.jpg" />

      <div className="px-10">
        <h1 className="font-candela text-3xl">Solutions</h1>

      </div>
    </>
  );
};

export default Solutions;
