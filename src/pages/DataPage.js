import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import styled from 'styled-components';
import DataTable from 'react-data-table-component';
import "./DataPage.style.scss"

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled.div`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 34px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField
            id="search"
            type="text"
            placeholder="Filter By Name"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
        <ClearButton type="button" onClick={onClear}>
            X
        </ClearButton>
    </>
);

const DataPage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    let history = useNavigate();
    const alert = useAlert();

    async function getData() {
        const res = await axios({
            url: "https://61e9e8467bc0550017bc64e7.mockapi.io/api/car",
            method: "get",
            timeout: 8000,
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 200) {
            setData(res.data);
            setLoading(false);
        } else {
            console.log(res.status);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const filteredItems = data.filter(
        item => item.make && item.make.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const columns = [
        {
            name: 'Make',
            selector: row => row.make,
            wrap: true,
            sortable: true,
        },
        {
            name: 'Made',
            selector: row => row.model,
            wrap: true,
            sortable: true,
        },
        {
            name: 'Version',
            selector: row => row.version,
            wrap: true,
            sortable: true,
        },
        {
            name: 'Date Launch',
            selector: row => row.date_launch,
            wrap: true,
            sortable: true,
        },
        {
            name: 'MRSP',
            selector: row => row.mrsp,
            wrap: true,
            sortable: true,
        },
        {
            name: 'Country Origin',
            selector: row => row.country_origin,
            wrap: true,
            sortable: true,
        },
        {
            name: 'Image',
            selector: row => row.image_url,
            wrap: true,
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: row => <>
                <Link className="p-1 bg-yellow-300 mr-1 rounded" to={`/EditDataPage/${row.id}`}>Edit</Link>
                <button className="p-1 bg-red-500 text-white mr-1 rounded"
                    type="button"
                    onClick={() => deleteHandle(row.id)}
                >Delete</button>
            </>
        }
    ];

    let deleteHandle = (e) => {
        if (window.confirm("Apakah anda yakin ingin menghapus?")) {
            axios
                .delete(`https://61e9e8467bc0550017bc64e7.mockapi.io/api/car/${e}`)
                .then((res) => {
                    console.log("inihasil delete " + res);
                    alert.show("Data Sukses Terhapus");
                    getData()
                })

                .catch((error) => {
                    console.log(error);
                });
        } else {
        }
    }

    return (
        <>
            <div className="title">List Data Mobil</div>

            <div className="content">
                {loading ?
                    <>
                        <div>Now Loading</div>
                    </>
                    :
                    <>
                        <DataTable
                            columns={columns}
                            data={filteredItems}
                            pagination
                            responsive
                            striped
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            paginationResetDefaultPage={resetPaginationToggle}
                            noDataComponent="No Data Exist"
                        />
                    </>
                }
            </div>
        </>
    );
}

export default DataPage;