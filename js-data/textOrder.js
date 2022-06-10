(() => {
    const data = [
        ['There', 'was', 'not', 'a', 'cooker', 'in', 'the', 'kitchen'],
        ['There', 'were', 'not', 'any', 'plates', 'in', 'the', 'fridge'],
        ['There', 'was', 'not', 'any', 'salad', 'on', 'my', 'plate'],
        ['There', 'were', 'not', 'any', 'children', 'in', 'the', 'living', 'room'],
    ]
    const rightData = data.flat()

    const task = document.querySelector('.textOrder')
    const sentences = task.querySelector('.sentences')
    const reloadTaskBtn = task.querySelector('.reloadTask')
    const checkingTaskBtn = task.querySelector('.checkingTask')
    const chek_answerTxt = task.querySelector('.chek_answer')
    const checkTask = task.querySelector('.checkTask')
    let dragingItem

    function fillSentences() {
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
            sentences.append(sentence)
        })
    }

    fillSentences()


    sentences.addEventListener('pointerdown', mousDownListner);

    let targetItem
    let draggingItem;
    let elemBelow;

    function mousDownListner(e) {
        if (e.target.classList.contains('word')) {
            mouseDown(e)
        }
    }

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
            shiftX = event.target.parentElement.getBoundingClientRect().left + (event.clientX - event.target.getBoundingClientRect().left);
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

    reloadTaskBtn.addEventListener('click', () => {
        sentences.addEventListener('pointerdown', mousDownListner);
        sentences.innerHTML = ''
        fillSentences()

        chek_answerTxt.innerHTML = ''
        checkTask.style.background = ''
    })

    checkingTaskBtn.addEventListener('click', () => {

        winVar = 0
        let words = task.querySelectorAll('.word')
        words.forEach((item, index) => {
            if (item.innerText === rightData[index]) {
                winVar++
                item.classList.add('rightAnswer')
            } else item.classList.add('wrongAnswer')
        })

        if (winVar === rightData.length) {
            chek_answerTxt.innerHTML = '<span>&#128077;</span> Молодец!'
            checkTask.style.background = 'lightgreen'
        } else {
            chek_answerTxt.innerHTML = '<span>&#10060;</span> Попробуй еще!'
            checkTask.style.background = 'lightpink'
        }
        sentences.removeEventListener('pointerdown', mousDownListner);
    })
})()