import { Upload } from 'lucide-react';
import { useState } from 'react';

interface UploadCardProps {
  onFileUpload: (file: File) => void;
  onManualEntry: () => void;
}

export function UploadCard({ onFileUpload, onManualEntry }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.csv'))) {
      onFileUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-xl p-16 text-center transition-all ${
          isDragging
            ? 'border-[#3b82f6] bg-[#eff6ff] scale-105'
            : 'border-[#cbd5e1] bg-white hover:border-[#94a3b8]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] rounded-2xl flex items-center justify-center">
          <Upload className="text-white" size={40} />
        </div>
        <h3 className="text-[#0f172a] text-xl font-semibold mb-2">
          Drop your files here
        </h3>
        <p className="text-[#64748b] mb-1">
          or click to browse from your device
        </p>
        <p className="text-sm text-[#94a3b8]">
          Supported formats: Excel (.xlsx) and CSV (.csv)
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <label className="flex-1">
          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-full bg-[#3b82f6] text-white py-4 px-6 rounded-xl text-center cursor-pointer hover:bg-[#2563eb] transition-all font-medium shadow-lg shadow-[#3b82f6]/20 hover:shadow-xl hover:shadow-[#3b82f6]/30">
            Upload File
          </div>
        </label>
        <button
          onClick={onManualEntry}
          className="flex-1 bg-white text-[#3b82f6] border-2 border-[#3b82f6] py-4 px-6 rounded-xl hover:bg-[#eff6ff] transition-all font-medium"
        >
          Enter Data Manually
        </button>
      </div>
    </div>
  );
}
