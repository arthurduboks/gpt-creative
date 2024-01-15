import CreativeCard from "./CreativeCard";

const CreativesList = ({ data }) => {
  if (data.length === 0)
    return <h4 className="text-lg">No content found...</h4>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {data.map((content) => {
        return <CreativeCard key={content.id} content={content} />;
      })}
    </div>
  );
};

export default CreativesList;
