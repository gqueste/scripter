import { setEndOfContenteditable } from './utils/helpers.js';
import {
    addCharacter,
    addComment,
    addDialog,
    addSound,
    addSubtitle,
    addTitle,
    createCharacterElement,
    createCommentElement,
    createDialogElement,
    createSoundElement,
    createSubtitleElement,
    createTitleElement
} from './components/Elements.js';

const handleEnterKeyPress = event => {
    const srcElement = event.srcElement;
    let srcClass = srcElement.className;
    if (srcClass === '') {
        srcClass = srcElement.parentNode.className;
    }
    switch (srcClass) {
        case 'character':
            console.log('Enter on character');
            if (srcElement.innerText === '') {
                const previousElement = srcElement.previousElementSibling;
                srcElement.remove();
                addSound(previousElement);
            } else {
                addDialog(srcElement);
            }
            break;
        case 'dialog':
            console.log('Enter on dialog');
            if (srcElement.innerText === '') {
                const previousElement = srcElement.previousElementSibling;
                srcElement.remove();
                addComment(previousElement);
            } else {
                addCharacter(srcElement);
            }
            break;
        case 'sound':
            console.log('Enter on sound');    
            if (srcElement.innerText === '') {
                const previousElement = srcElement.parentNode.previousElementSibling;
                srcElement.parentNode.remove();
                addComment(previousElement);
            } else {
                addCharacter(srcElement.parentNode);
            }
            break;
        case 'comment':
            console.log('Enter on comment');
            if (srcElement.innerText === '') {
                const previousElement = srcElement.parentNode.previousElementSibling;
                srcElement.parentNode.remove();
                addSubtitle(previousElement);
            } else {
                addCharacter(srcElement.parentNode);
            }
            break;
        case 'subtitle':
            console.log('Enter on subtitle');
            if (srcElement.innerText === '') {
                const previousElement = srcElement.previousElementSibling;
                srcElement.remove();
                addTitle(previousElement);
            } else {
                addCharacter(srcElement);
            }
            break;
        case 'title':
            console.log('Enter on title');
            if (srcElement.innerText === '') {
                const previousElement = srcElement.previousElementSibling;
                console.log(previousElement);
                srcElement.remove();
                addCharacter(previousElement);
            } else {
                addSubtitle(srcElement);
            }
            break;
        default:
            console.log('not registered class origin for Enter event', srcClass);
    }
};

const handleBackspaceKeyPress = event => {
    const srcElement = event.srcElement;
    if (srcElement.innerText == '') {
        event.preventDefault();
        console.log('Handle Backspace : removeElement');
        const elementToRemove = srcElement.className === '' ? srcElement.parentNode : srcElement;
        const previousElement = elementToRemove.previousElementSibling;
        console.log(previousElement);
        if (previousElement && previousElement.tagName === 'P') {
            elementToRemove.remove();
            const previousFocusableElement = previousElement.contentEditable === 'true' ? previousElement : [...previousElement.children].filter(c => c.contentEditable === 'true')[0];
            previousFocusableElement.focus();
            setEndOfContenteditable(previousFocusableElement);
        }
    }
}

const newScript = () => {
    const page = document.getElementsByClassName('page')[0];
    [...page.children].forEach(c => {
        page.removeChild(c);
    });

    const newElement = createTitleElement('');
    page.appendChild(newElement);
    newElement.focus();
};

const save = () => {
    const content = {};
    const page = document.getElementsByClassName('page')[0];
    const elements = [...page.children].filter(c => c.tagName === 'P');
    content.script = elements.reduce((acc, currentElement) => {
        const elementType = currentElement.className;
        let text = '';
        if (currentElement.contentEditable === "true") {
            text = currentElement.innerHTML;
        } else {
            text = [...currentElement.children].filter(c => c.contentEditable === 'true')[0].innerHTML;
        }
        acc.push({
            type: elementType,
            text
        });
        return acc;
    }, []);
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content)));
    element.setAttribute('download', 'script.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

const handleFileSelect = evt => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const json = JSON.parse(e.target.result);
            const page = document.getElementsByClassName('page')[0];
            [...page.children].forEach(c => {
                page.removeChild(c);
            });
            json.script.forEach(el => {
                let newElement;
                switch(el.type) {
                    case 'title':
                        newElement = createTitleElement(el.text);
                        break;
                    case 'subtitle':
                        newElement = createSubtitleElement(el.text);
                        break;
                    case 'dialog':
                        newElement = createDialogElement(el.text);
                        break;
                    case 'character':
                        newElement = createCharacterElement(el.text);
                        break;
                    case 'sound':
                        newElement = createSoundElement(el.text);
                        break;
                    case 'comment':
                        newElement = createCommentElement(el.text);
                        break;
                    default:
                        console.log('type not recognized', el.type)
                }
                if(newElement) {
                    page.appendChild(newElement);
                }
            });
        } catch(e) {
            console.log(e);
        }
    }
    reader.readAsText(file);
}

document.addEventListener('keydown', event => {
    console.log(event);
    console.log(event.code);
    switch(event.code) {
        case 'Enter':
            event.preventDefault();
            handleEnterKeyPress(event);
            break;
        case 'Backspace':
            handleBackspaceKeyPress(event);
            break;
        default:
    }
});

document.getElementById('files').addEventListener('change', handleFileSelect, false);
/*
TODO :
* Pimp out print
* Ctrl + S to save JSON file
* autoCompletion character name
* anchors for navigation on subtitle and title
* Situational help to know what Enter and Ctrl+Enter will do
* Localisation ???
* Settings
*/