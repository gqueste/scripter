/* CREATION ELEMENTS */
const createTitleElement = text => {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'title';
    newElement.innerText = text;
    return newElement;
}

const createSubtitleElement = text => {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'subtitle';
    newElement.innerText = text;
    return newElement;
}

const createCharacterElement = text => {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'character';
    newElement.innerText = text;
    return newElement;
}

const createDialogElement = text => {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'dialog';
    newElement.innerText = text;
    return newElement;
}

const createSoundElement = text => {
    const newElement = document.createElement('p');
    newElement.className = 'sound';
                        
    const soundElement = document.createElement('span');
    soundElement.innerText = 'SOUND: ';
    newElement.appendChild(soundElement);

    const editableSound = document.createElement('span');
    editableSound.contentEditable = true;
    editableSound.innerText = text;
    newElement.appendChild(editableSound);
    return newElement;
}

const createCommentElement = text => {
    const newElement = document.createElement('p');
    newElement.className = 'comment';
                    
    const leftPar = document.createElement('span');
    leftPar.innerText = '(';
    newElement.appendChild(leftPar);

    const editableComment = document.createElement('span');
    editableComment.contentEditable = true;
    editableComment.innerText = text;
    newElement.appendChild(editableComment);

    const rightPar = document.createElement('span');
    rightPar.innerText = ')';
    newElement.appendChild(rightPar);

    return newElement;
}


const addCharacter = (srcElement, text = '') => {
    const newElement = createCharacterElement(text);
    srcElement.parentNode.insertBefore(newElement, srcElement.nextElementSibling);
    newElement.focus();
}

const addDialog = (srcElement, text = '') => {
    const newElement = createDialogElement(text);
    srcElement.parentNode.insertBefore(newElement, srcElement.nextElementSibling);
    newElement.focus();
}

const addSubtitle = (srcElement, text = '') => {
    const newElement = createSubtitleElement(text);
    srcElement.parentNode.insertBefore(newElement, srcElement.nextElementSibling);
    newElement.focus();
}

const addTitle = (srcElement, text = '') => {
    const newElement = createTitleElement(text);
    srcElement.parentNode.insertBefore(newElement, srcElement.nextElementSibling);
    newElement.focus();
}

const addSound = (srcElement, text = '') => {
    const newElement = createSoundElement(text);
    srcElement.parentNode.insertBefore(newElement, srcElement.nextElementSibling);
    const editableSound = [...newElement.children].filter(c => c.contentEditable === 'true')[0];
    editableSound.focus();
}

const addComment = (srcElement, text = '') => {
    const newElement = createCommentElement(text);
    srcElement.parentNode.insertBefore(newElement, srcElement.nextElementSibling);
    const editableComment = [...newElement.children].filter(c => c.contentEditable === 'true')[0];
    editableComment.focus();
}

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
                // TODO Bug if empty + enter on first line. previous element is null
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

document.addEventListener('keypress', event => {
    console.log(event);
    console.log(event.code);
    if (event.code === 'Enter') {
        event.preventDefault();
        handleEnterKeyPress(event);
    }
});

document.getElementById('files').addEventListener('change', handleFileSelect, false);
/*
TODO :
* Suppr / del ?? (questionnement fonctionnel)
* Pimp out print
* mettre ça sur GitHub
* Ctrl + S pour save JSON file
* autoCompletion character name
* anchors for navigation on subtitle and title
* Indication to say what we are focusing / editing (placeholder / color / tooltip ??)
* Localisation ???
*/