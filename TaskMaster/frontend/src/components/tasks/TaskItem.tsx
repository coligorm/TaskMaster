import React from 'react';
import { Task } from '../../models/Task';

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete, onEdit }) => {
    return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''}`} style={{ 
        border: '1px solid #ddd', 
        borderRadius: '4px', 
        padding: '15px', 
        marginBottom: '10px',
        backgroundColor: task.isCompleted ? '#f8f9fa' : 'white' 
    }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
        <h3 style={{ 
            textDecoration: task.isCompleted ? 'line-through' : 'none',
            color: task.isCompleted ? '#6c757d' : 'black'
        }}>
        {task.title}
        </h3>
        <p>{task.description}</p>
        {task.dueDate && (
            <p>
            <small>Due: {new Date(task.dueDate).toLocaleDateString()}</small>
            </p>
        )}
        </div>
        <div>
        <button 
            onClick={() => onToggleComplete(task.id)}
            style={{ marginRight: '5px', backgroundColor: task.isCompleted ? '#28a745' : '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
        >
            {task.isCompleted ? 'Completed' : 'Mark Complete'}
        </button>
        <button 
            onClick={() => onEdit(task)}
            style={{ marginRight: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
        >
            Edit
        </button>
        <button 
            onClick={() => onDelete(task.id)}
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}
        >
            Delete
        </button>
        </div>
    </div>
    </div>
);
};

export default TaskItem;