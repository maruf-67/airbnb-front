export interface User {
    id: string;
    _id: string; // Add _id as it comes from backend often
    name: string;
    email: string;
    role: {
        name: string;
        title: string;
        type: string;
        permissions: string[];
    };
    avatar?: string;
    isVerified?: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface UserFormData {
    name: string;
    email: string;
    password?: string;
    role: string;
    isActive: boolean;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    author: {
        name: string;
        email: string;
        avatar?: string;
    };
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PostFormData {
    title: string;
    content: string;
    published: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

export interface Profile {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    createdAt: string;
    phone?: string;
    bio?: string;
    address?: string;
    city?: string;
    country?: string;
    timezone?: string;
    language?: string;
}

export interface Permission {
    id: string;
    name: string;
    slug: string; // The backend key e.g. 'role.read'
    module: string;
    description?: string;
}

export interface Role {
    id: string;
    _id: string; // Backend often sends _id
    name: string;
    title?: string; // Some parts use title
    description?: string;
    permissions: string[]; // Array of permission slugs from backend
    permissionIds?: string[]; // Frontend helper, same as permissions
    createdAt: string;
    updatedAt?: string;
}

export interface RoleFormData {
    name: string;
    permissionIds: string[];
}

export interface PermissionFormData {
    name: string;
    slug: string;
    module: string;
    description?: string;
}
