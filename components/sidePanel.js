import React, {useEffect} from "react";

import Paper from "@material-ui/core/Paper";
import styles from "../styles/Home.module.css";

import Grid from "@material-ui/core/Grid";

import fetch from "isomorphic-unfetch";
import config from "../config.json";
const {apiEndPoint} = config;

export default function SidePanel({onApplyFilterHandler, filter, setSpinner}) {
    const yearArray = [
        {label: "2006", value: 2006},
        {label: "2007", value: 2007},
        {label: "2008", value: 2008},
        {label: "2009", value: 2009},
        {label: "2010", value: 2010},
        {label: "2011", value: 2011},
        {label: "2012", value: 2012},
        {label: "2013", value: 2013},
        {label: "2014", value: 2014},
        {label: "2015", value: 2015},
        {label: "2016", value: 2016},
        {label: "2017", value: 2017},
        {label: "2018", value: 2018},
        {label: "2019", value: 2019},
        {label: "2020", value: 2020},
    ];

    const yearButtons = ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"];
    const [year, setYear] = React.useState(null);
    const [filters, setFilters] = React.useState(false);
    const [launchSuccess, setLaunchSuccess] = React.useState(null);
    const [landingSuccess, setLandingSuccess] = React.useState(null);
    useEffect(()=>{
        console.log(year,landingSuccess,launchSuccess);
        if(filters){
            onClickApplyHandler();
        }
        },[filters, year,launchSuccess, landingSuccess]);

    useEffect(() => {

        if (filter) {

            if(filter.launch_year !== null && filter.launch_year !== undefined){
                const elem2 = document.getElementById("Launch Year_"+filter.launch_year);
                elem2.classList.remove("btnClass");
                elem2.classList.add("btnClassActive");
            }
            if(filter.launch_success !== null && filter.launch_success !== undefined){
                const elem2 = document.getElementById("Launch Success_"+filter.launch_success.toLowerCase());
                elem2.classList.remove("btnClass");
                elem2.classList.add("btnClassActive");
            }
            if(filter.land_success !== null && filter.land_success !== undefined){
                const elem2 = document.getElementById("Landing Success_"+filter.land_success.toLowerCase());
                elem2.classList.remove("btnClass");
                elem2.classList.add("btnClassActive");
            }

            setYear(filter.launch_year);
            setLaunchSuccess(filter.launch_success !== undefined && filter.launch_success!== null ? filter.launch_success.toLowerCase() : filter.launch_success);
            setLandingSuccess(filter.land_success !== undefined && filter.land_success!== null ? filter.land_success.toLowerCase() : filter.land_success);
            setFilters(false);
        }

    }, [filter.year, filter.launchSuccess, filter.landingSuccess]);


    const onClickResetHandler = () => {
        if(year !== null && year !== undefined){
            const elem2 = document.getElementById("Launch Year_"+year);
            elem2.classList.remove("btnClassActive");
            elem2.classList.add("btnClass");
        }
        if(launchSuccess !== null && launchSuccess !== undefined){
            const elem2 = document.getElementById("Launch Success_"+launchSuccess);
            elem2.classList.remove("btnClassActive");
            elem2.classList.add("btnClass");
        }
        if(landingSuccess !== null && landingSuccess !== undefined){
            const elem2 = document.getElementById("Landing Success_"+landingSuccess);
            elem2.classList.remove("btnClassActive");
            elem2.classList.add("btnClass");
        }
        setYear(null);
        setLaunchSuccess(null);
        setLandingSuccess(null);
        console.log(year, landingSuccess, launchSuccess);
        setFilters(true);
        // onClickApplyHandler(null, true);
    };

    async function onClickApplyHandler(e = null, resetFilter = false) {
        setSpinner(true);
        let value = {
            launch_success: launchSuccess !== undefined && launchSuccess !== null? launchSuccess.toLowerCase() : launchSuccess,
            land_success: landingSuccess !== undefined && landingSuccess !==null ? landingSuccess.toLowerCase() : landingSuccess,
            launch_year: year,
        };


        let transformedParams = {};

        for (let i in value)
            if (value[i] !== null && value[i] !== undefined) {

                transformedParams[i] = value[i];
            }

        let queryString =
            Object.keys(transformedParams)
                .map(function (k) {
                    return (
                        encodeURIComponent(k) +
                        "=" +
                        encodeURIComponent(transformedParams[k])
                    );
                })
                .join("&");


        const urlQueryString = resetFilter || queryString === ""? "" : "?" + queryString;
        queryString = resetFilter ? "" : "&" + queryString;

        let data = [];
        try {
            const res = await fetch(
                apiEndPoint + queryString
            );
             data = await res.json();
        }
        catch(e){
            console.log(e);
        }

        onApplyFilterHandler(urlQueryString, data);
        setSpinner(false);
    }

    const buttonSelected =(event) => {

        const [filterType, filterValue] = event.target.id.split("_");

        const elem = document.getElementById(event.target.id);
        if(filterType === "Launch Year"){
            if(year === filterValue){
                setYear(null);
                elem.classList.remove("btnClassActive");
                elem.classList.add("btnClass");
            }
            else{
                if(year !== null && year !== undefined){
                    const elem2 = document.getElementById("Launch Year_"+year);
                    elem2.classList.remove("btnClassActive");
                    elem2.classList.add("btnClass");
                }
                setYear(filterValue);
                elem.classList.remove("btnClass");
                elem.classList.add("btnClassActive");
            }
        }else if(filterType === "Launch Success"){
            if(launchSuccess === filterValue){
                setLaunchSuccess(null);
                elem.classList.remove("btnClassActive");
                elem.classList.add("btnClass");
            }
            else{
                if(launchSuccess !== null && launchSuccess !== undefined){
                    const elem2 = document.getElementById("Launch Success_"+launchSuccess);
                    elem2.classList.remove("btnClassActive");
                    elem2.classList.add("btnClass");
                }
                setLaunchSuccess(filterValue);
                elem.classList.remove("btnClass");
                elem.classList.add("btnClassActive");
            }
        }else if(filterType === "Landing Success"){
            if(landingSuccess === filterValue){
                setLandingSuccess(null);
                elem.classList.remove("btnClassActive");
                elem.classList.add("btnClass");
            }
            else{
                if(landingSuccess !== null && landingSuccess !== undefined){
                    const elem2 = document.getElementById("Landing Success_"+landingSuccess);
                    elem2.classList.remove("btnClassActive");
                    elem2.classList.add("btnClass");
                }
                setLandingSuccess(filterValue);
                elem.classList.remove("btnClass");
                elem.classList.add("btnClassActive");
            }
        }
        console.log(year, landingSuccess, launchSuccess);
        setFilters(true);
    }


    const filterButtons = (filterName, filterButtonArray) =>{

        return(
            <Grid className="filterPanel">
                <span style={{fontWeight: "bold", textDecoration: "underline"}}>
                    {`${filterName} `}
                </span>
                <Grid className="sidePanelElements">

                    {
                        filterButtonArray.map((item)=>{
                            return(
                                <Grid item xs={6} sm={6} md={6} lg={6} key={`${filterName}_${item.toLowerCase()}`}>
                                    <button id={`${filterName}_${item.toLowerCase()}`} className="btnClass" onClick={(event) => { buttonSelected(event); }}>
                                        {item}
                                    </button>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Grid>

        );
    }

    return (
        <Paper elevation={3} className={styles.grid}>
            <h2>Filters</h2>

            {filterButtons("Launch Year", yearButtons)}
            {filterButtons("Launch Success", ["True","False"])}
            {filterButtons("Landing Success", ["True","False"])}

            <Grid className="sidePanelButtons">
                <button
                    className="btnClass"

                    onClick={(e) => onClickResetHandler(e, false)}
                >
                    Reset All
                </button>
            </Grid>
            {/*<Grid className="sidePanelButtons">*/}
            {/*    <button*/}
            {/*        className="btnClass"*/}

            {/*        onClick={onClickApplyHandler}*/}
            {/*    >*/}
            {/*        Apply Filter*/}
            {/*    </button>*/}
            {/*</Grid>*/}
        </Paper>
    );
}
