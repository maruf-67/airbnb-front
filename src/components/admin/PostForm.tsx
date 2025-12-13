'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostService } from '@/services/post.service';
import { Post } from '@/types';
import { ImageUpload, RichTextEditor } from '@/components/ui';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

type PostFormProps = {
    initialData?: Partial<Post>;
    isEditing?: boolean;
};

export default function PostForm({ initialData, isEditing = false }: PostFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<Partial<Post>>({
        title: '',
        description: '',
        price: 0,
        location: '',
        maxGuests: 1,
        images: [],
        amenities: [],
        isPublished: true,
        ...initialData
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleContentChange = (field: keyof Post, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = e.target.value.split(',').map(item => item.trim());
        setFormData(prev => ({
            ...prev,
            amenities: values
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEditing && initialData?._id) {
                await PostService.update(initialData._id, formData);
            } else {
                await PostService.create(formData);
            }
            router.push('/admin/posts');
            router.refresh();
        } catch (err) {
            console.error('Save failed:', err);
            setError((err as any).response?.data?.message || 'Failed to save listing');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-7xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditing ? 'Edit Listing' : 'Create New Listing'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {isEditing ? 'Update property details below.' : 'Fill in the information to publish a new property.'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white bg-rose-600 border border-transparent rounded-lg shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left Column) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">Property Details</h2>

                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Property Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                placeholder="e.g. Modern Beachfront Villa"
                                value={formData.title}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm py-2.5"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <div className="min-h-[200px]">
                                <RichTextEditor
                                    value={formData.description || ''}
                                    onChange={(val) => handleContentChange('description', val)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Amenities
                            </label>
                            <input
                                type="text"
                                name="amenities"
                                placeholder="WiFi, Pool, Gym (comma separated)"
                                value={formData.amenities?.join(', ')}
                                onChange={handleAmenitiesChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm py-2.5"
                            />
                            <p className="text-xs text-gray-500">Separated by commas.</p>
                        </div>
                    </div>

                    {/* Media Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">Gallery</h2>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Property Images
                            </label>
                            <ImageUpload
                                images={formData.images || []}
                                onChange={(imgs) => handleContentChange('images', imgs)}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right Column) */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">Publishing</h2>

                        <div>
                            <label htmlFor="isPublished" className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                id="isPublished"
                                name="isPublished"
                                value={formData.isPublished ? 'true' : 'false'}
                                onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.value === 'true' }))}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm py-2.5"
                            >
                                <option value="true">Published</option>
                                <option value="false">Draft</option>
                            </select>
                        </div>
                    </div>

                    {/* Pricing & Location Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 border-b pb-4">Settings</h2>

                        <div className="space-y-2">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price per Night ($)
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    required
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border-gray-300 pl-7 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm py-2.5"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700">
                                Max Guests
                            </label>
                            <input
                                type="number"
                                name="maxGuests"
                                id="maxGuests"
                                required
                                min="1"
                                value={formData.maxGuests}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm py-2.5"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                required
                                placeholder="City, Country"
                                value={formData.location}
                                onChange={handleChange}
                                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm py-2.5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
