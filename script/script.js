"use strict";

const todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  todoCompleted = document.querySelector(".todo-completed");

let todoData = [];

document.addEventListener("DOMContentLoaded", () => {
  todoData = JSON.parse(localStorage.todoList);
  render();
});

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  todoData.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML = `
        <span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>
    `;

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector(".todo-complete");

    btnTodoComplete.addEventListener("click", () => {
      item.completed = !item.completed;
      render();
    });

    const btnTodoRemove = li.querySelector(".todo-remove");

    btnTodoRemove.addEventListener("click", () => {
      todoData.splice(todoData.indexOf(item), 1);
      render();
    });
  });
};

todoControl.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false,
  };

  if (newTodo.value === "") {
    return;
  } else {
    todoData.push(newTodo);
    headerInput.value = "";

    render();
  }
});

document.addEventListener("click", () => {
  localStorage.todoList = JSON.stringify(todoData);
});
document.addEventListener("keyup", () => {
  localStorage.todoList = JSON.stringify(todoData);
});
