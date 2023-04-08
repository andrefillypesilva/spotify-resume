export class RenderService {
    static createPersonalDataElements(personalData, list) {
        for (let i = 0; i < personalData.length; i++) {
            const liItem = document.createElement('li');
            const aItem = document.createElement('a');
            const iconItem = document.createElement('i');
            const spanItem = document.createElement('span');

            liItem.className = 'spotify-resume__personal-data-item';
            
            aItem.className = 'spotify-resume__personal-data-link';
            aItem.setAttribute('target', '_blank');
            aItem.setAttribute('href', personalData[i].link);

            iconItem.className = personalData[i].icon;

            spanItem.textContent = personalData[i].label;

            aItem.append(iconItem);
            aItem.append(spanItem);

            liItem.append(aItem);

            list.append(liItem);
        }
    }

    static createPopularProjectsElements(popularData, list) {
        for (let i = 0; i < popularData.length; i++) {
            const liItem = document.createElement('li');
            const divItem = document.createElement('div');
            const positionItem = document.createElement('span');
            const playItem = document.createElement('a');
            const iconItem = document.createElement('i');
            const imgItem = document.createElement('img');
            const aItem = document.createElement('a');
            const technologiesSpan = document.createElement('span');
            const likeItem = document.createElement('div');
            const likeIcon = document.createElement('i');
            const periodItem = document.createElement('span');

            liItem.className = 'spotify-resume__popular-list-item';

            divItem.className = 'spotify-resume__popular-list-icon-box';

            positionItem.className = 'spotify-resume__popular-list-position';
            positionItem.textContent = i + 1;

            playItem.className = 'spotify-resume__popular-list-play';
            playItem.setAttribute('href', '#');

            iconItem.className = 'fa-solid fa-play';

            imgItem.className = `spotify-resume__popular-list-logo ${i < 2 ? 'spotify-resume__popular-list-logo--padding' : ''}`;
            imgItem.setAttribute('alt', popularData[i].image.alt);
            imgItem.setAttribute('src', popularData[i].image.path);

            aItem.className = 'spotify-resume__popular-list-link heading-light';
            aItem.setAttribute('href', '#');
            aItem.textContent = popularData[i].label;

            technologiesSpan.className = 'spotify-resume__popular-list-info heading-light';
            technologiesSpan.textContent = popularData[i].technologies.join(', ');

            likeItem.className = 'spotify-resume__popular-list-like';
            likeIcon.className = 'fa-regular fa-heart';

            periodItem.className = 'spotify-resume__popular-list-info heading-light';
            periodItem.textContent = popularData[i].period;

            playItem.append(iconItem);
            divItem.append(positionItem);
            divItem.append(playItem);
            
            likeItem.append(likeIcon);

            liItem.append(divItem);
            liItem.append(imgItem);
            liItem.append(aItem);
            liItem.append(technologiesSpan);
            liItem.append(likeItem);
            liItem.append(periodItem);

            list.append(liItem);
        }
    }

    static createDiscography(discography, list) {
        for (let i = 0; i < discography.length; i++) {
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

            timeItem.setAttribute('datetime', discography[i].year);
            timeItem.textContent = discography[i].period;
            positionItem.className = 'spotify-resume__card-description-position';
            positionItem.textContent = discography[i].position;
            descriptionItem.className = 'spotify-resume__card-description heading-light';
            descriptionItem.append(timeItem);
            descriptionItem.append(positionItem);

            divItem.className = 'spotify-resume__card';
            divItem.setAttribute('data-group', discography[i].group.join(','));

            imgItem.className = 'spotify-resume__card-image';
            imgItem.setAttribute('src', discography[i].img.path);
            imgItem.setAttribute('alt', discography[i].img.alt);

            titleItem.className = 'spotify-resume__card-title';
            titleItem.textContent = discography[i].label;

            divItem.append(imgItem);
            divItem.append(playItem);
            divItem.append(titleItem);
            divItem.append(descriptionItem);

            list.append(divItem);
        }
    }

    static createMarkets(markets, list) {
        for (let i = 0; i < markets.length; i++) {
            const btnItem = document.createElement('button');

            btnItem.className = 'spotify-resume__discography-markets-btn heading-light';
            if (i === 0) btnItem.classList.add('spotify-resume__discography-markets-btn--active');
            btnItem.setAttribute('data-group', markets[i].group);
            btnItem.textContent = markets[i].label;

            list.append(btnItem);
        }
    }
}
