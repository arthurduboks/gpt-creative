import NewCreative from "@/app/components/NewCreative";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const NewCreativePage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewCreative />
    </HydrationBoundary>
  );
};

export default NewCreativePage;
