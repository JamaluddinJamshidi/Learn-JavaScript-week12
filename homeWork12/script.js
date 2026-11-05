
const taskList = document.getElementById("taskList");

// Add Edit buttons to all existing tasks
const tasks = taskList.querySelectorAll("li");

tasks.forEach(function (task) {
  const editButton = document.createElement("button");

  editButton.textContent = "Edit";
  editButton.dataset.action = "edit";

  task.append(editButton);
});

// Single delegated event listener
taskList.addEventListener("click", function (event) {

  // Check if the clicked element is an Edit button
  if (event.target.matches('[data-action="edit"]')) {

    const task = event.target.parentElement;
    const taskText = task.querySelector("span");

    // Create input field
    const input = document.createElement("input");

    input.type = "text";
    input.value = taskText.textContent;
    input.dataset.action = "save";

    // Remove old text
    taskText.remove();

    // Remove Edit button
    event.target.remove();

    // Add input field
    task.append(input);

    // Focus on input
    input.focus();
  }
});

// Handle Enter key using the same parent listener
taskList.addEventListener("keydown", function (event) {

  if (
    event.key === "Enter" &&
    event.target.matches('[data-action="save"]')
  ) {

    const task = event.target.parentElement;

    const newText = event.target.value.trim();

    // Do not save an empty task
    if (newText === "") {
      event.target.focus();
      return;
    }

    // Create new text element
    const taskText = document.createElement("span");

    taskText.textContent = newText;

    // Create Edit button again
    const editButton = document.createElement("button");

    editButton.textContent = "Edit";
    editButton.dataset.action = "edit";

    // Remove input
    event.target.remove();

    // Add updated text and Edit button
    task.append(taskText, editButton);
  }

});
