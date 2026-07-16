import React from 'react';


interface RefStatusPosisi {
  nama_status_posisi: string;
}

interface Perusahaan {
  nama_perusahaan: string;
  alamat: string;
  logo: string;
}

interface Jadwal {
  tanggal_pendaftaran_awal: string;
  tanggal_pendaftaran_akhir: string;
}

interface GovernmentAgency {
  government_agency_name: string;
}

interface ProgramStudiItem {
  id: string;
  title: string;
}

interface JobPosition {
  id_posisi: string;
  posisi: string;
  deskripsi_posisi: string;
  jumlah_kuota: number;
  jumlah_terdaftar: number;
  program_studi: string; // Stringified JSON
  jenjang: string;        // Stringified JSON
  ref_status_posisi: RefStatusPosisi;
  perusahaan: Perusahaan;
  jadwal: Jadwal;
  government_agency: GovernmentAgency;
}

interface ResponseData {
  data: JobPosition[];
}



const responseData: ResponseData = {
  "data": [
    {
      "id_posisi": "a240c27e-c9e8-4eb9-8e22-b1b5dbb4d80c",
      "posisi": "Perawat",
      "deskripsi_posisi": "Mendukung pelaksanaan pelayanan keperawatan melalui pemberian asuhan keperawatan, pendokumentasian tindakan, penerapan keselamatan pasien, kolaborasi dengan tim kesehatan, serta pelayanan sesuai standar operasional prosedur rumah sakit. Wajib memiliki STR.\n\nBergabung di grup melalui tautan berikut: https://chat.whatsapp.com/LHMw8T7RKrM6br0UfGfmfd?mode=gi_t",
      "jumlah_kuota": 92,
      "jumlah_terdaftar": 12,
      "program_studi": "[{\"id\":\"1b10c018-7e0a-4f55-9d0d-07ffdbc1b12b\",\"title\":\"Keperawatan\"}]",
      "jenjang": "[\"Sarjana\",\"Profesi\",\"Diploma\"]",
      "ref_status_posisi": {
        "nama_status_posisi": "Terverifikasi"
      },
      "perusahaan": {
        "nama_perusahaan": "Rumah Sakit Umum Pusat Makassar",
        "alamat": "Jalan Metro Tanjung Bunga, Kawasan Center Point of Indonesia, Makassar",
        "logo": "https://maganghub.kemnaker.go.id/be/v1/storage/uploads/logo/2026/07/ff36e6c9-9169-4ad4-8a2a-2c4d7c9a373a.png",
      },
      "jadwal": {
        "tanggal_pendaftaran_awal": "2026-07-15 00:00:00",
        "tanggal_pendaftaran_akhir": "2026-07-28 23:59:59",
      },
      "government_agency": {
        "government_agency_name": "Kementerian Kesehatan"
      }
    },
    {
      "id_posisi": "a240c27e-c9e8-4eb9-8e22-b1b5dbb4d80c",
      "posisi": "Perawat",
      "deskripsi_posisi": "Mendukung pelaksanaan pelayanan keperawatan melalui pemberian asuhan keperawatan, pendokumentasian tindakan, penerapan keselamatan pasien, kolaborasi dengan tim kesehatan, serta pelayanan sesuai standar operasional prosedur rumah sakit. Wajib memiliki STR.\n\nBergabung di grup melalui tautan berikut: https://chat.whatsapp.com/LHMw8T7RKrM6br0UfGfmfd?mode=gi_t",
      "jumlah_kuota": 92,
      "jumlah_terdaftar": 12,
      "program_studi": "[{\"id\":\"1b10c018-7e0a-4f55-9d0d-07ffdbc1b12b\",\"title\":\"Keperawatan\"}]",
      "jenjang": "[\"Sarjana\",\"Profesi\",\"Diploma\"]",
      "ref_status_posisi": {
        "nama_status_posisi": "Terverifikasi"
      },
      "perusahaan": {
        "nama_perusahaan": "Rumah Sakit Umum Pusat Makassar",
        "alamat": "Jalan Metro Tanjung Bunga, Kawasan Center Point of Indonesia, Makassar",
        "logo": "https://maganghub.kemnaker.go.id/be/v1/storage/uploads/logo/2026/07/ff36e6c9-9169-4ad4-8a2a-2c4d7c9a373a.png",
      },
      "jadwal": {
        "tanggal_pendaftaran_awal": "2026-07-15 00:00:00",
        "tanggal_pendaftaran_akhir": "2026-07-28 23:59:59",
      },
      "government_agency": {
        "government_agency_name": "Kementerian Kesehatan"
      }
    },
  ]
};



const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
};

const extractWaLink = (text: string): string | null => {
  const match = text.match(/(https:\/\/chat\.whatsapp\.com\/[^\s]+)/);
  return match ? match[0] : null;
};

// ==========================================
// 4. MAIN COMPONENT
// ==========================================

export default function PremiumJobCard() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 flex flex-col items-center justify-start gap-6 font-sans">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        
        {responseData.data.map((item) => {
          // Parsing JSON dengan Type Casting agar aman di TS
          const listJenjang = JSON.parse(item.jenjang || '[]') as string[];
          const listJurusan = JSON.parse(item.program_studi || '[]') as ProgramStudiItem[];
          const waLink = extractWaLink(item.deskripsi_posisi);
          
          // Hitung persentase kuota terisi
          const percentFilled = Math.min(Math.round((item.jumlah_terdaftar / item.jumlah_kuota) * 100), 100);

          return (
            <div 
              key={item.id_posisi} 
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-5 relative overflow-hidden group"
            >
              {/* Aksentasi Top Border Halus */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* 1. Baris Atas: Logo & Info Instansi */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl border border-slate-100 bg-slate-50 p-2 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <img 
                    src={item.perusahaan.logo} 
                    alt="Logo Perusahaan" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => { 
                      // Mencegah error TS pada event target
                      (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=RS'; 
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate tracking-tight">{item.posisi}</h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708.522L3.511 11.72a.75.75 0 00.328.85l6.028 3.528a.75.75 0 00.766 0l6.028-3.528a.75.75 0 00.328-.85l-2.048-7.743a.75.75 0 00-.708-.522H6.267zm1.89 6.295a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                      {item.ref_status_posisi.nama_status_posisi}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-blue-600 mt-0.5">{item.government_agency.government_agency_name}</p>
                  <p className="text-sm text-slate-500 font-medium">{item.perusahaan.nama_perusahaan}</p>
                </div>
              </div>

              {/* 2. Baris Tengah: Info Utama (Gaji, Peluang, Deadline) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-slate-100 py-4 my-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Estimasi Gaji</span>
                    <span className="text-sm font-bold text-slate-800">Rp 3.880.137</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:border-x sm:border-slate-100 sm:px-4">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Peluang Kelulusan</span>
                    <span className="text-sm font-bold text-emerald-600">100%</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:pl-4">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Batas Pendaftaran</span>
                    <span className="text-sm font-bold text-slate-700">{formatDate(item.jadwal.tanggal_pendaftaran_akhir)}</span>
                  </div>
                </div>
              </div>

              {/* 3. Baris Info Detail */}
              <div className="space-y-3 text-sm">
                {/* Pendidikan */}
                <div className="flex items-start gap-2.5">
                  {/* <svg className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 "</svg> */}
                  <p className="text-slate-600">
                    <span className="font-medium text-slate-800">{listJenjang.join(', ')}</span>
                    <span className="text-slate-300 mx-2">•</span>
                    <span className="text-slate-600">{listJurusan.map(j => j.title).join(', ')}</span>
                  </p>
                </div>

                {/* Lokasi */}
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  <p className="text-slate-500 leading-relaxed text-xs md:text-sm">{item.perusahaan.alamat}</p>
                </div>

                {/* Syarat Khusus Highlight */}
                <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100/70 text-rose-900 text-xs flex items-center gap-2">
                  <svg className="w-4 h-4 text-rose-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                  <span>Syarat Krusial: <strong className="font-semibold text-rose-700">Wajib memiliki STR (Surat Tanda Registrasi).</strong></span>
                </div>
              </div>

              {/* 4. Progress Bar Kuota */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-500">
                  <span>Progress Kuota Pendaftar</span>
                  <span className="text-slate-700">{item.jumlah_terdaftar} dari {item.jumlah_kuota} Slot</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentFilled}%` }}
                  />
                </div>
              </div>

              {/* 5. Baris Tombol Aksi */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
                {waLink && (
                  <a 
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4 text-emerald-600 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.068 1.95 11.48 1.95c-5.44 0-9.866 4.372-9.87 9.802 0 1.688.45 3.336 1.303 4.79l-.993 3.63 3.733-.978zm13.142-5.14c-.31-.156-1.838-.907-2.121-1.01-.283-.105-.49-.156-.697.156-.207.311-.804 1.01-1.01 1.243-.207.234-.415.26-.725.104-.312-.157-1.316-.485-2.507-1.548-.927-.827-1.553-1.85-1.735-2.16-.182-.312-.02-.48.135-.635.14-.14.312-.363.467-.545.156-.182.208-.312.312-.52.104-.207.052-.39-.026-.546-.078-.156-.697-1.678-.954-2.302-.25-.6-.527-.516-.725-.526l-.62-.01c-.208 0-.546.077-.83.39-.283.312-1.084 1.065-1.084 2.597 0 1.532 1.114 3.01 1.27 3.219.155.207 2.193 3.349 5.313 4.697.74.32 1.318.51 1.77.654.743.236 1.42.203 1.954.123.595-.088 1.838-.75 2.096-1.477.258-.727.258-1.35.18-1.477-.077-.128-.282-.207-.593-.364z"/></svg>
                    Gabung Grup WA
                  </a>
                )}
                <button className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm shadow-blue-200">
                  Lamar Sekarang
                </button>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}