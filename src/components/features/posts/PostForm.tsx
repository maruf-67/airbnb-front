"use client";

import { useState } from "react";
import { Button, Input, Modal, ModalFooter, Select } from "@/components/ui";
import { PostFormData } from "@/types";

interface PostFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: PostFormData) => Promise<void>;
    initialData?: Partial<PostFormData>;
    isEdit?: boolean;
}

export function PostForm({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isEdit = false,
}: PostFormProps) {
    const [formData, setFormData] = useState<PostFormData>({
        title: initialData?.title || "",
        content: initialData?.content || "",
        published: initialData?.published ?? false,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof PostFormData, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof PostFormData, string>> = {};

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!formData.content.trim()) {
            newErrors.content = "Content is required";
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isEdit) {
            setFormData({
                title: "",
                content: "",
                published: false,
            });
        }
        setErrors({});
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEdit ? "Edit Post" : "Create Post"}
            description={isEdit ? "Update post content" : "Create a new blog post"}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    error={errors.title}
                    placeholder="Enter post title"
                />

                <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Content
                    </label>
                    <textarea
                        className="flex min-h-[120px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-primary-400"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Enter post content"
                    />
                    {errors.content && (
                        <p className="text-sm text-red-600 dark:text-red-400">{errors.content}</p>
                    )}
                </div>

                <Select
                    label="Status"
                    value={formData.published ? "published" : "draft"}
                    onChange={(e) => setFormData({ ...formData, published: e.target.value === "published" })}
                    options={[
                        { value: "published", label: "Published" },
                        { value: "draft", label: "Draft" },
                    ]}
                />

                <ModalFooter>
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                        {isEdit ? "Update Post" : "Create Post"}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}
