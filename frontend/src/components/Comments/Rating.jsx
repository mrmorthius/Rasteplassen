import React, { useState } from "react";

export default function Rating({ slug, setGiveRating }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const createData = async () => {
    var data = {
      rasteplass_id: slug,
      bruker_id: 1,
      vurdering: stars,
      kommentar: comment,
    };
    console.log(data);
    // await createRating(data);
  };

  return (
    <div className="bg-[#f9f9f9] flex flex-col items-center rounded-lg p-4   mb-4 w-full">
      <div className="flex self-end mt-0">
        <button
          className="cursor-pointer hover:bg-[#f0f0f0] rounded-md px-2 text-gray-500"
          onClick={() => setGiveRating(false)}
        >
          X
        </button>
      </div>
      <div className="w-[70%]">
        <div className="bg-white rounded-md border-2 border-gray-100 p-2">
          <textarea
            placeholder="Vurdering"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="w-full"
          />
        </div>
        <div className="flex w-full justify-between py-1.5">
          <div>
            <label className="text-sm text-gray-500 pl-2">Stjerner: </label>
            <select
              className="text-gray-500 "
              defaultValue={5}
              onChange={(e) => setStars(e.target.value)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setGiveRating(false)}
              className="flex justify-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-gray/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => createData()}
              className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
