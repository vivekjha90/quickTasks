
  const taskInput = document.getElementById("task");
  const addButton = document.getElementById("btn");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage on page load
  window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(taskObj => {
      addTaskToDOM(taskObj.text, taskObj.done);
    });
  };

  // On Add button click
  addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    addTaskToDOM(taskText, false);
    saveTaskToLocalStorage({ text: taskText, done: false });
    taskInput.value = "";
  });

  // Add task to the DOM
  function addTaskToDOM(taskText, isDone) {
    const li = document.createElement("li");
    li.className = "taskItem";
    li.textContent = taskText;
    if (isDone) {
      li.classList.add("done");
    }

    // Done button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✔️";
    doneBtn.className = "doneBtn";doneBtn.style.justifyContent = "";
     doneBtn.style.marginRight = "10px";
    doneBtn.style.cursor = "pointer";

    doneBtn.addEventListener("click", function () {
      li.classList.toggle("done");
      toggleTaskDoneInLocalStorage(taskText);
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "deleteBtn";
    deleteBtn.style.cursor="pointer";
    deleteBtn.style.marginTop="7px"
    


    deleteBtn.addEventListener("click", function () {
      li.remove();
      deleteTaskFromLocalStorage(taskText);
    });

    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  // Save task to localStorage
  function saveTaskToLocalStorage(taskObj) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Toggle task done state
  function toggleTaskDoneInLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task =>
      task.text === taskText ? { ...task, done: !task.done } : task
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Delete task from localStorage
  function deleteTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }


//Protect index.html using token
(async function protectRoute() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const res = await fetch("https://quicktasks-backend.onrender.com/api/protected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    alert("Session expired or unauthorized. Please login again.");
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
})();
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
//dark mode
if (localStorage.getItem("mode") === "dark") {
      document.body.classList.add("dark-mode");
      document.getElementById("toggleMode").textContent = "☀️ Light Mode";
    }

    document.getElementById("toggleMode").addEventListener("click", () => {
      const body = document.body;
      body.classList.toggle("dark-mode");

      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("mode", isDark ? "dark" : "light");

      document.getElementById("toggleMode").textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
    });