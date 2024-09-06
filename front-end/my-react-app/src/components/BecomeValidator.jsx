import {ethers} from "ethers";
import {useState} from "react";
const BecomeValidator=({state})=>{
    const [successMessage, setSuccessMessage] = useState(null);
    const becomeValidator=async(event)=>{
        event.preventDefault();
        try{
            const {contract}=state;
           const _address=document.querySelector("#address2").value;
           console.log(_address);
           const value={value:ethers.utils.parseEther("0.01")};
           const transaction=await contract.BecomeValidator(_address,value);
           await transaction.wait();
           setSuccessMessage("entered validator slot succesfully!");
           console.log("success!!!");}
        
        catch(error){

            console.log(error);
            setSuccessMessage("error becoming validator");
        }
    
};return(
    <>
    <form onSubmit={becomeValidator}>
      <label>Address:</label>  
      <input type="text" id="address2" placeholder="Enter validators adress"/>
      <button type="submit"  className="button1">Enter Validator Slot</button>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </form>
    </>
)



};
export default BecomeValidator;