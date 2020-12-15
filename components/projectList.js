import  ProjectCard from '../components/projectCard'
import Grid from '@material-ui/core/Grid';

export default function ProjectList({launchProjects}){
    return (
        launchProjects.map((item, index) => {
            return (
                <Grid item xs={12} sm={6} lg={3} key={index}>
                    <ProjectCard project={item}/>
                </Grid>
            )
        })
    )
}