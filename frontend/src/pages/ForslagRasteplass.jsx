import React, { useState, useEffect } from "react";
import useProposalPlace from "../hooks/useProposalPlace";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import WebMapMini from "../components/Map/WebMapMini";
import WebmapSelect from "../components/Map/WebMapSelect";
import useProposalApi from "../hooks/useProposalApi";
import useValidateToken from "../hooks/useValidateToken";
import Popup from "reactjs-popup";

function ForslagRasteplass({ token, logout }) {
  const { isValidated, isLoading } = useValidateToken(token, logout);
  const { slug } = useParams();
  const { place, loading } = useProposalPlace(slug, token);
  const [time, setTime] = useState(null);
  const { deletePlace, updatePlace, acceptPlace, result } = useProposalApi();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [info, setInfo] = useState("");
  const [trash, setTrash] = useState("");
  const [toilet, setToilet] = useState(false);
  const [access, setAccess] = useState(false);
  const [county, setCounty] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [vegvesen, setVegvesen] = useState(0);
  const navigate = useNavigate();

  const countys = [
    "Akershus",
    "Oslo",
    "Vestland",
    "Rogaland",
    "Trøndelag",
    "Innlandet",
    "Agder",
    "Østfold",
    "Møre og Romsdal",
    "Buskerud",
    "Vestfold",
    "Nordland",
    "Telemark",
    "Troms",
    "Finnmark",
  ];

  useEffect(() => {
    if (place) {
      setName(place.rasteplass_navn ?? "");
      setType(place.rasteplass_type ?? "");
      setInfo(place.rasteplass_informasjon ?? "");
      setTrash(place.rasteplass_renovasjon ?? "");
      setToilet(Boolean(place.rasteplass_toalett ?? false));
      setAccess(place.rasteplass_tilgjengelig ?? false);
      setCounty(place.geo_fylke ?? "");
      setMunicipality(place.geo_kommune ?? "");
      setCoordinates([place.rasteplass_lat ?? 0, place.rasteplass_long ?? 0]);
      setVegvesen(place.vegvesen_id ?? 0);
    }
  }, [place]);

  useEffect(() => {
    if (place) {
      const formattedDate = new Date(place.laget)
        .toLocaleString()
        .replace(",", "");
      setTime(formattedDate);
    }
  }, [place, setTime]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (window.confirm("Bekreft oppdatering av rasteplass")) {
      const rasteplass = {
        forslag_id: slug,
        rasteplass_navn: name,
        rasteplass_type: type,
        rasteplass_informasjon: info,
        geo_fylke: county,
        geo_kommune: municipality,
        rasteplass_toalett: toilet,
        rasteplass_renovasjon: trash,
        rasteplass_tilgjengelig: access,
        vegvesen_id: vegvesen ? vegvesen : 0,
        rasteplass_lat: coordinates[0],
        rasteplass_long: coordinates[1],
      };

      await updatePlace(rasteplass);
      if (result.success === false) {
        // console.log(result.message);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bekreft sletting av rasteplass")) {
      await deletePlace(slug);
      if (result.success === false) {
        // console.log(result.message);
      }
      navigate("/admin");
    }
  };

  const handleAccept = async () => {
    if (!name || !type || !county || !municipality) {
      window.alert("Navn, type, fylke og kommune må være utfylt.");
      return;
    }
    if (window.confirm("Bekreft opprettelse av rasteplass")) {
      await acceptPlace(slug);
      await deletePlace(slug);
      navigate("/admin");
    }
  };

  return (
    <>
      <header className="bg-white">{isLoading && <div>Loading...</div>}</header>
      {!isLoading && isValidated && (
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          {loading && <div>Loading...</div>}
          <form onSubmit={(e) => handleUpdate(e)}>
            {!loading && place && (
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 ml-12">
                Forslag - {name}{" "}
                <Popup
                  setName={setName}
                  trigger={
                    <button type="button">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#666666"
                      >
                        <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                      </svg>
                    </button>
                  }
                  position="center center"
                >
                  {(close) => (
                    <>
                      <div className="bg-[#f9f9f9] shadow-2xl">
                        <input
                          className="pl-1"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              close();
                            }
                          }}
                        ></input>
                        <button
                          className="absolute top-1 right-2 gap-x-2 p-1 w-12 h-3 text-xs z-[401] cursor-pointer"
                          onClick={close}
                        >
                          Lukk
                        </button>
                      </div>
                    </>
                  )}
                </Popup>
              </h1>
            )}
            {!loading && place === null && (
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Ingen rasteplasser funnet
              </h1>
            )}
            <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
              {!loading && place != null && (
                <div className="bg-[#f9f9f9] flex justify-around rounded-lg p-4 mb-4 flex-wrap md:flex-nowrap">
                  <div className="flex flex-col">
                    <div className="px-4 sm:px-0">
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0 ">
                        <dt>
                          <h3 className="text-base/7 font-semibold text-gray-900">
                            Informasjon
                          </h3>
                        </dt>
                        <dd className="text-base/7 flex items-start">
                          {info}
                          <Popup
                            setInfo={setInfo}
                            trigger={
                              <button type="button" className="pl-1.5">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#666666"
                                >
                                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                              </button>
                            }
                            position="center center"
                          >
                            {(close) => (
                              <>
                                <div className="bg-[#f9f9f9] shadow-2xl">
                                  <input
                                    className="pl-1"
                                    type="text"
                                    value={info}
                                    onChange={(e) => setInfo(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        close();
                                      }
                                    }}
                                  ></input>
                                  <button
                                    className="absolute top-2 right-2 gap-x-2 bg-[#f9f9f9] w-8 mr-3 text-xs z-[1401] cursor-pointer"
                                    onClick={close}
                                  >
                                    Lukk
                                  </button>
                                </div>
                              </>
                            )}
                          </Popup>
                        </dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Kommune
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {municipality}
                          <Popup
                            setMunicipality={setMunicipality}
                            trigger={
                              <button type="button" className="pl-1.5">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#666666"
                                >
                                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                              </button>
                            }
                            position="center center"
                          >
                            {(close) => (
                              <>
                                <div className="bg-[#f9f9f9] shadow-2xl">
                                  <input
                                    className="pl-1"
                                    type="text"
                                    value={municipality}
                                    onChange={(e) =>
                                      setMunicipality(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        close();
                                      }
                                    }}
                                  ></input>
                                  <button
                                    className="absolute top-2 right-2 gap-x-2 bg-[#f9f9f9] w-8 mr-3 text-xs z-[1401] cursor-pointer"
                                    onClick={close}
                                  >
                                    Lukk
                                  </button>
                                </div>
                              </>
                            )}
                          </Popup>
                        </dd>
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Fylke:
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {county}
                          <Popup
                            setCounty={setCounty}
                            trigger={
                              <button type="button" className="pl-1.5">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#666666"
                                >
                                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                              </button>
                            }
                            position="center center"
                          >
                            {(close) => (
                              <div className="bg-[#f9f9f9] shadow-2xl">
                                <select
                                  type="text"
                                  id="county"
                                  value={county}
                                  onChange={(e) => setCounty(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      close();
                                    }
                                  }}
                                >
                                  {countys &&
                                    countys.map((place) => (
                                      <option key={place} value={place}>
                                        {place}
                                      </option>
                                    ))}
                                </select>

                                <button
                                  className="absolute top-2 right-2 gap-x-2 bg-[#f9f9f9] w-8 mr-1 text-xs z-[1401] cursor-pointer"
                                  onClick={close}
                                >
                                  Lukk
                                </button>
                              </div>
                            )}
                          </Popup>
                        </dd>
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Koordinater
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <div className="flex items-center gap-x-1.5">
                            {coordinates[0] + ", " + coordinates[1]}
                            <Popup
                              trigger={
                                <button type="button">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#434343"
                                  >
                                    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
                                  </svg>
                                </button>
                              }
                              position="center center"
                            >
                              {(close) => (
                                <>
                                  <div className="bg-white shadow-lg w-[450px] h-[450px] relative">
                                    <button
                                      className="absolute top-2 right-2 bg-white rounded-full p-1 w-8 h-8 hover:bg-[#f0f0f0] shadow-md z-[401] cursor-pointer"
                                      onClick={close}
                                    >
                                      X
                                    </button>
                                    <WebmapSelect
                                      coordinates={coordinates}
                                      setCoordinates={setCoordinates}
                                    />
                                  </div>
                                </>
                              )}
                            </Popup>
                          </div>
                        </dd>
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Renovasjon
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {trash}
                          <Popup
                            setTrash={setTrash}
                            trigger={
                              <button type="button" className="pl-1.5">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#666666"
                                >
                                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                              </button>
                            }
                            position="center center"
                          >
                            {(close) => (
                              <>
                                <div className="bg-[#f9f9f9] shadow-2xl">
                                  <input
                                    className="pl-1"
                                    type="text"
                                    value={trash}
                                    onChange={(e) => setTrash(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        close();
                                      }
                                    }}
                                  ></input>
                                  <button
                                    className="absolute top-2 right-2 gap-x-2 bg-[#f9f9f9] w-8 mr-3 text-xs z-[1401] cursor-pointer"
                                    onClick={close}
                                  >
                                    Lukk
                                  </button>
                                </div>
                              </>
                            )}
                          </Popup>
                        </dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Toalett
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {toilet === true ? "Ja" : "Nei"}
                          <Popup
                            setToilet={setToilet}
                            trigger={
                              <button type="button" className="pl-1.5">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#666666"
                                >
                                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                              </button>
                            }
                            position="center center"
                          >
                            {(close) => (
                              <div className="bg-[#f9f9f9] shadow-2xl">
                                <select
                                  type="text"
                                  id="toilet"
                                  value={toilet}
                                  onChange={(e) =>
                                    setToilet(e.target.value === "true")
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      close();
                                    }
                                  }}
                                >
                                  <option key="ja" value="true">
                                    Ja
                                  </option>
                                  <option key="nei" value="false">
                                    Nei
                                  </option>
                                </select>
                                <button
                                  className="absolute top-2 right-2 gap-x-2 bg-[#f9f9f9] w-8 mr-3 text-xs z-[1401] cursor-pointer"
                                  onClick={close}
                                >
                                  Lukk
                                </button>
                              </div>
                            )}
                          </Popup>
                        </dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Tilgjengelig
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {access === true ? "Ja" : "Nei"}
                          <Popup
                            setAccess={setAccess}
                            trigger={
                              <button type="button" className="pl-1.5">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#666666"
                                >
                                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                              </button>
                            }
                            position="center center"
                          >
                            {(close) => (
                              <div className="bg-[#f9f9f9] shadow-2xl">
                                <select
                                  type="text"
                                  id="access"
                                  value={access}
                                  onChange={(e) =>
                                    setAccess(e.target.value === "true")
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      close();
                                    }
                                  }}
                                >
                                  <option key="ja" value="true">
                                    Ja
                                  </option>
                                  <option key="nei" value="false">
                                    Nei
                                  </option>
                                </select>
                                <button
                                  className="absolute top-2 right-2 gap-x-2 bg-[#f9f9f9] w-8 mr-3 text-xs z-[1401] cursor-pointer"
                                  onClick={close}
                                >
                                  Lukk
                                </button>
                              </div>
                            )}
                          </Popup>
                        </dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Type
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {type}
                          <Popup
                            setType={setType}
                            trigger={
                              <button type="button" className="pl-1.5">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#666666"
                                >
                                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                              </button>
                            }
                            position="center center"
                          >
                            {(close) => (
                              <>
                                <div className="bg-[#f9f9f9] shadow-2xl">
                                  <input
                                    className="pl-1"
                                    type="text"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        close();
                                      }
                                    }}
                                  ></input>
                                  <button
                                    className="absolute top-2 right-2 gap-x-2 bg-[#f9f9f9] w-8 mr-3 text-xs z-[1401] cursor-pointer"
                                    onClick={close}
                                  >
                                    Lukk
                                  </button>
                                </div>
                              </>
                            )}
                          </Popup>
                        </dd>
                      </div>
                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Vegvesen ID
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {vegvesen}
                          <Popup
                            setVegvesen={setVegvesen}
                            trigger={
                              <button type="button" className="pl-1.5">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24px"
                                  viewBox="0 -960 960 960"
                                  width="24px"
                                  fill="#666666"
                                >
                                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                </svg>
                              </button>
                            }
                            position="center center"
                          >
                            {(close) => (
                              <>
                                <div className="bg-[#f9f9f9] shadow-2xl">
                                  <input
                                    className="pl-1"
                                    type="text"
                                    value={vegvesen}
                                    onChange={(e) =>
                                      setVegvesen(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        close();
                                      }
                                    }}
                                  ></input>
                                  <button
                                    className="absolute top-2 right-2 gap-x-2 bg-[#f9f9f9] w-8 mr-3 text-xs z-[1401] cursor-pointer"
                                    onClick={close}
                                  >
                                    Lukk
                                  </button>
                                </div>
                              </>
                            )}
                          </Popup>
                        </dd>
                      </div>

                      <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">
                          Forespørsel laget
                        </dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {time && time != null
                            ? time
                            : "Ingen oppdateringer funnet"}
                        </dd>
                      </div>
                    </div>
                    <div className="flex mt-6 gap-2">
                      <button
                        className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                        type="submit"
                      >
                        Oppdater Rasteplass
                      </button>
                      <button
                        className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                        type="button"
                        onClick={() => handleDelete(slug)}
                      >
                        Slett Rasteplass
                      </button>
                      <button
                        type="button"
                        className="flex justify-center rounded-md bg-navbar-orange px-3 py-1.5 text-sm/6 font-semibold hover:text-black text-black/80 shadow-xs hover:bg-navbar-orange/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:navbar-gray cursor-pointer"
                        onClick={() => handleAccept(slug)}
                      >
                        Godkjenn Rasteplass
                      </button>
                    </div>
                  </div>
                  {place && coordinates ? (
                    <div className="rounded-md border-gray-300 bg-white shadow-sm w-[450px] h-[450px]">
                      <WebMapMini
                        lat={coordinates[0]}
                        lng={coordinates[1]}
                        id={place.rasteplass_id}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
            </main>{" "}
          </form>
        </div>
      )}
    </>
  );
}

export default ForslagRasteplass;
