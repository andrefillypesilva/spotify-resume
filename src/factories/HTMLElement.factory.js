export class HTMLElementFactory {
    static createElement(type, className, attr, content, innerHTML, append, prepend) {
        const el = document.createElement(type);
        
        if (attr && attr.length > 0) {
            for (let i = 0; i < attr.length; i++) {
                el.setAttribute(attr[i].key, attr[i].value);
            }
        }
        
        if (className) el.className = className;
        if (content) el.textContent = content;
        if (innerHTML) el.innerHTML = innerHTML;

        if (append && append.length > 0) {
            for (let i = 0; i < append.length; i++) {
                el.append(append[i]);
            }
        }

        if (prepend && prepend.length > 0) {
            for (let i = 0; i < prepend.length; i++) {
                el.prepend(prepend[i]);
            }
        }

        return el;
    }
}
