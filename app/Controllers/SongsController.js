import store from "../store.js";
import SongService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = "";
  store.State.songs.forEach(song => {
    template += song.Template;
  });
  document.getElementById("songs").innerHTML = template;
}

function _showLoading() {
  document.getElementById("songs").innerHTML = `<div>loading...</div>`;
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = "";
  store.State.playlist.forEach(song => {
    template += song.PlaylistTemplate;
  });
  document.getElementById("playlist").innerHTML = template;
}

//Public
export default class SongsController {
  constructor() {
    //TODO Don't forget to register your subscribers
    store.subscribe("songs", _drawResults);
    store.subscribe("playlist", _drawPlaylist);
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    _showLoading();
    try {
      SongService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * find and play a song by its id
   * @param {string} id
   */
  playSong(id, fromPlaylist) {
    let song;
    if (fromPlaylist) {
      song = store.State.playlist.find(s => s._id == id);
    } else {
      song = store.State.songs.find(s => s._id == id);
    }
    // TODO
    if (!song) {
    }
    document.getElementById("media-player").innerHTML = song.PreviewTemplate;
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    SongService.addSong(id);
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {}
}
