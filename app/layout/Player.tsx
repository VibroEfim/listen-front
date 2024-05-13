import NotificationService from "@/services/NotificationService";
import { Alert, Box, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import common from "@/app/Common.module.css";

import LikeIcon from '@mui/icons-material/Favorite';
import NoLikeIcon from '@mui/icons-material/FavoriteBorder';

import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';

import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import SkipNextIcon from '@mui/icons-material/SkipNext';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayerService from "@/services/PlayerService";
import SocketService from "@/services/SocketService";

export default function Player() {
  const [isPlaying, setPlaying] = useState(PlayerService.isPlaying);
  const [time, setTime] = useState(PlayerService.time);
  const [maxTime, setMaxTime] = useState(PlayerService.maxTime);
  const [volume, setVolume] = useState(PlayerService.volume);
  const [currentSongId, setCurrentSongId] = useState(PlayerService.currentSongId);
  const [repeatType, setRepeatType] = useState(PlayerService.repeatType);

  useEffect(() => {
    PlayerService.init(setPlaying, setTime, setMaxTime, setVolume, setCurrentSongId, setRepeatType);

    if (currentSongId != -1 && PlayerService.songInPlayerId != currentSongId) {
      PlayerService.loadAudio(currentSongId);
    }

    return () => PlayerService.delete();
  })

  return (
    <Box sx={{pointerEvents: "none"}} position={"fixed"} width={"100%"} bottom={5} display={"flex"} marginBottom={2} justifyContent={"center"} zIndex={10}>
      <Box sx={{ pointerEvents: "auto" }} width={500} height={45} bgcolor={"#212121"} display={"flex"} flexDirection={"column"}>
        <Slider
          size="small"
          className={`${common.clickable}`}
          value={(time * 100) / maxTime}
          onChange={(_, value: any) => PlayerService.setTime(value * maxTime / 100, true)}
          min={0}
          step={0.1}
          max={100}
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            position: "relative",
            color: "#fff",
            width: "100%"
          }}
        />

        <Box display={"flex"} justifyContent={"space-between"} marginTop={0.5}>
          <Box marginLeft={0.5} width={60} className={common.clickable}>{parseTime(time)}</Box>
            <Box display={"flex"} alignItems={"center"}>
              <RepeatIcon className={common.clickable} fontSize={"medium"} />
              <SkipPreviousIcon className={common.clickable} fontSize={"medium"} onClick={() => SocketService.sendMessage({ command: "prev" })} />
              {
              isPlaying
                ? <PauseIcon className={common.clickable} fontSize={"large"} onClick={() => SocketService.sendMessage({ command: "play" })} />
                : <PlayArrowIcon className={common.clickable} fontSize={"large"} onClick={() => SocketService.sendMessage({ command: "play" })} />
              }
              <SkipNextIcon className={common.clickable} fontSize={"medium"} onClick={() => SocketService.sendMessage({ command: "next" })} />
              <Box className={`${common.volumeHandler}`}>
                <Slider 
                  className={`${common.volumeSlider} ${common.clickable}`} 
                  defaultValue={0.5} size="small" 
                  value={volume}
                  sx={{ color: "gray", display: "flex", position: "absolute", bottom: 35, height: 50 }} 
                  orientation="vertical" min={0} max={0.3} step={0.001} aria-label="Volume"
                  onChange={(_, value) => PlayerService.setVolume(Number(value))}
                  scale={(value) => value / 4}
                />
                {
                volume > 0
                  ? <VolumeUpIcon className={common.clickable} fontSize={"medium"} onClick={() => PlayerService.muted ? PlayerService.unmute() : PlayerService.mute()} />
                  : <VolumeOffIcon className={common.clickable} fontSize={"medium"} onClick={() => PlayerService.muted ? PlayerService.unmute() : PlayerService.mute()} />
                }
              </Box>
            </Box>
          <Box marginRight={0.5} width={60} textAlign={"right"} color={"gray"}>{parseTime(maxTime)}</Box>
        </Box>
      </Box>
    </Box>)
}

function parseTime(milliseconds: number) {
  let seconds: any = Math.floor((milliseconds / 1000) % 60);
  let minutes = Math.floor((milliseconds / 1000) / 60);

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`;
}