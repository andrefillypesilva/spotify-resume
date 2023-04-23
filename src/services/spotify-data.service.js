import { LocalStorageService } from './local-storage.service.js';

export class SpotifyDataService {
    static hasValidToken() {
        const expires_in = LocalStorageService.getItem('expires_in');
        let expiresDateTime = null;
        let token = LocalStorageService.getItem('token');

        if (expires_in) {
            expiresDateTime = new Date();
            expiresDateTime.setTime(expires_in);
        }

        return token &&
                expiresDateTime &&
                expiresDateTime >= new Date();
    }

    static setTokenInLocalStorage(tokenObj) {
        const currentDatetime = new Date();
        currentDatetime.setSeconds(currentDatetime.getSeconds() + tokenObj.expires_in);
        
        LocalStorageService.setItem('expires_in', currentDatetime.getTime());
        LocalStorageService.setItem('token', tokenObj.access_token);
    }

    static updateTrack(playerDetails, { album, artists, duration_ms, name }) {
        playerDetails.artist = artists[0].name;
        playerDetails.album = album.name;
        playerDetails.track = name;
        playerDetails.image = album.images.find(image => image.size === 'SMALL').url;
        playerDetails.duration = duration_ms;

        const albumImg = document.querySelector('.playing-now__track-box-image');
        albumImg.src = playerDetails.image;
        albumImg.alt = playerDetails.album;

        const track = document.querySelector('.playing-now__track-box-caption-title');
        track.textContent = playerDetails.track;

        const artist = document.querySelector('.playing-now__track-box-caption-description');
        artist.textContent = playerDetails.artist;
    }
}
