export function addTitle(srcElement, text = '') {
    const newElement = createTitleElement(text);
    insertElement(newElement, srcElement);
    newElement.focus();
}

export function createTitleElement(text) {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'title';
    newElement.innerText = text;
    newElement.setAttribute('data-placeholder', 'Title');
    return newElement;
}

export function addSubtitle(srcElement, text = '') {
    const newElement = createSubtitleElement(text);
    insertElement(newElement, srcElement);
    newElement.focus();
}

export function createSubtitleElement(text) {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'subtitle';
    newElement.innerText = text;
    newElement.setAttribute('data-placeholder', 'Subtitle');
    return newElement;
}

export function addCharacter(srcElement, text = '') {
    const newElement = createCharacterElement(text);
    insertElement(newElement, srcElement);
    newElement.focus();
}

export function createCharacterElement(text) {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'character';
    newElement.innerText = text;
    newElement.setAttribute('data-placeholder', 'Character');
    return newElement;
}

export function addDialog(srcElement, text = '') {
    const newElement = createDialogElement(text);
    insertElement(newElement, srcElement);
    newElement.focus();
}

export function createDialogElement(text) {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'dialog';
    newElement.innerText = text;
    newElement.setAttribute('data-placeholder', 'Dialog');
    return newElement;
}

export function addSound(srcElement, text = '') {
    const newElement = createSoundElement(text);
    insertElement(newElement, srcElement);
    const editableSound = [...newElement.children].filter(c => c.contentEditable === 'true')[0];
    editableSound.focus();
}

export function createSoundElement(text) {
    const newElement = document.createElement('p');
    newElement.className = 'sound';
                        
    const soundElement = document.createElement('span');
    soundElement.innerText = 'SOUND: ';
    newElement.appendChild(soundElement);

    const editableSound = document.createElement('span');
    editableSound.contentEditable = true;
    editableSound.innerText = text;
    editableSound.setAttribute('data-placeholder', 'Sound');
    newElement.appendChild(editableSound);
    return newElement;
}

export function addComment(srcElement, text = '') {
    const newElement = createCommentElement(text);
    insertElement(newElement, srcElement);
    const editableComment = [...newElement.children].filter(c => c.contentEditable === 'true')[0];
    editableComment.focus();
}

export function createCommentElement(text) {
    const newElement = document.createElement('p');
    newElement.className = 'comment';
                    
    const leftPar = document.createElement('span');
    leftPar.innerText = '(';
    newElement.appendChild(leftPar);

    const editableComment = document.createElement('span');
    editableComment.contentEditable = true;
    editableComment.innerText = text;
    editableComment.setAttribute('data-placeholder', 'Comment');
    newElement.appendChild(editableComment);

    const rightPar = document.createElement('span');
    rightPar.innerText = ')';
    newElement.appendChild(rightPar);

    return newElement;
}

function insertElement(element, previousElement) {
    if (!previousElement) {
        const page = document.getElementsByClassName('page')[0];
        page.appendChild(element);
    } else {
        previousElement.parentNode.insertBefore(element, previousElement.nextElementSibling);
    }
}