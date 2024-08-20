"use client";

import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  ConfigProvider,
  theme,
  Tag,
  Spin,
  message,
} from "antd";
import type { FormProps } from "antd";
import { useCookies } from "react-cookie";
import { Span } from "next/dist/trace";
import Link from "next/link";
import { login } from "@/app/login/service";
import { useRouter } from "next/navigation";
import { setCookies } from "@/utils/coockies";

type FieldType = {
  email: string;
  username: string;
  password: string;
};

const FormComponent: () => JSX.Element = () => {
  const router = useRouter();
  const [formLogin] = Form.useForm();
  const [spinning, setSpinning] = React.useState(false);
  const [cookies, setCookie] = useCookies<any>(["userLogin"]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setSpinning(true);
    const payload = {
      ...values,
      user: values.username ?? values.email,
    };

    const resL: Promise<any> = login(payload);

    resL.then((response) => {
      if (response.code === 200) {
        message.success(response.message);
        setCookie("userLogin", JSON.stringify(response.obj));
        //setCookie("jwtAuth", JSON.stringify(response.token));
        setCookies("jwtAuth", response.token);

        setInterval(() => {
          router.push("/innovatube/home", { scroll: false });
        }, 3000);
      }

      if (response.code !== 200) {
        message.info(response.message);
        setSpinning(false);
      }
    });
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
            form={formLogin}
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
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value || getFieldValue("username")) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Ingrese su correo porfavor!"),
                    );
                  },
                }),
              ]}
            >
              <Input
                rootClassName={"!bg-white/[0.4] shadow-md shadow-black"}
                allowClear
              />
            </Form.Item>

            <Form.Item<FieldType>
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              label={"Username"}
              name={"username"}
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value || getFieldValue("email")) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Ingrese su usuario porfavor!"),
                    );
                  },
                }),
              ]}
            >
              <Input
                rootClassName={"!bg-white/[0.4] shadow-md shadow-black"}
                allowClear
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
                rootClassName={"!bg-white/[0.4] shadow-md shadow-black"}
                allowClear
              />
            </Form.Item>

            <Form.Item className={"flex justify-center"}>
              <Link href="/signin">
                <span className={"text-white font-bold"}>
                  Si aún no estas con nosotros, &nbsp;
                </span>
                <Tag color="blue" className={"font-bold"}>
                  Registrate
                </Tag>
                <span className={"text-white font-bold"}>.!!</span>
              </Link>
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

      <Spin spinning={spinning} fullscreen />
    </>
  );
};

export default FormComponent;
