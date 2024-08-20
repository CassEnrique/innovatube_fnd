"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Grid,
  Button,
  Dropdown,
  Flex,
  Space,
  Tag,
} from "antd";
import Link from "next/link";
import "@/styles/globalicon.css";
import type { MenuProps } from "antd";
import { useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";
import Avatar from "react-avatar";
import { useRouter } from "next/navigation";
import Loading from "@/app/innovatube/loading";

const { useBreakpoint } = Grid;
const { Header, Content, Footer, Sider } = Layout;

const menu_items: MenuProps["items"] = [
  {
    key: "Principal",
    label: <Link href="/innovatube/home">Principal</Link>,
    icon: <span className="!text-2xl material-symbols-outlined">home </span>,
  },
  {
    key: "Favoritos",
    label: <Link href="/innovatube/favorites">Favoritos</Link>,
    icon: <span className="!text-2xl material-symbols-outlined">favorite</span>,
  },
  // {
  //   key: 'Reportes',
  //   label: <Link href="/crm/reports">Reportes</Link>,
  //   icon: <span className="material-symbols-outlined">lab_profile</span>),
  // },
];

const itemToBreadcrumb = (arr: any) => {
  const initBreadcrum = [{ title: "Home" }];
  const arrBreadcrums = arr.map((item: any) => {
    return { title: item };
  });

  return [...initBreadcrum, ...arrBreadcrums];
};

const LayoutComponent = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const breakpoints = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [navBreadcrumbs, setNavBreadcrumbs] = useState([{ title: "Home" }]);
  const [defKey, setDefKey] = useState(["0"]);
  const [dataUser, setDataUSer] = useState<any>({});
  const [cookies, setCookie, removeCookie] = useCookies<any>(["userLogin"]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button
          block
          type={"text"}
          icon={<LogoutOutlined />}
          onClick={() => {
            removeCookie("jwtAuth");
            removeCookie("userLogin");
            router.push("/login", { scroll: false });
          }}
        >
          Cerrar sesión
        </Button>
      ),
    },
  ];

  useEffect(() => {
    setDataUSer(cookies.userLogin);
  }, [cookies]);

  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Suspense fallback={<Loading />}>
          <Sider
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            breakpoint={"lg"}
            collapsedWidth={breakpoints.lg ? "60" : "0"}
            onBreakpoint={(broken: boolean): void => {}}
          >
            <div>
              <Link
                href="/"
                className={
                  "flex items-center gap-4 m-2 rounded-lg cursor-pointer"
                }
              >
                <div className={"flex w-10"}>
                  <img src="../logo.png" alt="" />
                </div>
                {!collapsed ? (
                  <span className={"text-xl text-white font-bold"}>
                    InnovaTube
                  </span>
                ) : (
                  <></>
                )}
              </Link>
            </div>
            <Menu
              theme={"dark"}
              mode={"inline"}
              items={menu_items}
              selectedKeys={defKey}
              onClick={(e) => {
                const arr: any = e.keyPath.reverse();

                setDefKey(e.keyPath);
                setNavBreadcrumbs(itemToBreadcrumb(arr));
              }}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <nav className={"flex justify-between items-center"}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                {dataUser ? (
                  <Dropdown
                    menu={{ items }}
                    placement="bottom"
                    className={"mr-4"}
                  >
                    <Flex gap={12} className={"cursor-default"}>
                      <Avatar
                        name={`${dataUser.names} ${dataUser.surnames}`}
                        maxInitials={2}
                        size={"30px"}
                        textSizeRatio={2}
                        round={true}
                      />
                      <span className={"text-xl"}>
                        {`${dataUser.names} ${dataUser.surnames}`}
                      </span>
                    </Flex>
                  </Dropdown>
                ) : (
                  <Tag
                    icon={
                      <span className="material-symbols-outlined">
                        account_circle
                      </span>
                    }
                    color="blue"
                    onClick={() => router.push("/login", { scroll: false })}
                    className={
                      "flex items-center gap-2 py-1 px-2 cursor-pointer"
                    }
                  >
                    <span className={"text-lg font-bold"}>Login</span>
                  </Tag>
                )}
              </nav>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <div
                className={"mt-4"}
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              <p>
                InnovaTube ©{new Date().getFullYear()} Created by Edgar Enrique
                Cass Herrera
              </p>
              <p>Desarrollos personalizados</p>
            </Footer>
          </Layout>
        </Suspense>
      </Layout>
    </CookiesProvider>
  );
};

export default LayoutComponent;
