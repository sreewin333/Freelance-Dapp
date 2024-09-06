import { useState } from "react";
 /*button for submitting the project*/ 
const SubmitProject=({state})=>
{  const [successMessage, setSuccessMessage] = useState(null);
    const submit= async(event)=>{
    
    
    event.preventDefault();
    try{
    const {contract}=state;
    const project =document.querySelector("#project").value;
    console.log(project);

    const trx=await contract.submitProject(project);
    await trx.wait();
   setSuccessMessage("project submitted succesfully!")
    console.log("milestone achieved not yet");}
    catch(error){
        console.log(error);
        setSuccessMessage("Error submitting  the project");
    }

}
return(
    <>
    <form onSubmit={submit}>
    <label > project:</label>
    <input type="text" id="project" placeholder="Enter your project"/>
    <button type="submit" className="button1">Submit project</button>
    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
    </>
)
}
export default SubmitProject;