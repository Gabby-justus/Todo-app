
document.addEventListener("DOMContentLoaded", function () {

    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const emptyImage = document.querySelector(".empty-image");
    const form = document.querySelector(".input-area");

    // Load saved tasks on start
    loadTasks();

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const text = taskInput.value.trim();
        if (text === "") return;

        addTask(text, false);
        taskInput.value = "";
        saveTasks();
        toggleEmptyImage();
    });

    function addTask(text, completed) {
        const li = document.createElement("li");

        const checkBtn = document.createElement("span");
        checkBtn.textContent = "✔";

        const taskSpan = document.createElement("span");
        taskSpan.textContent = text;

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "❌";

        if (completed) li.classList.add("completed");

        li.append(checkBtn, taskSpan, deleteBtn);
        taskList.appendChild(li);

        checkBtn.addEventListener("click", function () {
            li.classList.toggle("completed");
            saveTasks();
        });

        deleteBtn.addEventListener("click", function () {
            li.remove();
            saveTasks();
            toggleEmptyImage();
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#task-list li").forEach(li => {
            tasks.push({
                text: li.children[1].textContent,
                completed: li.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const saved = JSON.parse(localStorage.getItem("tasks")) || [];
        saved.forEach(task => addTask(task.text, task.completed));
        toggleEmptyImage();
    }

    function toggleEmptyImage() {
        emptyImage.style.display =
            taskList.children.length > 0 ? "none" : "block";
    }
});
