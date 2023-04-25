import { HTMLElementFactory } from '../factories/HTMLElement.factory.js';
import { ApiSpotifyService } from './api-spotify.service.js';
import { LocalStorageService } from './local-storage.service.js';
import { SpotifyDataService } from './spotify-data.service.js';

export class RenderService {
    static setSectionTitles() {
        document.querySelector('.spotify-resume__popular-title').textContent = 'Popular';
        document.querySelector('.spotify-resume__discography-title').textContent = 'Discography';
        document.querySelector('.spotify-resume__on-tour-title').textContent = 'On tour';
        document.querySelector('.spotify-resume__appears-on-title').textContent = 'Appears On';
        document.querySelector('.spotify-resume__about-title').textContent = 'About';
    }

    static createGeneralDataElements(general, container) {
        const iconItem = HTMLElementFactory.createElement('i', 'fa-solid fa-certificate');
        const spanPositionItem = HTMLElementFactory.createElement('span', null, [], general.position);
        const positionItem = HTMLElementFactory.createElement('h4', 'spotify-resume__header-badge heading-light', [], null, null, [iconItem, spanPositionItem]);
        const nameItem = HTMLElementFactory.createElement('h1', 'spotify-resume__header-title heading-title', [], general.name);
        const achievementItem = HTMLElementFactory.createElement('h4', 'spotify-resume__header-description heading-light', [], general.achievement);
        const sectionHeaderItem = HTMLElementFactory.createElement('section', 'spotify-resume__header', [
            { key: 'style', value: '--bg-opacity: 1; --bg-size: 100%' }
        ], null, null, [positionItem, nameItem, achievementItem]);

        const iconPlayItem = HTMLElementFactory.createElement('i', 'fa-solid fa-play');
        const playItem = HTMLElementFactory.createElement('div', 'spotify-resume__play play-btn play-btn--lg play-btn--disabled', [], null, null, [iconPlayItem]);
        const linkItem = HTMLElementFactory.createElement('a', 'spotify-resume__follow', [
            { key: 'target', value: '_blank' },
            { key: 'href', value: general.followLink }
        ], 'Follow');
        const supportNameItem = HTMLElementFactory.createElement('h3', 'spotify-resume__cta-title invisible', [], general.name);
        const ctaItem = HTMLElementFactory.createElement('div', 'spotify-resume__cta', [], null, null, [playItem, linkItem, supportNameItem]);

        container.prepend(ctaItem);
        container.prepend(sectionHeaderItem);
    }

    static createPersonalDataElements(personalData, list) {
        for (let i = 0; i < personalData.length; i++) {
            const personalDataItem = personalData[i];

            const iconItem = HTMLElementFactory.createElement('i', personalDataItem.icon);
            const spanItem = HTMLElementFactory.createElement('span', null, [], personalDataItem.label);
            const aItem = HTMLElementFactory.createElement('a', 'spotify-resume__personal-data-link', [
                { key: 'target', value: '_blank' },
                { key: 'href', value: personalDataItem.link }
            ], null, null, [iconItem, spanItem]);
            const liItem = HTMLElementFactory.createElement('li', 'spotify-resume__personal-data-item', [], null, null, [aItem]);

            list.append(liItem);
        }
    }

    static createPopularProjectsElements(popularData, list) {
        for (let i = 0; i < popularData.length; i++) {
            const popularDataItem = popularData[i];

            const positionItem = HTMLElementFactory.createElement('span', 'spotify-resume__popular-list-position', [], i + 1);
            const iconItem = HTMLElementFactory.createElement('i', 'fa-solid fa-play');
            const playItem = HTMLElementFactory.createElement('a', 'spotify-resume__popular-list-play', [
                { key: 'href', value: '#' }
            ], null, null, [iconItem]);
            const divItem = HTMLElementFactory.createElement('div', 'spotify-resume__popular-list-icon-box', [], null, null, [positionItem, playItem]);
            const imgItem = HTMLElementFactory.createElement(
                'img',
                `spotify-resume__popular-list-logo ${i < 2 ? 'spotify-resume__popular-list-logo--padding' : ''}`,
                [
                    { key: 'alt', value: popularDataItem.image.alt },
                    { key: 'src', value: popularDataItem.image.path }
                ]
            );
            const aItem = HTMLElementFactory.createElement('a', 'spotify-resume__popular-list-link heading-light', [
                { key: 'href', value: '#' }
            ], popularDataItem.label);
            const technologiesSpan = HTMLElementFactory.createElement('span', 'spotify-resume__popular-list-info heading-light', [], popularDataItem.technologies.join(', '));
            const likeIcon = HTMLElementFactory.createElement('i', 'fa-regular fa-heart');
            const likeItem = HTMLElementFactory.createElement('div', 'spotify-resume__popular-list-like', [], null, null, [likeIcon]);
            const periodItem = HTMLElementFactory.createElement('span', 'spotify-resume__popular-list-info heading-light', [], popularDataItem.period);
            const liItem = HTMLElementFactory.createElement('li', 'spotify-resume__popular-list-item', [], null, null, [divItem, imgItem, aItem, technologiesSpan, likeItem, periodItem]);

            list.append(liItem);
        }
    }

    static createCardsElements(cards, list) {
        for (let i = 0; i < cards.length; i++) {
            const cardsItem = cards[i];

            const divItem = document.createElement('div');
            const imgItem = document.createElement('img');
            const playItem = document.createElement('div');
            const iconItem = document.createElement('i');
            const titleItem = document.createElement('h3');
            const descriptionItem = document.createElement('p');
            const timeItem = document.createElement('time');
            const positionItem = document.createElement('span');

            iconItem.className = 'fa-solid fa-play';
            playItem.className = 'spotify-resume__card-icon play-btn';
            playItem.append(iconItem);

            timeItem.setAttribute('datetime', cardsItem.year);
            timeItem.textContent = cardsItem.period;
            positionItem.className = 'spotify-resume__card-description-position';
            positionItem.textContent = cardsItem.position;
            descriptionItem.className = 'spotify-resume__card-description heading-light';
            descriptionItem.append(timeItem);
            descriptionItem.append(positionItem);

            divItem.className = 'spotify-resume__card';
            if (cardsItem.group) divItem.setAttribute('data-group', cardsItem.group.join(','));

            imgItem.className = 'spotify-resume__card-image';
            if (cardsItem.label === 'Smart Consulting') imgItem.classList.add('spotify-resume__card-image--padding');
            imgItem.setAttribute('src', cardsItem.img.path);
            imgItem.setAttribute('alt', cardsItem.img.alt);

            titleItem.className = 'spotify-resume__card-title';
            titleItem.textContent = cardsItem.label;

            divItem.append(imgItem);
            divItem.append(playItem);
            divItem.append(titleItem);
            divItem.append(descriptionItem);

            list.append(divItem);
        }
    }

    static createMarketsElements(markets, list) {
        for (let i = 0; i < markets.length; i++) {
            const marketsItem = markets[i];

            const btnItem = document.createElement('button');

            btnItem.className = 'spotify-resume__discography-markets-btn heading-light';
            if (i === 0) btnItem.classList.add('spotify-resume__discography-markets-btn--active');
            btnItem.setAttribute('data-group', marketsItem.group);
            btnItem.textContent = marketsItem.label;

            list.append(btnItem);
        }
    }

    static createOnTourElements(onTour, list) {
        for (let i = 0; i < onTour.length; i++) {
            const onTourItem = onTour[i];

            const liItem = document.createElement('li');
            const dateItem = document.createElement('div');
            const dateSpanItem = document.createElement('span');
            const timeItem = document.createElement('time');
            const infoItem = document.createElement('div');
            const titleItem = document.createElement('h4');
            const descriptionItem = document.createElement('p');

            dateSpanItem.textContent = onTourItem.month;
            timeItem.setAttribute('datetime', onTourItem.year);
            timeItem.textContent = onTourItem.year;

            dateItem.className = 'spotify-resume__on-tour-item-date';
            dateItem.append(dateSpanItem);
            dateItem.append(timeItem);

            titleItem.textContent = onTourItem.title;
            descriptionItem.className = 'heading-light';
            descriptionItem.textContent = onTourItem.description;

            infoItem.className = 'spotify-resume__on-tour-item-description';
            infoItem.append(titleItem);
            infoItem.append(descriptionItem);

            liItem.className = 'spotify-resume__on-tour-item';
            liItem.append(dateItem);
            liItem.append(infoItem);

            list.append(liItem);
        }
    }

    static createAboutElements(about, container) {
        const positionItem = document.createElement('div');
        const spanPositionItem = document.createElement('span');
        const aboutInfoItem = document.createElement('div');
        const aboutInfoAchievementItem = document.createElement('div');
        const aboutDescriptionItem = document.createElement('div');

        const badgeIconItem = HTMLElementFactory.createElement('i', 'fa-solid fa-certificate');
        const badgeSpanPositionItem = HTMLElementFactory.createElement('span', null, [], about.position);
        const badgePositionItem = HTMLElementFactory.createElement('h4', 'spotify-resume__about-badge heading-normal', [], null, null, [badgeIconItem, badgeSpanPositionItem]);

        spanPositionItem.className = 'heading-bold';
        spanPositionItem.textContent = `#${about.positionInTheWorld}`;

        positionItem.className = 'spotify-resume__about-position heading-light';
        positionItem.append(spanPositionItem);
        positionItem.append(' in the world');

        aboutInfoAchievementItem.className = 'spotify-resume__about-title';
        aboutInfoAchievementItem.textContent = about.achievement;

        aboutDescriptionItem.className = 'spotify-resume__about-description heading-light';
        aboutDescriptionItem.innerHTML = about.description;

        aboutInfoItem.className = 'spotify-resume__about-info';
        aboutInfoItem.append(aboutInfoAchievementItem);
        aboutInfoItem.append(aboutDescriptionItem);

        container.append(badgePositionItem);
        container.append(positionItem);
        container.append(aboutInfoItem);
    }

    static createPlayingNowElements(container) {
        const figureTitle = HTMLElementFactory.createElement('figure', 'playing-now__track-box-caption-title heading-light');
        const figureDescription = HTMLElementFactory.createElement('figure', 'playing-now__track-box-caption-description heading-light');
        const figureCaption = HTMLElementFactory.createElement('figure', 'playing-now__track-box-caption', [], null, null, [figureTitle, figureDescription]);
        const figureImg = HTMLElementFactory.createElement('img', 'playing-now__track-box-image');
        const figure = HTMLElementFactory.createElement('figure', 'playing-now__track-box', [], null, null, [figureImg, figureCaption]);

        const controlShuffleIcon = HTMLElementFactory.createElement('i', 'fa-solid fa-shuffle');
        const controlBackwardIcon = HTMLElementFactory.createElement('i', 'fa-solid fa-backward-step');
        const controlPlayIcon = HTMLElementFactory.createElement('i', 'fa-solid fa-play');
        const controlPlayBtn = HTMLElementFactory.createElement('div', 'play-btn play-btn--white', [], null, null, [controlPlayIcon]);
        const controlForwardIcon = HTMLElementFactory.createElement('i', 'fa-solid fa-forward-step');
        const controlRepeatIcon = HTMLElementFactory.createElement('i', 'fa-solid fa-repeat');
        const controlActions = HTMLElementFactory.createElement('div', 'playing-now__player-control-actions', [], null, null, [controlShuffleIcon, controlBackwardIcon, controlPlayBtn, controlForwardIcon, controlRepeatIcon]);

        const controlProgressBarActive = HTMLElementFactory.createElement('div', 'playing-now__player-control-progress-bar--active');
        const controlProgressBarFull = HTMLElementFactory.createElement('div', 'playing-now__player-control-progress-bar--full', [], null, null, [controlProgressBarActive]);
        const controlProgressBarContainer = HTMLElementFactory.createElement('div', 'playing-now__player-control-progress-bar-container', [], null, null, [controlProgressBarFull]);
        const controlProgressBar = HTMLElementFactory.createElement('div', 'playing-now__player-control-progress-bar', [], null, null, [controlProgressBarContainer]);
        
        const control = HTMLElementFactory.createElement('div', 'playing-now__player-control', [], null, null, [controlActions, controlProgressBar]);

        const detailsIcon = HTMLElementFactory.createElement('i', 'fa-solid fa-headphones');
        const detailsDescription = HTMLElementFactory.createElement('p', 'heading-light', [], 'This playlist helps André Silva to be a better Web Engineer');
        const details = HTMLElementFactory.createElement('div', 'playing-now__player-details', [], null, null, [detailsIcon, detailsDescription]);
     
        container.append(figure);
        container.append(control);
        container.append(details);
    }

    static createAllowSpotifyModalElements() {
        const noBtn = HTMLElementFactory.createElement('button', 'spotify-resume__allow-spotify-modal-no heading-light', [], 'No');
        const sureBtn = HTMLElementFactory.createElement('button', 'spotify-resume__allow-spotify-modal-sure heading-light', [], 'Sure!');
        const actions = HTMLElementFactory.createElement('div', 'spotify-resume__allow-spotify-modal-actions', [], null, null, [sureBtn, noBtn]);
        const title = HTMLElementFactory.createElement('h2', 'heading-title', [], 'Allow Spotify on this page to have a better experience?');
        const modal = HTMLElementFactory.createElement('section', 'spotify-resume__allow-spotify-modal', [], null, null, [title, actions]);

        document.body.append(modal);
    }

    static scrollListener(position) {
        let opacity = 1;
        opacity = 1000 - (position * 3.5);

        const size = 100 - (position / 50);
        opacity = opacity / 1000;

        if (opacity < 0) opacity = 0;
        
        document.querySelector('.spotify-resume__header').style = `--bg-opacity: ${opacity}; --bg-size: ${size}%`;
    }

    static likeListener() {
        document.querySelector('.spotify-resume__popular-list').addEventListener('click', (event) => {
            if (event.target.classList.value.split(' ').includes('fa-heart--active')) {
                event.target.classList.remove('fa-heart--active');
            } else {
                event.target.classList.add('fa-heart--active');
            }
        });
    }

    static tagMarketsListener() {
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

    static stickyActionsBar() {
        RenderService.scrollListener(window.scrollY);

        const ctaBar = document.querySelector('.spotify-resume__cta');
        const popularSection = document.querySelector('.spotify-resume__popular');
        const ctaTitle = document.querySelector('.spotify-resume__cta-title');

        ctaBar.classList.remove('fixed');
        popularSection.classList.remove('below-fixed');
        console.log('window.scrollY: ', window.scrollY);
        console.log('ctaBar.offsetTop: ', ctaBar.offsetTop);

        const dynamicTerm = window.innerWidth > 600 ? 16 : 0;

        if (window.scrollY >= ctaBar.offsetTop + dynamicTerm) {
            ctaBar.classList.add('fixed');
            popularSection.classList.add('below-fixed');
            ctaTitle.classList.remove('invisible');
        } else {
            ctaTitle.classList.add('invisible');
        }
    }

    static updateTrackProgressBar({ duration }, position) {
        const progressBarValue = (position * 100) / duration;
        const progressBar = document.querySelector('.playing-now__player-control-progress-bar--active');
        progressBar.style.width = `${progressBarValue}%`;
    }

    static spotifyPlayerConnected(player, playerDetails) {
        document.querySelector('.spotify-resume__play').classList.remove('play-btn--disabled');

        player.addListener('player_state_changed', ({
            track_window: { current_track }
        }) => SpotifyDataService.updateTrack(playerDetails, current_track));

        player.addListener('progress', ({ position }) => RenderService.updateTrackProgressBar(playerDetails, position));
    }

    static initPlayerActions(token, player) {
        document.querySelector('.spotify-resume__play').onclick = async () => this.togglePlay(token, player);
        document.querySelector('.playing-now').querySelector('.play-btn').onclick = async () => RenderService.togglePlay(token, player);
        document.querySelector('.playing-now').querySelector('.fa-backward-step').onclick = async () => {
            player.previousTrack();
        };
        document.querySelector('.playing-now').querySelector('.fa-forward-step').onclick = async () => {
            player.nextTrack();
        };
        document.querySelector('.playing-now').querySelector('.fa-shuffle').onclick = async () => ApiSpotifyService.shuffleDevice();
        document.querySelector('.playing-now').querySelector('.fa-repeat').onclick = async () => ApiSpotifyService.repeatDevice();
    }

    static async togglePlay(token, player) {
        if (!LocalStorageService.getItem('device_id')) {
            document.querySelector('.spotify-resume__main').classList.add('spotify-resume__main--playing-now');
            await ApiSpotifyService.getActiveDevices(token);
        }
        
        player.togglePlay();

        const playBtn = document.querySelector('.spotify-resume__play').querySelector('.fa-play');
        const pauseBtn = document.querySelector('.spotify-resume__play').querySelector('.fa-pause');

        if (playBtn) {
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
        } else {
            pauseBtn.classList.remove('fa-pause');
            pauseBtn.classList.add('fa-play');
        }

        const playingNow = document.querySelector('.playing-now');
        const playingNowPlayBtn = document.querySelector('.playing-now').querySelector('.fa-play');
        const playingNowPauseBtn = document.querySelector('.playing-now').querySelector('.fa-pause');

        playingNow.style.display = 'flex';

        if (playingNowPlayBtn) {
            playingNowPlayBtn.classList.remove('fa-play');
            playingNowPlayBtn.classList.add('fa-pause');
        } else {
            playingNowPauseBtn.classList.remove('fa-pause');
            playingNowPauseBtn.classList.add('fa-play');
        }
    }

    static createSpotifyScript() {
        const script = document.createElement('script');
        script.src = process.env.SPOTIFY_SDK;
        script.async = true;

        document.body.append(script);
    }

    static allowSpotifyWidget(action) {
        LocalStorageService.setItem('is_spotify_widget_allowed', action === 'sure');
        document.querySelector('.spotify-resume__allow-spotify-modal').style.display = 'none';
    }
}
