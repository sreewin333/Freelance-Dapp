import { useState } from "react";
const RequestPayment=({state})=>{
    /* button to call the request payment function*/ 
    const [successMessage, setSuccessMessage] = useState(null);
    const requestPayment=async(event)=>{
        event.preventDefault();
        try{
        const{contract}=state;
        const trx=await contract.FreelancerRequestPayment();
        await trx.wait();
        setSuccessMessage("Request payment succesfull!")
        console.log("success");}
        catch(error){
            console.log(error);
            setSuccessMessage("Request payment failed!");
        }
    }

return(<>
<button onClick={requestPayment} className="button1"> Request Payment</button>
{successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
</>
    

);
}
export default RequestPayment;