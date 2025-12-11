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

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
                ...(debouncedSearch && { search: debouncedSearch }),
            });

            const res = await api.get(`/users?${queryParams}`);
            setUsers(res.data.users);
            setTotalItems(res.data.total);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, perPage, debouncedSearch]);

    const handleCreate = async (data: UserFormData) => {
        try {
            await api.post("/users", data);
            fetchUsers();
            createModal.close();
        } catch (error) {
            console.error("Failed to create user:", error);
            alert("Failed to create user");
        }
    };

    const handleEdit = async (data: UserFormData) => {
        if (!selectedUser) return;
        try {
            await api.put(`/users/${selectedUser.id}`, data);
            fetchUsers();
            editModal.close();
            setSelectedUser(null);
        } catch (error) {
            console.error("Failed to update user:", error);
            alert("Failed to update user");
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        try {
            await api.delete(`/users/${selectedUser.id}`);
            fetchUsers();
            deleteModal.close();
            setSelectedUser(null);
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Failed to delete user");
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
            header: "User",
            sortable: false,
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
            sortable: false,
            render: (user) => <Badge variant={user.role.type === "admin" ? "default" : "secondary"}>{user.role.title}</Badge>,
        },
        {
            key: "isActive",
            header: "Status",
            render: (user) => (
                <Badge variant={user.isActive ? "success" : "danger"}>
                    {user.isActive ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            key: "createdAt",
            header: "Joined",
            render: (user) => new Date(user.createdAt).toLocaleDateString(),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage user accounts and permissions
                    </p>
                </div>
                <Button onClick={createModal.open}>
                    <Plus className="h-4 w-4" />
                    Add User
                </Button>
            </div>

            <DataTable
                data={users}
                columns={columns}
                isLoading={isLoading}
                searchPlaceholder="Search users..."
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

            <UserForm
                isOpen={createModal.isOpen}
                onClose={createModal.close}
                onSubmit={handleCreate}
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
                        role: selectedUser.role.name, // Access name or id depending on what UserForm expects. UserForm expects string. 
                        isActive: selectedUser.isActive,
                    }}
                    isEdit
                />
            )}

            <ConfirmDialog
                isOpen={deleteModal.isOpen}
                onClose={() => {
                    deleteModal.close();
                    setSelectedUser(null);
                }}
                onConfirm={handleDelete}
                title="Delete User"
                message={`Are you sure you want to delete "${selectedUser?.name}"? This action cannot be undone.`}
                confirmText="Delete"
                type="danger"
            />
        </div>
    );
}
