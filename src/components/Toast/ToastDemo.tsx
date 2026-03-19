import { toast } from './useToast';
import { Button } from '../Button/Button';
import { FiCheck, FiInfo, FiAlertTriangle, FiTrash2, FiDownload } from 'react-icons/fi';

export function ToastDemo() {
  const showToasts = () => {
    toast({
      title: 'Success!',
      description: 'The operation completed successfully. All your changes have been saved to our cloud servers.',
      type: 'success',
      icon: <FiCheck />
    });
    
    setTimeout(() => {
      toast({
        title: 'New Update',
        description: 'V5.2.0 is now available with 12 new premium components and performance fixes.',
        type: 'info',
        icon: <FiInfo />
      });
    }, 500);

    setTimeout(() => {
      toast({
        title: 'Data Warning',
        description: 'Your storage is 85% full. Consider upgrading your plan to avoid interruption.',
        type: 'warning',
        icon: <FiAlertTriangle />
      });
    }, 1000);
  };

  return (
    <div className="flex flex-wrap gap-4 w-full">
      <Button 
        variant="filled" 
        onClick={showToasts}
        leftIcon={<FiDownload />}
      >
        Trigger Stacked Toasts
      </Button>
      
      <Button 
        variant="outlined" 
        onClick={() => toast({ 
          title: 'Deleted Successfully', 
          description: 'The project "Dashkit V2" has been permanently removed.', 
          type: 'error', 
          icon: <FiTrash2 /> 
        })}
        className="text-red-600 border-red-100 hover:bg-red-50 dark:border-red-500/10 dark:hover:bg-red-500/10"
      >
        Error Toast
      </Button>

      <Button 
        variant="outlined" 
        onClick={() => toast({ 
          title: 'Manual Icon', 
          description: 'This toast uses a custom icon without a preset type.', 
          icon: <FiCheck className="text-purple-500" /> 
        })}
      >
        Simple Toast
      </Button>

      <div className="flex gap-2 w-full mt-4 flex-wrap">
        <Button 
          variant="outlined" 
          onClick={() => toast({ title: 'Top Right', position: 'top-right', type: 'info' })}
        >
          Top Right
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => toast({ title: 'Top Left', position: 'top-left', type: 'info' })}
        >
          Top Left
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => toast({ title: 'Top Center', position: 'top-center', type: 'info' })}
        >
          Top Center
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => toast({ title: 'Bottom Center', position: 'bottom-center', type: 'info' })}
        >
          Bottom Center
        </Button>
      </div>
    </div>
  );
}
