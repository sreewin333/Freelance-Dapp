import { useState } from "react";
const TakeProject =({state})=>{
 /* button for taking the project by the freelancer*/ 
 const [successMessage, setSuccessMessage] = useState(null);
   const takeProject= async(event)=>{
    event.preventDefault();
    try{
    const {contract}=state;
    const address=document.querySelector("#address").value;
    console.log(address);
    const transaction=await contract.TakeProject(address);
    await transaction.wait();
    setSuccessMessage("project taken succesfully!");
    console.log("success!!!");}
    catch(error){
        console.log(error);
        setSuccessMessage("Error taking the project");

    }

   };
    return(<>
    <form onSubmit={takeProject}>
    <label >Address:</label>
    <input type="text"  id="address" placeholder="Enter your Address "/>
    <button type="submit" className="button1">  take project </button>
    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
    </>

    );

}
export default TakeProject;