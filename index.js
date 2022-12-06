//global values

const divs = document.querySelectorAll(".drag-drop")
const dragDrop = document.querySelector("h1")
const categoryBtn = document.querySelector("#category-button")
const listContainer = document.querySelector("#product-list")

var category = false
categoryBtn.innerText = "Single-Use"
var productObj

//onstart
renderList(category)

categoryBtn.addEventListener("click", ()=>{
    //switch boolean
    category = !category

    //change button name and render
    if(category == false){
        categoryBtn.innerText = "Single-Use"
    }
    else{
        categoryBtn.innerText = "Reusable"
    }
    renderList()

})

//functions 

function renderList(){
    
    removeRender()
    
    //if for boolean
    if(category == false){
        //fetch
        fetch(`http://localhost:3000/disposable-products`)
        .then(res => res.json())
        .then(array => render(array))
    }
    else{
        fetch(`http://localhost:3000/reusable-products`)
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
        li.innerText = obj.name

        //append list to ul
        listContainer.append(li)

        //list is draggable
        li.draggable = true

        //drag start listener
        li.addEventListener("dragstart", ()=>{
            li.classList.add("dragging")
            productObj = obj
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


//Drag and Drop code

divs.forEach(div =>{

    div.addEventListener("dragover", (e)=>{
        e.preventDefault()
    })

    div.addEventListener("drop", (event) =>{
        event.preventDefault()
            if(div.firstChild){
                removeDetail(div)
                renderDetail(div)
            }
            else{
                renderDetail(div)
            }
    })
})

function renderDetail(div){
   
    //create elements
   const h1 = document.createElement("h1")
   const img = document.createElement("img")
   const h3 = document.createElement("h3")
   const h4 = document.createElement("h4")
   const btn = document.createElement("button")
   const container = document.createElement("div")
   container.setAttribute("id", "periodDetails")

   //innerText
   
   h1.innerText = productObj.name
   img.src = productObj.image
   h3.innerText = productObj.level
   h4.innertext = productObj.description 
   btn.innerText = productObj.price
   btn.onClick = productObj.url

   container.append(h1, img, h3, h4, btn)
   div.append(container)
}

function removeDetail(div){
    while(div.firstChild){
        const periodDetails = document.getElementById("periodDetails")
        // periodDetails.remove()
    }
}
