import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  conditionType: string;
  onConditionTypeChange: (type: string) => void;
}

export function ImageUpload({ onImageUpload, fileInputRef, conditionType, onConditionTypeChange }: ImageUploadProps) {
  return (
    <div className="text-center mb-8">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Condition Type
        </label>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onConditionTypeChange('dental')}
            className={`px-4 py-2 rounded-lg ${
              conditionType === 'dental'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dental Condition
          </button>
          <button
            onClick={() => onConditionTypeChange('skin')}
            className={`px-4 py-2 rounded-lg ${
              conditionType === 'skin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Skin Condition
          </button>
        </div>
      </div>
      
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={onImageUpload}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 mx-auto transition-colors"
      >
        <Upload className="w-5 h-5" />
        Upload Image
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Upload a clear image of your {conditionType} condition
      </p>
    </div>
  );
}