import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AddUser from "../components/AddUser";
import axios from 'axios'


const Users = () => {

    const muiCache = createCache({
        key: "mui-datatables",
        prepend: true
    });
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const resultUsers = await axios.get('/api/users/all');

            const resultUserData = resultUsers.data;
            //const sortResultUserData = resultUserData.sort((a, b) => b.createdAt.localCompare(a.createdAt));
            const sortResultUserData = resultUserData.sort((a, b) => b.createdAt - a.createdAt);
            setUsers(sortResultUserData);
        }
        fetchData();
    }, []);

    const [responsive, setResponsive] = useState("vertical");
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [searchBtn, setSearchBtn] = useState(true);
    const [downloadBtn, setDownloadBtn] = useState(true);
    const [printBtn, setPrintBtn] = useState(true);
    const [viewColumnBtn, setViewColumnBtn] = useState(true);
    const [filterBtn, setFilterBtn] = useState(true);

    const columns = [
        { name: "  NAME", options: { filterOptions: { fullWidth: true } } },
        "CREATED DATE",
        "ROLE",
        'ROLE TYPE',

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
    //     ["Victor Pkemo", "12-12-2022", 'CEO', "Super Admin"],
    //     ["Aisha Moraa", "12-12-2022", "Full-stack Webdeveloper", "Employee"],
    //     ["Collins Bore", "12-12-2022", "HR", 'HR Admin'],


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
                    users.length === 0 ? (
                        <h1 className="no-data">Loading Users...</h1>
                    ) : (
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>

                                <MUIDataTable
                                    title={"USER LIST"}
                                    data={
                                        users.map((user) => (
                                            [user.firstName + ' ' + user.lastName, user.createdAt.slice(0, 10), user.role, user.roleType]
                                        ))
                                    }
                                    columns={columns}
                                    options={options}
                                />
                            </ThemeProvider>
                        </CacheProvider>
                    )
                }
            </div>
            {
                open && <AddUser setOpen={setOpen} />
            }
        </div>
    )
}

export default Users