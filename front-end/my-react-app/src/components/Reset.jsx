import { useState } from "react";
const Reset=({state})=>{
    /* button to call the request payment function*/ 
    const [successMessage, setSuccessMessage] = useState(null);
    const reset=async()=>{
     
        try{
        const{contract}=state;
        const trx=await contract.Reset();
        await trx.wait();
        setSuccessMessage("Reset success")
        console.log("success");}
        catch(error){
            console.log(error);
            setSuccessMessage("Reset failed!");
        }
    }

return(<>
<button onClick={reset} className="button1">Reset</button>
{successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
</>
    

);
}
export default Reset;