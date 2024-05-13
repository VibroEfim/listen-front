"use client";
import { api } from "@/api/api";
import NotificationService from "@/services/NotificationService";
import { Box, Button, Divider, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import common from "@/app/Common.module.css";

const textFieldSx = {
  input: {
    color: "white",
  },
  "input:focus": {
    borderColor: "white"
  }
}

export default function Upload() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async () => {
    let data = await api.login(name, password);

    if (data.status == 200) {
      NotificationService.addNotification("Авторизация успешна, вот-вот обновлю страницу!", NotificationService.Types.SUCCESS, 3000);

      setInterval(() => {
        localStorage.setItem("token", data.body.token);
        location.href = "/";
      }, 3000);
    } else {
      NotificationService.addNotification(data.body.message, NotificationService.Types.ERROR, 3000);
    }
  }

  return (
    <Box margin={6}>
      <Box width={430}>
        <Typography color={"white"} variant="h4">Авторизация</Typography>
        <Box bgcolor={"#212121"} width={400}>
          <TextField
            hiddenLabel
            fullWidth
            placeholder="Имя"
            size="small"
            sx={textFieldSx}
            onChange={(e) => { setName(e.target.value); }}
          />
        </Box>

        <Box bgcolor={"#212121"} width={400} marginTop={1}>
          <TextField
            hiddenLabel
            fullWidth
            placeholder="Пароль"
            size="small"
            type="password"
            sx={textFieldSx}
            onChange={(e) => { setPassword(e.target.value); }}
          />
        </Box>
        <Box width={400} marginTop={2}>
          <Button onClick={submitForm} fullWidth component="label" variant="contained" style={{ backgroundColor: "#3b3b3b" }}>
            Войти
          </Button>
        </Box>
        <Box width={400} textAlign={"center"} marginTop={1}>
          <Link className={common.clickable} href="/register">У меня ещё нет аккаунта :(</Link>
        </Box>
      </Box>
    </Box>
  );
}
