import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen mt-6">
      <h1 className="text-3xl text-center align-middle mb-5">
        Side ikke funnet
      </h1>
      <p className="text-center">
        Det ser ikke ut til at denne siden viser til noe innhold. Prøv å gå til
        en annen side.
      </p>
    </div>
  );
}
