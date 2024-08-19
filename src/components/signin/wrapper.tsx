"use client";

import React from "react";
import { Row, Col } from "antd";
import { useCookies } from "react-cookie";
import FormComponent from "./form";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
const reCaptchaKey: string | undefined = process.env.RECAPTCHA_KEY;

const WrapperComponent: () => JSX.Element = () => {
  const [cookies, setCookie] = useCookies(["videoSearch"]);

  const handleVerify = () => {};

  React.useEffect(() => {}, [cookies]);

  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey!}>
        <div
          className={
            "h-screen flex justify-center items-center bg-[url('/background.png')] bg-cover bg-center"
          }
        >
          <FormComponent />
        </div>
        <GoogleReCaptcha onVerify={handleVerify} />
      </GoogleReCaptchaProvider>
      ,
    </>
  );
};

export default WrapperComponent;
