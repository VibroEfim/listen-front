export default class NotificationService {
  static Types = {
    SUCCESS: "success",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error"
  }

  static message: string = "";
  static setMessage: any = null;

  static type: string = this.Types.INFO;
  static setType: any = null;

  static show: boolean = false;
  static setShow: any = null;

  static init(messageState: any, typeState: any, showState: any) {
    if (this.setMessage) {
      return;
    }

    this.message = messageState[0];
    this.setMessage = messageState[1];

    this.type = typeState[0];
    this.setType = typeState[1];

    this.show = showState[0];
    this.setShow = showState[1];
  }

  static addNotification(message: string, type: string, time: number) {
    if (!this.setMessage) {
      console.log("Notification service is not init.");
      return;
    }

    this.setMessage(message);
    this.setType(type);
    this.setShow(true);

    setTimeout(() => {
      NotificationService.setShow(false);
    }, time)
  }
}