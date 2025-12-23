'use client';

import PostForm from '@/components/admin/PostForm';

export default function CreatePostPage() {
    return (
        <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <PostForm />
            </div>
        </div>
    );
}
