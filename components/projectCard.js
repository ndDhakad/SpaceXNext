
import Image from 'next/image'

export default function ProjectCard({project}){

        const getLandingSuccess = (value) => {
            return value === null ? 'NA' : '' + value;
        }
    return (
        <div className="mycard">
            <div className="myimg">
                <Image
                    src={project.links.mission_patch === null ? "https://upload.wikimedia.org/wikipedia/commons/0/09/Dummy_flag.png" : project.links.mission_patch}
                    alt={project.mission_name}
                    loading="lazy"
                    quality={10}
                    width={200}
                    height={200}
                />
            </div>
            <div className="mylabel">
                {project.mission_name} #{project.flight_number}
            </div>

            <div className="myinfo">
                <b color="black"> Mission Ids:</b> {project.mission_id.join(",")}
            </div>
            <div className="myinfo">
                <b>Launch Year:</b> {project.launch_year}
            </div>
            <div className="myinfo">
                <b>Successful Launch:</b> {"" + project.launch_success}
            </div>
            <div className="myinfo">
                <b>Successful Landing:</b>{" "}
                {getLandingSuccess(project.rocket.first_stage.cores[0].land_success)}
            </div>
        </div>

    );
}