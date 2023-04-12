import { HTMLElementFactory } from "../factories/HTMLElement.factory.js";

export class RenderService {
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
        const playItem = HTMLElementFactory.createElement('div', 'spotify-resume__play play-btn play-btn--lg', [], null, null, [iconPlayItem]);
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

        spanPositionItem.className = 'heading-bold';
        spanPositionItem.textContent = `#${about.position}`;

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

        container.append(positionItem);
        container.append(aboutInfoItem);
    }
}
