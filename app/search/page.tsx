"use client"

import Song from "@/app/components/Song";
import { Box, CircularProgress, Divider, Grid, List, ListItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import SearchResult from "../components/SearchResult";
import NotificationService from "@/services/NotificationService";

export default function Search() {
  let [prompt, setPrompt] = useState("");
  let [lastPrompt, setLastPrompt] = useState("");
  let [promptTime, setPromptTime] = useState(Date.now());
  let [result, setResult] = useState([]);
  let [isSearching, setSearching] = useState(false);

  useEffect(() => {
    const id = setInterval(async () => {
      if (prompt == "") {
        setResult([]);
      }
      if (prompt != lastPrompt && prompt != "" && Date.now() - promptTime > 500) {
        setLastPrompt(prompt);
        
        setSearching(true);
        let data = await api.search(prompt);
        setSearching(false);

        if (data.status != 200) {
          NotificationService.addNotification(data.body.message, NotificationService.Types.ERROR, 3000);
          return;
        }

        setResult(data.body);
      }
    }, 300)
    return () => clearInterval(id);
  }, [prompt, lastPrompt, promptTime, result]);

  return (
    <Box margin = {6} height={"100%"}>
      <Box bgcolor={"#212121"}>
        <TextField
          hiddenLabel
          fullWidth
          placeholder="Имя автора или песни"
          size="medium"
          sx={{
            input: {
              color: "white",
            },
            "input:focus": {
              borderColor: "white"
            }
          }}
          onChange={(e) => { setPrompt(e.target.value); setPromptTime(Date.now()); }}
        />
      </Box>
      {
        isSearching
          ? <Box display={"flex"} alignItems={"center"} justifyContent={"center"} textAlign={"center"}>
              <CircularProgress color="inherit" />
            </Box>
          : <List>
            {
              result.map((body: any, index: number) =>
              (
                <ListItem key={index}>
                  <SearchResult search={body} />
                </ListItem>
              ))
            }
          </List>
      }
    </Box>
  );
}