"use client";

import React from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  ConfigProvider,
  theme,
  Row,
  Col,
  message,
  Spin,
} from "antd";
import type { FormProps } from "antd";
import { useCookies } from "react-cookie";
import { Span } from "next/dist/trace";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { create_user } from "@/app/signin/service";
import { useRouter } from "next/navigation";

type FieldType = {
  email: string;
  username: string;
  names: string;
  surnames: string;
  password: string;
  password_confirm: string;
};

const FormComponent: () => JSX.Element = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [token, setToken] = React.useState();
  const [spinning, setSpinning] = React.useState(false);
  const [refreshReCaptcha, setRefreshReCaptcha] = React.useState(false);
  const [cookies, setCookie] = useCookies(["userLogin"]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setSpinning(true);
    const payload = {
      ...values,
      toke: token,
    };

    const resCU: Promise<any> = create_user(payload);

    resCU.then((response) => {
      if (response.code === 200) {
        message.success(response.message);
        setCookie("userLogin", JSON.stringify(response.obj));

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

  const handleVerify = (token: any) => {
    setToken(token);
  };

  React.useEffect(() => {}, [cookies]);

  return (
    <>
      <div
        className={
          "aspect-[3/1] flex flex-col gap-16 items-center justify-center px-6 bg-gradient-to-br from-[#311452] to-[#47316e] rounded-2xl shadow-2xl shadow-black"
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
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item<FieldType>
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={"Nombres"}
                  name={"names"}
                  rules={[
                    {
                      required: true,
                      message: "Ingrese sus nombres porfavor!",
                    },
                  ]}
                >
                  <Input
                    allowClear={true}
                    rootClassName={
                      "!bg-white/[0.4] shadow-md shadow-black mb-2"
                    }
                    maxLength={50}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item<FieldType>
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={"Apellidos"}
                  name={"surnames"}
                  rules={[
                    {
                      required: true,
                      message: "Ingrese sus apellidos porfavor!",
                    },
                  ]}
                >
                  <Input
                    allowClear={true}
                    rootClassName={
                      "!bg-white/[0.4] shadow-md shadow-black mb-2"
                    }
                    maxLength={50}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item<FieldType>
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={"Usuario"}
                  name={"username"}
                  rules={[
                    {
                      required: true,
                      message: "Ingrese su usuario porfavor!",
                    },
                  ]}
                >
                  <Input
                    allowClear={true}
                    rootClassName={
                      "!bg-white/[0.4] shadow-md shadow-black mb-2"
                    }
                    maxLength={20}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
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
                    allowClear={true}
                    rootClassName={
                      "!bg-white/[0.4] shadow-md shadow-black mb-2"
                    }
                    maxLength={50}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item<FieldType>
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={"Contraseña"}
                  name={"password"}
                  rules={[
                    { required: true, message: "Ingrese su nombre porfavor!" },
                  ]}
                >
                  <Input.Password
                    allowClear={true}
                    rootClassName={
                      "!bg-white/[0.4] shadow-md shadow-black mb-2"
                    }
                    minLength={8}
                    maxLength={32}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<FieldType>
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={"Confirmar contraseña"}
                  name={"password_confirm"}
                  rules={[
                    {
                      required: true,
                      message: "Ingrese su contraseña porfavor!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Las contraseñas no coinciden!"),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    allowClear={true}
                    rootClassName={
                      "!bg-white/[0.4] shadow-md shadow-black mb-2"
                    }
                    minLength={8}
                    maxLength={32}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item className={"flex justify-center"}>
              <Button
                type="primary"
                htmlType="submit"
                rootClassName={"!bg-[#C48CDA]"}
              >
                Registrarse
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>

      <Spin spinning={spinning} fullscreen />
      <GoogleReCaptcha onVerify={handleVerify} />
    </>
  );
};

export default FormComponent;
