import { PopUp } from "@/components/utils/AlertDialog";
import { useGetLoker } from "@/hooks/useGet";
import { gaji, KodeProvinsi } from "@/lib/types";
import { Button } from "@base-ui/react";
import React, { useState, ChangeEvent, useMemo, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagitantion";
import AffirmationPopup from "@/components/AfirmationPopup";
import { useFilterStore } from "@/lib/store";

interface ProgramStudi {
  id: string;
  title: string;
}

export default function Index() {
  // State Input Filter
  const {
    searchKeyword,
    selectedProvinsi,
    selectedKota,
    selectedJurusan,
    page,
    setSearchKeyword,
    setSelectedProvinsi,
    setSelectedKota,
    setSelectedJurusan,
    setPage,
  } = useFilterStore();
  const [count, setCount] = useState(0);

  // 1. HIT API MENGGUNAKAN PARAMS (PROVINSI & KOTA)
  const { data, isLoading } = useGetLoker(
    selectedProvinsi,
    selectedKota,
    searchKeyword,
    page,
    100,
    count,
  );

  const total = data?.meta?.pagination?.last_page ?? 0;

  const curentPage = data?.meta?.pagination?.current_page ?? 0;

  const visiblePages = (() => {
    const pages: (number | string)[] = [];

    const start = Math.max(1, curentPage - 3);
    const end = Math.min(total, curentPage + 3);

    // Halaman pertama
    if (start > 1) {
      pages.push(1);

      if (start > 2) {
        pages.push("...");
      }
    }

    // Halaman sekitar current page
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Halaman terakhir
    if (end < total) {
      if (end < total - 1) {
        pages.push("...");
      }

      pages.push(total);
    }

    return pages;
  })();

  // Helper untuk mendapatkan daftar kabupaten berdasarkan kode provinsi
  function getKodeKabupaten() {
    const dataProv = KodeProvinsi.data;
    return dataProv
      .filter((item) => item.ref_propinsi.kode_propinsi === selectedProvinsi)
      .sort(
        (a, b) => Number(a.kode_kabupaten || 0) - Number(b.kode_kabupaten || 0),
      )
      .map((item) => ({
        id_kabupaten: item.id_kabupaten,
        kode_kabupaten: item.kode_kabupaten,
        nama_kabupaten: item.nama_kabupaten,
      }));
  }

  // 2. EXTRACT OPSI JURUSAN SECARA DINAMIS DARI DATA API YANG MASUK
  const filterOptions = useMemo(() => {
    const jurs = new Set<string>();

    if (data?.data) {
      data.data.forEach((item: any) => {
        try {
          if (item.program_studi) {
            const parsedJurusan: ProgramStudi[] = JSON.parse(
              item.program_studi,
            );
            parsedJurusan.forEach((j) => jurs.add(j.title));
          }
        } catch (e) {
          console.error("Gagal parse prodi untuk opsi filter", e);
        }
      });
    }

    return {
      jurusan: Array.from(jurs),
    };
  }, [data?.data]);

  // 3. PROSES FILTER CLIENT-SIDE (FRONTEND ONLY) UNTUK KEYWORD & JURUSAN
  const clientFilteredJobs = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((item: any) => {
      // Filter Frontend: Keyword pencarian
      const matchKeyword =
        searchKeyword === "" ||
        item.posisi?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.perusahaan?.nama_perusahaan
          ?.toLowerCase()
          .includes(searchKeyword.toLowerCase());

      // Filter Frontend: Jurusan (Mencari di dalam stringified JSON array)
      let matchJurusan = selectedJurusan === "";
      if (!matchJurusan && item.program_studi) {
        try {
          const parsedJurusan: ProgramStudi[] = JSON.parse(item.program_studi);
          matchJurusan = parsedJurusan.some((j) => j.title === selectedJurusan);
        } catch {
          matchJurusan = false;
        }
      }

      return matchKeyword && matchJurusan;
    });
  }, [data?.data, searchKeyword, selectedJurusan]);

  const handleResetFilter = () => {
    setSelectedProvinsi("");
    setSelectedKota("");
    setSelectedJurusan("");
    setSearchKeyword("");
    setPage(1);
  };

  const formatDate = (dateTimeStr: string) => {
    if (!dateTimeStr) return "-";
    return dateTimeStr.split(" ")[0];
  };

  const kodeProvinsiOptions = [
    ...new Map(
      KodeProvinsi.data.map((item) => [item.ref_propinsi.kode_propinsi, item]),
    ).values(),
  ].sort(
    (a, b) =>
      Number(a.ref_propinsi.kode_propinsi) -
      Number(b.ref_propinsi.kode_propinsi),
  );

  const kodeKabupatenOptions = getKodeKabupaten();

  function formatPoin(text: string) {
    return text
      .split(".")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item, index) => `${index + 1}. ${item}`)
      .join("\n");
  }

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/\//g, "-") // "/" -> "-"
      .replace(/[^\w\s-]/g, "") // hapus karakter selain huruf, angka, spasi, "-"
      .replace(/\s+/g, "-") // spasi -> "-"
      .replace(/-+/g, "-"); // gabungkan "-" yang berurutan
  }

  const cekJurusan = filterOptions.jurusan.some(
    (item) => item === selectedJurusan,
  );

  const getGaji = (idRegency: string) => {
    const result = gaji?.data?.find(
      (item: any) => item.regency_id === idRegency,
    );
    return result?.amount;
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 antialiased">
      <AffirmationPopup />
      {/* HEADER MINI COMPACT */}
      <header className="bg-white border-b border-slate-200/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Portal Magang Pacar Aku ❤️
            </h1>
            <p className="text-slate-400 text-xs font-medium mt-0.5">
              Selamat datang, sayang. Semoga harimu selalu penuh kebahagiaan,
              semangat, dan senyuman. Aku selalu bangga sama kamu. 🤍
            </p>
          </div>

          {/* KEYWORD SEARCH INPUT (FRONTEND FILTER) */}
          <div className="w-full md:w-80 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Cari posisi..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 placeholder:text-slate-400 transition-colors"
              value={searchKeyword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchKeyword(e.target.value)
              }
            />
          </div>
        </div>
      </header>

      {/* CONTAINER UTAMA LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* ================= BAR FILTER PANEL (KIRI) ================= */}
          <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  Filter Spesifikasi
                </h3>
                {(selectedProvinsi ||
                  selectedKota ||
                  selectedJurusan ||
                  searchKeyword) && (
                  <button
                    onClick={handleResetFilter}
                    className="text-[11px] font-bold text-rose-600 hover:text-rose-700 transition-colors"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              {/* Filter Dropdown: Provinsi (Trigger Re-fetch API) */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Provinsi
                </label>
                <select
                  value={selectedProvinsi}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setSelectedProvinsi(e.target.value);
                    setSelectedKota(""); // Reset kota jika provinsi berubah
                  }}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="">Semua Provinsi</option>
                  {kodeProvinsiOptions.map((p) => (
                    <option
                      key={p.id_propinsi}
                      value={p.ref_propinsi.kode_propinsi}
                    >
                      {p.ref_propinsi.nama_propinsi}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Dropdown: Kota (Trigger Re-fetch API) */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Kota / Kabupaten
                </label>
                <select
                  value={selectedKota}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setSelectedKota(e.target.value)
                  }
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="">Semua Kota</option>
                  {kodeKabupatenOptions.map((k) => (
                    <option key={k.id_kabupaten} value={k.kode_kabupaten ?? ""}>
                      {k.nama_kabupaten}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter Dropdown: Jurusan (FRONTEND ONLY) */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Jurusan / Program Studi
                </label>
                <select
                  value={selectedJurusan}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setSelectedJurusan(e.target.value)
                  }
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-2.5 py-2 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="">Semua Jurusan</option>
                  {filterOptions.jurusan.map((j) => (
                    <option key={j} value={j}>
                      {j === "Psikologi" ? "Jurusan Pacar Aku ❤️❤️❤️" : j}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ================= CONTAINER DAFTAR KARTU (KANAN) ================= */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Daftar Lowongan Kerja Tersedia ({clientFilteredJobs.length})
              </span>
            </div>

            <div className="p-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => curentPage > 1 && setPage(curentPage - 1)}
                      className={
                        curentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {visiblePages.map((p, index) => (
                    <PaginationItem key={index}>
                      {p === "..." ? (
                        <span className="px-2">...</span>
                      ) : (
                        <PaginationLink
                          onClick={() => setPage(Number(p))}
                          isActive={curentPage === p}
                          className="cursor-pointer"
                        >
                          {p}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        curentPage < total && setPage(curentPage + 1)
                      }
                      className={
                        curentPage === total
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            {clientFilteredJobs.length > 0 ? (
              clientFilteredJobs.map((item: any) => {
                let prodList: ProgramStudi[] = [];
                let jenjangList: string[] = [];
                try {
                  if (item.program_studi)
                    prodList = JSON.parse(item.program_studi);
                  if (item.jenjang) jenjangList = JSON.parse(item.jenjang);
                } catch (e) {
                  console.error("Gagal melakukan parse payload row item", e);
                }

                const percentFilled = Math.min(
                  Math.round(
                    ((item.jumlah_terdaftar || 0) / (item.jumlah_kuota || 1)) *
                      100,
                  ),
                  100,
                );

                const registered = item.jumlah_terdaftar || 0;
                const quota = item.jumlah_kuota || 0;
                const acceptanceChance =
                  registered === 0
                    ? 100
                    : Math.min(Math.round((quota / registered) * 100), 100);

                return (
                  <div
                    key={item.id_posisi}
                    className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 relative overflow-hidden group"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-blue-600 opacity-80" />

                    {/* Sektor Kiri */}
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

                      <div className="min-w-0 space-y-0.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-slate-900  group-hover:text-blue-600 transition-colors">
                            {item.posisi}
                          </h3>

                          {item.government_agency?.government_agency_name && (
                            <span className="inline-flex text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded-md">
                              {item.government_agency.government_agency_name}
                            </span>
                          )}
                        </div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                            💰 Rp {Number(getGaji(item?.perusahaan?.kode_kabupaten)).toLocaleString("id-ID")}
                          </span>

                        <p className="text-xs font-bold text-slate-600">
                          {item.perusahaan?.nama_perusahaan}
                        </p>

                        {/* ========================================== */}
                        {/* TAMBAHAN: ALAMAT LENGKAP PERUSAHAAN        */}
                        {/* ========================================== */}
                        <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1 max-w-[90%] truncate">
                          <svg
                            className="w-3 h-3 flex-shrink-0 text-slate-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                          <span className="truncate">
                            {item.perusahaan?.alamat || "Alamat tidak tersedia"}
                          </span>
                        </p>

                        <p className="text-[11px] text-slate-400 font-medium">
                          {jenjangList.join(", ")} —{" "}
                          <span className="text-slate-500 font-semibold">
                            {prodList.map((p) => p.title).join(", ")}
                          </span>
                        </p>

                        <PopUp
                          buttonTrigger={
                            <button className="text-[10px] font-bold text-blue-400 hover:text-blue-500 transition-colors border border-blue-200 px-2 py-0.5 rounded-md mt-1">
                              Deskripsi Pekerjaan
                            </button>
                          }
                          text={formatPoin(String(item.deskripsi_posisi))}
                        />
                      </div>
                    </div>

                    {/* Sektor Kanan */}
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
                      {/* Informasi Lokasi */}
                      <div className="text-left md:text-right min-w-[150px] space-y-0.5">
                        <span className="text-xs font-bold text-slate-700 block truncate">
                          {item.perusahaan?.nama_kabupaten || "-"}
                        </span>

                        <span className="text-[10px] font-bold text-slate-400 uppercase block">
                          {item.perusahaan?.nama_provinsi || "-"}
                        </span>

                        <span className="text-[10px] text-amber-600 font-bold block">
                          Batas:{" "}
                          {formatDate(item.jadwal?.tanggal_pendaftaran_akhir)}
                        </span>
                      </div>

                      {/* Statistik */}
                      <div className="w-full md:w-44 space-y-2">
                        {/* Kuota */}
                        <div>
                          <div className="flex justify-between text-[10px] font-bold text-slate-500">
                            <span>Kuota</span>
                            <span>
                              {registered}/{quota}
                            </span>
                          </div>

                          <div className="mt-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                              style={{ width: `${percentFilled}%` }}
                            />
                          </div>
                        </div>

                        {/* Peluang Lolos */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-emerald-700">
                              🎯 Peluang Lolos
                            </span>

                            <span className="text-sm font-extrabold text-emerald-600">
                              {acceptanceChance}%
                            </span>
                          </div>

                          <p className="text-[9px] text-emerald-600 mt-1">
                            Berdasarkan rasio kuota dan jumlah pendaftar saat
                            ini.
                          </p>
                        </div>
                      </div>

                      {/* Tombol */}
                      <div className="w-full md:w-auto flex justify-end">
                        <button
                          onClick={() =>
                            window.open(
                              `https://maganghub.kemnaker.go.id/magang-nasional/lowongan/${slugify(item.posisi)}-${item.id_posisi}`,
                              "_blank",
                            )
                          }
                          className="whitespace-nowrap w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
                        >
                          Lamar Magang
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : isLoading ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400 text-xs font-semibold">
                Tungguu dulu ya bebb bentar hehe 😋😋😋
              </div>
            ) : clientFilteredJobs.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400 text-xs font-semibold">
                Halaman ini ga ada datanya bebb 🥺🥺🥺
              </div>
            ) : data?.data?.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400 text-xs font-semibold">
                <p>
                  mmmm Maaf sayangg srvernya errorr 🥺🥺🥺, coba refreshh lagi
                  bebb
                </p>
                <Button
                  onClick={() => setCount(count + 1)}
                  className="mt-4 border p-2 rounded-md bg-blue-600 text-white"
                >
                  Refreshh disini bebb
                </Button>
              </div>
            ):(
              <div></div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
