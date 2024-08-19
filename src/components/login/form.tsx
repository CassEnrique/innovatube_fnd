"use client";

import React from "react";
import { Button, Checkbox, Form, Input, ConfigProvider, theme } from "antd";
import type { FormProps } from "antd";
import { useCookies } from "react-cookie";
import { Span } from "next/dist/trace";

type FieldType = {
  email: string;
  username: string;
  password: string;
};

const FormComponent: () => JSX.Element = () => {
  const [form] = Form.useForm();
  const [cookies, setCookie] = useCookies(["userLogin"]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  React.useEffect(() => {}, [cookies]);

  return (
    <>
      <div
        className={
          "aspect-[4/8] flex flex-col gap-16 items-center justify-center px-6 bg-gradient-to-br from-[#311452] to-[#47316e] rounded-2xl shadow-2xl shadow-black"
        }
      >
        <div className={"flex flex-col items-center gap-4"}>
          <div className={"w-32 flex"}>
            <img src="/logo.png" alt="innovatube" />
          </div>
          <span className={"text-white font-bold text-4xl"}>InnovaTube</span>
        </div>

        <ConfigProvider
          theme={{
            token: {
              colorTextHeading: "#FFF",
              colorTextBase: "#331755",
            },
            components: {},
          }}
        >
          <Form
            form={form}
            name={"basic"}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete={"off"}
          >
            <Form.Item<FieldType>
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label={"E-mail"}
              name={"email"}
              rules={[
                {
                  type: "email",
                  message: "No es un correo valido!",
                },
                {
                  required: true,
                  message: "Ingrese su correo porfavor!",
                },
              ]}
            >
              <Input
                rootClassName={"!bg-white/[0.4] shadow-md shadow-black mb-2"}
              />
            </Form.Item>

            <Form.Item<FieldType>
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label={"Username"}
              name={"username"}
              rules={[
                { required: true, message: "Ingrese su nombre porfavor!" },
              ]}
            >
              <Input
                rootClassName={"!bg-white/[0.4] shadow-md shadow-black mb-2"}
              />
            </Form.Item>

            <Form.Item<FieldType>
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label={"Password"}
              name={"password"}
              rules={[
                { required: true, message: "Ingrese su contraseña porfavor!" },
              ]}
            >
              <Input.Password
                rootClassName={"!bg-white/[0.4] shadow-md shadow-black mb-2"}
              />
            </Form.Item>

            <Form.Item className={"flex justify-center"}>
              <Button
                type="primary"
                htmlType="submit"
                rootClassName={"!bg-[#C48CDA]"}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
};

export default FormComponent;
