import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UploadCard } from './components/UploadCard';
import { ManualDataEntry, type DataRow } from './components/ManualDataEntry';
import { SummaryCards } from './components/SummaryCards';
import { DataTable } from './components/DataTable';
import { FiltersPanel, type FilterState } from './components/FiltersPanel';
import { ChatBox, type Message } from './components/ChatBox';
import { MobileMenu } from './components/MobileMenu';
import { generateMockData, calculateStats, filterData } from './utils/mockData';
import { generateAIResponse } from './utils/aiSimulation';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('upload');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mockData = generateMockData();
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name);
    const mockData = generateMockData();
    setData(mockData);
    setFilteredData(mockData);
    setCurrentScreen('dashboard');
  };

  const handleManualEntry = () => {
    setShowManualEntry(true);
  };

  const handleSaveManualData = (newData: DataRow[]) => {
    setData(newData);
    setFilteredData(newData);
    setShowManualEntry(false);
    setCurrentScreen('dashboard');
  };

  const handleCancelManualEntry = () => {
    setShowManualEntry(false);
  };

  const handleFilterChange = (filters: FilterState) => {
    const filtered = filterData(data, filters);
    setFilteredData(filtered);
  };

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const aiResponse = generateAIResponse(text, data);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  const stats = calculateStats(filteredData);
  const categories = [...new Set(data.map((row) => row.category))];

  const getPageTitle = () => {
    switch (currentScreen) {
      case 'dashboard':
        return 'Data Analysis';
      case 'upload':
        return 'Data Upload';
      case 'history':
        return 'History';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]">
      <div className="hidden lg:block">
        <Sidebar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-4 lg:hidden px-4 py-3 bg-white border-b border-[#e2e8f0]">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-[#64748b]"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-[#0f172a]">{getPageTitle()}</h1>
        </div>

        <div className="hidden lg:block">
          <Header title={getPageTitle()} />
        </div>

        <div className="flex-1 overflow-auto bg-[#f8fafc]">
          {currentScreen === 'upload' && (
            <div className="p-8 max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-[#0f172a] text-2xl font-bold mb-2">Upload Your Data</h2>
                <p className="text-[#64748b]">
                  Start by uploading a file or entering data manually
                </p>
              </div>

              {showManualEntry ? (
                <ManualDataEntry
                  onSave={handleSaveManualData}
                  onCancel={handleCancelManualEntry}
                />
              ) : (
                <UploadCard
                  onFileUpload={handleFileUpload}
                  onManualEntry={handleManualEntry}
                />
              )}
            </div>
          )}

          {currentScreen === 'dashboard' && (
            <div className="p-8 max-w-7xl mx-auto">
              <SummaryCards
                totalRecords={stats.totalRecords}
                averageValue={stats.averageValue}
                highestValue={stats.highestValue}
                lowestValue={stats.lowestValue}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <DataTable data={filteredData} />
                </div>
                <div>
                  <FiltersPanel
                    categories={categories}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                  <h3 className="text-[#0f172a] font-semibold mb-2">AI Insights</h3>
                  <p className="text-[#64748b] mb-4">
                    Get intelligent insights about your data
                  </p>
                  <button
                    onClick={() => setCurrentScreen('history')}
                    className="bg-[#3b82f6] text-white px-6 py-3 rounded-xl hover:bg-[#2563eb] transition-all font-medium shadow-lg shadow-[#3b82f6]/20"
                  >
                    Ask AI Questions
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentScreen === 'history' && (
            <div className="h-full">
              <ChatBox messages={messages} onSendMessage={handleSendMessage} />
            </div>
          )}

          {currentScreen === 'statistics' && (
            <div className="p-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                  <h3 className="text-[#0f172a] font-semibold mb-4">Category Distribution</h3>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const count = data.filter((row) => row.category === category).length;
                      const percentage = ((count / data.length) * 100).toFixed(1);
                      return (
                        <div key={category}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-[#0f172a] font-medium">{category}</span>
                            <span className="text-sm text-[#64748b]">{percentage}%</span>
                          </div>
                          <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                  <h3 className="text-[#0f172a] font-semibold mb-4">Top Performers</h3>
                  <div className="space-y-3">
                    {data
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 5)
                      .map((row, index) => (
                        <div
                          key={row.id}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#f8fafc] transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#0f172a]">{row.name}</p>
                            <p className="text-xs text-[#64748b]">{row.category}</p>
                          </div>
                          <p className="text-sm font-semibold text-[#10b981]">
                            ${row.value.toFixed(2)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                <h3 className="text-[#0f172a] font-semibold mb-4">All Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#f8fafc] rounded-lg">
                    <p className="text-xs text-[#64748b] mb-1">Total Value</p>
                    <p className="text-2xl font-bold text-[#0f172a]">
                      ${data.reduce((sum, row) => sum + row.value, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-[#f8fafc] rounded-lg">
                    <p className="text-xs text-[#64748b] mb-1">Categories</p>
                    <p className="text-2xl font-bold text-[#0f172a]">{categories.length}</p>
                  </div>
                  <div className="p-4 bg-[#f8fafc] rounded-lg">
                    <p className="text-xs text-[#64748b] mb-1">Average per Record</p>
                    <p className="text-2xl font-bold text-[#0f172a]">
                      ${stats.averageValue.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentScreen === 'settings' && (
            <div className="p-8 max-w-7xl mx-auto">
              <div className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                <h2 className="text-[#0f172a] text-xl font-semibold mb-4">Settings</h2>
                <p className="text-[#64748b]">Settings panel coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
