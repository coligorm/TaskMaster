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



## Implementation - Iteration 1

### **Phase 1 - Backend Development (C#/.NET)**

   - [X] Set up a minimal ASP.NET Core Web API project
   - [X] Create the Task model and DbContext
   - [X] Implement the TasksController with basic CRUD operations
   - [X] Test with Swagger
   - [X] Test all endpoints

### **Phase 2 - Frontend Development (React/TypeScript)**

   - [X] Set up a React project with TypeScript
   - [X] Create the task list component (TaskList, AddTaskForm)
   - [X] Implement API service functions to call your backend
   - [X] Build the UI components and connect them to the API
   - [X] Add basic styling and ensure responsiveness

### **Phase 3: Integration and Testing**

  - [X] Test the full application flow
  - [X] Fix any bugs or issues
  - [ ] Add any finishing touches to make little Alex Horne proud

## Implementation - Iteration 2

### Phase 4 - Integration SQL Database

   - [ ] Configure the connection string
   - [ ] Update your DbContext configuration
   - [ ] Run migrations to create the database schema

### Phase 5 - Adding Azure Features

#### 5.1 Migrating to Azure SQL Database

   - [ ] Create an Azure SQL Database
   - [ ] Migrate Schema and Data
   - [ ] Update Connection Strings
   - [ ] Implement Azure Key Vault 

#### 5.2 Deploying the Backend to Azure App Service

   - [ ] Create an App Service
   - [ ] Prepare Application
   - [ ] Deploy Backend
   - [ ] Configure Application Settings

#### 5.3 Deploying the Frontend to Azure App Service

   - [ ] Configure for Deployment
   - [ ] Deploy Your Frontend
   - [ ] API Configuration

#### 5.4 Implementing Azure Functions for Reminders

   - [ ] Create an Azure Function App
   - [ ] Create a Timer-Triggered Function
   - [ ] Implement the Reminder Logic
   - [ ] Add Email Service Integration
   - [ ] Connect to Azure SQL Database

#### 5.5 Setting Up Application Insights

   - [ ] Create an Application Insights Resource
   - [ ] Add to Backend
   - [ ] Add to Frontend 

#### 5.6 Additional Azure Integrations

##### 5.6.1 Azure Active Directory B2C for Authentication

   - [ ] Set Up Azure AD B2C
   - [ ] Integrate with Backend
   - [ ] Integrate with Frontend

##### 5.6.2 Azure Storage for File Attachments

   - [ ] Create a Storage Account
   - [ ] Add to Backend
   - [ ] Add to Frontend

#### 5.5 CI/CD Pipeline Setup

   - [ ] Create a GitHub Actions Workflow
