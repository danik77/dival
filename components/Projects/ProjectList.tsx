import ProjectListItem from './ProjectListItem';
import style from './style.module.scss'


const ProjectList = ({projects} : any) => {

 
return(
	<div className={style.projectList}>
	 	{projects && projects.map((project, index) => (
			<ProjectListItem key={project.id} project={project} index={index}/>
		))}

	 
	</div>
)
}

export default ProjectList;
///add redux if from direct url