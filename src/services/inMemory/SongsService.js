const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._songs = [];
  }

  addSong({
    title, year, performer, genre, duration,
  }) {
    const randNum = nanoid(16);
    const id = `song-${randNum}`;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newSong = {
      id, title, year, performer, genre, duration, insertedAt, updatedAt,
    };

    this._songs.push(newSong);

    const pushedSong = this._songs.filter((song) => song.id === id);
    const isSuccess = pushedSong.length > 0;

    if (isSuccess) {
      return id;
    }

    throw new InvariantError('Catatan gagal ditambahkan');
  }

  getSongs() {
    return this._songs;
  }

  getSongById(id) {
    const song = this._songs.filter((s) => s.id === id)[0];

    if (song) {
      return song;
    }

    throw new NotFoundError('Catatan tidak ditemukan');
  }

  editSongById(id, {
    title, year, performer, genre, duration,
  }) {
    const index = this._songs.findIndex((song) => song.id === id);

    // -1 in index is not found
    if (index !== -1) {
      const updatedAt = new Date().toISOString();

      this._songs[index] = {
        ...this._songs[index],
        title,
        year,
        performer,
        genre,
        duration,
        updatedAt,
      };
    }

    throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._songs.splice(index, 1);
  }
}

module.exports = SongsService;
