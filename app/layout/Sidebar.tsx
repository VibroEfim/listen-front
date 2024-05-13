import { Box, Divider, Typography } from "@mui/material";
import Link from "next/link";
import common from "../Common.module.css";
import PublishIcon from '@mui/icons-material/Publish';
import LogoutIcon from '@mui/icons-material/Logout';
import SyncIcon from '@mui/icons-material/Sync';
import SyncDisabledIcon from '@mui/icons-material/SyncDisabled';

export default function Sidebar(params: any) {
  const logout = async () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <Box height={"100vh"} justifyContent={"space-between"} display={"flex"} flexDirection={"column"}>
      <Box marginLeft={3} display={"flex"} flexDirection={"column"} marginTop={3}>
        <Typography variant="h4" color={"white"} gutterBottom marginBottom={5}>Listen Together</Typography>
        <Link href={"/search/"}><Typography className={common.clickable} color={"gray"} variant="h5" gutterBottom>Поиск</Typography></Link>
        {
          params.user &&
          <>
            <Link href={`/profile/${params.user.name}`}><Typography className={common.clickable} color={"gray"} variant="h5" gutterBottom>Моё</Typography></Link>
            { params.user.lobbyCode
              ? <Link href={`/lobby/${params.user.lobbyCode}`}><Typography className={common.clickable} color={"gray"} variant="h5" gutterBottom>К лобби</Typography></Link>
              : <Link href={`/lobby/generate`}><Typography className={common.clickable} color={"gray"} variant="h5" gutterBottom>Создать лобби</Typography></Link>
            }
            <Link href={"/upload"}><Typography className={common.clickable} color={"gray"} variant="h5" gutterBottom>Загрузить</Typography></Link>
          </>
        }
      </Box>
      {
        params.user
          ? <Box marginLeft={3} marginBottom={3} display={"flex"} alignItems={"center"}>
              <Typography variant="h6" color={"gray"} marginRight={1}>{params.user.name}</Typography>
              <SyncIcon sx={{color: "gray"}} />
              <LogoutIcon className={common.clickable} onClick={logout} />
            </Box>
          : <Link href={"/login"}>
              <Typography marginLeft={3} marginBottom={3} className={common.clickable} variant="h6" color={"gray"} gutterBottom>Войти</Typography>
            </Link>
      }
    </Box>
  );
}
