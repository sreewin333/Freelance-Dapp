
import { useState } from "react";
const ViewProject=({state})=>{
     /*button for viewing the project*/ 
    const[view,setView]=useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
   
    const viewProject =async(event)=>{

    event.preventDefault();
    try{
    const{contract}=state;
    const trx=await contract.viewProject();
   
    setView(trx);
    console.log("view succesfull");
    setSuccessMessage("");}
    catch(error){
        console.log(error);
        setSuccessMessage("Error viewing !!!");

    }}
   
  
    
return(<div>

    <button onClick={viewProject} className="button1">ViewProject</button>
   <p>{view}</p>
   {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
 
);

}
export default ViewProject;