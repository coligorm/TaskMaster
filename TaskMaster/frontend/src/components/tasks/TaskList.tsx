import React, { useState, useEffect } from 'react';
import { Task, CreateTaskRequest } from '../../models/Task';
import { TaskService } from '../../services/api';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks when component mounts
    useEffect(() => {
    fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await TaskService.getAllTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError('Failed to load tasks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (task: CreateTaskRequest) => {
        try {
            const newTask = await TaskService.createTask(task);
            setTasks(prevTasks => [...prevTasks, newTask]);
        } catch (err) {
            console.error('Error adding task:', err);
        throw err; // Let the form handle the error
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await TaskService.deleteTask(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
            alert('Failed to delete task. Please try again.');
        }
    };

    const handleToggleComplete = async (id: number) => {
        try {
            const updatedTask = await TaskService.toggleTaskCompletion(id);
            setTasks(prevTasks => 
                prevTasks.map(task => 
                task.id === id ? updatedTask : task
                )
            );
        } catch (err) {
            console.error('Error toggling task completion:', err);
            alert('Failed to update task. Please try again.');
        }
    };

    const handleUpdateTask = async (id: number, updatedTask: Task) => {
        try {
            const result = await TaskService.updateTask(id, updatedTask);
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === id ? result : task
                )
            );
        } catch (err) {
            console.error('Error updating task:', err);
            throw err; // Let the form handle the error
        }
    };

    return (
        <div className="task-list-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>Task Manager</h1>

        <AddTaskForm onAdd={handleAddTask} />

        {editingTask && (
            <EditTaskForm 
                task={editingTask} 
                onUpdate={handleUpdateTask} 
                onCancel={() => setEditingTask(null)} 
            />
        )}

        <h2>Your Tasks</h2>

        {loading ? (
            <p>Loading tasks...</p>
        ) : error ? (
            <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>
                {error}
                <button 
                    onClick={fetchTasks}
                    style={{ 
                    marginLeft: '10px', 
                    padding: '5px 10px', 
                    backgroundColor: '#dc3545', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                    }}
                >
                Retry
                </button>
            </div>
        ) : tasks.length === 0 ? (
            <p>No tasks yet. Add a task to get started!</p>
        ) : (
            <div className="tasks-grid">
                {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task}
                    onDelete={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                    onEdit={setEditingTask}
                />
                ))}
            </div>
        )}
        </div>
    );
};

export default TaskList;