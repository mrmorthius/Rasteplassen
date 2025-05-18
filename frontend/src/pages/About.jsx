import React from "react";

function About() {
  return (
    <header className="bg-white">
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-[#f9f9f9] flex flex-col text-center rounded-lg p-4 mb-4">
          <h3 className="text-base/7 font-semibold text-gray-900 mb-3">
            Om oss
          </h3>

          <p>
            Denne nettsiden er laget av to studenter ved Backend-linjen på
            Gokstad akademiet. Vi så et behov for å gjøre rasteplasser mer
            tilgjengelig. Vi har samlet informasjon fra Vegvesenet og tilføyd
            egne rasteplasser, alt for å gi en best mulig oversikt.
            Nettløsningen bygger på vårt eget REST API. Vi har i løpet av
            prosessen lært mye og ser fortløpende muligheter for videre
            utvikling av prosjektet.
          </p>
        </div>
      </main>
    </header>
  );
}

export default About;
