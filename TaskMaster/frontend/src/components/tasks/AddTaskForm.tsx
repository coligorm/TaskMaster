import React, { useState } from 'react';
import { CreateTaskRequest, Priority } from '../../models/Task';

interface AddTaskFormProps {
    onAdd: (task: CreateTaskRequest) => Promise<void>;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<Priority | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title.trim()) {
            alert('Title is required');
            return;
        }

        const newTask: CreateTaskRequest = {
            title,
            description,
            dueDate: dueDate ? new Date(dueDate + 'T00:00:00') : new Date(), // Use today's date if no date selected
            priority: priority ?? Priority.Low 
        };

        setIsSubmitting(true);
        
        try {
            await onAdd(newTask);
            // Reset form
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority(null);
        } catch (error) {
            console.error('Failed to add task:', error);
            alert('Failed to add task. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setPriority(value === '' ? null : parseInt(value) as Priority);
    };

    return (
        <div className="add-task-form" style={{ marginBottom: '20px' }}>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title *</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                
                <div>
                    <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                
                <div>
                    <label htmlFor="dueDate" style={{ display: 'block', marginBottom: '5px' }}>Due Date (defaults to today)</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>

                <div>
                    <label htmlFor="priority" style={{ display: 'block', marginBottom: '5px' }}>Priority</label>
                    <select
                        id="priority"
                        value={priority ?? ''}
                        onChange={handlePriorityChange}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                        <option value="">Select Priority (defaults to Low)</option>
                        {Object.entries(Priority)
                            .filter(([key]) => !isNaN(Number(key))) // Filter out reverse mappings
                            .map(([key, value]) => (
                                <option key={key} value={value}>
                                    {Priority[value as Priority]}
                                </option>
                            ))}
                    </select>
                </div>
                
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
                        opacity: isSubmitting ? 0.7 : 1
                    }}
                >
                    {isSubmitting ? 'Adding...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default AddTaskForm;