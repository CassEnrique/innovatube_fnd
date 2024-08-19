"use client";

import React from "react";
import { Card, List, message } from "antd";
import {
  get_videos,
  get_catalog,
  delete_favorite,
} from "@/app/innovatube/service";
import Icon, { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import "@/styles/globalicon.css";

const { Meta } = Card;

interface videoItem {
  id: any;
  snippet: any;
}

const ListComponent: () => JSX.Element = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["videoWatch"]);
  const [data, setData] = React.useState<videoItem[]>();

  const getVideosList = () => {
    const resGC: Promise<any> = get_catalog({
      module: "favorite",
    });

    resGC.then((response) => {
      setData(response.obj.map((item: any) => item.item));
    });
  };

  const deleteFavorite = (id: string) => {
    const resDF: Promise<any> = delete_favorite(id);

    resDF.then((response) => {
      message.error(response.message);
      const newData = data?.filter(
        (item: any) => item.id.videoId !== id && item.id.playlistId !== id,
      );
      setData(newData);
    });
  };

  const watchVideo = (item: any) => {
    setCookie("videoWatch", JSON.stringify(item));
    router.push("/innovatube/watch", { scroll: false });
  };

  const addFavorites = (e: any, item: any) => {
    e.preventDefault();
    deleteFavorite(item.id.videoId ?? item.id.playlistId);
  };

  React.useEffect(() => {
    getVideosList();
  }, []);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 5,
      }}
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item>
          <Card
            className={"relative"}
            hoverable
            cover={
              <img
                alt={item.snippet.description}
                src={item.snippet.thumbnails.medium.url}
                onClick={() => watchVideo(item)}
              />
            }
          >
            <div className={"absolute top-2 right-2"}>
              <Icon
                className={
                  "text-xl text-cyan-200 text-rose-600 hover:text-sky-900"
                }
                component={() => (
                  <span className="material-symbols-outlined">
                    heart_broken
                  </span>
                )}
                onClick={(e) => addFavorites(e, item)}
              />
            </div>
            <div onClick={() => watchVideo(item)}>
              <Meta
                title={item.snippet.title}
                description={item.snippet.channelTitle}
              />
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ListComponent;
