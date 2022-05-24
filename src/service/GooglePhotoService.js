class GooglePhotosService {
  constructor(gapiClient) {
    this.gapiClient = gapiClient;
  }

  loadAlbums() {
    return this.gapiClient.photoslibrary.albums
      .list({})
      .then(function (fullResponse) {
        const albums = fullResponse.result.albums;
        return albums;
      });
  }

  loadAlbumDetail(id, token) {
    return this.gapiClient.photoslibrary.albums
      .get({ albumId: id })
      .then((response) => {
        return response.result;
      })
      .then((album) => {
        return this.gapiClient.photoslibrary.mediaItems
          .search({ albumId: id, pageToken: token })
          .then(function (response) {
            return {
              ...album,
              result: response.result,
            };
          });
      })
      .catch(function (e) {
        return undefined;
      });
  }

  loadPhotoDetail(id) {
    return this.gapiClient.photoslibrary.mediaItems
      .get({ mediaItemId: id })
      .then((response) => {
        return response.result;
      })
      .catch(function (e) {
        return undefined;
      });
  }

  insertImage() {
    return this.gapiClient.photoslibrary
  }
}

export default GooglePhotosService;
