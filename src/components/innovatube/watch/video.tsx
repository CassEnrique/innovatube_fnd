"use client";

import React from "react";
import { Card, Avatar, Flex, Button, message } from "antd";
import { get_videos, create_favorite } from "@/app/innovatube/service";
import { HeartOutlined } from "@ant-design/icons";
import YouTube, { YouTubeProps } from "react-youtube";
import { useCookies } from "react-cookie";

const { Meta } = Card;

interface videoItem {
  id: any;
  snippet: any;
}

const VideoComponent: () => JSX.Element = () => {
  const [videoItem, setVideoItem] = React.useState<videoItem>();
  const [cookies, setCookie] = useCookies(["videoWatch"]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      controls: 1,
      enablejsapi: 1,
      listType: "playlist",
      list: videoItem?.id.idplaylistId,
    },
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

  const addFavorites = () => {
    createFavoritesRecord(videoItem);
  };

  React.useEffect(() => {
    setVideoItem(cookies.videoWatch);
  }, [cookies]);

  return (
    <>
      <Card
        bordered={false}
        cover={
          <>
            <YouTube
              videoId={videoItem?.id.videoId ?? videoItem?.id.idplaylistId}
              opts={opts}
              onReady={onPlayerReady}
              iframeClassName="!rounded-2xl !w-full !aspect-video"
            />
          </>
        }
        actions={[
          <div className={"flex justify-center"} key="flex-content">
            <Button
              type="text"
              icon={<HeartOutlined key="favorites-action" />}
              key="btn-favorites-action"
              className={
                "p-2 rounded-lg text-xl hover:text-rose-600 bg-[#765fc2]/[0.1]"
              }
              onClick={() => addFavorites()}
            >
              Favorito
            </Button>
          </div>,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title={<span className={"text-3xl"}>{videoItem?.snippet.title}</span>}
          description={
            <div className={"flex flex-col"}>
              <span>{videoItem?.snippet.channelTitle}</span>
              <p>{videoItem?.snippet.description}</p>
            </div>
          }
        />
      </Card>
    </>
  );
};

export default VideoComponent;
