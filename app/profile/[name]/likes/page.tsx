"use client";
import Song from "@/app/components/Song";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import common from "@/app/Common.module.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/api/api";

export default function ProfileLikes({
  params,
}: {
  params: { name: string }
}) {
  const [result, setResult]: any[] = useState(false);

  const getProps = async () => {
    let data = await api.profileLikes(params.name);

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
      <Typography color={"white"} variant="h2">{params.name}</Typography>
      <Typography color={"gray"} variant="h6" gutterBottom>Понравившиеся</Typography>
      <Typography variant="h5" gutterBottom>
        <Link href={`/profile/${params.name}/`} className={common.clickable}>
          Профиль пользователя <ChevronRightIcon />
        </Link>
      </Typography>
      <List>
        {
          result.map((song: any) =>
          (
            <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }} key={song.id}>
              <Song song={song} />
            </ListItem>
          ))
        }
      </List>
    </Box>
  );
}
