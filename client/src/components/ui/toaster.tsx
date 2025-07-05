import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  action?: React.ReactNode;
  onClose: () => void;
}

function Toast({ id, title, description, variant = 'default', action, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const variantClasses = {
    default: 'bg-card border-border text-card-foreground',
    destructive: 'bg-destructive border-destructive text-destructive-foreground'
  };

  return (
    <div
      className={`
        fixed z-50 flex items-center justify-between p-4 rounded-lg border shadow-lg
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
        ${variantClasses[variant]}
      `}
      style={{
        right: '1rem',
        top: `${1 + (parseInt(id) * 5)}rem`
      }}
    >
      <div className="flex-1">
        {title && <div className="font-semibold mb-1">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      
      <div className="flex items-center gap-2 ml-4">
        {action}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="p-1 rounded hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}