"use client";

import React, { useState } from "react";
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
  Avatar,
  Flex,
  Space,
} from "antd";
import Link from "next/link";
import "@/styles/globalicon.css";
import type { MenuProps } from "antd";
import { CookiesProvider } from "react-cookie";

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

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link href="/">Cerrar sesión</Link>,
    icon: <LogoutOutlined />,
  },
];

const itemToBreadcrumb = (arr: any) => {
  const initBreadcrum = [{ title: "Home" }];
  const arrBreadcrums = arr.map((item: any) => {
    return { title: item };
  });

  return [...initBreadcrum, ...arrBreadcrums];
};

const LayoutComponent = ({ children }: React.PropsWithChildren) => {
  const breakpoints = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [navBreadcrumbs, setNavBreadcrumbs] = useState([{ title: "Home" }]);
  const [defKey, setDefKey] = useState(["0"]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <Layout style={{ minHeight: "100vh" }}>
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
                <span className={"text-xl font-bold"}>InnovaTube</span>
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
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
              <Dropdown menu={{ items }} placement="bottom" className={"mr-4"}>
                <Flex gap={12} className={"cursor-default"}>
                  <Avatar icon={<UserOutlined />} />
                  <span className={"text-xl"}>Usuario Nuevo</span>
                </Flex>
              </Dropdown>
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
            <p>
              Desarrollos personalizados
            </p>
          </Footer>
        </Layout>
      </Layout>
    </CookiesProvider>
  );
};

export default LayoutComponent;
