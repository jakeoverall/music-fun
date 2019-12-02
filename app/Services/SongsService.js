import Song from "../Models/Song.js";
import store from "../store.js";

// @ts-ignore
let _sandBox = axios.create({
  //TODO Change YOURNAME to your actual name
  baseURL: "//bcw-sandbox.herokuapp.com/api/JAKEOVERALL/songs",
  timeout: 8000
});

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
    this.getMySongs();
  }

  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(rawData => new Song(rawData));
        store.commit("songs", results);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  getMySongs() {
    _sandBox
      .get()
      .then(res => {
        let results = res.data.data.map(rawData => new Song(rawData));
        store.commit("playlist", results);
      })
      .catch(error => {
        throw new Error(error);
      });
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  addSong(id) {
    let song = store.State.songs.find(s => s._id == id);
    _sandBox
      .post("", song)
      .then(res => {
        //Immutable Way
        let newSong = new Song(res.data.data);
        let playlist = [...store.State.playlist, newSong];
        store.commit("playlist", playlist);
      })
      .catch(e => {
        throw e;
      });
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  removeSong(id) {
    _sandBox.delete(id).then(res => {
      let i = store.State.playlist.findIndex(s => s._id == id);
      store.State.playlist.splice(i, 1);
      store.commit("playlist", store.State.playlist);
    });
  }
}

const service = new SongsService();
export default service;
