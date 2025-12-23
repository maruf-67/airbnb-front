
import { api } from '@/lib/api';
import { Post } from '@/types';

export const PostService = {
    getAll: async (params?: any) => {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                    queryParams.append(key, params[key].toString());
                }
            });
        }
        const response = await api.get(`/posts/manage?${queryParams.toString()}`);
        return response.data.data;
    },

    getById: async (id: string) => {
        const response = await api.get(`/posts/${id}`);
        return response.data.data;
    },

    create: async (data: Partial<Post>) => {
        const response = await api.post('/posts', data);
        return response.data.data;
    },

    update: async (id: string, data: Partial<Post>) => {
        const response = await api.patch(`/posts/${id}`, data);
        return response.data.data;
    },

    delete: async (id: string) => {
        const response = await api.delete(`/posts/${id}`);
        return response.data;
    }
};
