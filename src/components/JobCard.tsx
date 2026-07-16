import { useGetLoker } from "@/hooks/useGet";
import { KodeProvinsi } from "@/lib/types";
import React, { useState, ChangeEvent, useMemo, useEffect } from "react";

interface ProgramStudi {
  id: string;
  title: string;
}

// ==========================================
// KSPOMPONEN KARTU JOB (LOCAL STATE UNTUK TOGGLE)
// ==========================================
interface JobCardProps {
  item: any;
  formatDate: (date: string) => string;
}

const JobCard = ({ item, formatDate }: JobCardProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  let prodList: ProgramStudi[] = [];
  let jenjangList: string[] = [];
  try {
    if (item.program_studi) prodList = JSON.parse(item.program_studi);
    if (item.jenjang) jenjangList = JSON.parse(item.jenjang);
  } catch (e) {
    console.error("Gagal melakukan parse payload row item", e);
  }

  const percentFilled = Math.min(
    Math.round(((item.jumlah_terdaftar || 0) / (item.jumlah_kuota || 1)) * 100),
    100,
  );

  const isStrWajib = item.deskripsi_posisi?.toLowerCase().includes("str");

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col relative overflow-hidden group">
      {/* Aksen Warna Samping */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-600 opacity-80" />

      {/* Baris Konten Utama */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Sektor Kiri: Logo Perusahaan + Detail Judul */}
        <div className="flex items-center gap-4 flex-1 min-w-0 pl-1">
          <div className="w-12 h-12 rounded-xl border border-slate-100 bg-slate-50 p-1 flex items-center justify-center flex-shrink-0 shadow-inner">
            {item.perusahaan?.logo ? (
              <img
                src={item.perusahaan.logo}
                alt="Logo"
                className="max-w-full max-h-full object-contain rounded-md"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 text-slate-400 font-bold flex items-center justify-center text-xs">
                KMNK
              </div>
            )}
          </div>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                {item.posisi}
              </h3>
              {isStrWajib && (
                <span className="inline-flex text-[10px] font-black bg-rose-50 text-rose-600 border border-rose-200 px-1.5 py-0.5 rounded-md">
                  WAJIB STR
                </span>
              )}
              {item.government_agency?.government_agency_name && (
                <span className="inline-flex text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded-md">
                  {item.government_agency.government_agency_name}
                </span>
              )}
            </div>

            <p className="text-xs font-bold text-slate-600">
              {item.perusahaan?.nama_perusahaan}
            </p>

            <p className="text-[11px] text-slate-400 font-medium truncate">
              {jenjangList.join(", ")} —{" "}
              <span className="text-slate-500 font-semibold">
                {prodList.map((p) => p.title).join(", ")}
              </span>
            </p>

            {/* Tombol Toggle Detail Deskripsi */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 pt-1 transition-colors focus:outline-none"
            >
              {isExpanded ? (
                <>
                  Sembunyikan Deskripsi
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                </>
              ) : (
                <>
                  Lihat Deskripsi Detail
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sektor Kanan: Status Wilayah, Deadline, Pendaftar & Tombol Aksi */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
          <div className="text-left md:text-right min-w-[140px] space-y-0.5">
            <span className="text-xs font-bold text-slate-700 block truncate max-w-[180px]">
              {item.perusahaan?.nama_kabupaten || "-"}
            </span>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">
              {item.perusahaan?.nama_provinsi || "-"}
            </span>
            <span className="text-[10px] text-amber-600 font-bold block">
              Batas: {formatDate(item.jadwal?.tanggal_pendaftaran_akhir)}
            </span>
          </div>

          <div className="w-full md:w-24 space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-500">
              <span>Kuota</span>
              <span>
                {item.jumlah_terdaftar || 0}/{item.jumlah_kuota || 0}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full"
                style={{ width: `${percentFilled}%` }}
              />
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-end">
            <button className="whitespace-nowrap w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm">
              Lamar Magang
            </button>
          </div>
        </div>
      </div>

      {/* Bagian Deskripsi yang di-Expand */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 font-medium whitespace-pre-line leading-relaxed pl-1 animate-fadeIn">
          <h4 className="font-bold text-slate-800 mb-1.5 text-[11px] uppercase tracking-wider">
            Deskripsi Posisi Kerja:
          </h4>
          {item.deskripsi_posisi || "Tidak ada rincian deskripsi untuk posisi ini."}
        </div>
      )}
    </div>
  );
};

export default JobCard;

// ==========================================
// MAIN PORTAL COMPONENT
// ==========================================
