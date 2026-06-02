'use client';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

export type ToastVariant = 'success' | 'error';

type ToastProps = {
  open: boolean;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  onClose: () => void;
};

export const Toast = ({
  open,
  title,
  description,
  variant = 'success',
  duration = 4000,
  onClose,
}: ToastProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  const stylesByVariant: Record<ToastVariant, string> = {
    success: 'border-l-4 border-l-green-500',
    error: 'border-l-4 border-l-error',
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed top-6 right-6 z-[10000] pointer-events-none">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, x: 16 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -16, x: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={classNames(
              'pointer-events-auto bg-white rounded-xl shadow-2xl px-4 py-3 flex items-start gap-3 min-w-72 max-w-sm',
              stylesByVariant[variant],
            )}
            role="status"
            aria-live="polite"
          >
            <div className="text-green-500 mt-0.5">
              <FaCheckCircle size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-dark">{title}</p>
              {description && (
                <p className="text-xs text-gray-500 mt-0.5">{description}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="text-gray-400 hover:text-dark transition-colors"
            >
              <FaTimes size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
};
