import { useQuery } from "@tanstack/react-query";
import { authAxios } from "../../../API/AxiosConfig";

const getUserWishList = async () => {
  const res = await authAxios.get(`/wishlist`);
  return res.data;
};

const useGetUserWishList = () => {
  const query = useQuery({
    queryFn: () => getUserWishList(),
    queryKey: ["WishListItems"],
    staleTime: 0.5 * (1000 * 60),
  });
  return query;
};

export default useGetUserWishList;
