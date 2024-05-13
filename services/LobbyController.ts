import { api } from "@/api/api";
import NotificationService from "./NotificationService";

export default class LobbyController {
  static isCreating = false;
  static isJoining = false;

  static async create() {
    if (this.isCreating) {
      return;
    }

    this.isCreating = true;
    const data = await api.createLobby();

    if (data.status != 200) {
      NotificationService.addNotification("Не удалось создать лобби: " + data.body.message, NotificationService.Types.ERROR, 3000);

      setTimeout(() => {
        location.href = "/";
      }, 3000);
      return;
    }

    location.href = `/lobby/${data.body.message}`;
  }

  static async leave() {
    const data = await api.disconnectLobby();

    if (data.status != 200) {
      NotificationService.addNotification("Не удалось покинуть лобби: " + data.body.message, NotificationService.Types.ERROR, 3000);
      return;
    }

    location.href = "/";
  }

  static async join(code: string) {
    if (this.isJoining) {
      return;
    }

    this.isJoining = true;
    const data = await api.connectToLobby(code);

    if (data.status != 200) {
      NotificationService.addNotification("Не удалось подключиться к лобби: " + data.body.message, NotificationService.Types.ERROR, 3000);

      setTimeout(() => {
        location.href = "/";
      }, 3000);
      return;
    }

    location.href = `/lobby/${data.body.message}`;
  }
}