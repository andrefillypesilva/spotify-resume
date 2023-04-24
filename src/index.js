import './index.scss';
import { ApiSpotifyService } from './services/api-spotify.service.js';
import { FetchDataService } from './services/fetch-data.service.js';
import { LocalStorageService } from './services/local-storage.service.js';
import { RenderService } from './services/render.service.js';
import { SpotifyDataService } from './services/spotify-data.service.js';

class Index {
    constructor() {
        this.playerDetails = {
            artist: '',
            album: '',
            track: '',
            image: '',
            duration: 0,
        };
    }

    init() {
        if (SpotifyDataService.isSpotifyWidgetAllowed()) {
            this.initSpotifyAuth();
        } else {
            this.renderAllowSpotifyModal();
            document.querySelector('.spotify-resume__allow-spotify-modal-sure').onclick = () => {
                RenderService.allowSpotifyWidget('sure');
                this.initSpotifyAuth();
            }
            document.querySelector('.spotify-resume__allow-spotify-modal-no').onclick = () => {
                RenderService.allowSpotifyWidget('no');
                this.bootstrapApplication();
            }
        }
    }

    async bootstrapApplication() {
        await this.renderData();
        window.addEventListener('scroll', () => RenderService.stickyActionsBar());
        RenderService.likeListener();
        RenderService.tagMarketsListener();
        
        if (SpotifyDataService.isSpotifyWidgetAllowed()) {
            this.createSpotifyInstance();

            window.onbeforeunload = function()
            {
                LocalStorageService.removeItem('device_id');
            };
        }
    }

    initSpotifyAuth() {
        const params = new URLSearchParams(window.location.search);
        
        if (SpotifyDataService.hasValidToken()) {
            this.bootstrapApplication();
        } else if (params.get('auth')) {
            const tokenPromise = ApiSpotifyService.getToken(params.get('code'));
            
            tokenPromise.then(tokenObj => {
                SpotifyDataService.setTokenInLocalStorage(tokenObj);
                this.bootstrapApplication();
            });
        } else {
            ApiSpotifyService.auth();
        }
    }

    async renderData() {
        await this.renderGeneralDataSection();
        await this.renderPersonalDataSection();
        await this.renderPopularProjectsSection();
        await this.renderDiscographySection();
        await this.renderOntourSection();
        await this.renderAppearsonSection();
        await this.renderAboutSection();
        this.renderPlayingNowSection();
    }

    async renderGeneralDataSection() {
        const { general } = await FetchDataService.fetchGeneralData();

        const container = document.querySelector('.spotify-resume__header-container');

        RenderService.createGeneralDataElements(general, container);
    }

    async renderPersonalDataSection() {
        const { listItems, socialListItems } = await FetchDataService.fetchPersonalData();

        const list = document.querySelector('.spotify-resume__personal-data');
        const socialList = document.querySelector('.spotify-resume__personal-data--social');

        RenderService.createPersonalDataElements(listItems, list);
        RenderService.createPersonalDataElements(socialListItems, socialList);
    }

    async renderPopularProjectsSection() {
        const { popular } = await FetchDataService.fetchPopularProjects();

        const list = document.querySelector('.spotify-resume__popular-list');

        RenderService.createPopularProjectsElements(popular, list);
    }

    async renderDiscographySection() {
        const { discography, markets } = await FetchDataService.fetchDiscography();

        const list = document.querySelector('.spotify-resume__discography').querySelector('.spotify-resume__card-container');
        const marketsList = document.querySelector('.spotify-resume__discography-markets');

        RenderService.createCardsElements(discography, list);
        RenderService.createMarketsElements(markets, marketsList);
    }

    async renderOntourSection() {
        const { onTour } = await FetchDataService.fetchOnTour();

        const list = document.querySelector('.spotify-resume__on-tour-list');

        RenderService.createOnTourElements(onTour, list);
    }

    async renderAppearsonSection() {
        const { appearsOn } = await FetchDataService.fetchAppearsOn();

        const list = document.querySelector('.spotify-resume__appears-on').querySelector('.spotify-resume__card-container');

        RenderService.createCardsElements(appearsOn, list);
    }

    async renderAboutSection() {
        const { about } = await FetchDataService.fetchAboutData();

        const container = document.querySelector('.spotify-resume__about-container');

        RenderService.createAboutElements(about, container);
    }

    renderPlayingNowSection() {
        const container = document.querySelector('.playing-now');

        RenderService.createPlayingNowElements(container);
    }

    renderAllowSpotifyModal() {
        RenderService.createAllowSpotifyModalElements();
    }

    createSpotifyInstance() {
        const token = LocalStorageService.getItem('token');
        RenderService.createSpotifyScript();

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: process.env.SPOTIFY_PLAYER_NAME,
                getOAuthToken: cb => { cb(token); },
                volume: .8,
            });

            player.connect().then(() => RenderService.spotifyPlayerConnected(player, this.playerDetails));

            RenderService.initPlayerActions(token, player);
        };
    }
}

const index = new Index();
index.init();
