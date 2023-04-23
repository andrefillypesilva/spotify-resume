import { LocalStorageService } from './local-storage.service.js';

export class ApiSpotifyService {
    static async auth() {
        const scope = 'streaming \
        user-read-email \
        user-read-private \
        user-read-playback-state';

        var auth_query_parameters = new URLSearchParams({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope,
            redirect_uri: `${window.location.origin}?auth=true`,
        });

        window.location.href = `${process.env.SPOTIFY_AUTH_URL}` + auth_query_parameters.toString();
    }

    static async getToken(code) {
        const redirectUri = `${window.location.origin}?auth=true`;

        const result = await fetch(process.env.SPOTIFY_TOKEN_URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`),
            },
            body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
        });

        return await result.json();
    }

    static async getActiveDevices(token) {
        const result = await fetch(process.env.SPOTIFY_DEVICES_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const { devices } = await result.json();
        const app = devices.find((device) => device.name === process.env.SPOTIFY_PLAYER_NAME);

        await ApiSpotifyService.playActiveDevice(token, app.id);
    }

    static async shuffleDevice() {
        const token = LocalStorageService.getItem('token');
        const deviceId = LocalStorageService.getItem('device_id');
        const state = !JSON.parse(LocalStorageService.getItem('shuffle_state'));

        const result = await fetch(`${process.env.SPOTIFY_SHUFFLE_URL}?device_id=${deviceId}&state=${state}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (result.status === 200 || result.status === 202) {
            LocalStorageService.setItem('shuffle_state', state);

            const shuffle = document.querySelector('.playing-now').querySelector('.fa-shuffle');
            if (state) {
                shuffle.classList.add('fa-shuffle--active');
            } else {
                shuffle.classList.remove('fa-shuffle--active');
            }
        }
    }

    static async repeatDevice() {
        const token = LocalStorageService.getItem('token');
        const deviceId = LocalStorageService.getItem('device_id');
        let state = LocalStorageService.getItem('repeat_state');

        if (state === null || state === '' || state === 'off') {
            state = 'track';
        } else {
            state = 'off';
        }

        const result = await fetch(`${process.env.SPOTIFY_REPEAT_URL}?device_id=${deviceId}&state=${state}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (result.status === 200 || result.status === 202) {
            LocalStorageService.setItem('repeat_state', state);

            const repeat = document.querySelector('.playing-now').querySelector('.fa-repeat');
            if (state === null || state === '' || state === 'off') {
                repeat.classList.remove('fa-repeat--active');
            } else {
                repeat.classList.add('fa-repeat--active');
            }
        }
    }

    static async playActiveDevice(token, device_id) {
        const body = {
            'context_uri': process.env.SPOTIFY_INITIAL_PLAYLIST,
            'offset': {
                'position': 1
            },
            'position_ms': 0
        };

        await fetch(`${process.env.SPOTIFY_PLAYER_URL}${device_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'text/plain;charset=UTF-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body),
        });

        LocalStorageService.setItem('device_id', device_id);
    }
}
