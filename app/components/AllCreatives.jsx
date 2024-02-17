"use client";

import { getAllCreatives } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import CreativesList from "./CreativesList";
import { useState } from "react";

const AllCreatives = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["allContent", searchValue],
    queryFn: () => getAllCreatives(searchValue),
  });
  return (
    <>
      <form className="max-w-lg mb-12 pt-5">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Search your content..."
            className="input input-bordered join-item w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button
            className="btn btn-primary join-item"
            type="button"
            disabled={isPending}
            onClick={() => setSearchValue("")}
          >
            {isPending ? "Searching" : "reset"}
          </button>
        </div>
        <p className="text-sm italic px-2 py-1 inline-block border-l-4 border-yellow-500 mt-4">
          You will find your content history here.
        </p>
      </form>
      {isPending ? (
        <span className="loading"></span>
      ) : (
        <CreativesList data={data} />
      )}
    </>
  );
};

export default AllCreatives;
