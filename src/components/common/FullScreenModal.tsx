import { Dialog } from '@radix-ui/themes';
import { motion } from 'motion/react';

// ----------- IMG -----------
import dallae from '@/assets/images/icons/icon-flower.svg';

interface Props {
  isOpen: boolean;
  title: string;
  desc: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function FullScreenModal({ isOpen, title, desc, children, onClose }: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <Dialog.Content className="full-screen-modal">
        <div className="modal-header">
          <Dialog.Title>{title}</Dialog.Title>

          <Dialog.Close>
            <button onClick={onClose}>✕</button>
          </Dialog.Close>
        </div>

        <div className="modal-desc">
          <motion.div
            className="flex justify-center py-3"
            animate={{ rotate: [-10, 10, -10] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img src={dallae} className="size-15" alt="" />
          </motion.div>

          <Dialog.Description className="mt-2 text-center text-sm text-[var(--color-gray-dark)]">
            {desc}
          </Dialog.Description>
        </div>

        <div className="modal-contents">{children}</div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
