"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button, DataTable, Column, Badge, Avatar, ConfirmDialog } from "@/components/ui";
import { api } from "@/lib/api";
import { useModal } from "@/hooks";
import { UserForm } from "@/components/features/users";
import { User, UserFormData } from "@/types";

// Simple debounce hook implementation if not available globally
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

export default function AdminsPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

    const createModal = useModal();
    const editModal = useModal();
    const deleteModal = useModal();

    const debouncedSearch = useDebounceValue(search, 500);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            const queryParams = new URLSearchParams({
                page: page.toString(),
                limit: perPage.toString(),
                roleType: "admin", // Filter for admins
                sort: sortBy,
                order: sortOrder,
                ...(statusFilter !== "all" && { isActive: (statusFilter === "active").toString() }),
                ...(debouncedSearch && { search: debouncedSearch }),
            });

            const res = await api.get(`/users?${queryParams}`);
            setUsers(res.data.data.users);
            setTotalItems(res.data.data.pagination.total);
        } catch (error) {
            console.error("Failed to fetch admins:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, perPage, debouncedSearch, sortBy, sortOrder, statusFilter]);

    const handleCreate = async (data: UserFormData) => {
        try {
            await api.post("/users", data);
            fetchUsers();
            createModal.close();
        } catch (error) {
            console.error("Failed to create admin:", error);
            alert("Failed to create admin");
        }
    };

    const handleEdit = async (data: UserFormData) => {
        if (!selectedUser) return;
        try {
            await api.put(`/users/${selectedUser._id}`, data);
            fetchUsers();
            editModal.close();
            setSelectedUser(null);
        } catch (error) {
            console.error("Failed to update admin:", error);
            alert("Failed to update admin");
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        try {
            await api.delete(`/users/${selectedUser._id}`);
            fetchUsers();
            deleteModal.close();
            setSelectedUser(null);
        } catch (error) {
            console.error("Failed to delete admin:", error);
            alert("Failed to delete admin");
        }
    };

    const openEditModal = (user: User) => {
        setSelectedUser(user);
        editModal.open();
    };

    const openDeleteModal = (user: User) => {
        setSelectedUser(user);
        deleteModal.open();
    };

    const columns: Column<User>[] = [
        {
            key: "name",
            header: "Admin",
            sortable: true,
            render: (user) => (
                <div className="flex items-center gap-3">
                    <Avatar name={user.name} src={user.avatar} size="sm" />
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: "role",
            header: "Role",
            sortable: true,
            // @ts-ignore - Role might be populated
            render: (user) => <Badge variant="default">{user.role.title || user.role.name}</Badge>,
        },
        {
            key: "isActive",
            header: "Status",
            sortable: true,
            render: (user) => (
                <Badge variant={user.isActive ? "success" : "danger"}>
                    {user.isActive ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            key: "createdAt",
            header: "Joined",
            sortable: true,
            render: (user) => new Date(user.createdAt).toLocaleDateString(),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admins</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage administrative accounts and permissions
                    </p>
                </div>
                <div className="flex gap-2">
                    <select
                        className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <Button onClick={createModal.open}>
                        <Plus className="h-4 w-4" />
                        Add Admin
                    </Button>
                </div>
            </div>

            <DataTable
                data={users}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Search admins..."
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
                onEdit={openEditModal}
                onDelete={openDeleteModal}
            />

            <UserForm
                isOpen={createModal.isOpen}
                onClose={createModal.close}
                onSubmit={handleCreate}
                roleType="admin"
            />

            {selectedUser && (
                <UserForm
                    isOpen={editModal.isOpen}
                    onClose={() => {
                        editModal.close();
                        setSelectedUser(null);
                    }}
                    onSubmit={handleEdit}
                    initialData={{
                        name: selectedUser.name,
                        email: selectedUser.email,
                        role: selectedUser.role._id || selectedUser.role.id,
                        isActive: selectedUser.isActive,
                    }}
                    isEdit
                    roleType="admin"
                />
            )}

            <ConfirmDialog
                isOpen={deleteModal.isOpen}
                onClose={() => {
                    deleteModal.close();
                    setSelectedUser(null);
                }}
                onConfirm={handleDelete}
                title="Delete Admin"
                message={`Are you sure you want to delete admin "${selectedUser?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                type="danger"
            />
        </div>
    );
}
