import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
 
}

export function MobileMenu({ isOpen, onClose,  }: MobileMenuProps) {
  if (!isOpen) return null;

  const handleNavigate = (screen: string) => {
    // onNavigate(screen);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-[250px] bg-[#1e293b] shadow-2xl">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-[#cbd5e1] hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <Sidebar/>
      </div>
    </div>
  );
}
