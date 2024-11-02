document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  todoInput.addEventListener("input", () => {
    todoInput.classList.remove("bg-gray-200");
    todoInput.classList.add("bg-white");
  });

  addTaskBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    todoInput.value = "";
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className =
      "flex items-center justify-between w-full bg-white px-3 py-2 mb-4 rounded-3xl shadow";

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.className = "flex-grow mr-4";

    if (task.completed) {
      taskText.classList.add("line-through", "text-gray-400");
    }

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className =
      "bg-red-500 text-white px-4 py-1 rounded-3xl hover:bg-red-600 transition-colors";

    if (task.completed) {
      li.classList.add("line-through", "text-gray-400");
    }

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeTask(task.id);
    });

    li.appendChild(taskText);
    li.appendChild(removeBtn);

    li.addEventListener("click", (e) => {
      if (e.target !== removeBtn) {
        task.completed = !task.completed;
        taskText.classList.toggle("line-through");
        taskText.classList.toggle("text-gray-800");
        li.classList.toggle("bg-gray-100");
        saveTasks();
      }
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function removeTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();

    const taskItem = document.querySelector(`li[data-id="${id}"]`);
    if (taskItem) {
      todoList.removeChild(taskItem);
    }
  }
});
