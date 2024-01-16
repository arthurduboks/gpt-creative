import CreativeInfo from "@/app/components/CreativeInfo";
import { getSingleCreative } from "@/utils/action";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

const SingleCreativePage = async ({ params }) => {
  const content = await getSingleCreative(params.id);
  if (!content) {
    redirect("/creatives");
  }
  return (
    <div>
      <Link href="/creatives" className="btn btn-secondary mb-12">
        Back To Creatives
      </Link>
      <CreativeInfo content={content} />
    </div>
  );
};

export default SingleCreativePage;
