//global values

const div1 = document.querySelector("#drag-drop1")
const div2 = document.querySelector("#drag-drop2")
const categoryBtn = document.querySelector("#category-button")
const listContainer = document.querySelector("#product-list")

let category = false
categoryBtn.innerText = "Single-Use"

//onstart
renderList(category)

//dragover
div1.addEventListener("dragover", ()=>{
    gitdiv1.classLits.add("over")
})

div1.addEventListener("drop", ()=>{
    fetch(`${}`)
    .then(res => res.json())
    .then(obj => renderDetail(1,obj))
})

div2.addEventListener("drop", ()=>{
    fetch(`${}`)
    .then(res => res.json())
    .then(obj => renderDetail(2,obj))
})

categoryBtn.addEventListener("click", ()=>{
    removeRender()
    renderList()
    if(category = false){
        category = true
        categoryBtn.innerText = "ReUsable"
    }
    else{
        category = false
        categoryBtn.innerText = "Single-Use"
    }

})

//functions 

function renderList(){
    
    removeRender()
    
    //if for boolean
    if(category = false){
        //fetch
        fetch(`${}`)
        .then(res => res.json())
        .then(array => render(array))
    }
    else{
        fetch(`${}`)
        .then(res => res.json())
        .then(array => render(array))
    }
}

function render(array){
    array.forEach((obj)=>{
            
        //create list element
        const li = document.createElement("li")
        li.setAttribute("id", "period-list")

        //inner text of list
        li.innerText = obj.name + ", " + obj.product 

        //append list to ul
        listContainer.append(li)

        //list is draggable
        li.draggable = true

        //drag start listener
        li.addEventListener("dragstart", ()=>{
            li.classList.add("dragging")
        })

        //drag stop listener
        li.addEventListener("dragend", () =>{
            li.classList.remove("dragging")
        })

    })
}

function removeRender(){
    while(listContainer.firstChild){
        const periodList = document.getElementById("period-list")
        periodList.remove()
    }
}

function renderDetail(num, obj){
   //create elements
   const h1 = document.createElement("h1")
   const img = document.createElement("img")
   const h3 = documetn.createElement("h3")
   const h4 = document.createElement("h4")
   const btn = document.createElement("button")

   //innerText
   h1.innerText = obj.name
   img.src = obj.img
   h3.innerText = obj.capacity
   h4.innertext = obj.description 
   btn.innerText = obj.price
   btn.onClick = obj.link

   div+num.append(h1,img,h3,h4,btn)
}
