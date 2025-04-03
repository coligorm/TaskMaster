export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    isCompleted: boolean;
    priority: Priority;
    createdAt: Date;
}

export interface CreateTaskRequest {
    title: string;
    description: string;
    dueDate?: Date;
    priority: Priority; 
}

export enum Priority {
    Low = 0,
    Medium = 1,
    High = 2
}