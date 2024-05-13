import { Box, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import LikeIcon from '@mui/icons-material/Favorite';
import NoLikeIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import Link from "next/link";

import common from '@/app/Common.module.css';
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import PlayerService from "@/services/PlayerService";
import SocketService from "@/services/SocketService";
import NotificationService from "@/services/NotificationService";

export default function Song({song}: any) {
  const [liked, setLiked] = useState(song.likeId && song.likeId != -1);
  const [addedToQueue, setAddedToQueue] = useState(song.position != undefined);

  const like = async () => {
    let result = await api.like(song.id);

    if (result.status == 200) {
      setLiked(true);
    } else {
      NotificationService.addNotification(result.body.message, NotificationService.Types.ERROR, 3000);
    }
  }

  const unlike = async () => {
    let result = await api.unlike(song.id);

    if (result.status == 200) {
      setLiked(false);
    } else {
      NotificationService.addNotification(result.body.message, NotificationService.Types.ERROR, 3000);
    }
  }

  const addToQueue = async () => {
    let result = await api.queueAdd(song.id);

    if (result.status == 200) {
      setAddedToQueue(true);
    } else {
      NotificationService.addNotification(result.body.message, NotificationService.Types.ERROR, 3000);
    }
  }

  const removeFromQueue = async () => {
    let result = await api.queueRemove(song.id);

    if (result.status == 200) {
      setAddedToQueue(false);
    } else {
      NotificationService.addNotification(result.body.message, NotificationService.Types.ERROR, 3000);
    }
  }

  return (
    <Box display={"flex"} alignItems={"center"} bgcolor={"#2b2b2b"} justifyContent={"space-between"} borderRadius={3} padding={1} width={"100%"}>
      <Box display={"flex"} alignItems={"center"}>
        { song.position == 0 && song.isPlaying
          ? <PauseIcon className={common.clickable} fontSize={"large"} onClick={() => SocketService.sendMessage({ command: "play" })} />
          : <PlayArrowIcon className={common.clickable} fontSize={"large"} onClick={() => SocketService.sendMessage({ command: "setAndPlay", position: song.position })}/>
        }
        <Box marginLeft={2}>
          <Box>
            {song.name}
          </Box>
          <Box color="gray">
            <Link href={`/author/${song.author}/`} className={common.clickable}>{song.author}</Link>
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} >
        <Box color="gray" marginLeft={5}>
          {song.views}
        </Box>
        <Box color="white" marginLeft={4}>
          {
            (liked)
              ? <LikeIcon className={common.clickable} fontSize={"medium"} onClick={unlike} />
              : <NoLikeIcon className={common.clickable} fontSize={"medium"} onClick={like} />
          }
        </Box>
        <Box color="white" marginLeft={1}>
          {
            (addedToQueue)
              ? <CheckIcon onClick={removeFromQueue} className={common.clickable} fontSize={"large"} />
              : <AddIcon onClick={addToQueue} className={common.clickable} fontSize={"large"} />
          }
        </Box>
      </Box>
    </Box>
  );
}
