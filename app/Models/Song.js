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
    <div class="bg-white card song-card p-2 bg-light mb-2">
      <div class="preview-img">
        <img class="img-fluid card-img" onclick="app.songsController.playSong('${this._id}')" src="${this.albumArt}" alt="${this.album}"/>
      </div>  
        <button class="btn btn-primary add-button" onclick="app.songsController.addSong('${this._id}')">
          <i class="fa fa-fw fa-plus-square"></i>
        </button>
      
    </div>
  `;
  }

  get PreviewTemplate() {
    //TODO make this
    return /*html*/ ` 
        <div class="card p-2 bg-light mb-2">
          <img src="${this.albumArt}" alt="${this.album}"/>
          <h4>${this.title}</h4>
          <audio src="${this.preview}" controls autoplay></audio>
        </div>
        `;
  }

  get PlaylistTemplate() {
    //TODO make this too
    return /*html*/ `
        <div class="card p-2 bg-light mb-2">
          <img src="${this.albumArt}" alt="${this.album}"/>
          ${this.title}
          <button onclick="app.songsController.playSong('${this._id}', true)">Preview</button>
          <button onclick="app.songsController.removeSong('${this._id}')">Remove from playlist</button>
        </div>
        `;
  }
}
