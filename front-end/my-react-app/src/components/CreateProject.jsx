import {ethers} from "ethers";
import {useState} from "react";
const CreateProject=({state})=>{
    const [successMessage, setSuccessMessage] = useState(null);
    const createProject=async(event)=>{
        event.preventDefault();
        try{
            const {contract}=state;
           const address=document.querySelector("#adress1").value;
           console.log(address);
           const value={value:ethers.utils.parseEther("0.04")};
           const transaction=await contract.MakeProject(address,value);
           await transaction.wait();
           setSuccessMessage("project created succesfully!");
           console.log("success!!!");}
        
        catch(error){

            console.log(error);
            setSuccessMessage("Error creating the project");
        }
    
};return(
    <>
    <form onSubmit={createProject}>
      <label>Address:</label>  
      <input type="text" id="adress1" placeholder="Enter your adress"/>
      <button type="submit"  className="button1"> Create Project</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
    </>
)



};
export default CreateProject;