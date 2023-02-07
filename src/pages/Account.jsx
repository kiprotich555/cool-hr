import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MUIDataTable from "mui-datatables";
import axios from 'axios'

const Account = () => {
    const muiCache = createCache({
        key: "mui-datatables",
        prepend: true
    });


    const [accounts, setAccounts] = useState([]);
    const [accountNumber, setAccountNumber] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const resultAccounts = await axios.get('/api/accounts/all');

            const resultAccountsData = resultAccounts.data;
            //const sortResultUserData = resultUserData.sort((a, b) => b.createdAt.localCompare(a.createdAt));
            const sortResultAccountsData = resultAccountsData.sort((a, b) => b.createdAt - a.createdAt);
            setAccounts(sortResultAccountsData);

            const resultAccoutNumber = await axios.get('/api/accounts/countAccounts');
            setAccountNumber(resultAccoutNumber.data);
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
        { name: "INVOICE NO", options: { filterOptions: { fullWidth: true } } },
        "CLIENTS",
        "DATE",
        'TYPE',
        'STATUS',
        'AMOUNT'

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
    //     ["recipe-23", "Google", '12-12-2022', 'Bitcoin', 'Pending', '$7828.00'],
    //     ["recipe-42", "Amazon", "13-04-2022", 'M-pesa', 'Approved', '$6730.00'],
    //     ["recipe-64", 'Microsoft', '15-07-2022', 'Visa', 'Approved', '$2340.00'],
    //     ["recipe-12", 'Swift', '15-04-2022', 'Stripe', 'Pending', '$2416.00']

    // ];

    return (
        <div className='u-container'>
            <div className="u-row accounts">
                <div className="u-badge">
                    <span className="u-total">Total Accounts</span>
                    <h1 className="u-totalNumber">{accountNumber?.count}</h1>
                </div>
            </div>
            <div className="u-row">
                {
                    accounts.length === 0 ? (
                        <h1 className="no-data">Loading Clients...</h1>
                    ) : (
                        <CacheProvider value={muiCache}>
                            <ThemeProvider theme={createTheme()}>

                                <MUIDataTable
                                    title={"CLIENTS"}
                                    data={
                                        accounts.map((account) => (
                                            [account.invoiceNo, account.clients, account.createdAt.slice(0, 10), account.type,
                                            account.status === true ? ('Approved') : ('Pending'), account.amount]
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
        </div>
    )
}

export default Account