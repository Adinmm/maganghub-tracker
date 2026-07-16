import React, { useState, useEffect, useMemo } from "react";

const affirmations = [
  {
    title: "🌸 Semangat, Sayang!",
    message:
      "Aku tahu proses mencari magang itu tidak mudah. Tapi aku percaya kamu punya kemampuan dan semangat yang luar biasa. Tetap berusaha ya, setiap langkahmu hari ini sedang membawamu lebih dekat ke impianmu. ❤️",
  },
  {
    title: "💌 Untuk Kamu",
    message:
      "Jangan takut mencoba dan jangan takut ditolak. Setiap lamaran adalah kesempatan baru untuk belajar dan berkembang. Aku selalu bangga dengan setiap usaha yang kamu lakukan. 🤍",
  },
  {
    title: "✨ Afirmasi Hari Ini",
    message:
      "Aku mampu. Aku terus berkembang. Aku pantas mendapatkan kesempatan terbaik. Aku percaya hasil baik akan datang pada waktu yang tepat. 🌷",
  },
  {
    title: "🌈 Percaya Pada Dirimu",
    message:
      "Kalau hari ini terasa berat, istirahat sebentar boleh, menyerah jangan. Aku yakin perusahaan yang tepat akan melihat potensi hebat yang ada dalam dirimu. 💖",
  },
  {
    title: "💼 Satu Langkah Lagi",
    message:
      "Terus kirim lamaran, terus belajar, dan terus percaya pada proses. Kesempatan terbaik sering datang setelah kita tidak berhenti mencoba. 🚀",
  },
  {
    title: "🫶 Aku Bangga Sama Kamu",
    message:
      "Bukan hanya karena nanti kamu diterima magang, tapi karena kamu berani mencoba, terus belajar, dan tidak berhenti mengejar impianmu. Itu sudah luar biasa. ❤️",
  },
  {
    title: "🌷 Jangan Lupa Tersenyum",
    message:
      "Apa pun hasilnya nanti, itu tidak menentukan nilai dirimu. Kamu tetap seseorang yang hebat, baik, dan pantas mendapatkan kesempatan terbaik. Aku selalu mendukungmu. 🥰",
  },
  {
    title: "☀️ Hari Ini Akan Baik",
    message:
      "Semoga hari ini membawa kabar baik, semangat baru, dan kesempatan yang selama ini kamu tunggu. Semangat ya, sayang. Aku percaya kamu pasti bisa. 💕",
  },
];

export default function AffirmationPopup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Mengambil 1 afirmasi acak secara unik pada saat komponen pertama kali dirender
  const affirmation = useMemo(() => {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
  }, []);

  useEffect(() => {
    // Cek apakah di sesi ini user sudah pernah menutup popup
    const hasSeenAffirmation = sessionStorage.getItem("showAffirmation");

    // Jika belum pernah ditutup (belum ada flag 'false' di sessionStorage)
    if (hasSeenAffirmation !== "false") {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, []);

  // Fungsi untuk menutup popup & menyimpan status ke sessionStorage
  const handleClose = () => {
    sessionStorage.setItem("showAffirmation", "false");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300">
      
      {/* CARD CONTAINER */}
      <div className="relative bg-gradient-to-b from-white to-rose-50/50 rounded-3xl shadow-2xl border border-pink-100 max-w-sm w-full p-6 text-center transform scale-100 transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
        
        {/* Dekorasi Floating Icon di Atas */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-rose-100 rounded-full border-4 border-white shadow-md flex items-center justify-center text-4xl animate-bounce">
          💝
        </div>

        {/* Konten Teks */}
        <div className="mt-8 space-y-3.5">
          <h3 className="text-lg font-black text-rose-600 tracking-tight">
            {affirmation.title}
          </h3>
          <p className="text-slate-600 text-xs leading-relaxed font-semibold px-2">
            "{affirmation.message}"
          </p>
        </div>

        {/* Tombol Penutup yang Cute */}
        <div className="mt-6">
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-xs py-3 px-6 rounded-2xl shadow-lg shadow-rose-500/20 transition-all active:scale-95 duration-150"
          >
            Aamiin, Makasih Sayang! 🥰❤️
          </button>
        </div>
      </div>
    </div>
  );
}