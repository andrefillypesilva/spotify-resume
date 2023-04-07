export class FetchDataService {
    static async fetchPersonalData() {
        const response = await fetch('./data/personal-data.json');
        const jsonData = await response.json();

        return jsonData;
    }
}
