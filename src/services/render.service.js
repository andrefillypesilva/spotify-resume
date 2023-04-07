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
}
