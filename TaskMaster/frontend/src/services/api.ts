import axios from 'axios';
import { Task, CreateTaskRequest, Priority } from '../models/Task';

const API_BASE_URL = 'http://localhost:5245/api';

// Create an axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Helper function to convert string dates to Date objects
const convertDates = (task: any): Task => ({
    ...task,
    dueDate: new Date(task.dueDate),
    createdAt: new Date(task.createdAt)
});

// Task API functions
export const TaskService = {
  // Get all tasks
getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/tasks');
    return response.data.map(convertDates);
},

  // Get a task by ID
getTaskById: async (id: number): Promise<Task> => {
    const response = await apiClient.get<Task>(`/tasks/${id}`);
    return convertDates(response.data);
},

  // Create a new task
createTask: async (taskData: Partial<CreateTaskRequest>): Promise<Task> => {
    // Set default values for optional fields
    const task = {
        title: taskData.title || '',
        description: taskData.description || '',
        dueDate: taskData.dueDate || new Date(), // Default to today
        priority: taskData.priority ?? Priority.Low, // Default to Low priority
        isCompleted: taskData.isCompleted ?? false // Default to not completed
    };
    
    const response = await apiClient.post<Task>('/tasks', {
        ...task,
        dueDate: task.dueDate.toISOString() // Convert Date to string for API
    });
    return convertDates(response.data);
},

  // Update a task
updateTask: async (id: number, task: Task): Promise<Task> => {
    const taskForApi = {
        ...task,
        dueDate: task.dueDate.toISOString(), // Convert Date to string for API
        createdAt: task.createdAt.toISOString() // Convert Date to string for API
    };
    
    await apiClient.put<Task>(`/tasks/${id}`, taskForApi);
    return TaskService.getTaskById(id);
},

  // Delete a task
deleteTask: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
},

  // Toggle task completion
toggleTaskCompletion: async (id: number): Promise<Task> => {
    const task = await TaskService.getTaskById(id);
    if (!task) {
        throw new Error('Task not found');
    }
    
    const updatedTask: Task = {
        ...task,
        isCompleted: !task.isCompleted
    };
    
    return TaskService.updateTask(id, updatedTask);
}
};