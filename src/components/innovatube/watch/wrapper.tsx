"use client";

import { Row, Col } from "antd";
import React from "react";
import VideoComponent from "./video";
import ListComponent from "./list";
import { useCookies } from "react-cookie";

const WrapperComponent: () => JSX.Element = () => {
  const [cookies, setCookie] = useCookies(["videoSearch"]);
  const [data, setData] = React.useState<any>([]);

  const validateUserLogin = () => {};

  React.useEffect(() => {
    validateUserLogin();
  }, [cookies]);

  return (
    <>
      <div className={"grid grid-cols-4 gap-4"}>
        <div className={"col-span-4 lg:col-span-3"}>
          <VideoComponent />
        </div>
        <div className={"aspect-[3/7] col-span-4 lg:col-span-1 overflow-auto"}>
          <ListComponent data={data} setData={setData} />
        </div>
      </div>
    </>
  );
};

export default WrapperComponent;
