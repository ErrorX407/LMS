import React, { useState } from "react";
import Trending from "../components/Trending";
import Latest from "../components/Latest";

const Home = () => {
  return (
    <section className="md:px-8">
      <div className="mt-[50px] md:mt-0 lg:mt-0">
        <Trending />
        <Latest />
      </div>
    </section>
  );
};

export default Home;
