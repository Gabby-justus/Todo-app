
$(document).ready(function () {

    const $taskInput = $("#task-input");
    const $taskList = $("#task-list");
    const $emptyImage = $(".empty-image");
    const $form = $(".input-area");

    // Prevent page reload
    $form.on("submit", function (e) {
        e.preventDefault();

        const taskText = $taskInput.val().trim();

        if (taskText === "") return;

        addTask(taskText);
        $taskInput.val("");
        toggleEmptyImage();
    });

    function addTask(text) {
        const $li = $("<li></li>").text(text);
        $taskList.append($li);
    }

    function toggleEmptyImage() {
        if ($taskList.children().length > 0) {
            $emptyImage.hide();
        } else {
            $emptyImage.show();
        }
    }

    // Run once on page load
    toggleEmptyImage();
});
