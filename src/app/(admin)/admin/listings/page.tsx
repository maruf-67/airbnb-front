"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button, DataTable, Column, Badge, Avatar, ConfirmDialog } from "@/components/ui";
import { api } from "@/lib/api";
import { useModal } from "@/hooks";
import { PostForm } from "@/components/features/posts";
import { Post, PostFormData } from "@/types";

// Simple debounce hook implementation
function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const createModal = useModal();
    const editModal = useModal();
    const deleteModal = useModal();

    const debouncedSearch = useDebounceValue(search, 500);

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: perPage.toString(),
                ...(debouncedSearch && { search: debouncedSearch }),
            });

            const res = await api.get(`/posts?${queryParams}`);
            setPosts(res.data.posts);
            setTotalItems(res.data.total);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page, perPage, debouncedSearch]);

    const handleCreate = async (data: PostFormData) => {
        try {
            await api.post("/posts", data);
            fetchPosts();
            createModal.close();
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Failed to create post");
        }
    };

    const handleEdit = async (data: PostFormData) => {
        if (!selectedPost) return;
        try {
            await api.put(`/posts/${selectedPost.id}`, data);
            fetchPosts();
            editModal.close();
            setSelectedPost(null);
        } catch (error) {
            console.error("Failed to update post:", error);
            alert("Failed to update post");
        }
    };

    const handleDelete = async () => {
        if (!selectedPost) return;
        try {
            await api.delete(`/posts/${selectedPost.id}`);
            fetchPosts();
            deleteModal.close();
            setSelectedPost(null);
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete post");
        }
    };

    const openEditModal = (post: Post) => {
        setSelectedPost(post);
        editModal.open();
    };

    const openDeleteModal = (post: Post) => {
        setSelectedPost(post);
        deleteModal.open();
    };

    const columns: Column<Post>[] = [
        {
            key: "title",
            header: "Title",
            render: (post) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white line-clamp-1">{post.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{post.content.substring(0, 50)}...</p>
                </div>
            ),
        },
        {
            key: "author",
            header: "Author",
            render: (post) => (
                <div className="flex items-center gap-2">
                    {/* Handle potential missing author if backend doesn't populate it fully */}
                    <Avatar name={post.author?.name || 'Unknown'} src={post.author?.avatar} size="sm" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{post.author?.name || 'Unknown'}</span>
                </div>
            ),
        },
        {
            key: "published",
            header: "Status",
            render: (post) => (
                <Badge variant={post.published ? "success" : "warning"}>
                    {post.published ? "Published" : "Draft"}
                </Badge>
            ),
        },
        {
            key: "createdAt",
            header: "Created",
            render: (post) => new Date(post.createdAt).toLocaleDateString(),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Listings</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage property listings
                    </p>
                </div>
                <Button onClick={createModal.open}>
                    <Plus className="h-4 w-4" />
                    Create Post
                </Button>
            </div>

            <DataTable
                data={posts}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Search posts..."
                showSearch={true}
                manualPagination={true}
                rowCount={totalItems}
                defaultPerPage={10}
                onPageChange={setPage}
                onPerPageChange={setPerPage}
                onSearchChange={setSearch}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
            />

            <PostForm
                isOpen={createModal.isOpen}
                onClose={createModal.close}
                onSubmit={handleCreate}
            />

            {selectedPost && (
                <PostForm
                    isOpen={editModal.isOpen}
                    onClose={() => {
                        editModal.close();
                        setSelectedPost(null);
                    }}
                    onSubmit={handleEdit}
                    initialData={{
                        title: selectedPost.title,
                        content: selectedPost.content,
                        published: selectedPost.published,
                    }}
                    isEdit
                />
            )}

            <ConfirmDialog
                isOpen={deleteModal.isOpen}
                onClose={() => {
                    deleteModal.close();
                    setSelectedPost(null);
                }}
                onConfirm={handleDelete}
                title="Delete Post"
                message={`Are you sure you want to delete this post? This action cannot be undone.`}
                confirmText="Delete"
                type="danger"
            />
        </div>
    );
}
