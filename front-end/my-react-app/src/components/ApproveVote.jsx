import { useState } from "react";
function ApproveVote({state}){
    const [successMessage, setSuccessMessage] = useState(null);
     /*button for transfering payment to the freelancer*/ 
   const approveVote=async()=>{
    event.preventDefault();
    try{
    const {contract}=state;
    const trx=await contract.ApproveVote();
    await trx.wait();
    setSuccessMessage("approved!");
    console.log("approve succesfull");}
    catch(error){
        console.log(error);
        setSuccessMessage("Error approving!!!");
    }
   

   }
    return(<>
        <button onClick={approveVote}className="button1">Approve vote</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    );

}
export default ApproveVote;