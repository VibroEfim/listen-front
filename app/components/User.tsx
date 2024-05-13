import { Box } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ErrorIcon from '@mui/icons-material/Error';
import Link from "next/link";
import common from "@/app/Common.module.css";

export default function User({ user }: any) {

  const state = () => {
    switch(user.state) {
      case 'LISTENING': return (<VolumeUpIcon />);
      case 'MUTED': return (<VolumeOffIcon />);
      case 'DISCONNECTED': return (<ExitToAppIcon />);
      default: return (<ErrorIcon />)
    }
  }

  return (
    <Box display={"flex"} alignItems={"center"} bgcolor={"#171717"} justifyContent={"space-between"} borderRadius={3} padding={1} width={"300px"}>
      <Link href={`/profile/${user.name}`}>{user.name}</Link>
      {state()}
    </Box>
  );
}
