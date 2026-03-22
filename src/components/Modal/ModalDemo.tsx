import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { FiLayers, FiDownload, FiTrash2, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export function ModalDemo() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="flex flex-wrap gap-4 w-full">
      <Button 
        variant="filled" 
        onClick={() => setActiveModal('standard')}
        leftIcon={<FiLayers />}
      >
        Standard Modal
      </Button>
      
      <Button 
        variant="outlined" 
        onClick={() => setActiveModal('alert')}
        leftIcon={<FiAlertTriangle />}
      >
        Alert Modal
      </Button>

      <Button 
        variant="outlined" 
        onClick={() => setActiveModal('fullscreen')}
        leftIcon={<FiLayers className="rotate-45" />}
      >
        Full-Screen Modal
      </Button>

      {/* Standard Modal */}
      <Modal
        isOpen={activeModal === 'standard'}
        onClose={closeModal}
        title="Project Overview"
        description="Review your latest project stats and activity log."
        footer={
          <>
            <Button variant="outlined" onClick={closeModal} className="h-10">Cancel</Button>
            <Button variant="filled" leftIcon={<FiDownload />} onClick={closeModal} className="h-10">Download Report</Button>
          </>
        }
      >
        <div className="flex flex-col gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-neutral-900 text-white flex flex-col gap-1 shadow-lg shadow-neutral-200/50 dark:shadow-black">
              <span className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em]">Traffic</span>
              <span className="text-2xl font-bold tracking-tight">2.4M</span>
            </div>
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">Bounces</span>
              <span className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">12.5%</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Team Members</h4>
            <div className="flex -space-x-3 ml-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="size-10 rounded-full border-4 border-white dark:border-neutral-950 bg-neutral-100 dark:bg-neutral-900 overflow-hidden flex items-center justify-center text-xs font-bold ring-1 ring-neutral-200 dark:ring-neutral-800">
                  U{i}
                </div>
              ))}
              <div className="size-10 rounded-full border-4 border-white dark:border-neutral-950 bg-neutral-900 text-white flex items-center justify-center text-xs font-bold ring-1 ring-neutral-200 dark:ring-neutral-800">
                +2
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Alert Modal */}
      <Modal
        isOpen={activeModal === 'alert'}
        onClose={closeModal}
        size="sm"
        className="text-center"
      >
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="size-20 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20">
            <FiTrash2 size={40} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Delete Workspace?</h3>
            <p className="text-sm text-muted-foreground max-w-[240px]">This action is permanent and will remove all project data associated with this workspace.</p>
          </div>
          <div className="grid grid-cols-1 w-full gap-3 pt-4 px-4">
            <Button variant="filled" className="bg-red-600 hover:bg-red-700 text-white h-12 rounded-xl" onClick={closeModal}>
              Yes, Delete Permanent
            </Button>
            <Button variant="outlined" className="h-12 rounded-xl border-none hover:bg-neutral-50" onClick={closeModal}>
              Keep Workspace
            </Button>
          </div>
        </div>
      </Modal>

      {/* Fullscreen Modal */}
      <Modal
        isOpen={activeModal === 'fullscreen'}
        onClose={closeModal}
        size="full"
        title="Immersive Editor"
        description="Maximize your creative potential in our distilled editing mode."
      >
        <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-[2rem] p-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="size-16 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400">
              <FiCheckCircle size={32} />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight leading-[1.05]">Workspace Ready</h2>
            <p className="text-neutral-500 max-w-sm mx-auto">Click X to return to your dashboard or begin customizing your layout.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}


