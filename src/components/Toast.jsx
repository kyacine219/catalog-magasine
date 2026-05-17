import { useEffect, useState } from 'react';
import { CheckCircle, Trash2, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="text-green-500" size={24} />,
    delete: <Trash2 className="text-red-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    delete: 'bg-red-50 border-red-200',
    error: 'bg-red-50 border-red-200'
  };

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-lg border flex items-center gap-3 transition-all duration-300 ${bgColors[type]} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
    >
      {icons[type]}
      <span className="font-medium text-gray-800">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="mr-2 hover:opacity-70 transition-opacity"
      >
        <X size={20} className="text-gray-500" />
      </button>
    </div>
  );
};

export default Toast;
