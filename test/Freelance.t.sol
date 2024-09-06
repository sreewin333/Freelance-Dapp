//SPDX-License-Identifier:MIT
pragma solidity 0.8.19;
import {Test, console} from "forge-std/Test.sol";
import {Freelance} from "../src/Freelance.sol";
import {DeployFreelance} from "../script/DeployFreelance.s.sol";

contract FreelanceTest is Test {
    Freelance freelance;
    address immutable client = makeAddr("client");
    address immutable freelancer = makeAddr("freelancer");

    function setUp() external {
        DeployFreelance deployfreelance = new DeployFreelance();
        freelance = deployfreelance.run();
    }

    //function to test if the boolean is true if the project is taken by the freelancer
    function testFreelancerIsProjectActive() public {
        freelance.TakeProject(freelancer);
        assertEq(freelance.ProjectActive(), true);
    }

    //function to test that only the freelancer can submit the project
    function testSubmitProjectOnlyFreelancer() public {
        address fakefreelancer = makeAddr("fakefreelancer");
        freelance.TakeProject(freelancer);
        vm.expectRevert();
        vm.prank(fakefreelancer);
        freelance.submitProject("project completed");
    }

    //function to check if the boolean is true when the project is finished
    function testIfBoolProjectFinishedIstrue() public {
        freelance.TakeProject(freelancer);
        vm.prank(freelancer);
        freelance.submitProject("project completed");
        assertEq(freelance.projectFinished(), true);
    }

    //function to check for transfering payment only works if the boolean is true
    function testtransferPaymentOnlyTrue() public {
        vm.expectRevert();
        vm.prank(client);
        freelance.transferPayment();
    }

    //function to test that only the client can can the transferPayment function
    function testOnlyClientCanTransfer() public {
        address fakeclient = makeAddr("fakeClient");
        freelance.TakeProject(freelancer);
        vm.prank(freelancer);
        freelance.submitProject("project completed");
        vm.expectRevert();
        vm.prank(fakeclient);
        freelance.transferPayment();
    }

    //function to check if the transfer is working correctly
    function testTransferWorkingCorrectly() public {
        freelance.TakeProject(freelancer);
        vm.prank(freelancer);
        freelance.submitProject("project completed");
        address owner = makeAddr("owner");
        vm.deal(owner, 10 ether);
        vm.prank(owner);
        freelance.MakeProject{value: 5 ether}(owner);
        vm.prank(owner);
        freelance.transferPayment();
        assertEq(freelance.reward(), 5 ether);
        assertEq(freelance.paymentconfirmed(), true);
    }

    //function to test the freelancerRequestpayment function
    function testFreelancerRequestpayment() public {
        address fakeclient = makeAddr("fakeClient");
        vm.expectRevert();
        vm.prank(fakeclient);
        freelance.FreelancerRequestPayment();
    }

    //function to test the function freelancerRequestpayment only works if the project is submitted
    function testFreelancerRequestPaymentRevert() public {
        freelance.TakeProject(freelancer);
        vm.prank(freelancer);
        vm.expectRevert();
        freelance.FreelancerRequestPayment();
    }

    //function to test the FreelancerRequestPayment function will revert if the payment is already done
    function testFreelancerCannotRequestAfterPayment() public {
        address owner = makeAddr("owner");
        vm.deal(owner, 10 ether);
        freelance.MakeProject{value: 4 ether}(owner);
        freelance.TakeProject(freelancer);
        vm.prank(freelancer);
        freelance.submitProject("project completed");
        vm.prank(owner);
        freelance.transferPayment();
        vm.expectRevert();
        vm.prank(freelancer);
        freelance.FreelancerRequestPayment();
    }

    function testcannottransferIfDisapproved() public {
        address v1 = makeAddr("v1");
        vm.deal(v1, 1 ether);
        address v2 = makeAddr("v2");
        vm.deal(v2, 1 ether);
        address v3 = makeAddr("v3");
        vm.deal(v3, 1 ether);
        address owner = makeAddr("owner");
        vm.deal(owner, 10 ether);
        freelance.MakeProject{value: 4 ether}(owner);
        freelance.BecomeValidator{value: 1 ether}(v1);
        freelance.BecomeValidator{value: 1 ether}(v2);
        freelance.BecomeValidator{value: 1 ether}(v3);
        freelance.TakeProject(freelancer);
        vm.prank(freelancer);
        freelance.submitProject("project done");
        vm.prank(v1);
        freelance.DisapproveVote();
        vm.prank(v2);
        freelance.DisapproveVote();
        vm.prank(v3);
        freelance.DisapproveVote();
        vm.expectRevert();
        vm.prank(freelancer);
        freelance.FreelancerRequestPayment();
    }

    function testtransferIfDisapprovedcorrect() public {
        address v1 = makeAddr("v1");
        vm.deal(v1, 1 ether);
        address v2 = makeAddr("v2");
        vm.deal(v2, 1 ether);
        address v3 = makeAddr("v3");
        vm.deal(v3, 1 ether);
        address owner = makeAddr("owner");
        vm.deal(owner, 15 ether);
        freelance.MakeProject{value: 12 ether}(owner);
        freelance.BecomeValidator{value: 1 ether}(v1);
        freelance.BecomeValidator{value: 1 ether}(v2);
        freelance.BecomeValidator{value: 1 ether}(v3);
        freelance.TakeProject(freelancer);
        vm.prank(freelancer);
        freelance.submitProject("project done");
        vm.prank(v1);
        freelance.DisapproveVote();
        vm.prank(v2);
        freelance.DisapproveVote();
        vm.prank(v3);
        freelance.DisapproveVote();
        vm.prank(owner);
        freelance.transferIfDisapproved();
        assertEq(freelance.ValidatorReward(), 1 ether);
    }
}
