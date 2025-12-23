"use client";

import { useState, useEffect } from "react";
import { Button, Input, Modal, ModalFooter, Textarea } from "@/components/ui";
import { PermissionFormData } from "@/types";

interface PermissionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PermissionFormData) => Promise<void>;
    initialData?: Partial<PermissionFormData>;
    modules: string[];
    isEdit?: boolean;
}

export function PermissionForm({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    modules,
    isEdit = false,
}: PermissionFormProps) {
    const [formData, setFormData] = useState<PermissionFormData>({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        module: initialData?.module || "",
        description: initialData?.description || "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof PermissionFormData, string>>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [newModule, setNewModule] = useState("");

    // Reset form when modal opens with initial data
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: initialData?.name || "",
                slug: initialData?.slug || "",
                module: initialData?.module || "",
                description: initialData?.description || "",
            });
            setErrors({});
            setNewModule("");
        }
    }, [isOpen, initialData]);

    // Auto-generate slug from name
    useEffect(() => {
        if (!isEdit && formData.name) {
            const slug = formData.name
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .trim();
            setFormData((prev) => ({ ...prev, slug }));
        }
    }, [formData.name, isEdit]);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof PermissionFormData, string>> = {};

        if (!formData.name.trim()) {
            newErrors.name = "Permission name is required";
        }

        if (!formData.slug.trim()) {
            newErrors.slug = "Slug is required";
        } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
            newErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
        }

        if (!formData.module.trim()) {
            newErrors.module = "Module is required";
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
            slug: "",
            module: "",
            description: "",
        });
        setErrors({});
        setNewModule("");
        onClose();
    };

    const handleAddNewModule = () => {
        if (newModule.trim() && !modules.includes(newModule.trim())) {
            setFormData((prev) => ({ ...prev, module: newModule.trim() }));
            setNewModule("");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEdit ? "Edit Permission" : "Create Permission"}
            description={isEdit ? "Update permission details" : "Add a new permission to the system"}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Permission Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                    placeholder="e.g., Create Users"
                />

                <Input
                    label="Slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    error={errors.slug}
                    placeholder="e.g., create-users"
                    helperText="Unique identifier used in code"
                />

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Module
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {modules.map((module) => (
                            <button
                                key={module}
                                type="button"
                                onClick={() => setFormData({ ...formData, module })}
                                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${formData.module === module
                                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    }`}
                            >
                                {module}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            value={newModule}
                            onChange={(e) => setNewModule(e.target.value)}
                            placeholder="Add new module"
                            className="flex-1"
                        />
                        <Button type="button" variant="outline" onClick={handleAddNewModule}>
                            Add
                        </Button>
                    </div>
                    {errors.module && (
                        <p className="text-sm text-red-600 dark:text-red-400">{errors.module}</p>
                    )}
                </div>

                <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter permission description"
                    rows={2}
                />

                <ModalFooter>
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        {isEdit ? "Update Permission" : "Create Permission"}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
