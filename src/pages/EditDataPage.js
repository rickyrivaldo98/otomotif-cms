import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";

import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import "./EditDataPage.style.scss"


const EditDataPage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [version, setVersion] = useState("");
    const [date_launch, setDate_launch] = useState("");
    const [mrsp, setMrsp] = useState("");
    const [country_origin, setCountry_origin] = useState("");
    const [image_url, setImage_url] = useState("");

    let { id } = useParams();
    let history = useNavigate();
    const alert = useAlert();

    async function getData() {
        const res = await axios({
            url: `https://61e9e8467bc0550017bc64e7.mockapi.io/api/car/${id}`,
            method: "get",
            timeout: 8000,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 200) {
            setData(res.data);
            setMake(res.data.make)
            setModel(res.data.model)
            setVersion(res.data.version)
            setDate_launch(res.data.date_launch)
            setMrsp(res.data.mrsp)
            setCountry_origin(res.data.country_origin)
            setImage_url(res.data.image_url)

            setLoading(false);
        } else {
            console.log(res.status);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    let editHandle = (e) => {
        e.preventDefault();
        if (window.confirm("Apakah anda yakin ingin mengedit?")) {
            const car = {
                make: make,
                model: model,
                version: version,
                date_launch: date_launch,
                mrsp: mrsp,
                country_origin: country_origin,
                image_url: image_url
            }
            axios
                .put(`https://61e9e8467bc0550017bc64e7.mockapi.io/api/car/${id}`, car)
                .then((res) => {
                    console.log("inihasil edit " + res);
                    alert.show("Data Sukses Diedit");
                    setTimeout(() => {
                        history(`/DataPage`);
                    }, 2000);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
        }
    }
    const handleMake = (e) => setMake(e.target.value);
    const handleModel = (e) => setModel(e.target.value);
    const handleVersion = (e) => setVersion(e.target.value);
    const handleDate_launch = (e) => setDate_launch(e.target.value);
    const handleMrsp = (e) => setMrsp(e.target.value);
    const handleCountry_origin = (e) => setCountry_origin(e.target.value);
    const handleImage_url = (e) => setImage_url(e.target.value);

    return (
        <>
            <div className="title">Edit Data Mobil</div>

            <div className="content-edit">
                {loading ?
                    <>
                        <div>Now Loading</div>
                    </>
                    :
                    <>
                        <div className="content-card">
                            <div className="container-card">
                                <div className="shadow-card">
                                    <div className="button-back-container">
                                        <button
                                            className="button-back"
                                            type="button"
                                            onClick={() => window.history.back()}
                                        >
                                            Back
                                        </button>
                                    </div>
                                    <div className="container-form">
                                        <form onSubmit={(e) => editHandle(e)}>
                                            <div className="flex flex-col flex-wrap">
                                                {loading && <div>loading...</div>}
                                                {!loading && (
                                                    <>
                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <div className="relative w-full mb-3">
                                                                <label
                                                                    className="block  text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password"
                                                                >
                                                                    Make
                                                                </label>

                                                                <input
                                                                    value={make}
                                                                    onChange={(e) => {
                                                                        handleMake(e);
                                                                    }}
                                                                    type="text"
                                                                    // placeholder={data.category_nama}
                                                                    className="input-text"
                                                                />
                                                            </div>
                                                            <div className="relative w-full mb-3">
                                                                <label
                                                                    className="block  text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password"
                                                                >
                                                                    Model
                                                                </label>

                                                                <input
                                                                    value={model}
                                                                    onChange={(e) => {
                                                                        handleModel(e);
                                                                    }}
                                                                    type="text"
                                                                    // placeholder={data.category_nama}
                                                                    className="input-text"
                                                                />
                                                            </div>
                                                            <div className="relative w-full mb-3">
                                                                <label
                                                                    className="block  text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password"
                                                                >
                                                                    Version
                                                                </label>

                                                                <input
                                                                    value={version}
                                                                    onChange={(e) => {
                                                                        handleVersion(e);
                                                                    }}
                                                                    type="text"
                                                                    // placeholder={data.category_nama}
                                                                    className="input-text"
                                                                />
                                                            </div>
                                                            <div className="relative w-full mb-3">
                                                                <label
                                                                    className="block  text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password"
                                                                >
                                                                    Date Launch
                                                                </label>

                                                                <input
                                                                    value={date_launch}
                                                                    onChange={(e) => {
                                                                        handleDate_launch(e);
                                                                    }}
                                                                    type="text"
                                                                    // placeholder={data.category_nama}
                                                                    className="input-text"
                                                                />
                                                            </div>
                                                            <div className="relative w-full mb-3">
                                                                <label
                                                                    className="block  text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password"
                                                                >
                                                                    MRSP
                                                                </label>

                                                                <input
                                                                    value={mrsp}
                                                                    onChange={(e) => {
                                                                        handleMrsp(e);
                                                                    }}
                                                                    type="text"
                                                                    // placeholder={data.category_nama}
                                                                    className="input-text"
                                                                />
                                                            </div>
                                                            <div className="relative w-full mb-3">
                                                                <label
                                                                    className="block  text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password"
                                                                >
                                                                    Country Origin
                                                                </label>

                                                                <input
                                                                    value={country_origin}
                                                                    onChange={(e) => {
                                                                        handleCountry_origin(e);
                                                                    }}
                                                                    type="text"
                                                                    // placeholder={data.category_nama}
                                                                    className="input-text"
                                                                />
                                                            </div>
                                                            <div className="relative w-full mb-3">
                                                                <label
                                                                    className="block  text-blueGray-600 text-xs font-bold mb-2"
                                                                    htmlFor="grid-password"
                                                                >
                                                                    Image URL
                                                                </label>

                                                                <input
                                                                    value={image_url}
                                                                    onChange={(e) => {
                                                                        handleImage_url(e);
                                                                    }}
                                                                    type="text"
                                                                    // placeholder={data.category_nama}
                                                                    className="input-text"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-full lg:w-6/12 px-4">
                                                            <button
                                                                className="bg-green-500 text-white active:bg-lightBlue-600 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                                                type="submit"
                                                            >
                                                                Edit
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default EditDataPage;