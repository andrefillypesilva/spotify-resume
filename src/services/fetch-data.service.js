export class FetchDataService {
    static async fetchData(name) {
        const response = await fetch(`./data/${name}.json`);
        const jsonData = await response.json();

        return jsonData;
    }

    static async fetchPersonalData() {
        return await FetchDataService.fetchData('personal-data');
    }

    static async fetchPopularProjects() {
        return await FetchDataService.fetchData('popular');
    }

    static async fetchDiscography() {
        return await FetchDataService.fetchData('discography');
    }

    static async fetchAppearsOn() {
        return await FetchDataService.fetchData('appears-on');
    }

    static async fetchOnTour() {
        return await FetchDataService.fetchData('on-tour');
    }

    static async fetchAboutData() {
        return await FetchDataService.fetchData('about');
    }
}
