"use client";

import { useState } from "react";
import { Button, Input, Select, Modal, ModalFooter } from "@/components/ui";
import { UserFormData } from "@/types";

interface UserFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormData) => Promise<void>;
    initialData?: Partial<UserFormData>;
    isEdit?: boolean;
}

const ROLES = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
];

export function UserForm({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEdit = false,
}: UserFormProps) {
    const [formData, setFormData] = useState<UserFormData>({
        name: initialData?.name || "",
        email: initialData?.email || "",
        password: "",
        role: initialData?.role || "user",
        isActive: initialData?.isActive ?? true,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof UserFormData, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!isEdit && !formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password && formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.role) {
            newErrors.role = "Role is required";
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
        } catch (error) {
            console.error(error);
            // Error handling would ideally be done by passing error back or showing toast
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isEdit) {
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "user",
                isActive: true,
            });
        }
        setErrors({});
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEdit ? "Edit User" : "Create User"}
            description={isEdit ? "Update user information" : "Add a new user to the system"}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    placeholder="Enter full name"
                />

                <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    placeholder="Enter email address"
                    disabled={isEdit} // Usually email is not editable or requires special flow
                />

                <Input
                    label={isEdit ? "Password (leave blank to keep current)" : "Password"}
                    type="password"
                    value={formData.password || ""}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    error={errors.password}
                    placeholder="Enter password"
                />

                <Select
                    label="Role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    error={errors.role}
                    options={ROLES}
                    placeholder="Select a role"
                />

                <Select
                    label="Status"
                    value={formData.isActive ? "active" : "inactive"}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "active" })}
                    options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                    ]}
                />

                <ModalFooter>
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        {isEdit ? "Update User" : "Create User"}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
