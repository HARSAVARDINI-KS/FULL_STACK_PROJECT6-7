// Load tasks when page loads
window.onload = function() {
  loadTasks();
};

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleComplete(this)">${taskText}</span>
    <button onclick="deleteTask(this)">🗑</button>
  `;

  document.getElementById("taskList").appendChild(li);

  saveTasks();
  taskInput.value = "";
}

function toggleComplete(element) {
  element.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  let tasks = document.getElementById("taskList").innerHTML;
  localStorage.setItem("tasks", tasks);
}

function loadTasks() {
  let savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    document.getElementById("taskList").innerHTML = savedTasks;
  }
}
