let questions = [
    {
        "question" : "Какой ваш любимый кофе?",
        "answers" : {
            "Растворимый" : ["mor"],
            "марагоджип" : ["kub"],
            "люваком" : ["kub"],
            "Американо" : ["dra"],
            "Flat white" : ["mir"],
            "Кофе с апельсиновым соком" : ["rya"],
            "Не люблю кофе" : ["tar"],
            "Арабика" : ["pob"]
        }
    },
    {
        "question" : "Какой ваш любимый цвет?",
        "answers" : {
            "Желтый" : ["mor"],
            "Синий" : ["kub"],
            "Зеленый" : ["kub", "rya", "pob"],
            "Белый" : ["mir"],
            "Сиреневый" : ["tar"]
        }
    },
    {
        "question" : "Кошки или собаки?",
        "answers" : {
            "Лягушки" : ["mor"],
            "Собаки" : ["kub", "mir", "rya", "pob"],
            "Сурикаты" : ["dra"],
            "Кошки" : ["tar"],
        }
    },
    {
        "question" : "Любимый предмет в школе?",
        "answers" : {
            "Английский" : ["mor"],
            "Литература" : ["kub", "mir"],
            "Физика" : ["dra"],
            "Математика" : ["rya"],
            "История" : ["tar"],
            "Философия" : ["pob"]
        }
    },
    {
        "question" : "Дискриминант или Виета?",
        "answers" : {
            "Что это?" : ["mor", "mir", "tar"],
            "Дискриминант" : ["kub", "dra"],
            "Виета" : ["rya"],
            "Ни то, ни другое" : ["pob"]
        }
    },
    {
        "question" : "Любимая игра?",
        "answers" : {
            "World of Warcraft" : ["mor"],
            "Бадминтон" : ["kub"],
            "Волейбол" : ["kub"],
            "Шахматы" : ["kub"],
            "Бутылочка" : ["dra"],
            "Шарады" : ["mir"],
            "Элиас" : ["tar"],
            "Mortal combat" : ["pob"]
        }
    },
    {
        "question" : "Лучший подарок для вас это?",
        "answers" : {
            "Неожиданность" : ["mor"],
            "Когда тебя понимают" : ["kub"],
            "Бутылочка" : ["dra"],
            "Книги" : ["mir", "pob"],
            "Улыбка" : ["tar"]
        }
    },
    {
        "question" : "Любимое время года?",
        "answers" : {
            "Лето" : ["mor", "rya", "tar"],
            "Зима" : ["dra", "pob"],
            "Осень" : ["mir"]
        }
    }
]

let scores = {
    "mor" : 0,
    "kub" : 0,
    "dra" : 0,
    "mir" : 0,
    "rya" : 0,
    "tar" : 0,
    "pob" : 0,
    "gal" : 0,
    "oga" : 0,
    "cel" : 0,
    "cos" : 0,
    "ur" : 0

}

let level = 0

let answer_handl = `<label class="question-label"><input class="uk-radio {{teacher}}" type="radio" name="radio1">{{answer}}</label><br>`
let answer_handl_compile = Handlebars.compile(answer_handl)

let question_name = document.querySelector(".question-h3")
let question_div = document.querySelector(".questions-div")

function end(){
    let mTeacher = ""
    let max = -1;

    for(let i in scores){
        if(scores[i] > max){
            max = scores[i]
            mTeacher = i
        }
    }

    let teacher = ""

    switch (mTeacher){
        case "mor":
            teacher = "Моручков"
            break;
        case "kub":
            teacher = "Кубрик"
            break;
        case "dra":
            teacher = "Драконов"
            break;
        case "mir":
            teacher = "Мирецкая"
            break;
        case "rya":
            teacher = "Рябов"
            break;
        case "tar":
            teacher = "Тарантина"
            break;
        case "pob":
            teacher = "Подкопаев"
            break;
        case "gal":
            teacher = "Галицкий"
            break;
        case "oga":
            teacher = "Оганесян"
            break;
        case "cel":
            teacher = "Челеховский"
            break;
        case "cos":
            teacher = "Космидис"
            break;
        case "ur":
            teacher = "Юрьев Антон"
            break;
    }

    document.querySelector(".question-h3").innerHTML = "Вы " + teacher
}

function reload(){
    let question_type = questions[level]

    question_name.innerHTML = question_type["question"]

    for(let i in question_type["answers"]){
        let teacher = ""
        for(let j of question_type["answers"][i]) teacher += j + " "
        question_div.innerHTML += answer_handl_compile({"answer" : " " + i, "teacher" : teacher})
    }

    question_div.innerHTML += `<button class="uk-button uk-button-primary question-button">Ответить</button>`

    document.querySelector(".question-button").addEventListener("click", function (){
        let answers = document.querySelectorAll(".uk-radio")
        let setted = null

        for(let i of answers){
            if(i.checked){
                setted = i;
            }
        }

        if(setted == null){
            alert("выберете ответ")

        }else {
            for(let i of setted.classList) {
                if (i in scores) {
                    scores[i]++;
                }
            }
            console.log(scores)
            level++;

            if(level > questions.length){
                question_div.innerHTML=""
                end()
            }else{
                reload()
            }
        }
    })
}
reload()