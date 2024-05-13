import LobbyService from "./LobbyService";
import PlayerService from "./PlayerService";
import MessageParserService from "./MessageParserService";
import NotificationService from "./NotificationService";

export default class MessageHandlerService {
  static handle(message: string) {
    let fields = MessageParserService.parse(message);

    if (!fields["command"]) {
      console.error(`no command field: `, fields);
      return;
    }

    if (this["command_" + fields["command"] as keyof MessageHandlerService]) {
      return (this["command_" + fields["command"] as keyof MessageHandlerService] as Function)(fields);
    }

    return console.error(`undefined command: `, fields);
  }

  static command_updateUser(fields: any) {
    const user = {
      name: fields.user,
      state: fields.state
    };

    LobbyService.syncUser(user);
  }

  static command_songQueueAdd(fields: any) {
    const song = {
      author: fields.author,
      id: Number(fields.id),
      likeId: Number(fields.likeId),
      name: fields.name,
      path: fields.path,
      position: Number(fields.position),
      views: Number(fields.views),
      maxTime: Number(fields.maxTime),
      isPlaying: false,
    }

    LobbyService.syncSong(song);
  }

  static command_playerStateUpdate(fields: any) {
    if (PlayerService.currentSongId != fields.currentSongId && fields.currentSongId != undefined) {
      PlayerService.setCurrentSongId(fields.currentSongId);
    }

    if (PlayerService.isPlaying != (fields.playing == "true")) {
      PlayerService.setPlaying(fields.playing == "true");
    }

    if (PlayerService.maxTime != fields.maxTime && fields.maxTime != undefined) {
      PlayerService.setMaxTime(fields.maxTime);
    }

    if (PlayerService.repeatType != fields.repeatType) {
      PlayerService.setRepeatType(fields.repeatType);
    }
   
    PlayerService.sync(Number(fields.time));
  }

  static command_songQueueOffset(fields: any) {
    LobbyService.offset(Number(fields.length));
  }

  static command_removeSongQueue(fields: any) {
    LobbyService.removeSong(Number(fields.id));
  }

  static command_notification(fields: any) {
    NotificationService.addNotification(fields.message, fields.messageType, 5000);
  }
}