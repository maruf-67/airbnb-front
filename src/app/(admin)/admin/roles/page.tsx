"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button, ConfirmDialog } from "@/components/ui";
import { RoleList, RoleForm } from "@/components/features/roles";
import { Role, Permission } from "@/types";
import { useModal } from "@/hooks";
import { api } from "@/lib/api";

interface RoleWithPermissions extends Role {
    // Role interface now has everything we need
}

export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const createModal = useModal();
    const editModal = useModal();
    const deleteModal = useModal();

    // Fetch Roles and Permissions on mount
    useEffect(() => {
        fetchRoles();
        fetchPermissions();
    }, []);

    const fetchRoles = async () => {
        try {
            setIsLoading(true);
            const res = await api.get('/roles');
            // Ensure id exists for DataTable keys and map permissions to permissionIds for form compatibility
            const mappedRoles = res.data.data.map((r: any) => ({
                ...r,
                id: r.id || r._id,
                permissionIds: r.permissions || r.permissionIds || []
            }));
            setRoles(mappedRoles);
        } catch (error) {
            console.error("Failed to fetch roles:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPermissions = async () => {
        try {
            const res = await api.get('/roles/permissions');
            setPermissions(res.data.data);
        } catch (error) {
            console.error("Failed to fetch permissions:", error);
        }
    };

    const handleCreate = async (data: any) => {
        setIsLoading(true);
        try {
            const res = await api.post('/roles', data);
            const newRole = {
                ...res.data.data,
                id: res.data.data.id || res.data.data._id,
                permissionIds: res.data.data.permissions || res.data.data.permissionIds || []
            };
            setRoles((prev) => [newRole, ...prev]);
            createModal.close();
        } catch (error) {
            console.error("Failed to create role:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async (data: any) => {
        if (!selectedRole) return;

        setIsLoading(true);
        try {
            const res = await api.patch(`/roles/${selectedRole._id || selectedRole.id}`, data);
            const updatedRole = {
                ...res.data.data,
                id: res.data.data.id || res.data.data._id,
                permissionIds: res.data.data.permissions || res.data.data.permissionIds || []
            };
            setRoles((prev) =>
                prev.map((role) =>
                    (role._id === selectedRole._id || role.id === selectedRole.id)
                        ? { ...role, ...updatedRole }
                        : role
                )
            );
            editModal.close();
            setSelectedRole(null);
        } catch (error) {
            console.error("Failed to update role:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedRole) return;

        setIsLoading(true);
        try {
            await api.delete(`/roles/${selectedRole._id || selectedRole.id}`);
            setRoles((prev) => prev.filter((role) => (role._id !== selectedRole._id && role.id !== selectedRole.id)));
            deleteModal.close();
            setSelectedRole(null);
        } catch (error) {
            console.error("Failed to delete role:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openEditModal = (role: RoleWithPermissions) => {
        setSelectedRole(role);
        editModal.open();
    };

    const openDeleteModal = (role: RoleWithPermissions) => {
        setSelectedRole(role);
        deleteModal.open();
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roles</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage roles and their permissions
                    </p>
                </div>
                <Button onClick={createModal.open}>
                    <Plus className="h-4 w-4" />
                    Add Role
                </Button>
            </div>

            {/* Roles Table */}
            {/* Passed full roles array to let RoleList (DataTable) handle pagination and search */}
            <RoleList
                roles={roles}
                isLoading={isLoading}
                onEdit={(r) => openEditModal(r)}
                onDelete={(r) => openDeleteModal(r)}
            />

            {/* Create Role Modal */}
            <RoleForm
                isOpen={createModal.isOpen}
                onClose={createModal.close}
                onSubmit={handleCreate}
                permissions={permissions}
            />

            {/* Edit Role Modal */}
            <RoleForm
                isOpen={editModal.isOpen}
                onClose={() => {
                    editModal.close();
                    setSelectedRole(null);
                }}
                onSubmit={handleEdit}
                initialData={
                    selectedRole
                        ? {
                            name: selectedRole.name,
                            permissionIds: selectedRole.permissionIds || selectedRole.permissions || [],
                        }
                        : undefined
                }
                permissions={permissions}
                isEdit
            />

            {/* Delete Confirmation Modal */}
            <ConfirmDialog
                isOpen={deleteModal.isOpen}
                onClose={() => {
                    deleteModal.close();
                    setSelectedRole(null);
                }}
                onConfirm={handleDelete}
                title="Delete Role"
                message={`Are you sure you want to delete "${selectedRole?.name}"? Users with this role will need to be reassigned.`}
                confirmText="Delete"
                type="danger"
                isLoading={isLoading}
            />
        </div>
    );
}
