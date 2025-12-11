"use client";

import { useState, useEffect } from "react";
import { Button, Input, Modal, ModalFooter, Checkbox } from "@/components/ui";
import { RoleFormData, Permission } from "@/types";

interface RoleFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: RoleFormData) => Promise<void>;
    initialData?: Partial<RoleFormData>;
    permissions: Permission[];
    isEdit?: boolean;
}

export function RoleForm({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    permissions,
    isEdit = false,
}: RoleFormProps) {
    const [formData, setFormData] = useState<RoleFormData>({
        name: initialData?.name || "",
        permissionIds: initialData?.permissionIds || [],
    });
    const [errors, setErrors] = useState<Partial<Record<keyof RoleFormData, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    // Reset form when modal opens with initial data
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: initialData?.name || "",
                permissionIds: initialData?.permissionIds || [],
            });
            setErrors({});
        }
    }, [isOpen, initialData]);

    // Group permissions by module
    const permissionsByModule = permissions.reduce((acc, permission) => {
        if (!acc[permission.module]) {
            acc[permission.module] = [];
        }
        acc[permission.module].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof RoleFormData, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Role name is required";
        }



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch {
            // Error handling would be done by parent
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: "",
            permissionIds: [],
        });
        setErrors({});
        onClose();
    };

    const handlePermissionToggle = (permissionId: string) => {
        setFormData((prev) => ({
            ...prev,
            permissionIds: prev.permissionIds.includes(permissionId)
                ? prev.permissionIds.filter((id) => id !== permissionId)
                : [...prev.permissionIds, permissionId],
        }));
    };

    const handleModuleToggle = (modulePermissions: Permission[]) => {
        const moduleIds = modulePermissions.map((p) => p.id);
        const allSelected = moduleIds.every((id) => formData.permissionIds.includes(id));

        if (allSelected) {
            setFormData((prev) => ({
                ...prev,
                permissionIds: prev.permissionIds.filter((id) => !moduleIds.includes(id)),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                permissionIds: [...new Set([...prev.permissionIds, ...moduleIds])],
            }));
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEdit ? "Edit Role" : "Create Role"}
            description={isEdit ? "Update role information and permissions" : "Add a new role with specific permissions"}
            size="full"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                        label="Role Name"
                        name="name" // Accessibility
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        error={errors.name}
                        placeholder="Enter role name"
                    />


                </div>

                <div>
                    <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        Permissions
                    </h4>
                    <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        {Object.entries(permissionsByModule).map(([module, modulePermissions]) => {
                            const allSelected = modulePermissions.every((p) =>
                                formData.permissionIds.includes(p.id)
                            );
                            const someSelected = modulePermissions.some((p) =>
                                formData.permissionIds.includes(p.id)
                            );

                            return (
                                <div key={module}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`module-${module}`}
                                                checked={allSelected}
                                                onChange={() => handleModuleToggle(modulePermissions)}
                                                className={someSelected && !allSelected ? "opacity-50" : ""}
                                            />
                                            <label
                                                htmlFor={`module-${module}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-100"
                                            >
                                                {module}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="ml-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                        {modulePermissions.map((permission) => (
                                            <div key={permission.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`perm-${permission.id}`}
                                                    checked={formData.permissionIds.includes(permission.id)}
                                                    onChange={() => handlePermissionToggle(permission.id)}
                                                />
                                                <label
                                                    htmlFor={`perm-${permission.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300 cursior-pointer select-none"
                                                >
                                                    {permission.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <ModalFooter>
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        {isEdit ? "Update Role" : "Create Role"}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
