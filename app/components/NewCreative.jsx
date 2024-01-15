"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExistingCreative,
  genCreativeRes,
  createNewCreative,
} from "@/utils/action";

import { LuArrowUpSquare } from "react-icons/lu";
import CreativeInfo from "./CreativeInfo";
import toast from "react-hot-toast";

const NewCreative = () => {
  const {
    mutate,
    isPending,
    data: creative,
  } = useMutation({
    mutationFn: async (dest) => {
      const newCreative = await genCreativeRes(dest);
      if (newCreative) {
        return newCreative;
      }
      toast.error("No matching content found...");
      return null;
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dest = Object.fromEntries(formData.entries());
    mutate(dest);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">What do you want to create?</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input input-bordered join-item w-full"
            placeholder="Create content"
            name="genContent"
            required
          />
          <button className="btn btn-primary join-item" type="submit">
            <LuArrowUpSquare className="text-2xl" />
          </button>
        </div>
      </form>
      <div className="mt-16">
        {creative ? <CreativeInfo content={creative} /> : null}
      </div>
    </>
  );
};

export default NewCreative;
