import { Box } from "@mui/material";
import Song from "./Song";

import YouTubeIcon from '@mui/icons-material/YouTube';
import DownloadIcon from '@mui/icons-material/Download';
import common from "@/app/Common.module.css";
import Link from "next/link";
import { api } from "@/api/api";
import NotificationService from "@/services/NotificationService";

export default function SearchResult({ search }: any) {
  if (search.type == "song") {
    return (<Song song={search.song} />);
  }

  const uploadFromYoutube = async () => {
    const id = search.youtubeResult.url.split("/")[search.youtubeResult.url.split("/").length - 1]

    NotificationService.addNotification(`Отправка запроса в API: [${id}]`, NotificationService.Types.INFO, 3000);
    const result = await api.uploadYoutube(id);
    NotificationService.addNotification(`[${result.status}] Получен ответ: ${result.body.message}`, NotificationService.Types.SUCCESS, 3000);
  }

  return (
    <Box display={"flex"} alignItems={"center"} bgcolor={"#2b2b2b"} justifyContent={"space-between"} borderRadius={3} padding={1} width={"100%"}>
      <Box display={"flex"} alignItems={"center"}>
        <Link className={common.clickable} href={search.youtubeResult.url}><YouTubeIcon fontSize={"large"} /></Link>
        <Box display={"flex"} alignItems={"center"}>
          <Box marginLeft={2}>
            <Box>
              {search.youtubeResult.title}
            </Box>
            <Box color="gray">
              {search.youtubeResult.author}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display={"flex"} alignItems={"center"} >
        {formatTime(search.youtubeResult.length)}
        <Box color="white" marginLeft={1}>
          <DownloadIcon className={common.clickable} fontSize={"large"} onClick={uploadFromYoutube} />
        </Box>
      </Box>
    </Box>
  );
}

function formatTime(time: number) {
  const seconds = (time % 60);
  return `${Math.floor(time / 60)}:${seconds < 10 ? "0"+seconds : seconds}`;
}