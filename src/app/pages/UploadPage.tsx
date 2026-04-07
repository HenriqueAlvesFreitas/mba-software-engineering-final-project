import { useState } from "react";
import { UploadCard } from "../components/UploadCard";
import { ManualDataEntry } from "../components/ManualDataEntry";
import { useNavigate } from "react-router-dom";
import { generateMockData } from "../utils/mockData";

export default function UploadPage({ setData }: any) {
  const [showManualEntry, setShowManualEntry] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (file: File) => {
    const mockData = generateMockData();
    setData(mockData);
    navigate("/dashboard");
  };

  const handleSaveManualData = (newData: any) => {
    setData((prevData: any) => [...prevData, ...newData]);
    navigate("/dashboard");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {showManualEntry ? (
        <ManualDataEntry
          onSave={handleSaveManualData}
          onCancel={() => setShowManualEntry(false)}
        />
      ) : (
        <UploadCard
          onFileUpload={handleFileUpload}
          onManualEntry={() => setShowManualEntry(true)}
        />
      )}
    </div>
  );
}