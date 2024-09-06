import { useState } from "react";

const ViewValidators = ({ state }) => {
    const [view, setView] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const viewvalidators = async (event) => {
        event.preventDefault();
        try {
            const { contract } = state;
            const index = document.querySelector("#index").value;
            console.log(index);
            const trx= await contract.validators(index);
            setView(trx);
            console.log("View successful");
            setSuccessMessage("");
        } catch (error) {
            console.error(error);
            setSuccessMessage("Error viewing points");
        }
    };

    return (
        <div className="formContainer">
            <form onSubmit={viewvalidators}>
                <label>Enter index:</label>
                <input type="text" id="index" placeholder="Enter validators index" />
                <button type="submit" className="button1">Enter</button>
                <p>{view}</p>
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default ViewValidators;
