import React from "react";
import Header from "../components/Header";
import { useData } from "../App";

const Home = () => {
  const { navbarRect } = useData();

  return <Header style={{ height: `calc(100vh - ${navbarRect.height}px)` }} />;
};

export default Home;
