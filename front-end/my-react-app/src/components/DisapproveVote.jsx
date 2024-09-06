import { useState } from "react";
function DisapproveVote({state}){
    const [successMessage, setSuccessMessage] = useState(null);
     /*button for transfering payment to the freelancer*/ 
   const disapproveVote=async(event)=>{
    event.preventDefault();
    try{
    const {contract}=state;
    const trx=await contract.DisapproveVote();
    await trx.wait();
    setSuccessMessage("Disapprove successfull");
    console.log("Disapprove succesfull");}
    catch(error){
        console.log(error);
        setSuccessMessage("Error disapproving!!!");
    }
   

   }
    return(<>
        <button onClick={disapproveVote}className="button1">Disapprove vote</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    );

}
export default DisapproveVote;