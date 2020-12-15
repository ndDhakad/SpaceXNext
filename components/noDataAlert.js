import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function NoDataAlert() {

    let data = 'No results available';
    return (

        <Card  elevation={5} className="noDataCard">
            <Grid container
                  justify="center"
                  alignItems="center">
                <Grid item >
                    <Typography className="noDataHeading" >{data}</Typography>

                </Grid>

            </Grid>
        </Card>

    );
}