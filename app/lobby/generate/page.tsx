"use client"
import { api } from "@/api/api";
import LobbyController from "@/services/LobbyController";
import NotificationService from "@/services/NotificationService";
import { Box, Button, CircularProgress, Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Lobby() {
  const getProps = async () => {
    LobbyController.create();
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
