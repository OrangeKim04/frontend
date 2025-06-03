import { motion, AnimatePresence } from 'framer-motion';
import { Overlay } from '../styles/ModalStyle';

type Props = {
   isVisible: boolean;
   onClose: () => void;
   children: React.ReactNode;
};

export const AnimatedModalWrapper = ({
   isVisible,
   onClose,
   children,
}: Props) => (
   <AnimatePresence onExitComplete={onClose}>
      {isVisible && (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
            <Overlay>
               <motion.div
                  variants={{
                     hidden: { opacity: 0, scale: 0.95 },
                     visible: { opacity: 1, scale: 1 },
                     exit: { opacity: 0, scale: 0.95 },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.2 }}>
                  {children}
               </motion.div>
            </Overlay>
         </motion.div>
      )}
   </AnimatePresence>
);
