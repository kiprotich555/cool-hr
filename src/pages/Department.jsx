import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AddDepartment from "../components/AddDepartment";
import axios from 'axios'


const Department = () => {

    const muiCache = createCache({
        key: "mui-datatables",
        prepend: true
    });
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resultDepartments = await axios.get('/api/departments/all');

            const resultDepartmentData = resultDepartments.data;
            //const sortResultUserData = resultUserData.sort((a, b) => b.createdAt.localCompare(a.createdAt));
            const sortResultDepartmentData = resultDepartmentData.sort((a, b) => b.createdAt - a.createdAt);
            setDepartments(sortResultDepartmentData);
        }
        fetchData();
    }, []);

    const [open, setOpen] = useState(false);

    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);

    const columns = [
        { name: " DEPARTMENT NAME", options: { filterOptions: { fullWidth: true } } },
        "DEPARTMENT HEAD",
        "TOTAL EMPLOYEE",

    ];

    const options = {
        search: searchBtn,
        download: downloadBtn,
        print: printBtn,
        viewColumns: viewColumnBtn,
        filter: filterBtn,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        onTableChange: (action, state) => {
            console.log(action);
            console.dir(state);
        }
    };

    // const data = [
    //     ["Web Development", "Victor Pkemo", '50'],
    //     ["Marketing", "Eliud Paul", "13"],
    //     ["App Development", 'Jordan Ayhu', '15'],
    //     ["Support Team", 'Diana Ashuka', '5']

    // ];

    return (
        <div className='u-container'>
            <div className="u-row">
                <button className="u-btn"
                    onClick={() => setOpen(true)}
                >Add New</button>
            </div>
            <div className="u-row">

                {
                    departments.length === 0 ? (
                        <h1 className="no-data">Loading Departments...</h1>
                    ) : (
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>

                                <MUIDataTable
                                    title={"DEPARTMENT LIST"}
                                    data={
                                        departments.map((department) => (
                                            [department.departmentName, department.departmentHead, department.totalEmployees]
                                        ))
                                    }
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </CacheProvider>
                    )}
            </div>
            {
                open && <AddDepartment setOpen={setOpen} />
            }
        </div>
    )
}

export default Department
