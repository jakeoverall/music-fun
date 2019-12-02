//DESIGN PATTERN adapter
export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    //TODO
    return /*html*/ `
    <div>
      ${this.title}
      <button onclick="app.songsController.playSong('${this._id}')">Preview</button>
      <button onclick="app.songsController.addSong('${this._id}')">Add to playlist</button>
    </div>
  `;
  }

  get PreviewTemplate() {
    //TODO make this
    return /*html*/ ` 
        <div>
          <h4>${this.title}</h4>
          <audio src="${this.preview}" controls autoplay></audio>
        </div>
        `;
  }

  get PlaylistTemplate() {
    //TODO make this too
    return /*html*/`
        <div>
          ${this.title}
          <button onclick="app.songsController.playSong('${this._id}', true)">Preview</button>
          <button onclick="app.songsController.removeSong('${this._id}')">Add to playlist</button>
        </div>
        `;
  }
}
