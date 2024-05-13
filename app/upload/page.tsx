"use client";
import { api } from "@/api/api";
import NotificationService from "@/services/NotificationService";
import { Box, Button, Divider, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import { useState } from "react";

const textFieldSx = {
  input: {
    color: "white",
  },
  "input:focus": {
    borderColor: "white"
  }
}

export default function Upload() {
  const [file, setFile] = useState(null);
  const [author, setAuthor] = useState("");
  const [name, setName] = useState("");

  const [isReadyToUpload, setReadyToUpload] = useState(false);

  const submitForm = async () => {
    let data = await api.upload(name, author, file);

    if (data.status == 200) {
      NotificationService.addNotification("Песня успешно добавлена", NotificationService.Types.SUCCESS, 3000);
    } else {
      NotificationService.addNotification("Что-то пошло не так", NotificationService.Types.ERROR, 3000);
    }

    setReadyToUpload(false);
    setFile(null);
    setName("");
    setAuthor("");
  }

  const validate = () => {
    if (author.length < 2) {
      setReadyToUpload(false);
      return;
    }

    if (name.length < 2) {
      setReadyToUpload(false);
      return;
    }

    if (file == null) {
      setReadyToUpload(false);
      return;
    }

    setReadyToUpload(true);
  }

  return (
    <Box margin={6}>
      <Box width={430}>
        <form onSubmit={submitForm}>
          <Typography color={"white"} variant="h4">Загрузка песни</Typography>
          <Box bgcolor={"#212121"} width={400}>
            <TextField
              hiddenLabel
              fullWidth
              placeholder="Имя автора"
              size="small"
              name="author"
              sx={textFieldSx}
              onChange={(e) => { setAuthor(e.target.value); validate() }}
            />
          </Box>

          <Box bgcolor={"#212121"} width={400} marginTop={1}>
            <TextField
              hiddenLabel
              fullWidth
              placeholder="Название песни"
              size="small"
              name="name"
              sx={textFieldSx}
              onChange={(e) => { setName(e.target.value); validate() }}
            />
          </Box>
          <Box width={400} marginTop={1}>
            <Button fullWidth disabled={file != null} component="label" variant="contained" style={{ backgroundColor: "#3b3b3b" }}>
              {file != null
                ? "Файл добавлен"
                : "Добавить файл"
              }
              <input hidden onChange={(e: any) => { setFile(e.target.files[0]); validate(); }} type="file" name="file" />
            </Button>
          </Box>
          <Box width={400} marginTop={2}>
            <Button onClick={submitForm} fullWidth disabled={!isReadyToUpload} component="label" variant="contained" style={{ backgroundColor: "#3b3b3b" }}>
              Загрузить
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
