import React from "react";

export default function GoogleMap({ latitude, longitude }) {
  return (
    <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <dt className="text-sm/6 font-medium text-gray-900">
        Google Maps - Vegbeskrivelse
      </dt>
      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
        {latitude && longitude ? (
          <a
            className="font-medium text-indigo-600 hover:text-indigo-500"
            target="_blank"
            href={
              "https://www.google.com/maps/search/?api=1&query=" +
              latitude +
              "," +
              longitude
            }
          >
            Lenke
          </a>
        ) : (
          "Ingen lenke funnet"
        )}
      </dd>
    </div>
  );
}
