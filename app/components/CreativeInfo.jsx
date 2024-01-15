const CreativeInfo = ({ content }) => {
  const { title, description, suggestions } = content;

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-semibold mb-4">{title}</h1>
      <p className="leading-loose mb-6">{description}</p>
      <ul>
        {suggestions.map((suggestion) => {
          return (
            <li key={suggestion} className="mb-4 bg-base-100 p-4 rounded-xl">
              {suggestion}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CreativeInfo;
