"use client"
import { api } from "@/api/api";
import Song from "@/app/components/Song";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Author({
  params,
}: {
  params: { name: string }
}) {
  const [result, setResult]: any[] = useState(false);

  const getProps = async () => {
    let data = await api.author(params.name, true);

    if (data.status == 200) {
      setResult(data.body);
      return;
    }
  }

  useEffect(() => {
    if (!result)
      getProps();
  }, [result]);

  if (!result) {
    return (<></>)
  }

  return (
    <Box margin={6}>
      <Typography color={"white"} variant="h2">{result.name}</Typography>
      <Typography color={"gray"} variant="h6" gutterBottom>Автор</Typography>
      <List>
        {
          result.songs.map((song: any) =>
          (
            <ListItem sx={{paddingLeft: 0, paddingRight: 0}} key={song.id}>
              <Song song={song} />
            </ListItem>
          ))
        }
      </List>
    </Box>
  );
}
