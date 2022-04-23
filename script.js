// Adicionar o evento de click no botão add
const btadd = document.getElementById("add")
const iteminput = document.getElementById("iteminput")
const itemdiv = document.getElementById("containerlist")
const feedback = document.querySelector("#feedback")

let todoitens = []

function handleItem(nameitem){ // 4
    const itens = itemdiv.querySelectorAll(".list")

    itens.forEach((item) => {
        if(item.querySelector(".item-name").textContent == nameitem){
            // event concluded
            item.querySelector(".check").addEventListener("click", () =>{
                item.querySelector(".item-name").classList.toggle("completed")
                item.querySelector(".check").classList.toggle("visibility")
            })

            // event edit
            item.querySelector(".edit").addEventListener("click", () =>{
                iteminput.value = nameitem
                itemdiv.removeChild(item)

                todoitens = todoitens.filter((el) => {
                    return el !== nameitem
                })
            })

            // event delete
            item.querySelector(".close").addEventListener("click", () =>{
                itemdiv.removeChild(item)

                todoitens = todoitens.filter((el) => {
                    return el !== nameitem
                })
            })
        }
    })
}

function getList(todoitens){  // 3
    itemdiv.innerHTML = ''

    todoitens.forEach(item => {
        itemdiv.insertAdjacentHTML("beforeend", `<div class="list"> <h5 class="fontsize item-name">${item}</h5><div><span><i class="check far fa-check-circle"></i></span><span><i class="edit fas fa-pen-square"></i></span><span><i class="close fas fa-times-circle"></i></span></div></div>`)

        handleItem(item)
    });
}

function setLocalStorage(todoitens){  // 2
    localStorage.setItem("todoitem", JSON.stringify(todoitens))
    console.log(localStorage.todoitens)
}

// PEGANDO A LISTA, SE ELA EXISTE
function getLocalStorage(){
    const lista = localStorage.getItem("todoitem")
    
    if(lista === "undefined" || lista === null){
        todoitens = []
    }else{
        todoitens = JSON.parse(lista) // Inverte uma string para objeto
        getList(todoitens)
        console.log(lista)
    }

}

getLocalStorage()

// adicionando um item e incluindo ao local storage

btadd.addEventListener("click", () =>{  // 1
    let itemname = iteminput.value

    if(itemname == ""){
        feedback.classList.remove("hidden")
        setTimeout(() =>{
            feedback.classList.add("hidden")
        }, 3000)
    }else{
        todoitens.push(itemname)
        setLocalStorage(todoitens)
        getList(todoitens)
    }

    iteminput.value = ''
})

// Botão de limpar

document.querySelector("#clear").addEventListener("click", () =>{
    todoitens = []
    localStorage.clear()
    getList(todoitens)
})
