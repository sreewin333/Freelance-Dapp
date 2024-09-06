import { useState } from "react";
function TransferIfDisapproved({state}){
    const [successMessage, setSuccessMessage] = useState(null);
     /*button for transfering payment to the freelancer*/ 
   const transferifDisapproved=async(event)=>{
    event.preventDefault();
    try{
    const {contract}=state;
    const trx=await contract.transferIfDisapproved();
    await trx.wait();
    setSuccessMessage("Transfer succesfull!");
    console.log("transfer complete");}
    catch(error){
        console.log(error);
        setSuccessMessage("Error Transferring !!!");
    }
   

   }
    return(<>
        <button onClick={transferifDisapproved}className="button1">Transfer If Not Approved</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    );

}
export default TransferIfDisapproved;