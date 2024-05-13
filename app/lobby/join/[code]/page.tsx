"use client"
import LobbyController from "@/services/LobbyController";
import { Box, Button, CircularProgress, Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Lobby({
  params,
}: {
  params: { code: string }
}) {
  const getProps = async () => {
    LobbyController.join(params.code);
  }

  useEffect(() => {
    getProps();
  });


  return (
    <Box sx={{ height: "100%" }} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Box textAlign={"center"}>
        <CircularProgress color="inherit" />
      </Box>
    </Box>
  );
}
