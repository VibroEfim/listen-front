"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Sidebar from "./layout/Sidebar";
import { Alert, Box, Button, Grid, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import Notification from "./layout/Notification";
import SocketService from "@/services/SocketService";
import Player from "./layout/Player";
import common from "./Common.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState(false);
  const [querySend, setQuerySend] = useState(false);
  const [isConnectedToLobby, setConnectedToLobby] = useState(false);

  const getProps = async () => {
    let data = await api.checkToken();
    setQuerySend(true);

    if (data.status == 200) {
      setUser(data.body);
      SocketService.handshake();

      if (data.body.lobbyCode) {
        setConnectedToLobby(true);
      }
      return;
    }
  }

  useEffect(() => {
    if (!querySend) {
      getProps();
    }
  }, [user, querySend]);

  return (
    <html lang="ru">
      <head>
        <title>Listen Together</title>
      </head>
      <body className={`${inter.className} ${common.body}`}>
        <Notification />
        {
          isConnectedToLobby && <Player />
        }
        <Grid container>
          <Grid item md={2} bgcolor={"#212121"}>
            <Sidebar user={user} />
          </Grid>
          <Grid item md={10} bgcolor={"#171717"}>
            {children}
          </Grid>
        </Grid>
      </body>
    </html>
  );
}

// https://mui.com/material-ui/react-snackbar/