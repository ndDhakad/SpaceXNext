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
    const [launchSuccess, setLaunchSuccess] = React.useState(null);
    const [landingSuccess, setLandingSuccess] = React.useState(null);

    useEffect(() => {
        console.log("SidePanel", filter);

        if (filter) {
            setYear(filter.launch_year);
            setLaunchSuccess(filter.launch_success);
            setLandingSuccess(filter.land_success);
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
        onClickApplyHandler(null, true);
    };

    async function onClickApplyHandler(e = null, resetFilter = false) {
        setSpinner(true);
        let value = {
            launch_year: year,
            land_success: landingSuccess,
            launch_success: launchSuccess,
        };

        let transformedParams = {};
        debugger;
        for (let i in value)
            if (value[i] !== null && value[i] !== undefined) {
                console.log(value[i]);
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

        console.log("VALUE", value, transformedParams, queryString);


        const urlQueryString = resetFilter ? "" : "?" + queryString;
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

    const buttonSelected = (event) => {

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
    }

    const filterButtons = (filterName, filterButtonArray) =>{
        console.log(filterName);
        return(
            <Grid style={{textAlign: "center", paddingBottom: 20}}>
                <span style={{fontWeight: "bold", textDecoration: "underline"}}>
                    {`${filterName} `}
                </span>
                <Grid className="sidePanelElements">

                    {
                        filterButtonArray.map((item)=>{
                            return(
                                <Grid xs={6} sm={6} md={6} lg={6}>
                                    <button id={`${filterName}_${item}`} className="btnClass" onClick={(event) => buttonSelected(event)}>
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
        <Paper elevation={3} className={styles.container}>
            <h2>Filters</h2>

            {filterButtons("Launch Year", yearButtons)}
            {filterButtons("Launch Success", ["True","False"])}
            {filterButtons("Landing Success", ["True","False"])}

            <Grid className="sidePanelElements" style={{ paddingBottom: 20}}>
                <button
                    className="btnClass"

                    onClick={(e) => onClickResetHandler(e, false)}
                >
                    Reset All
                </button>
            </Grid>
            <Grid className="sidePanelElements" style={{paddingBottom: 20}}>
                <button
                    className="btnClass"

                    onClick={onClickApplyHandler}
                >
                    Apply Filter
                </button>
            </Grid>
        </Paper>
    );
}
