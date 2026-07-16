import { axiosInstance } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetLoker = (kodeProvinsi: string, kodeKabupaten: string, keyword: string, page: number, limit: number, hit:number) => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ["loker", kodeProvinsi, kodeKabupaten, keyword, page, limit, hit],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `?page=${page}&limit=${limit}&order_by=jumlah_kuota&order_direction=DESC&keyword=&kode_provinsi=${kodeProvinsi}&kode_kabupaten=${kodeKabupaten}&program_studi=&keyword=${keyword}`,
      );
      return response.data;
    },

  });

  return {
    data,
    isLoading,
    isError
  };
};
