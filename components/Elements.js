export function createTitleElement(text) {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'title';
    newElement.innerText = text;
    newElement.setAttribute('data-placeholder', 'Title');
    return newElement;
}

export function createSubtitleElement(text) {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'subtitle';
    newElement.innerText = text;
    newElement.setAttribute('data-placeholder', 'Subtitle');
    return newElement;
}

export function createCharacterElement(text) {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'character';
    newElement.innerText = text;
    newElement.setAttribute('data-placeholder', 'Character');
    return newElement;
}

export function createDialogElement(text) {
    const newElement = document.createElement('p');
    newElement.contentEditable = true;
    newElement.className = 'dialog';
    newElement.innerText = text;
    newElement.setAttribute('data-placeholder', 'Dialog');
    return newElement;
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