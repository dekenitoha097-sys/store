"use client";

import { useState, useEffect, ReactNode } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "warning" | "info";
};

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  onCancel,
  type = "danger",
}: ConfirmModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-fade-in-up">
        {/* Icon */}
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
          ${type === "danger" ? "bg-red-100" : ""}
          ${type === "warning" ? "bg-amber-100" : ""}
          ${type === "info" ? "bg-blue-100" : ""}
        `}>
          {type === "danger" && (
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
          {type === "warning" && (
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )}
          {type === "info" && (
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
          {title}
        </h3>
        <p className="text-gray-500 text-center mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`
              flex-1 px-4 py-3 text-white font-semibold rounded-xl transition-colors
              ${type === "danger" ? "bg-red-500 hover:bg-red-600" : ""}
              ${type === "warning" ? "bg-amber-500 hover:bg-amber-600" : ""}
              ${type === "info" ? "bg-blue-500 hover:bg-blue-600" : ""}
            `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook pour gérer les modals de confirmation
export function useConfirmModal() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "danger" | "warning" | "info";
    onConfirm: (() => void) | null;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "danger",
    onConfirm: null,
  });

  const confirm = (config: {
    title: string;
    message: string;
    type?: "danger" | "warning" | "info";
    onConfirm: () => void;
  }) => {
    setModalState({
      isOpen: true,
      title: config.title,
      message: config.message,
      type: config.type || "danger",
      onConfirm: config.onConfirm,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm();
    }
    closeModal();
  };

  return {
    confirm,
    closeModal,
    modalProps: {
      isOpen: modalState.isOpen,
      title: modalState.title,
      message: modalState.message,
      type: modalState.type,
      onConfirm: handleConfirm,
      onCancel: closeModal,
    },
  };
}
