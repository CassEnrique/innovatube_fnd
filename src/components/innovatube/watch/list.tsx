"use client";

import React from "react";
import { Card, List, message } from "antd";
import { get_videos, create_favorite } from "@/app/innovatube/service";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import videos from "@/db/videos";
import { useCookies } from "react-cookie";

const { Meta } = Card;

const ListComponent: ({
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
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["videoSearch"]);

  const getVideosList = () => {
    const resAUL: Promise<any> = get_videos({
      type: "search",
      params: {
        part: "snippet",
        maxResults: 15,
        q: cookies.videoSearch.search,
      },
    });

    resAUL.then((response) => {
      setData(response.items);
    });
  };

  const createFavoritesRecord = (item: any) => {
    const resCFR: Promise<any> = create_favorite({
      video_playlist_id: item.id.videoId ?? item.id.playlistId,
      item: item,
    });

    resCFR.then((response) => {
      if (response.code === 200) message.success(response.message);

      if (response.code !== 200) message.info(response.message);
    });
  };

  const watchVideo = (item: any) => {
    router.refresh();
  };

  const addFavorites = (e: any, item: any) => {
    e.preventDefault();
    createFavoritesRecord(item);
  };

  React.useEffect(() => {
    getVideosList();
  }, [cookies]);

  return (
    <List
      itemLayout="vertical"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
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
              <HeartOutlined
                className={"text-xl text-cyan-200 hover:text-rose-600"}
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
