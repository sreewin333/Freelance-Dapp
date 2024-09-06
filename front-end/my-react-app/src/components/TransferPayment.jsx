import { useState } from "react";
function TransferPayment({state}){
    const [successMessage, setSuccessMessage] = useState(null);
     /*button for transfering payment to the freelancer*/ 
   const transfer=async(event)=>{
    event.preventDefault();
    try{
    const {contract}=state;
    const trx=await contract.transferPayment();
    await trx.wait();
    setSuccessMessage("Transfer succesfull!");
    console.log("transfer complete");}
    catch(error){
        console.log(error);
        setSuccessMessage("Error Transferring !!!");
    }
   

   }
    return(<>
        <button onClick={transfer}className="button1">TransferPayment</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </>
    );

}
export default TransferPayment;