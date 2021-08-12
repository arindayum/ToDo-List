const todoButton = document.querySelector(".todo-button")
const todoInput = document.querySelector(".todo-input")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter") 



document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
todoList.addEventListener("click", donecheck);
filterOption.addEventListener('click', filterTodo);




function addTodo (event) {
    event.preventDefault();
   let todoInput = document.getElementById("todoinput")
    
    if(todoInput.value.length < 5){
       
      document.getElementById("todoinp").innerHTML="*** PLEASE FILL ATLEAST 5 CHARACTERS";
       return false;
    }else if(todoInput.value.length > 20){
      document.getElementById("todoinp").innerHTML="*** PLEASE NOT EXCEED 20 CHARACTERS";
       return false;
    }else{
      document.getElementById("todoinp").innerHTML="";
    }
    
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li")
    newTodo.innerHTML=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);


    saveTodo(todoInput.value);
    
    const doneButton = document.createElement('button')
    doneButton.innerHTML='<i class="fas fa-check"></i>';
    doneButton.classList.add('donetrash1');
    todoDiv.appendChild(doneButton);
    
    const delButton = document.createElement('button')
    delButton.innerHTML='<i class="fas fa-trash"></i>';
    delButton.classList.add('donetrash2');
    todoDiv.appendChild(delButton);
  
    todoList.appendChild(todoDiv);
    todoInput.value="";
    
    
    }

function deletecheck (event) {
  
  const item = event.target;  
  
  if(item.classList[0]==='donetrash2'){
  const todo=item.parentElement;
  todo.classList.add("fall");
  removeTodos(todo);
  todo.addEventListener('transitionend',function(){
    todo.remove();
  });
   
}
}

function donecheck(event){
  const item = event.target;
  if(item.classList[0]==='donetrash1'){
    const todo=item.parentElement;
    todo.classList.toggle("completed");
    window.setTimeout(function(){ document.getElementById("congos").style.display="none"; }, 1000);
    document.getElementById("congos").innerHTML="KEEP GOING, YOU ARE DOING GREAT" ;
    document.getElementById("congos").style.display="flex";  
    
  }
}

function filterTodo(event) {
   const todos=todoList.childNodes;
   var c=0;
   todos.forEach(function(todo){
      //console.log(todo);
      if(c++>0){
        switch(event.target.value){
          case "all":
            todo.style.display = 'flex';
            break;
         case "done":
            if(todo.classList.contains('completed')){
               todo.display = 'flex';
            }else{
              todo.style.display = 'none';
            }
            break;
         case "remaining":
            if(!todo.classList.contains("completed")){
              todo.style.display = 'flex';
            }else{
              todo.style.display='none';
            }
            break;
        }

      }
     
   })
   
}


function saveTodo(todo){
  let todos;
  if(localStorage.getItem ('todos')=== null){
    todos=[];
 }else{
   todos=JSON.parse(localStorage.getItem('todos'));
 }
 todos.push(todo);
 localStorage.setItem('todos', JSON.stringify(todos));
  }

function getTodos(){

  let todos;
  if(localStorage.getItem ('todos')=== null){
    todos=[];
 }else{
   todos=JSON.parse(localStorage.getItem('todos'));
 }
 todos.forEach(function(todo){
  const todoDiv = document.createElement("div"); //todo div 
  todoDiv.classList.add("todo"); //?
  const newTodo = document.createElement("li")
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  newTodo.innerText=todo;
  
 
  
  const doneButton = document.createElement('button')
  doneButton.innerHTML='<i class="fas fa-check"></i>';
  doneButton.classList.add('donetrash1');
  todoDiv.appendChild(doneButton);
  
  const delButton = document.createElement('button')
  delButton.innerHTML='<i class="fas fa-trash"></i>';
  delButton.classList.add('donetrash2');
  todoDiv.appendChild(delButton);
  
  todoList.appendChild(todoDiv);
 })
}

function removeTodos(todo){
  let todos;
  if(localStorage.getItem ('todos')=== null){
    todos=[];
 }else{
   todos=JSON.parse(localStorage.getItem('todos'));
 }
 const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}


