export class LocalStorageService {
    static setItem(key, value) {
        window.localStorage.setItem(key, value);
    }

    static getItem(key) {
        return window.localStorage.getItem(key);
    }

    static removeItem(key) {
        return window.localStorage.removeItem(key);
    }
}
