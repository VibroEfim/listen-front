"use client"
import Song from "@/app/components/Song";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import common from "@/app/Common.module.css";
import { useEffect, useState } from "react";
import { api } from "@/api/api";
import { notFound } from "next/navigation";

export default function Profile({
  params,
}: {
  params: { name: string }
}) {
  const [result, setResult]: any[] = useState(false);

  const getProps = async () => {
    let data = await api.profile(params.name, true);

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
      <Typography color={"gray"} variant="h6" gutterBottom>Пользователь</Typography>

      <Grid container spacing={2}>
        {
          result.uploadedSongs.length > 0 &&
            <Grid item>
              <Typography variant="h5" gutterBottom>
                <Link href={`/profile/${result.name}/uploads`} className={common.clickable}>
                  Загрузки <ChevronRightIcon />
                </Link>
              </Typography>
              <List>
                {
                  result.uploadedSongs.map((song: any) =>
                  (
                    <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }} key={song.id}>
                      <Song song={song} />
                    </ListItem>
                  ))
                }
              </List>
            </Grid>
        }
        {
          result.likedSongs.length > 0 &&
          <Grid item>
            <Typography variant="h5" gutterBottom>
              <Link href={`/profile/${result.name}/likes`} className={common.clickable}>
                Мне нравится <ChevronRightIcon />
              </Link>
            </Typography>
            <List>
              {
                result.likedSongs.map((song: any) =>
                (
                  <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }} key={song.id}>
                    <Song song={song} />
                  </ListItem>
                ))
              }
            </List>
          </Grid>
        }
      </Grid>
    </Box>
  );
}
