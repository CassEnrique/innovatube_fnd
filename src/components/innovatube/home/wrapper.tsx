"use client";

import React from "react";
import ListComponent from "@/components/innovatube/home/list";
import SearchComponent from "@/components/innovatube/home/search";

const WrapperComponent: React.FC = () => {
  const [data, setData] = React.useState<any>([]);

  return (
    <>
      <SearchComponent data={data} setData={setData} />
      <ListComponent data={data} setData={setData} />
    </>
  );
};

export default WrapperComponent;
