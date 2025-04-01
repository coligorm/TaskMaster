# TaskMaster - (Not Greg Davies)
This is a basic task management application that lets users create, organize, and track their tasks.

## Overview

The stack is as follows:

### Frontend (React/TypeScript)

1. **Task List View** - A simple list showing all tasks with:
   - Task name, status (Todo/Completed), and priority
   - Toggle button to mark tasks as complete/incomplete
   - Delete button for each task
   - Simple "Add Task" button at the top

2. **Add Task Form** - A modal or inline form with:
   - Task name field
   - Priority dropdown (High/Medium/Low)


### Backend (C#/.NET)

1. Tasks Controller with basic endpoints:
   - GET /api/tasks - Get all tasks
   - POST /api/tasks - Create a task
   - PUT /api/tasks/{id} - Update a task (for toggling completion)
   - DELETE /api/tasks/{id} - Delete a task


### Database (SQL Server)

A Single Tasks table with:
- Id (int, primary key)
- Name (string)
- IsCompleted (boolean)
- Priority (string or int enum)
- CreatedAt (datetime)



## Implementation

### **Phase 1 - Backend Development (C#/.NET)**

   - [ ] Set up a minimal ASP.NET Core Web API project
   - [ ] Create the Task model and DbContext
   - [ ] Implement the TasksController with basic CRUD operations
   - [ ] Test with Postman
   - [ ] Test all endpoints

### **Phase 2 - Frontend Development (React/TypeScript)**

   - [ ] Set up a React project with TypeScript
   - [ ] Create the task list component (TaskList, AddTaskForm)
   - [ ] Implement API service functions to call your backend
   - [ ] Build the UI components and connect them to the API
   - [ ] Add basic styling and ensure responsiveness

### **Phase 3: Integration and Testing**

  - [ ] Test the full application flow
  - [ ] Fix any bugs or issues
  - [ ] Add any finishing touches to make little Alex Horne proud
