//SPDX-License-Identifier:MIT
pragma solidity 0.8.19;
import {Script} from "forge-std/Script.sol";

contract Helperconfig is Script {
    address public client = makeAddr("client");
    uint256 public constant value = 10 ether;
    address public sepoliaClient = 0x6ABc3025032F719B5E42f0f97D5C72402E3efB5F;
    uint256 public constant SepoliaValue = 0.001 ether;
    struct Networkconfig {
        address adress;
    }

    Networkconfig public Activenetworkconfig;

    constructor() {
        if (block.chainid == 11155111) {
            Activenetworkconfig = getSepoliaEthConfig();
        } else {
            Activenetworkconfig = getAnvilEthConfig();
        }
    }

    function getAnvilEthConfig() public view returns (Networkconfig memory) {
        return Networkconfig({adress: client});
    }

    function getSepoliaEthConfig() public view returns (Networkconfig memory) {
        return Networkconfig({adress: sepoliaClient});
    }
}
