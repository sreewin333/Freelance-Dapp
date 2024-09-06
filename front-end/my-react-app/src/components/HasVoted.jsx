import { useState } from "react";

const HasVoted = ({ state }) => {
    const [view, setView] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const hasVoted = async (event) => {
        event.preventDefault();
        try {
            const { contract } = state;
            const address = document.querySelector("#address3").value;
            console.log(address);
            const hasVoted = await contract.HasVoted(address);

            // Convert the boolean value to a string for display
            const voteStatus = hasVoted ? "Voted" : "Not Voted";
            setView(voteStatus);
            setSuccessMessage("");
        } catch (error) {
            console.log(error);
            setSuccessMessage("Error viewing !!!");
        }
    }

    return (
        <>
            <div className="formContainer">
                <form onSubmit={hasVoted}>
                    <label>Address:</label>
                    <input type="text" id="address3" placeholder="Enter validators Address" />
                    <button type="submit" className="button1">Enter</button>
                    <p>{view}</p>
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                </form>
            </div>
        </>
    );
};

export default HasVoted;
