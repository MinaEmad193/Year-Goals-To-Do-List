let add = document.querySelector(".add-btn")
let input = document.querySelector(".add-input")
let incTasksNum = document.querySelector(".inc-tasks-num")
let cTasksNum = document.querySelector(".c-tasks-num")
let incTasksBox = document.querySelector(".incomplete tbody")
let cTasksBox = document.querySelector(".complete tbody")
let moodBtn = document.querySelector("header i")
let incTasks
let cTasks

input.addEventListener("focus", function() {
    input.setAttribute("placeholder", "What To Achive This Year !")
})

input.addEventListener("blur", function() {
    input.setAttribute("placeholder", "Add Goal For This Year")
})

window.onload = function() {
    input.focus()

    if (localStorage.getItem("mood") === null) {
        localStorage.setItem("mood", "light")
    }


    if (localStorage.getItem("mood") === "light") {
        document.body.className = "light"
        moodBtn.className = "fa-duotone fa-moon-stars night-btn"
    } else {
        document.body.className = "night"
        moodBtn.className = "fa-duotone fa-sun light-btn"
    }
}


if (localStorage.getItem("completeTasks") === null || localStorage.getItem("completeTasks") === "[]") {
    cTasks = []
    localStorage.setItem("completeTasks", "[]")
    document.querySelector(".complete").style.display = "none"
} else {
    cTasks = JSON.parse(localStorage.getItem("completeTasks"))
    document.querySelector(".complete").style.display = "table"
}


if (localStorage.getItem("incompleteTasks") === null || localStorage.getItem("incompleteTasks") == "[]") {
    incTasks = []
    localStorage.setItem("incompleteTasks", "[]")
    document.querySelector(".incomplete").style.display = "none"
} else {
    incTasks = JSON.parse(localStorage.getItem("incompleteTasks"))
    document.querySelector(".incomplete").style.display = "table"
}

function addBtnAppear() {
    if (input.value != "") {
        add.style.display = "block"
    } else {
        add.style.display = "none"
    }
}


function showData() {
    incTasksBox.innerHTML = ""
    for (i = 0; i < incTasks.length; i++) {
        let incTask = document.createElement("tr")
        incTask.className = "incomplete-task"
        incTask.innerHTML = 
        `
        <td class="inc-task-title">${incTasks[i]}</td>
        <td>
            <i class="fa-sharp fa-regular fa-check done" id="${i}" onclick="checkTask(id) , prog()"></i>
        </td>
        <td>
            <i class="fa-light fa-trash-can delete" id="${i}" onclick="deleteInTask(id), prog()"></i>
        </td>
        `
        incTasksBox.appendChild(incTask)
        incTasksNum.innerHTML = incTasks.length
    }


    cTasksBox.innerHTML = ""
    for (i = 0; i < cTasks.length; i++) {
        let cTask = document.createElement("tr")
        cTask.className = "complete-task"
        cTask.innerHTML = 
        `
        <td class="c-task-title">${cTasks[i]}</td>
        <td>
            
        </td>
        <td>
            <i class="fa-light fa-trash-can delete" id="${i}" onclick="deleteCoTask(id), prog()"></i>
        </td>
        `
        cTasksBox.appendChild(cTask)
        cTasksNum.innerHTML = cTasks.length
    }
    prog()
}
showData()


input.addEventListener("keyup", (event) => {
    if (event.which === 13) {
        createTaske()
    }
})

function createTaske() {
    if (input.value != "") {
        document.querySelector(".incomplete").style.display = "table"
        incTasks.push(input.value)
        localStorage.setItem("incompleteTasks", JSON.stringify(incTasks))
        showData()
        input.value = ""
        addBtnAppear()
        input.focus()
    }
}

function checkTask(id) {
    document.querySelector(".complete").style.display = "table"
    let allIncTasks = document.querySelectorAll(".inc-task-title")
    index = parseInt(id)
    cTasks.push(allIncTasks[index].innerHTML)
    incTasks.splice(index,1)
    
    
    
    localStorage.setItem("incompleteTasks", JSON.stringify(incTasks))
    localStorage.setItem("completeTasks", JSON.stringify(cTasks))
    
    showData()

    if (incTasks.length === 0) {
        document.querySelector(".incomplete").style.display = "none"
    } else {
        document.querySelector(".incomplete").style.display = "table"
    }
}


function deleteInTask(id) {
    index = parseInt(id)
    incTasks.splice(index,1)
    
    localStorage.setItem("incompleteTasks", JSON.stringify(incTasks))
    
    showData()

    if (incTasks.length === 0) {
        document.querySelector(".incomplete").style.display = "none"
    } else {
        document.querySelector(".incomplete").style.display = "table"
    }
}

function deleteCoTask(id) {
    index = parseInt(id)
    cTasks.splice(index,1)
    
    localStorage.setItem("completeTasks", JSON.stringify(cTasks))
    
    showData()

    if (cTasks.length === 0) {
        document.querySelector(".complete").style.display = "none"
    } else {
        document.querySelector(".complete").style.display = "table"
    }
}

function prog() {
    let progress = document.querySelector(".progress")
    if (cTasks.length > 0 && incTasks.length > 0) {
        document.querySelector(".progress-bar").style.display = "flex"
        progress.setAttribute("data-prog", `${Math.round((cTasks.length / (incTasks.length + cTasks.length))*100)}%`)
        progress.style.width = progress.getAttribute("data-prog")
    } 
    
    if (incTasks.length === 0 && cTasks.length !== 0) {
        document.querySelector(".progress-bar").style.display = "flex"
        progress.setAttribute("data-prog", `100%`)
        progress.style.width = progress.getAttribute("data-prog")
    }
    
    if (incTasks.length > 0 && cTasks.length === 0) {
        document.querySelector(".progress-bar").style.display = "flex"
        progress.setAttribute("data-prog", `0%`)
        progress.style.width = progress.getAttribute("data-prog")
    }
    
    if (incTasks.length === 0 && cTasks.length === 0) {
        document.querySelector(".progress-bar").style.display = "none"
        progress.setAttribute("data-prog", `0%`)
    }
}

window.onscroll = function() {
    if (scrollY >= 165) {
        document.querySelector("header").style.backgroundColor = "var(--header-color)"+10
    } else {
        document.querySelector("header").style.backgroundColor = "var(--header-color)"
    }
}


moodBtn.onclick =  function changeMood() {
    let mood = localStorage.getItem("mood")
    if (localStorage.getItem("mood") === "light" || localStorage.getItem("mood") === null) {
        mood = "night"
    } else {
        mood = "light"
    }

    document.body.className = mood
    localStorage.setItem("mood", mood)


    if (localStorage.getItem("mood") === "light" || localStorage.getItem("mood") === null) {
        moodBtn.className = "fa-duotone fa-moon-stars night-btn"
    } else {
        moodBtn.className = "fa-duotone fa-sun light-btn"
    }
}





