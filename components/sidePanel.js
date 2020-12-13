import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import styles from '../styles/Home.module.css'

import Grid from '@material-ui/core/Grid';
import Select from "react-select";

import fetch from "isomorphic-unfetch";

export default function SidePanel({onApplyFilterHandler}){
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
    const [year, setYear] = React.useState(null);
    const [launchSuccess, setLaunchSuccess] = React.useState(null);
    const [landingSuccess, setLandingSuccess] = React.useState(null);

    const handleChangeYear = (newValue)=>{
        let value = newValue !== null ? newValue.value: null;

        setYear(value);
        //onUpdateFilter("year",value);
        //onLoadLaunchProjects();
    }

    const handleChangeLaunch = (event) => {
        setLaunchSuccess(event.target.value);
        //onUpdateFilter("launch",event.target.value);
        //onLoadLaunchProjects();
    };

    const handleChangeLanding = (event) => {
        setLandingSuccess(event.target.value);
        //onUpdateFilter("landing",event.target.value);
        //onLoadLaunchProjects();
    };

    const onClickResetHandler = () => {
        setYear(null);
        setLaunchSuccess(null);
        setLandingSuccess(null);
        onClickApplyHandler(null,true);
        //onUpdateFilter("reset",null);
        //onLoadLaunchProjects();
    };
    async function onClickApplyHandler (e=null,resetFilter= false) {
        let value = {
            launch_year: year,
            land_success: landingSuccess,
            launch_success: launchSuccess
        }

       // console.log("filter data:", value);

        let transformedParams = {};

        for ( let i in value )
            if ( value.hasOwnProperty( i ) && value[i] !== null)
                transformedParams[i] = value[i];
        console.log("filter data:", transformedParams);
        let queryString = Object.keys(transformedParams)
            .map(function (k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(transformedParams[k]);
            })
            .join("&");


        console.log(resetFilter, queryString);
        const res = await fetch('https://api.spaceXdata.com/v3/launches?limit=100'+'&'+queryString);
        const data = await res.json();
        console.log(data);
        queryString = resetFilter || queryString=="" ? "": "?"+queryString;
        onApplyFilterHandler(queryString, data);
    }



    return(


            <Paper elevation={3} className={styles.container}>
                <h2>Filters</h2>
                <Grid style={{alignItems:"center", padding: 20}}>
                    <span style={{fontWeight: "bold", textDecoration: "underline" }}>Launch Year </span>
                    <div style={{width: 200}}>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable
                            name="year"
                            onChange={handleChangeYear}
                            value={{label:year, value:year}}
                            options={yearArray}
                        />
                    </div>
                </Grid>
                <Grid style={{alignItems:"center", padding: 20}}>
                    <FormControl component="fieldset">
                        <span style={{fontWeight: "bold", textDecoration: "underline" }}>Launch Success </span>
                        <RadioGroup aria-label="launch" name="launch" value={launchSuccess} onChange={handleChangeLaunch}>
                            <FormControlLabel value="true" control={<Radio />} label="True" />
                            <FormControlLabel value="false" control={<Radio />} label="False" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid style={{alignItems:"center", padding: 20}}>
                    <FormControl component="fieldset">
                        <span style={{fontWeight: "bold", textDecoration: "underline" }}>Landing Success </span>
                        <RadioGroup aria-label="landing" name="landing" value={landingSuccess} onChange={handleChangeLanding}>
                            <FormControlLabel value="true" control={<Radio />} label="True" />
                            <FormControlLabel value="false" control={<Radio />} label="False" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid style={{alignItems:"center", padding: 20}}>
                    <Button variant="contained" color="primary" onClick={(e)=> onClickResetHandler(e,false)}>
                        Reset All
                    </Button>
                </Grid>
                <Grid style={{alignItems:"center", padding: 20}}>
                    <Button variant="contained" color="primary" onClick={onClickApplyHandler}>
                        Apply Filter
                    </Button>
                </Grid>
            </Paper>
    );

}