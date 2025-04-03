import axios from 'axios';
import { Task, CreateTaskRequest } from '../models/Task';

const API_BASE_URL = 'https://localhost:5245/api';

// Create an axios instance with default config
const apiClient = axios.create({
baseURL: API_BASE_URL,
headers: {
    'Content-Type': 'application/json'
}
});

// Task API functions
export const TaskService = {
  // Get all tasks
getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/tasks');
    return response.data;
},

  // Get a task by ID
getTaskById: async (id: number): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return response.data;
},

  // Create a new task
createTask: async (task: CreateTaskRequest): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks', task);
    return response.data;
},

  // Update a task
updateTask: async (id: number, task: Task): Promise<Task> => {
    const response = await apiClient.put<Task>(`/tasks/${id}`, task);
    // If server returns 204 No Content, return the task that was sent
    if (response.status === 204) {
        return task;
    }
    return response.data;
},

  // Delete a task
deleteTask: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
},

  // Toggle task completion
toggleTaskCompletion: async (id: number): Promise<Task> => {
    const task = await TaskService.getTaskById(id);
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    return TaskService.updateTask(id, updatedTask);
}
};