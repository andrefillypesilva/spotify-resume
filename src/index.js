import './index.scss';

import { FetchDataService } from './services/fetch-data.service.js';
import { RenderService } from './services/render.service.js';

class Index {
    constructor() {}

    init() {
        this.renderData();

        window.addEventListener('scroll', () => {
            this.scrollListener(window.scrollY);

            const ctaBar = document.querySelector('.spotify-resume__cta');
            const popularSection = document.querySelector('.spotify-resume__popular');
            const ctaTitle = document.querySelector('.spotify-resume__cta-title');

            ctaBar.classList.remove('fixed');
            popularSection.classList.remove('below-fixed');
            if (window.scrollY >= ctaBar.offsetTop + 16) {
                ctaBar.classList.add('fixed');
                popularSection.classList.add('below-fixed');
                ctaTitle.classList.remove('invisible');
            } else {
                ctaTitle.classList.add('invisible');
            }
        });
        
        this.likeListener();
        this.tagMarketsListener();
    }

    renderData() {
        this.renderGeneralDataSection();
        this.renderPersonalDataSection();
        this.renderPopularProjectsSection();
        this.renderDiscographySection();
        this.renderOntourSection();
        this.renderAppearsonSection();
        this.renderAboutSection();
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

    scrollListener(position) {
        let opacity = 1;
        opacity = 1000 - (position * 3.5);

        const size = 100 + (position / 100);
        opacity = opacity / 1000;

        if (opacity < 0) opacity = 0;
        
        document.querySelector('.spotify-resume__header').style = `--bg-opacity: ${opacity}; --bg-size: ${size}%`;
    }

    likeListener() {
        document.querySelector('.spotify-resume__popular-list').addEventListener('click', (event) => {
            if (event.target.classList.value.split(' ').includes('fa-heart--active')) {
                event.target.classList.remove('fa-heart--active');
            } else {
                event.target.classList.add('fa-heart--active');
            }
        });
    }

    tagMarketsListener() {
        document.querySelector('.spotify-resume__discography-markets').addEventListener('click', (event) => {
            const buttons = document.querySelectorAll('.spotify-resume__discography-markets-btn');
            const cards = document.querySelectorAll('.spotify-resume__card');

            if (event.target.dataset.group) {
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove('spotify-resume__discography-markets-btn--active');
                }
                
                event.target.classList.add('spotify-resume__discography-markets-btn--active');

                for (let i = 0; i < cards.length; i++) {
                    if (cards[i].dataset && cards[i].dataset.group) {
                        const groups = cards[i].dataset.group.split(',');

                        cards[i].classList.remove('show');
                        cards[i].classList.add('hide');

                        if (groups.includes(event.target.dataset.group)) {
                            cards[i].classList.remove('hide');
                            cards[i].classList.add('show');
                        }

                    }
                }
            }
        });
    }
}

const index = new Index();
index.init();
