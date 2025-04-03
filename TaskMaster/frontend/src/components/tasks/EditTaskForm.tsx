import React, { useState, useEffect } from 'react';
import { Task, Priority } from '../../models/Task';

interface EditTaskFormProps {
    task: Task | null;
    onUpdate: (id: number, updatedTask: Task) => Promise<void>;
    onCancel: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onUpdate, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<Priority>(Priority.Low);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

  // Load task data when the task prop changes
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setIsCompleted(task.isCompleted);
            setPriority(task.priority || Priority.Low);

            // Format the date for the date input
            if (task.dueDate) {
                const date = new Date(task.dueDate);
                setDueDate(date.toISOString().split('T')[0]);
            } else {
                setDueDate('');
            }
        }
    }, [task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!task) return;
        
        if (!title.trim()) {
            alert('Title is required');
            return;
        }

        // Create a copy of the original task and update only the modified fields
        const updatedTask: Task = {
            id: task.id,
            title: title.trim(),
            description: description.trim(),
            dueDate: dueDate ? new Date(dueDate) : task.dueDate,
            isCompleted: isCompleted,
            priority: priority,
            createdAt: task.createdAt
        };

        setIsSubmitting(true);
    
        try {
            await onUpdate(task.id, updatedTask);
            onCancel(); // Close the form after successful update
        } catch (error) {
            console.error('Failed to update task:', error);
            alert('Failed to update task. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!task) return null;

    return (
    <div className="edit-task-form" style={{ 
        border: '1px solid #ddd', 
        borderRadius: '4px', 
        padding: '15px', 
        marginBottom: '20px',
        backgroundColor: '#f8f9fa'
    }}>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="edit-title" style={{ display: 'block', marginBottom: '5px' }}>Title *</label>
            <input
                type="text"
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
        </div>
        
        <div>
            <label htmlFor="edit-description" style={{ display: 'block', marginBottom: '5px' }}>Description</label>
            <textarea
                id="edit-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
        </div>
        
        <div>
            <label htmlFor="edit-dueDate" style={{ display: 'block', marginBottom: '5px' }}>Due Date</label>
            <input
                type="date"
                id="edit-dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
        </div>
        
        <div>
            <label htmlFor="edit-priority" style={{ display: 'block', marginBottom: '5px' }}>Priority</label>
            <select
                id="edit-priority"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value) as unknown as Priority)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            >
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.High}>High</option>
            </select>
        </div>
        
        <div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                    style={{ marginRight: '8px' }}
                />
            Mark as completed
            </label>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button 
                type="submit" 
                disabled={isSubmitting}
                style={{ 
                    padding: '10px', 
                    backgroundColor: '#007bff', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.7 : 1,
                    flex: 1
                }}
                >
                {isSubmitting ? 'Updating...' : 'Update Task'}
            </button>

            <button 
                type="button" 
                onClick={onCancel}
                style={{ 
                    padding: '10px', 
                    backgroundColor: '#6c757d', 
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flex: 1
                }}
                >
                Cancel
            </button>
        </div>
        </form>
    </div>
);
};

export default EditTaskForm;