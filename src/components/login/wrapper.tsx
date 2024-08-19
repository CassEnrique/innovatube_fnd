"use client";

import React from "react";
import { Row, Col } from "antd";
import { useCookies } from "react-cookie";
import FormComponent from "./form";

const WrapperComponent: () => JSX.Element = () => {
  const [cookies, setCookie] = useCookies(["videoSearch"]);

  React.useEffect(() => {}, [cookies]);

  return (
    <>
      <div
        className={
          "h-screen flex justify-center items-center bg-[url('/background.png')] bg-cover bg-center"
        }
      >
        <FormComponent />
      </div>
    </>
  );
};

export default WrapperComponent;
