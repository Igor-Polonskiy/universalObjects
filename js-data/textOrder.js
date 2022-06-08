const data = [
    ['word1', 'word2222', 'wor3', '4', 'word55555555555'],
    ['word1', 'word2', 'word3', 'word4', 'word5'],
    ['word1', 'word2', 'word3', 'word4', 'word5'],
    ['word1', 'word2', 'word3', 'word4', 'word5'],
]
const rightData = [
    ['word1', 'word2', 'word3', 'word4', 'word5'],
    ['word1', 'word2', 'word3', 'word4', 'word5'],
    ['word1', 'word2', 'word3', 'word4', 'word5'],
    ['word1', 'word2', 'word3', 'word4', 'word5'],
]

const task = document.querySelector('.textOrder')
let dragingItem

data.forEach(item => {
    let sentence = document.createElement('div')
    sentence.classList.add('sentence')
    sentence.style.position = 'relative'
    item.sort(() => Math.random() - 0.5).forEach(el => {
        let word = document.createElement('div')
        word.classList.add('word')
        word.innerText = el
        sentence.append(word)
    })
    task.append(sentence)
})

task.addEventListener('pointerdown', (e) => {
    if (e.target.classList.contains('word')) {
        mouseDown(e)
    }
});
let targetItem
let draggingItem;
let elemBelow;

function mouseDown(event) {
    if (event.button === 2) return;
    if (event.target.classList.contains('word')) {
        targetItem = event.target
        targetItem.classList.add('selected')
        draggingItem = event.target.cloneNode(true)
            //draggingItem = event.target;
        draggingItem.style.touchAction = 'none'; //ОБЯЗАТЕЛЬНОЕ УСЛОВИЕ(МОЖНО УБРАТЬ И ПРОПИСАТЬ В СТИЛЬ САМОМУ ОБЪЕКТУ) 
        draggingItem.style.cursor = 'grabbing';
        draggingItem.style.position = 'absolute';
        draggingItem.style.zIndex = 100;

        event.target.parentElement.append(draggingItem);
        shiftX = event.clientX - event.target.getBoundingClientRect().left;
        shiftY = event.clientY - event.target.getBoundingClientRect().top;
        moveAt(event.pageX);
    }

    // ЛИММИТЫ КООРДИНАТ ОГРАНИЧИВАЮЩИЕ ВЫЛЕТ ПЕРЕТАСКИВАЕМОГО ЭЛЕМЕНТА ЗА БЛОК
    //  (ПО УМОЛЧАНИЮ interact_zadanie - РОДИТЕЛЬ ВАШЕГО БЛОКА
    function moveAt(pageX) {
        draggingItem.style.left = pageX - shiftX + 'px';
    }

    elemBelow = document.elementFromPoint(event.clientX, event.clientY);

    let clickWithoutMove = true;

    function onMouseMove(event) {
        clickWithoutMove = false

        moveAt(event.pageX);

        if (event.path[0] !== draggingItem) {
            window.addEventListener('pointerup', moveOut);
        }
        draggingItem.style.visibility = 'hidden'
        elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        draggingItem.style.visibility = 'visible';
        if (!elemBelow) return;

        if (elemBelow.classList.contains('word') && elemBelow.innerText !== draggingItem.innerText) {
            /* if (event.target.classList.contains('word')) {
                 event.preventDefault();

                 const activeElement = task.querySelector(`.selected`);
                 const currentElement = event.target;
                 const isMoveable = activeElement !== currentElement &&
                     currentElement.classList.contains(`word`);

                 if (!isMoveable) {
                     return;
                 }

                 

                 if (
                     nextElement &&
                     activeElement === nextElement.previousElementSibling ||
                     activeElement === nextElement
                 ) {
                     return;
                 }

                 event.target.parentElement.insertBefore(targetItem, nextElement);
             }*/
            const nextElement = getNextElement(event.clientX, elemBelow);
            if (draggingItem.parentNode.contains(nextElement)) {
                draggingItem.parentNode.insertBefore(targetItem, nextElement)
            }

        }

        function getNextElement(cursorPosition, currentElement) {
            const currentElementCoord = currentElement.getBoundingClientRect();
            const currentElementCenter = currentElementCoord.x + currentElementCoord.width / 2;
            let nextElement = (cursorPosition < currentElementCenter) ?
                currentElement :
                currentElement.nextElementSibling;
            return nextElement;
        };

        // ОБРАБОТКА СОБЫТИЯ НАХОЖДЕНИЯ НАД БЛОКОМ И ВЫЛЕТА ИЗ НЕГО (ПО НЕОБХОДИМИОСТИ)

        // let currentDroppable = null;

        // let droppableBelow = elemBelow.closest('.droppable'); // БЕРЁМ НУЖНЫЙ БЛОК 

        // if (currentDroppable != droppableBelow) {
        //     if (currentDroppable) { 
        // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА "ВЫЛЕТА" ИЗ DROPPABLE
        //         leaveDroppable(currentDroppable);
        //     }
        //     currentDroppable = droppableBelow;
        // ЛОГИКА ОБРАБОТКИ ПРОЦЕССА, КОГДА МЫ "ВЛЕТАЕМ" В ЭЛЕМЕНТ
        //     if (currentDroppable) {
        //         enterDroppable(currentDroppable);
        //     }
        // }
    }

    // КОГДА НАД ВЫБРАННЫМ БЛОКОМ
    function enterDroppable(currentDroppable) {
        // currentDroppable
    }
    // КОДА ВЫЛЕТЕЛИ ИЗ БЛОКА
    function leaveDroppable(currentDroppable) {
        // currentDroppable
    }
    task.addEventListener('pointermove', onMouseMove);
    task.addEventListener('pointerup', onpointerup)


    // КОГДА ВО ВРЕМЯ ПЕРЕТАСКИВАНИЯ КУРСОР ВЫНЕСЛИ ЗА ПРЕДЕЛЫ ОКНА БРАУЗЕРА И ОТПУСТИЛИ ЗАХВАТ ЭЛЕМЕНТА
    function moveOut(e) {
        const elemUnderPount = document.elementFromPoint(e.clientX, e.clientY);
        if (elemUnderPount !== draggingItem) {
            draggingItem.remove();
        }
        window.removeEventListener('pointerup', moveOut);
        document.removeEventListener('pointermove', onMouseMove);
    }
    // КОГДА КУРСОР В ЗОНЕ ДЛЯ ПЕРЕТАСКИВАНИЙ И ПОЛЬЗОВАТЕЛЬ ОТПУСТИЛ ЗАХВАТ ЭЛЕМЕНТА

    function onpointerup() {
        task.removeEventListener('pointermove', onMouseMove);
        // ЛОГИКА ОБРАБОТКИ ПОПАДАНИЯ НА НУЖНЫЙ БЛОК И НАОБОРОТ
        draggingItem.remove()
        targetItem.classList.remove('selected')
        task.removeEventListener('pointerup', onpointerup)
    }
};


/*function dragWord(word) {
    // word.
}
task.addEventListener(`pointerdown`, (evt) => {
    if (evt.target.classList.contains('word')) {

        evt.target.classList.add(`selected`);
        let clone = evt.target.cloneNode(true);
        clone.style.position = 'absolute'

        evt.target.parentElement.append(clone)



    }
});
task.addEventListener(`pointerup`, (evt) => {
    if (dragingItem) {
        dragingItem.classList.remove(`selected`);
    }

});



const tasksListElement = document.querySelectorAll(`.sentence`);
const taskElements = task.querySelectorAll(`.word`);

for (const task of taskElements) {
    task.draggable = true;
}

task.addEventListener(`dragstart`, (evt) => {
    if (evt.target.classList.contains('word')) {
        evt.target.classList.add(`selected`);
    }
});
task.addEventListener(`touchstart`, (evt) => {
    if (evt.target.classList.contains('word')) {
        evt.target.classList.add(`selected`);
    }
});


task.addEventListener(`dragend`, (evt) => {
    if (evt.target.classList.contains('word')) {
        evt.target.classList.remove(`selected`);
    }

});
task.addEventListener(`touchend`, (evt) => {
    if (evt.target.classList.contains('word')) {
        evt.target.classList.remove(`selected`);
    }

});


const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.x + currentElementCoord.width / 2;
    console.log(cursorPosition, currentElementCenter)
    let nextElement = (cursorPosition > currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;
    return nextElement;
};

task.addEventListener(`dragover`, (evt) => {
    if (evt.target.classList.contains('word')) {
        evt.preventDefault();

        const activeElement = task.querySelector(`.selected`);
        const currentElement = evt.target;
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`word`);

        if (!isMoveable) {
            return;
        }

        const nextElement = getNextElement(evt.clientX, currentElement);

        if (
            nextElement &&
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) {
            return;
        }

        evt.target.parentElement.insertBefore(activeElement, nextElement);
    }

});*/