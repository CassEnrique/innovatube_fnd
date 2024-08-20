"use client";

import React, { useState } from "react";
import { Card, List, message } from "antd";
import { get_videos, create_favorite } from "@/app/innovatube/service";
import { HeartOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import videos from "@/db/videos";
import { useCookies } from "react-cookie";
import ModalComponent from "../modal";
import { getCookies } from "@/utils/coockies";

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
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie] = useCookies<any>(["videoWatch"]);

  const getVideosList = () => {
    const resGV: Promise<any> = get_videos({
      type: "search",
      params: {
        part: "snippet",
        maxResults: 25,
        q: "",
      },
    });

    resGV.then((response) => {
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
    setCookie("videoWatch", JSON.stringify(item));
    router.push("/innovatube/watch", { scroll: false });
  };

  const validLogin = (item: any) => {
    if (!cookies.userLogin && !getCookies()[""]) {
      setShowModal(true);
      return;
    }

    createFavoritesRecord(item);
  };

  const addFavorites = (e: any, item: any) => {
    e.preventDefault();
    validLogin(item);
  };

  React.useEffect(() => {
    setData(videos.items);
  }, []);

  return (
    <>
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

      <ModalComponent showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default ListComponent;
