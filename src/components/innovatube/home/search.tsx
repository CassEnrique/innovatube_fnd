"use client";

import React from "react";
import { Space, Input, Divider } from "antd";
import { get_videos } from "@/app/innovatube/service";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { GetProps } from "antd";
import { useCookies } from "react-cookie";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const SearchComponent: ({
  data,
  setData,
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}) => JSX.Element = ({
  data,
  setData,
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [cookies, setCookie] = useCookies(["videoSearch"]);

  const getVideosList = (search: string) => {
    const resAUL: Promise<any> = get_videos({
      type: "search",
      params: {
        part: "snippet",
        maxResults: 25,
        q: search,
      },
    });

    resAUL.then((response) => {
      setData(response.items);
    });
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setCookie("videoSearch", JSON.stringify({search: value}));
    getVideosList(value);
  };

  React.useEffect(() => {}, []);

  return (
    <>
      <div className={"absolute top-4 left-1/2 z-50"}>
        <Space.Compact>
          <Search
            placeholder={"Buscar"}
            allowClear
            enterButton
            onSearch={onSearch}
          />
        </Space.Compact>
      </div>
    </>
  );
};

export default SearchComponent;
