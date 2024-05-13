"use client"
import { Box, Button, Grid, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import common from "@/app/Common.module.css";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import Song from "@/app/components/Song";
import User from "@/app/components/User";
import NotificationService from "@/services/NotificationService";
import LobbyService from "@/services/LobbyService";
import LobbyController from "@/services/LobbyController";

export default function Lobby({
  params,
}: {
  params: { code: string }
}) {
  const copyLink = () => {
    navigator.clipboard.writeText(location.origin + "/lobby/join/"+params.code).then(() => {
      NotificationService.addNotification("Ссылка скопирована в буфер обмена", NotificationService.Types.SUCCESS, 3000);
    })
  }

  const [songs, setSongs] = useState(LobbyService.songs);
  const [users, setUsers] = useState(LobbyService.users);
  useEffect(() => {
    LobbyService.init([songs, setSongs], [users, setUsers]);

    return () => LobbyService.delete();
  }, [])

  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid item md={10} bgcolor={"#171717"}>
        <Typography color={"white"} variant="h5" marginLeft={2} marginTop={2}>Очередь</Typography>
        <List>
        {
          songs.map((song: any) =>
          (
            <ListItem key={song.id}>
              <Song song={song} />
            </ListItem>
          ))
        }
        </List>
      </Grid>
      <Grid item md={2} bgcolor={"#212121"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
        <Box marginTop={1}>
          <List>
            {
              users.map((user: any) => 
              (
                <ListItem key={user.name} disablePadding sx={{padding: 0.5}}>
                  <User user={user} />
                </ListItem>
              ))
            }
          </List>
        </Box>
        <Box marginBottom={2} marginLeft={2} marginRight={2}>
          <Box marginBottom={1}>
            <Button onClick={copyLink} fullWidth component="label" variant="contained" style={{ backgroundColor: "#3b3b3b" }}>
              Приглашение
            </Button>
          </Box>
          <Box>
            <Button onClick={e => LobbyController.leave()} fullWidth component="label" variant="contained" style={{ backgroundColor: "#3b3b3b" }}>
              Покинуть лобби
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
