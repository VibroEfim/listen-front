import NotificationService from "./NotificationService";
import MessageHandlerService from "./MessageHandlerService";
import MessageParserService from "./MessageParserService";

export default class SocketService {
  static socket: WebSocket;
  static isHandshaking = false;

  static async handshake() {
    if (this.socket !== undefined) {
      return;
    }

    if (this.isHandshaking) {
      return;
    }
    this.isHandshaking = true;

    this.socket = new WebSocket("ws://localhost:8080/socket/?authtkn=" + localStorage.getItem("token"));

    this.socket.onopen = (ev) => {
      NotificationService.addNotification("Подключение с сервером установлено", NotificationService.Types.SUCCESS, 5000);
    }

    this.socket.onmessage = (ev) => {
      MessageHandlerService.handle(ev.data);
    }

    this.socket.onclose = (ev) => {
      NotificationService.addNotification("Подключение с сервером утеряно: " + ev.code, NotificationService.Types.ERROR, 5000);
    }
  }

  static async sendMessage(fields: any) {
    if (this.socket == null) {
      return;
    }

    this.socket.send(MessageParserService.stringify(fields));
  }
}