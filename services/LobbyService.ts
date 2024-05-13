import PlayerService from "./PlayerService";

export default class LobbyService {
  static songs: any = [];
  static setSongs: any = null;

  static users: any = [];
  static setUsers: any = null;

  static init(songsState: any, usersState: any) {
    if (this.setSongs || this.setUsers) {
      return;
    }

    this.setSongs = songsState[1];
    this.setSongs([...this.songs]);

    this.setUsers = usersState[1];
    this.setUsers([...this.users]);
  }

  static delete() {
    this.setSongs = null;
    this.setUsers = null;
  }

  static syncSong(song: any) {
    let index = this.songs.map((songCandidate: any) => songCandidate.id).indexOf(song.id);

    if (index == -1) {
      this.songs.push(song); 
    } else {
      this.songs[index] = song;
    }

    if (this.setSongs)
      this.setSongs(() => [...this.songs]);
  }

  static removeSong(songId: number) {
    let index = this.songs.map((songCandidate: any) => songCandidate.id).indexOf(songId);

    if (index != -1) {
      let position = this.songs[index].position;
      this.songs.splice(index, 1);

      this.songs.forEach((song: any, songIndex: number) => {
        if (position < 0) {
          if (songIndex < index) {
            song.position += 1;
          }
        } else {
          if (songIndex >= index) {
            song.position -= 1;
          }
        }
      })
    }

    if (this.setSongs)
      this.setSongs(() => [...this.songs]);
  }

  static syncUser(user: any) {
    let index = this.users.map((userCandidate: any) => userCandidate.name).indexOf(user.name);

    if (index == -1) {
      this.users.push(user);
    } else {
      this.users[index] = user;
    }

    if (this.setUsers != null) {
      this.setUsers(() => [...this.users]);
    }
  }

  static offset(length: number) {
    this.songs.forEach((song: any) => {
      // previous
      if (song.position == 0) {
        song.isPlaying = false;
      }

      song.position += length;

      if (song.position == 0) {
        song.isPlaying = PlayerService.isPlaying;
      }
    })

    if (this.setSongs)
      this.setSongs([...this.songs]);
  }

  static getCurrentSongIndex() {
    return this.songs.map((song: any) => song.position).indexOf(0);
  }
}