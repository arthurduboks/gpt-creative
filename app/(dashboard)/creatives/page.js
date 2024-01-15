import AllCreatives from "@/app/components/AllCreatives";
import { getAllCreatives } from "@/utils/action";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const AllCreativesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["allContent", ""],
    queryFn: () => getAllCreatives(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllCreatives />
    </HydrationBoundary>
  );
};

export default AllCreativesPage;
