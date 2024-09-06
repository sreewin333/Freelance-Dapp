import { useState } from "react";
const ValidatorPoints =({state})=>{
 /* button for taking the project by the freelancer*/ 
 const [successMessage, setSuccessMessage] = useState(null);
   const validatorPoints= async(event)=>{
    event.preventDefault();
    try{
    const {contract}=state;
    const address=document.querySelector("#address5").value;
    const points=document.querySelector("#points").value;
    console.log(address);
    console.log(points);
    const transaction=await contract.ValidatorPoints(points,address);
    await transaction.wait();
    setSuccessMessage("points rewarded succesfully!");
    console.log("success!!!");}
    catch(error){
        console.log(error);
        setSuccessMessage("Error rewarding points");

    }

   };
    return(<>
  <div className="formContainer">
    <form onSubmit={validatorPoints}>
    <label >Address:</label>
    <input type="text"  id="address5" placeholder="Enter validators Address "/><br />
    <label>Points:</label>
    <input type="text"  id="points" placeholder="Enter points to be rewarded "/>
    <button type="submit" className="button1"> Submit Points </button>
    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
    </div>
    
    </>

    );

}
export default ValidatorPoints;