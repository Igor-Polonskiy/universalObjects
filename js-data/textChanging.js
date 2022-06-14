(() => {
    const data = [
        [{
                id: 'id_1',
                word: 'There',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_2',
                word: 'were',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_3',
                word: 'dirty',
                status: false,
                rightWord: 'clean',
            },
            {
                id: 'id_4',
                word: 'spoons',
                status: true,
                rightWord: '',
            }
        ],
        [{
                id: 'id_1',
                word: 'There',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_2',
                word: 'was',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_3',
                word: 'chicken',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_4',
                word: 'in',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_5',
                word: 'the',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_6',
                word: 'cupboard',
                status: false,
                rightWord: 'fridge',
            }

        ],
        [{
                id: 'id_1',
                word: 'There',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_2',
                word: 'was',
                status: false,
                rightWord: 'were',
            },
            {
                id: 'id_3',
                word: 'dirty',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_4',
                word: 'forks,',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_5',
                word: 'knives,',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_6',
                word: 'plates',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_7',
                word: 'and',
                status: true,
                rightWord: '',
            },
            {
                id: 'id_8',
                word: 'glasses',
                status: true,
                rightWord: '',
            }
        ]
    ];

    const rightData = data.flat()

    const task = document.querySelector('.textChanging')
    const sentences = task.querySelector('.textChanging_sentences')
    const reloadTaskBtn = task.querySelector('.reloadTask')
    const checkingTaskBtn = task.querySelector('.checkingTask')
    const chek_answerTxt = task.querySelector('.chek_answer')
    const checkTask = task.querySelector('.checkTask')

    fillSentences()

    reloadTaskBtn.addEventListener('click', () => {
        chek_answerTxt.innerHTML = ''
        checkTask.style.background = ''
        sentences.innerHTML = ''
        fillSentences()
    })

    checkingTaskBtn.addEventListener('click', () => {
        let spans = task.querySelectorAll('.textChanging_word')

        let winVar = 0
        rightData.forEach((item, index) => {
            spans[index].contentEditable = "false"
            if (item.status === true && item.word === spans[index].innerText) {
                winVar++
                spans[index].parentElement.classList.add('textChanging_right')
            } else if (item.status === false && item.rightWord === spans[index].innerText) {
                winVar++
            } else {
                spans[index].parentElement.classList.add('textChanging_wrong')
            }
        })



        if (winVar === rightData.length) {
            chek_answerTxt.innerHTML = '<span>&#128077;</span> Молодец!'
            checkTask.style.background = 'lightgreen'
        } else {
            chek_answerTxt.innerHTML = '<span>&#10060;</span> Попробуй еще!'
            checkTask.style.background = 'lightpink'
        }

    })

    function fillSentences() {
        data.forEach(item => {
            let sentence = document.createElement('div')
            sentence.classList.add('textChanging_sentence')
            item.forEach(i => {
                let span = document.createElement('span')
                span.classList.add('textChanging_word')
                if (i.status === false) {
                    span.setAttribute('data-answer', i.rightWord)
                }
                span.contentEditable = "true"
                span.innerText = i.word
                sentence.append(span)
            })
            sentences.append(sentence)
        })
    }

})()