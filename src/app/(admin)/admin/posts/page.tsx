'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button, DataTable, Column, Badge, ConfirmDialog } from '@/components/ui';
import { PostService } from '@/services/post.service';
import { Post } from '@/types';
import { useDebounce, useModal } from '@/hooks';

export default function AdminPostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

    const deleteModal = useModal();
    const debouncedSearch = useDebounce(search, 500);

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const queryParams = {
                page,
                limit: perPage,
                search: debouncedSearch,
                sort: sortBy,
                order: sortOrder,
                isPublished: statusFilter === 'all' ? undefined : statusFilter === 'published'
            };

            const data = await PostService.getAll(queryParams);
            setPosts(data.posts);
            setTotalItems(data.pagination.total);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [page, perPage, debouncedSearch, sortBy, sortOrder, statusFilter]);

    const handleDelete = async () => {
        if (!selectedPost) return;
        try {
            await PostService.delete(selectedPost._id);
            fetchPosts();
            deleteModal.close();
            setSelectedPost(null);
        } catch (error) {
            console.error('Failed to delete post:', error);
            alert('Failed to delete listing');
        }
    };

    const openDeleteModal = (post: Post) => {
        setSelectedPost(post);
        deleteModal.open();
    };

    const columns: Column<Post>[] = [
        {
            key: "title",
            header: "Title",
            sortable: true,
            render: (post) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">{post.title}</span>
                </div>
            ),
        },
        {
            key: "location",
            header: "Location",
            sortable: true,
        },
        {
            key: "price",
            header: "Price",
            sortable: true,
            render: (post) => <span>${post.price}</span>,
        },
        {
            key: "isPublished",
            header: "Status",
            sortable: true,
            render: (post) => (
                <Badge variant={post.isPublished ? "success" : "warning"}>
                    {post.isPublished ? "Published" : "Draft"}
                </Badge>
            ),
        },
        {
            key: "createdAt",
            header: "Created",
            sortable: true,
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
                <div className="flex gap-2">
                    <select
                        className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                    <Button onClick={() => router.push('/admin/posts/new')}>
                        <Plus className="h-4 w-4" />
                        Add Listing
                    </Button>
                </div>
            </div>

            <DataTable
                data={posts}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Search listings..."
                showSearch={true}
                manualPagination={true}
                rowCount={totalItems}
                defaultPerPage={10}
                onPageChange={setPage}
                onPerPageChange={setPerPage}
                onSearchChange={setSearch}
                onSort={(key, order) => {
                    setSortBy(key as string);
                    setSortOrder(order);
                }}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onView={(post) => router.push(`/admin/posts/${post._id}`)}
                onEdit={(post) => router.push(`/admin/posts/${post._id}/edit`)}
                onRowClick={(post) => router.push(`/admin/posts/${post._id}`)}
                onDelete={openDeleteModal}
            />

            <ConfirmDialog
                isOpen={deleteModal.isOpen}
                onClose={() => {
                    deleteModal.close();
                    setSelectedPost(null);
                }}
                onConfirm={handleDelete}
                title="Delete Listing"
                message={`Are you sure you want to delete "${selectedPost?.title}"? This action cannot be undone.`}
                confirmText="Delete"
                type="danger"
            />
        </div>
    );
}
