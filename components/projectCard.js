import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Image from 'next/image'

export default function ProjectCard({project}){

        const getLandingSuccess = (value) => {
            return value === null ? 'NA' : '' + value;
        }
    return (
        <Card style={{height:450}}>
            <CardActionArea>
                
                <Image
                    layout="fill"
                    src={project.links.mission_patch}
                    alt="Picture of the author"
                    loading="lazy"
                    quality={50}
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" style={{color: "blue"}}>
                        {project.mission_name} #{project.flight_number}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b style={{color: "black"}}>Mission Ids:</b> {project.mission_id.join(',')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b style={{color: "black"}}>Launch Year:</b> {project.launch_year}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b style={{color: "black"}}>Successful Launch:</b> {""+project.launch_success}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b style={{color: "black"}}>Successful Landing:</b> {getLandingSuccess(project.rocket.first_stage.cores[0].land_success)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}