(() => {
    const data = [{
            id: 1,
            english: 'bat',
            translate: 'летучая мышь',

        },
        {
            id: 2,
            english: 'witch',
            translate: 'ведьма',

        },
        {
            id: 3,
            english: 'spider',
            translate: 'паук',

        },
        {
            id: 4,
            english: 'ghost',
            translate: 'привидение',

        },
        {
            id: 5,
            english: 'I realized that I had forgotten my passport at my place',
            translate: 'Я понял, что забыл паспорт дома',

        },

    ]
    const shufleData = [...data]

    const task = document.querySelector('.findCouple')
    const table = document.querySelector('.findCouple_table')
    const leftSide = task.querySelector('.findCouple_left')
    const rightSide = task.querySelector('.findCouple_right')
    const reloadTaskBtn = task.querySelector('.reloadTask')
    const checkingTaskBtn = task.querySelector('.checkingTask')
    const chek_answerTxt = task.querySelector('.chek_answer')
    const checkTask = task.querySelector('.checkTask')

    let x1 = 0,
        x2 = 0,
        y1 = 0,
        y2 = 0,
        firstItem = null,
        secondItem = null
    answers = []

    function fillTask() {
        data.forEach(item => {
            let word = document.createElement('div')
            word.classList.add('findCouple_item')
            word.innerText = item.english
            word.setAttribute('data-answer', item.id)
            word.setAttribute('buzy', false)
            leftSide.append(word)
        })

        shufleData.sort(() => Math.random() - 0.5).forEach(item => {
            let word = document.createElement('div')
            word.classList.add('findCouple_item')
            word.innerText = item.translate
            word.setAttribute('data-answer', item.id)
            word.setAttribute('buzy', false)
            rightSide.append(word)
        })
    }

    fillTask()


    function startSelect(e) {
        coords2 = table.getBoundingClientRect()
        if (e.target.classList.contains('findCouple_item')) {
            if (e.target.parentElement.classList.contains('findCouple_left')) {
                firstItem = e.target
                coords = e.target.getBoundingClientRect()
                if (e.target.classList.contains('findCouple_item_active')) {
                    if (e.target.getAttribute('buzy') === 'true') {
                        let removableEl = null
                        answers.forEach((item, index) => {
                            if (item.indexOf(e.target) != -1) {
                                removableEl = index
                                item[2].remove()
                                item[0].classList.remove('findCouple_item_active')
                                item[1].classList.remove('findCouple_item_active')
                                item[0].setAttribute('buzy', false)
                                item[1].setAttribute('buzy', false)
                                if (firstItem) {
                                    firstItem.classList.remove('findCouple_item_active')
                                }
                                if (secondItem) {
                                    secondItem.classList.remove('findCouple_item_active')
                                }
                                secondItem = null
                                firstItem = null
                            }
                        })
                        answers.splice(removableEl, 1)
                    }
                    e.target.classList.remove('findCouple_item_active')
                    firstItem = null
                    x1 = 0
                    x2 = 0

                } else {
                    leftSide.querySelectorAll('.findCouple_item').forEach(item => {
                        if (item.getAttribute('buzy') === 'false') {
                            item.classList.remove('findCouple_item_active')
                        }
                    })
                    e.target.classList.add('findCouple_item_active')

                    x1 = coords.right - coords2.left
                    y1 = (coords.bottom - coords.height / 2) - coords2.top

                    if (x2 !== 0) {
                        firstItem.setAttribute('buzy', true)
                        secondItem.setAttribute('buzy', true)
                        let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
                        svg.innerHTML = `<circle r='1.2mm' cx=${x1} cy=${y1}></circle><line x1=${x1} y1=${y1} x2=${x2} y2=${y2}></line><circle r='1.2mm' cx=${x2} cy=${y2}></circle>`
                        svg.classList.add('findCouple_svg')
                        table.append(svg)
                        answers.push([firstItem, secondItem, svg])
                        x1 = 0
                        x2 = 0
                        y1 = 0
                        y2 = 0
                        firstItem = null
                        secondItem = null
                    }
                }
            } else if (e.target.parentElement.classList.contains('findCouple_right')) {
                secondItem = e.target
                coords = e.target.getBoundingClientRect()
                if (e.target.classList.contains('findCouple_item_active')) {
                    if (e.target.getAttribute('buzy') === 'true') {
                        let removableEl = null
                        answers.forEach((item, index) => {
                            if (item.indexOf(e.target) != -1) {
                                removableEl = index
                                item[2].remove()
                                item[0].classList.remove('findCouple_item_active')
                                item[0].setAttribute('buzy', false)
                                item[1].setAttribute('buzy', false)
                                item[1].classList.remove('findCouple_item_active')
                                if (firstItem) {
                                    firstItem.classList.remove('findCouple_item_active')
                                }
                                if (secondItem) {
                                    secondItem.classList.remove('findCouple_item_active')
                                }
                                secondItem = null
                                firstItem = null
                            }
                        })
                        answers.splice(removableEl, 1)
                    }
                    e.target.classList.remove('findCouple_item_active')
                    secondItem = null
                    x1 = 0
                    x2 = 0

                } else {
                    rightSide.querySelectorAll('.findCouple_item').forEach(item => {
                        if (item.getAttribute('buzy') === 'false') {
                            item.classList.remove('findCouple_item_active')
                        }
                    })
                    e.target.classList.add('findCouple_item_active')
                    x2 = coords.left - coords2.left
                    y2 = (coords.bottom - coords.height / 2) - coords2.top
                    if (x1 !== 0) {
                        firstItem.setAttribute('buzy', true)
                        secondItem.setAttribute('buzy', true)
                        let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
                        svg.innerHTML = `<circle r='1.2mm' cx=${x1} cy=${y1}></circle><line x1=${x1} y1=${y1} x2=${x2} y2=${y2} ></line><circle r='1.2mm' cx=${x2} cy=${y2}></circle>`
                        svg.classList.add('findCouple_svg')
                        table.append(svg)
                        answers.push([firstItem, secondItem, svg])
                        x1 = 0
                        x2 = 0
                        y1 = 0
                        y2 = 0
                    }
                }
            }
        }
    }

    table.addEventListener('click', startSelect)

    reloadTaskBtn.addEventListener('click', () => {
        task.querySelectorAll('.findCouple_svg').forEach(item => item.remove())
        leftSide.innerHTML = ''
        rightSide.innerHTML = ''
        chek_answerTxt.innerHTML = ''
        checkTask.style.background = ''
        fillTask()
        table.addEventListener('click', startSelect)
        answers.length = 0
    })

    checkingTaskBtn.addEventListener('click', () => {
        table.removeEventListener('click', startSelect)
        let winVar = 0
        answers.forEach(item => {
            if (item[0].getAttribute('data-answer') === item[1].getAttribute('data-answer')) {
                winVar++
                item[0].classList.add('findCouple_true')
                item[1].classList.add('findCouple_true')
                item[2].classList.add('findCouple_true_line')
            } else {
                item[0].classList.add('findCouple_wrong')
                item[1].classList.add('findCouple_wrong')
                item[2].classList.add('findCouple_wrong_line')
            }
        })

        if (winVar === data.length) {
            chek_answerTxt.innerHTML = '<span>&#128077;</span> Молодец!'
            checkTask.style.background = 'lightgreen'
        } else {
            chek_answerTxt.innerHTML = '<span>&#10060;</span> Попробуй еще!'
            checkTask.style.background = 'lightpink'
        }

    })
})()