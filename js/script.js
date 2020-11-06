/* eslint-disable linebreak-style */
"use strict";

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem("toDoList")));
  }

  addToStorage() {
    localStorage.setItem("toDoList", JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = "";
    this.todoCompleted.textContent = "";
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.key = todo.key;
    li.insertAdjacentHTML(
      "beforeend",
      `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
      `
    );

    if (todo.completed) {
      this.todoCompleted.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
    } else {
      alert("Нельзя добавить пустое дело!");
    }
  }

  generateKey() {
    return (
      Math.random().toString(36).substr(2, 15) +
      Math.random().toString(36).substr(2, 15)
    );
  }

  deleteItem(key) {
    this.todoData.forEach((element) => {
      if (element.key === key) {
        this.todoData.delete(element.key);
        this.render();
      }
    });
  }

  completedItem(key) {
    this.todoData.forEach((element) => {
      if (element.key === key) {
        element.completed = !element.completed;
        this.render();
      }
    });
  }

  handler() {
    const todoElements = document.querySelector(".todo-container");
    todoElements.addEventListener("click", (event) => {
      let target = event.target;

      if (target.matches(".todo-complete")) {
        target = target.closest(".todo-item");
        this.completedItem(target.key);
      } else if (target.matches(".todo-remove")) {
        target = target.closest(".todo-item");
        this.deleteItem(target.key);
      }
    });
  }

  init() {
    this.form.addEventListener("submit", this.addTodo.bind(this));
    this.render();
    this.handler();
  }
}

const todo = new Todo(
  ".todo-control",
  ".header-input",
  ".todo-list",
  ".todo-completed"
);
todo.init();
