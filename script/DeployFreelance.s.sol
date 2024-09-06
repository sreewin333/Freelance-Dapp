//SPDX-License-Identifier:MIT
pragma solidity 0.8.19;
import {Script} from "forge-std/Script.sol";
import {Freelance} from "../src/Freelance.sol";
import {Helperconfig} from "./Helperconfig.s.sol";

contract DeployFreelance is Script {
    Freelance freelance;

    function run() external returns (Freelance) {
        Helperconfig helperconfig = new Helperconfig();
        helperconfig.Activenetworkconfig();
        vm.startBroadcast();
        freelance = new Freelance();
        vm.stopBroadcast();
        return freelance;
    }
}
