import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AddEmployee from "../components/AddEmployee";
import axios from 'axios'


const Employee = () => {

    const muiCache = createCache({
        key: "mui-datatables",
        prepend: true
    });


    const [employee, setEmployee] = useState([]);

    const [countEmployee, setCountEmployee] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const resultEmployee = await axios.get('/api/employee/all');

            const resultEmployeeData = resultEmployee.data;
            //const sortResultUserData = resultUserData.sort((a, b) => b.createdAt.localCompare(a.createdAt));
            const sortResultEmployeeData = resultEmployeeData.sort((a, b) => b.createdAt - a.createdAt);
            setEmployee(sortResultEmployeeData);

            const resultCountEmployee = await axios.get('/api/employee/countEmployee');
            setCountEmployee(resultCountEmployee.data);
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
        { name: "NAME", options: { filterOptions: { fullWidth: true } } },
        "EMPLOYEE ID",
        "PHONE",
        "JOIN DATE",
        "ROLE"

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

    return (
        <div className='u-container'>
            <div className="u-row">
                <button className="u-btn"
                    onClick={() => setOpen(true)}
                >Add New</button>
            </div>
            <div className="u-row">
                <div className="u-badge">
                    <span className="u-total">Total Employee</span>
                    <h1 className="u-totalNumber">{countEmployee?.count}</h1>
                </div>
            </div>
            <div className="u-row">

                {
                    employee.length === 0 ? (
                        <h1 className="no-data">Loading Employees...</h1>
                    ) : (
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>

                                <MUIDataTable
                                    title={"EMPLOYEE LIST"}
                                    data={
                                        employee.map((emp) => (
                                            [emp.firstName + ' ' + emp.lastName, emp.employeeId, emp.phone, emp.createdAt.slice(0, 10), emp.role]
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
                open && <AddEmployee setOpen={setOpen} />
            }
        </div>
    )
}

export default Employee
