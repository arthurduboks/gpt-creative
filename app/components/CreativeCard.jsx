import Link from "next/link";

const CreativeCard = ({ content }) => {
  const { genContent, id } = content;
  return (
    <Link
      href={`/creatives/${id}`}
      className="card card-compact rounded-xl bg-base-100"
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title text-center capitalize">{genContent}</h2>
      </div>
    </Link>
  );
};

export default CreativeCard;
