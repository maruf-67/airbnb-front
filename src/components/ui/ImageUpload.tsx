'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { UploadService } from '@/services/upload.service';
import { Button } from './Button';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ImageUploadProps {
    images: string[];
    onChange: (images: string[]) => void;
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                setIsUploading(true);
                const url = await UploadService.uploadImage(file);
                onChange([...images, url]);
            } catch (error) {
                console.error('Upload failed:', error);
                alert('Image upload failed');
            } finally {
                setIsUploading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        }
    };

    const handleRemove = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {images.map((url, index) => (
                    <div key={index} className="relative aspect-video group">
                        <div className="relative w-full h-full rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                src={url}
                                alt={`Uploaded ${index + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <XMarkIcon className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                />
                <Button
                    type="button"
                    variant="outline"
                    isLoading={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <CloudArrowUpIcon className="h-4 w-4 mr-2" />
                    Upload Image
                </Button>
                <p className="text-xs text-gray-500">
                    Supports JPG, PNG, GIF. Max 5MB.
                </p>
            </div>
        </div>
    );
}
