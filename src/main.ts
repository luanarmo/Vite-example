
import {v4} from 'uuid'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import './style.css'

// Get the task form element
const  taskForm = document.querySelector<HTMLFormElement>('#taskForm')
// Get the task list element
const taskList = document.querySelector<HTMLDivElement>('#taskList')
// Interface for the Task object
interface Task {
  id: string,
  title: string,
  description : string
}
// Array to store the tasks
let tasks: Task[]  = []
// Listen to the submit event of the task form
taskForm?.addEventListener('submit', e => {
  // Prevent the default submit event
  e.preventDefault()
  // Get the title and description elements from the form
  const title = taskForm['title'] as unknown as  HTMLInputElement
  const description = taskForm['description'] as unknown as  HTMLTextAreaElement

  // Create a new Task object and push it to the tasks array
  tasks.push({
    id: v4(),
    title: title.value,
    description: description.value
  })
  // Store the tasks array in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks))
  // Show a notification that the task was added
  Toastify({
    text: "Task added",
  }).showToast()
  // Render the updated tasks list
  renderTasks(tasks)
  // Reset the form and focus on the title element
  taskForm.reset()
  title.focus()
  
})

// Listen to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  // Get the tasks from local storage, or an empty array if there is none
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  // Render the tasks list
  renderTasks(tasks)
})

/**
 * Function to render the tasks list
 * @param tasks - an array of Task objects to render
 */
function renderTasks(tasks : Task[]) {
  // Clear the task list
  taskList!.innerHTML = ''
  // Loop through the tasks array
  tasks.forEach(task => {
    // Create a div element for each task
    const taskElement = document.createElement('div')
    taskElement.className = 'bg-zinc-800 mb-1 rounded-lg p-4 hover:bg-zinc-700 hover:cursor-pointer'
    // Create a header element for the task
    const header  = document.createElement('header')
    header.className ='flex justify-between'
    // Create a span element for the title
    const title = document.createElement('span')
    title.innerText = task.title
    // Create a paragraph element for the description
    const description = document.createElement('p')
    description.innerText = task.description
    // Create a delete button for the task
    const btnDelete = document.createElement('button')
    btnDelete.innerText = 'Delete'
    btnDelete.className = 'bg-red-500 px-2 py-1 rounded-md'
    // Listen to the Click event from btnDelete button 
    btnDelete.addEventListener('click', () =>{
      // Find the task with the same id and return its index from the tasks array
      const index = tasks.findIndex(t => t.id === task.id)
      //Remove task from tasks array
      tasks.splice(index,1)
      // Store the tasks array in local storage
      localStorage.setItem('tasks',JSON.stringify(tasks))
      // Show a notification that the task was deleted
      Toastify({
        text: "Task deleted",
        style:{
          background: 'red'
        },
      }).showToast()
      // Render the updated tasks list
      renderTasks(tasks)
    })
    // Append the title and delete button to the header element
    header.append(title)
    header.append(btnDelete)
    // Append the header and description to the task element
    taskElement.append(header)
    taskElement.append(description)
    // Append the task element to the task list
    taskList?.append(taskElement)
  })

}