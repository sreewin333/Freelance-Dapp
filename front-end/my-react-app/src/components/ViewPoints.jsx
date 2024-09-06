import { useState } from "react";

const ViewPoints = ({ state }) => {
    const [view, setView] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const viewPoints = async (event) => {
        event.preventDefault();
        try {
            const { contract } = state;
            const address = document.querySelector("#address4").value;
            console.log(address);
            const points = await contract.points(address);
            setView(points.toString());
            console.log("View successful");
            setSuccessMessage("");
        } catch (error) {
            console.error(error);
            setSuccessMessage("Error viewing points");
        }
    };

    return (
        <div className="formContainer">
            <form onSubmit={viewPoints}>
                <label>Address:</label>
                <input type="text" id="address4" placeholder="Enter validators Address" />
                <button type="submit" className="button1">Enter</button>
                <p>{view}</p>
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default ViewPoints;
