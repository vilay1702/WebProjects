// Variables
let addBtn = document.getElementById('addTask');
let taskList = document.getElementById('taskList');
let searchBar = document.getElementById('search');
let items = document.getElementsByClassName('listItems');

// Functions
addBtn.addEventListener('click', addTask);
taskList.addEventListener('click', removeTask);
searchBar.addEventListener('keyup', filterList);


// Defining functions
function addTask(e){
    e.preventDefault();
    let textAdd = document.getElementById('taskInput').value;
    // console.log(textAdd);
    
    let newLi = document.createElement('li');
    newLi.className = "listItems";
    let text = document.createTextNode(textAdd);
    newLi.appendChild(text);

    let newBtn = document.createElement('button');
    newBtn.className = "btn delete";
    newBtn.textContent = 'x';

    newLi.appendChild(newBtn);
    taskList.appendChild(newLi);
}


function removeTask(e){
    if(e.target.classList.contains('delete')){
        if(confirm("Are you sure?")){
            let li = e.target.parentElement;
            taskList.removeChild(li);
        }
    }
}

function filterList(e){
    Array.from(items).forEach(item=>{
        if(item.textContent.toLowerCase().indexOf(searchBar.value.toLowerCase()) != -1){
            item.style.display = "flex";
        }
        else{
            item.style.display = "none";
        }
    });
        
}