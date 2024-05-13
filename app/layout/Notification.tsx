import NotificationService from "@/services/NotificationService";
import { Alert, Box } from "@mui/material";
import { useEffect, useState } from "react";

import common from "@/app/Common.module.css";

export default function Notification() {
  const [message, setMessage] = useState("Подключение к серверу...");
  const [type, setType]: any[] = useState(NotificationService.Types.INFO);
  const [isShow, setShow] = useState(true);

  NotificationService.init([message, setMessage], [type, setType], [isShow, setShow]);

  useEffect(() => {
    
  }, [message, type, isShow])

  return (
    <Box sx={{ pointerEvents: "none" }} position={"absolute"} width={"100%"} top={5} marginBottom={2} className={`${common.notification} ${isShow ? common.enabled : ""}`} justifyContent={"center"} zIndex={1}>
    <Alert variant="filled" severity={type}>
      {message}
    </Alert>
  </Box>)
}