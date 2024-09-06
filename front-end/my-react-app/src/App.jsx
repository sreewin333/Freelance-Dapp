
import {ethers} from "ethers";
import { useState} from "react";
import Navigationbar from "./nav.jsx";
import freelance from "./freelance.json"
import TakeProject from "./components/TakeProject.jsx";
import SubmitProject from "./components/SubmitProject.jsx";
import TransferPayment from "./components/TransferPayment.jsx";
import RequestPayment from "./components/RequestPayment.jsx";
import ViewProject from "./components/Viewproject.jsx";
import CreateProject from "./components/CreateProject.jsx";
import BecomeValidator from "./components/BecomeValidator.jsx";
import ApproveVote from "./components/ApproveVote.jsx";
import DisapproveVote from "./components/DisapproveVote.jsx";
import ValidatorPoints from "./components/ValidatorPoints.jsx";
import ViewPoints from "./components/ViewPoints.jsx";
import HasVoted from "./components/HasVoted.jsx";
import TransferIfDisapproved from "./components/TransferIfDisapproved.jsx";
import Reset from "./components/Reset.jsx";
import ViewValidators from "./components/ViewValidators.jsx";




function App() {
  const[account,setAccount]=useState("")

const [state,setState]=useState(
  {provider:null,
  signer:null,
contract:null,}
);
const [showVoteButtons, setShowVoteButtons] = useState(false);
const [showPreviousStatevote, setShowPreviousStatevote] = useState(false);
const [showrewardPoints, setShowRewardpoints] = useState(false);
const [showPreviousStatereward, setShowPreviousStatereward] = useState(false);
const [showvalidatorPoints, setShowvalidatorpoints] = useState(false);
const [showPreviousStatepoints, setShowPreviousStatepoints] = useState(false);
const [showvalidatorsvote, setShowvalidatorsvote] = useState(false);
const [previousvote, setpreviousvote] = useState(false);
const [showvalidators, setShowvalidators] = useState(false);
const [previousvalidators, setpreviousvalidators] = useState(false);
/*function for connecting metamask wallet*/
  const connectWallet= async()=>{
    const contractAddress=freelance.address;
    const ABI=freelance.abi;
    try{
      const {ethereum}=window;
      if(ethereum){
        const accounts=await ethereum.request({method:"eth_requestAccounts",});
      setAccount(accounts[0]);}
      const provider=new ethers.providers.Web3Provider(ethereum);
      const signer=provider.getSigner();
      const contract= new ethers.Contract(contractAddress,ABI,signer);
      setState({provider,signer,contract})
    }catch(error){
      console.log(error)
    }
  };
  const handleClickToVote = (event) => {
    event.preventDefault();
    setShowVoteButtons(true);
    setShowPreviousStatevote(true);
  };

  const handleGoBackvote = (event) => {
    event.preventDefault();
    setShowVoteButtons(false);
    setShowPreviousStatevote(false);
  };
  const handleClickToaward = (event) => {
    event.preventDefault();
    setShowRewardpoints(true);
    setShowPreviousStatereward(true);
  };
  const handleGoBackreward = (event) => {
    event.preventDefault();
    setShowRewardpoints(false);
   setShowPreviousStatereward(false);}
   
   const handleClickTopoints = (event) => {
    event.preventDefault();
    setShowvalidatorpoints(false);
    setShowPreviousStatepoints(false);

  };
  const handleGoBackpoints = (event) => {
    event.preventDefault();
    setShowvalidatorpoints(true);
    setShowPreviousStatepoints(true);
  }
  const seevalidatorsvote = (event) => {
    event.preventDefault();
    setShowvalidatorsvote(false);
    setpreviousvote(false);

  };
  const previousvalidatorsvote= (event) => {
    event.preventDefault();
    setShowvalidatorsvote(true);
    setpreviousvote(true);
  };
  const seevalidators = (event) => {
    event.preventDefault();
    setShowvalidators(false);
    setpreviousvalidators(false);

  };
  const seepreviousvalidators= (event) => {
    event.preventDefault();
    setShowvalidators(true);
    setpreviousvalidators(true);
  };






  
  return(<>
  <Navigationbar/>
   <p className="reward"> Reward=1 wei🎉🎉</p>
 <div className="h2">
   <h2 ><span className="head"> *Project description</span></h2>
   <h4 className="h4">*urgent need for a short story for childrens</h4>
   </div>
  <div className="connection">
   <button onClick={connectWallet} className="button">Connect Wallet</button>
   <p className="account">account:{account}</p>
   </div>
   <div className="container">
   <div className="display">
   <TakeProject state={state} /><br />
   <SubmitProject state={state}/>
   </div>
</div>
<div className="buttonarea">
  <TransferPayment state={state}/> <br />
   <RequestPayment state={state}/>
  <ViewProject state={state}></ViewProject>
</div>
<CreateProject state={state}></CreateProject>
<BecomeValidator state={state}></BecomeValidator>
   
   {showVoteButtons && (
        <div className="voteButtons">
          <ApproveVote state={state} />
          <DisapproveVote state={state} />
          <p>
            <a href="" onClick={handleGoBackvote}>Click to go back</a>
          </p>
        </div>
      )}
    
      {!showVoteButtons && !showPreviousStatevote && (
        <div className="voteButtonLink">
          <a href="" onClick={handleClickToVote}>Click here to vote</a>
        </div>
      )};
{showrewardPoints && (
        <div className="voteButtons">
         <ValidatorPoints state={state}></ValidatorPoints>
          <p>
            <a href="" onClick={handleGoBackreward}>Click to go back</a>
          </p>
        </div>
      )}
    
      {!showrewardPoints && !showPreviousStatereward && (
        <div className="voteButtonLink">
          <a href="" onClick={handleClickToaward}>Click here to reward points to validators</a>
        </div>
      )};


{showvalidatorPoints && (
        <div className="voteButtons">
         <ViewPoints state={state}></ViewPoints>
          <p>
            <a href="" onClick={handleClickTopoints}>Click to go back</a>
          </p>
        </div>
      )}
    
      {!showvalidatorPoints && !showPreviousStatepoints && (
        <div className="voteButtonLink">
          <a href="" onClick={handleGoBackpoints}>click here to see validator points</a>
        </div>
      )};

{showvalidatorsvote && (
        <div className="voteButtons">
         <HasVoted state={state}></HasVoted>
          <p>
            <a href="" onClick={seevalidatorsvote}>Click to go back</a>
          </p>
        </div>
      )}
    
      {!showvalidatorsvote && !previousvote && (
        <div className="voteButtonLink">
          <a href="" onClick={previousvalidatorsvote}>click here to see validator's vote</a>
        </div>
      )};
      {showvalidators && (
        <div className="voteButtons">
        <ViewValidators state={state}></ViewValidators>
          <p>
            <a href="" onClick={seevalidators}>Click to go back</a>
          </p>
        </div>
      )}
    
      {!showvalidators && !previousvalidators && (
        <div className="voteButtonLink">
          <a href="" onClick={seepreviousvalidators}>click here to see validator's</a>
        </div>
      )};
      

<TransferIfDisapproved state={state}></TransferIfDisapproved><br />
<Reset state={state}></Reset>
 </>
);

  
};

export default App