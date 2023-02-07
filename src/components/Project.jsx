
import MUIDataTable from "mui-datatables";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import axios from "axios";
import AddProject from "./AddProject";


const Project = () => {

    const muiCache = createCache({
        key: "mui-datatables",
        prepend: true
    });

    const [open, setOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resultProjects = await axios.get('/api/projects/all');

            const resultProjectData = resultProjects.data;
            //const sortResultProjectData = resultProjectData.sort((a, b) => b.createdAt.localCompare(a.createdAt));
            const sortResultProjectData = resultProjectData.sort((a, b) => b.createdAt - a.createdAt);
            setProjects(sortResultProjectData);
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
        { name: " CLIENT NAME", options: { filterOptions: { fullWidth: true } } },
        "PROJECT",
        "PROJECT COST",
        'PAYMENT',
        'STATUS'
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
        <div className='pr-container'>
            <div className="u-row down-btn">
                <button className="u-btn"
                    onClick={() => setOpen(true)}
                >Add New</button>
            </div>
            <div className="pr-row">
                {
                    projects.length === 0 ? (
                        <h1 className="no-data">Loading project summary...</h1>
                    ) : (
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>

                                <MUIDataTable
                                    title={"PROJECT SUMMARY"}
                                    data={
                                        projects.map((project) => (
                                            [project.clientName, project.project, 'ksh. ' + project.projectCost, project.payment, project.status]
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
                open && <AddProject setOpen={setOpen} />
            }
        </div>
    )
}

export default Project;
