import React from "react";

export default function Vegvesen({ vegvesen_id }) {
  if (vegvesen_id && vegvesen_id !== null) {
    return (
      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm/6 font-medium text-gray-900">Vegvesenet</dt>
        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
          <a
            className="font-medium text-indigo-600 hover:text-indigo-500"
            target="_blank"
            href={
              "https://vegkart.atlas.vegvesen.no/?objektType=39&vegobjekt=" +
              vegvesen_id +
              "#kartlag:geodata/@600000,7162941,4/valgt:" +
              vegvesen_id +
              ":39"
            }
          >
            Lenke
          </a>
        </dd>
      </div>
    );
  }
}
