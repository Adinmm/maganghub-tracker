import React, { useState } from "react";

interface PopUpProps {
  buttonTrigger: React.ReactNode;
  text: string;
}

export function PopUp({ buttonTrigger, text }: PopUpProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* 1. TRIGGER ELEMENT */}
      <span onClick={handleOpen} className="cursor-pointer inline-block w-full md:w-auto">
        {buttonTrigger}
      </span>

      {/* 2. MODAL OVERLAY & CONTENT */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          {/* Latar Belakang Gelap (Overlay Shadow) */}
          <div 
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-none transition-opacity" 
            onClick={handleClose} 
          />

          {/* Kotak Dialog Konten */}
          {/* pr-10 diberikan agar teks panjang tidak menabrak tombol X di kanan atas */}
          <div className="relative bg-white border border-slate-200/80 rounded-2xl max-w-md w-full p-5 pr-10 shadow-xl transition-all flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Tombol Close (X) Pojok Kanan Atas */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-1 transition-all focus:outline-none"
              aria-label="Close dialog"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Konten / Deskripsi */}
            <div className="space-y-1 text-left">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Detail Deskripsi
              </h3>
              <p className="text-xs font-medium text-slate-500 leading-relaxed whitespace-pre-line">
                {text || "Tidak ada rincian deskripsi untuk posisi ini."}
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}