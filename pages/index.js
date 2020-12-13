import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import SidePanel from "../components/sidePanel";
import ProjectList from "../components/projectList";
import Grid from "@material-ui/core/Grid";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Home(props) {
    const [data, setData] = React.useState([]);
    const router = useRouter();
    useEffect(async () => {
        let value = router.query;
        let transformedParams = {};

        for (let i in value)
            if (
                (value.hasOwnProperty(i) && value[i] !== undefined) ||
                value[i] !== null
            )
                transformedParams[i] = value[i];
        let queryString = Object.keys(transformedParams)
            .map(function (k) {
                return (
                    encodeURIComponent(k) + "=" + encodeURIComponent(transformedParams[k])
                );
            })
            .join("&");

        let res = await fetch(
            "https://api.spaceXdata.com/v3/launches?limit=100" + "&" + queryString
        );
        const data = await res.json();

        setData(data);
    }, []);

    const onApplyFilterHandler = (queryString, data) => {
        console.log("INDEX", queryString);
        router.push("", queryString, { shallow: true });
        setData(data);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    lg={12}
                    style={{ display: "flex", flexFlow: "wrap" }}
                >
                    <Grid item xs={12} sm={4} lg={2}>
                        <SidePanel
                            onApplyFilterHandler={onApplyFilterHandler}
                            filter={router && router.query ? router.query : null}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        lg={10}
                        style={{ display: "flex", flexFlow: "wrap" }}
                    >
                        <ProjectList launchProjects={data} />
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
        const res = await fetch("https://api.spaceXdata.com/v3/launches?limit=100");
        const data = await res.json();
        return { data };
    } catch (err) {
        console.log(err);
    }
};
