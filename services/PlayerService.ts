import LobbyService from "./LobbyService";
import NotificationService from "./NotificationService";
import SocketService from "./SocketService";

export default class PlayerService {

  static maxDiffToSync: number = 0.5;

  static isPlaying: boolean = false;
  static _setPlaying: any = null;

  static time: number = 0;
  static _setTime: any = null;

  static maxTime: number = 1;
  static _setMaxTime: any = null;

  static volume: number = 0.5;
  static _setVolume: any = null;

  static currentSongId: number = -1;
  static _setCurrentSongId: any = null;

  static repeatType: string = "";
  static _setRepeatType: any = null;

  static loaded: boolean = true;
  static muted: boolean = false;

  static audio: any = null;
  static songInPlayerId: number = -1;

  static lastTimeMove: number = -1;

  static init(setPlaying: any, setTime: any, setMaxTime: any, setVolume: any, setCurrentSongId: any, setRepeatType: any) {
    if (this._setPlaying) {
      return;
    }

    this._setPlaying = setPlaying;
    this._setTime = setTime;
    this._setMaxTime = setMaxTime;
    this._setVolume = setVolume;
    this._setCurrentSongId = setCurrentSongId;
    this._setRepeatType = setRepeatType;

    if (localStorage.getItem("volume")) {
      this.volume = Number(localStorage.getItem("volume"));
    }
  }

  static delete() {
    this._setPlaying = null;
    this._setTime = null;
    this._setMaxTime = null;
    this._setVolume = null;
    this._setCurrentSongId = null;
    this._setRepeatType = null;
  }

  static setPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying;
    this._setPlaying(isPlaying);

    let index = LobbyService.getCurrentSongIndex();

    if (index != -1) {
      LobbyService.songs[index].isPlaying = this.isPlaying;
    
      if (LobbyService.setSongs)
        LobbyService.setSongs([...LobbyService.songs]);
    }
  }

  static setTime(time: number, client: boolean = false) {
    if (client) {
      setTimeout(() => {
        if (this.lastTimeMove == currentTimeMove) {
          SocketService.sendMessage({
            command: "moveTime",
            value: Math.floor(time),
          });
        }
      }, 200)

      this.lastTimeMove = Date.now();
      let currentTimeMove = Date.now();

      
    } else if (Date.now() - this.lastTimeMove < 200) {
      return;
    }

    this.time = time;
    this._setTime(time);
  }

  static setMaxTime(time: number) {
    this.maxTime = time;
    this._setMaxTime(time);
  }

  static setVolume(volume: number) {
    this.volume = volume;
    localStorage.setItem("volume", ""+volume);
    this._setVolume(volume);

    if (this.audio) {
      this.audio.volume = this.volume;
    }

    SocketService.sendMessage({
      command: "userVolume",
      value: volume
    })
  }

  static mute() {
    this.muted = true;

    this._setVolume(0);
    SocketService.sendMessage({
      command: "userVolume",
      value: 0
    })

    if (this.audio) {
      this.audio.volume = 0;
    }
  }

  static unmute() {
    this.muted = false;
    this._setVolume(this.volume);

    SocketService.sendMessage({
      command: "userVolume",
      value: this.volume
    })
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  static setCurrentSongId(id: number) {
    this.currentSongId = id;
    this._setCurrentSongId(id);
  }

  static setRepeatType(type: string) {
    this._setRepeatType(type);
  }

  static loadAudio(id: number) {
    if (id == -1 || id == undefined) {
      return console.error(`wrong id`);
    }

    if (this.audio != null) {
      this.audio.pause();
    }

    this.loaded = false;
    this.songInPlayerId = id;

    this.audio = new Audio(`http://localhost:8080/api/song/file/${id}`);
    this.audio.volume = this.volume;

    if (this.muted) {
      this.audio.volume = 0;
    }

    this.audio.addEventListener('canplaythrough', () => {
      this.loaded = true;

      this.audio.volume = this.volume;

      if (this.muted) {
        this.audio.volume = 0;
      }

      if (this.isPlaying) {
        this.audio.play();
      }

    }, false);
  }

  static sync(serverTime: number) {
    if (!this.loaded) {
      return;
    }

    if (!this.audio) {
      return;
    }

    if (this.isPlaying && this.audio.paused) {
      this.audio.play();
    }

    if (!this.isPlaying && !this.audio.paused) {
      this.audio.pause();
    }

    if (this.muted && this.audio.volume > 0) {
      this.audio.volume = 0;
    }

    this.setTime(serverTime);
    if (Math.abs(this.audio.currentTime - serverTime / 1000) > this.maxDiffToSync) {
      this.audio.currentTime = serverTime / 1000;
    }
  }
}