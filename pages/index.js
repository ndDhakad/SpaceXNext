import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import SidePanel from "../components/sidePanel";
import ProjectList from "../components/projectList";
import Grid from "@material-ui/core/Grid";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {SyncLoader} from "react-spinners";
import NoDataAlert from "../components/noDataAlert";
import config from "../config.json";

const {apiEndPoint} = config;

export default function Home(props) {
    const [data, setData] = React.useState([]);
    const [spinner, setSpinner] = React.useState(false);
    const router = useRouter();
    useEffect(async () => {

        let value = router.query;
        let transformedParams = {};
        setSpinner(true);
        try {
            for (let i in value)
                if (
                    (value.hasOwnProperty(i) && value[i] !== undefined) ||
                    value[i] !== null
                )
                    transformedParams[i] = value[i];
            let queryString = Object.keys(transformedParams)
                .map(function (k) {
                    return (
                        encodeURIComponent(k) + "=" + encodeURIComponent(transformedParams[k].toLowerCase())
                    );
                })
                .join("&");

            let res = await fetch(
                `${apiEndPoint}&${queryString}`
            );
            const data = await res.json();

            setData(data);
        }
        catch (e) {
            console.log(e);
        }
        setSpinner(false);
    }, []);

    const onApplyFilterHandler = (queryString, data) => {

        router.push("", queryString, { shallow: true });
        setData(data);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>SpaceX Launch</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    style={{ display: "flex", flexFlow: "wrap"}}
                >
                    <Grid item xs={12} sm={4} lg={2}>
                        <SidePanel
                            onApplyFilterHandler={onApplyFilterHandler}
                            filter={router && router.query ? router.query : null}
                            setSpinner={setSpinner}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        lg={10}
                        style={{ display: "flex", flexFlow: "wrap"}}
                    >
                        {
                            (() => {
                                if (spinner) {
                                    return (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '20px',
                                            width: '1000%'
                                        }}>
                                            <SyncLoader size={10} margin={2} color={"#0000a0"}
                                                        loading={true}/>
                                        </div>

                                    )
                                } else if(data.length===0){
                                    return (
                                        <NoDataAlert/>
                                    )
                                }else {
                                    return (
                                        <ProjectList launchProjects={data}/>
                                    )
                                }
                            })()
                        }
                    </Grid>
                </Grid>
            </Layout>
        </div>
    );
}

Home.getInitialProps = async function () {
    /*const queryKey = 'user';
      const queryValue = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))*/

    try {
        const res = await fetch(apiEndPoint );
        const data = await res.json();
        return { data };
    } catch (err) {
        console.log(err);
    }
};
