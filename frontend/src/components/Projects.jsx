import { useNavigate } from "react-router-dom";

const Projects=()=>{
  const navigate= useNavigate();
  const contactform=()=>{
    navigate('/contactUs')
  }
  return(
    <>
    <button onClick={contactform}>
    Make Your Ideas Happen

    </button>
    </>
  )
}
export default Projects;