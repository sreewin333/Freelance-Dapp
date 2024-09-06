//SPDX-License-Identifier:MIT
pragma solidity 0.8.19;

contract Freelance {
    address private clientaddress;
    address private freelancerAddress;
    bool public ProjectActive;
    bool public projectFinished;
    string internal article;
    bool public paymentconfirmed;
    bool public freelancerRequest;
    bool public projectmade;
    int256 public average;
    mapping(address => bool) public HasVoted;
    mapping(address => uint256) public ValidatorMapping;
    mapping(address => uint256) public points;
    address payable[] public validators;
    uint256 public reward;

    modifier onlyFreelancer() {
        if (msg.sender != freelancerAddress) {
            revert("caller is not freelancer!");
        }
        _;
    }
    modifier onlyClient() {
        if (msg.sender != clientaddress) {
            revert("caller is not client");
        }
        _;
    }
    modifier onlyValidator() {
        if (
            !(msg.sender == validators[0] ||
                msg.sender == validators[1] ||
                msg.sender == validators[2])
        ) {
            revert("caller not validator");
        }
        _;
    }
    modifier ClientAndFreelancer() {
        if (msg.sender != clientaddress && msg.sender != freelancerAddress) {
            revert("caller not client or validator");
        }
        _;
    }
    modifier clientAndVAlidators() {
        if (
            (msg.sender != clientaddress &&
                !(msg.sender == validators[0] ||
                    msg.sender == validators[1] ||
                    msg.sender == validators[2]))
        ) {
            revert("caller not client or validator");
        }
        _;
    }

    function MakeProject(address _clientaddress) public payable {
        clientaddress = _clientaddress;

        if (msg.value == 0) {
            revert("enter an amount");
        }
        reward = msg.value;
        projectmade = true;
    }

    function BecomeValidator(address newValidator) public payable {
        require(projectmade, "project is not created");
        if (validators.length > 2) {
            revert("no slot for validators");
        } else {
            require(
                msg.value >= 1 wei,
                "Send at least 1 wei to become a validator"
            );
            validators.push(payable(newValidator));
            ValidatorMapping[newValidator] = msg.value;
        }
    }

    function TakeProject(address _freelancerAdress) external {
        freelancerAddress = _freelancerAdress;
        ProjectActive = true;
    }

    function submitProject(string memory _article) external onlyFreelancer {
        article = _article;
        projectFinished = true;
    }

    function ApproveVote() public onlyValidator {
        require(!HasVoted[msg.sender], "validator has already voted");
        require(ProjectActive, "project not active to vote");
        HasVoted[msg.sender] = true;
        average++;
    }

    function DisapproveVote() public onlyValidator {
        require(!HasVoted[msg.sender], "validator has already voted");
        require(ProjectActive, "project not active to vote");
        HasVoted[msg.sender] = true;
        average--;
    }

    function transferPayment() public onlyClient {
        require(
            ProjectActive && projectFinished,
            "project not active or not finished"
        );
        require(!freelancerRequest, "freelancer already withdrew balance");

        uint256 totalSlashedAmount = 0;
        uint256 rewardForFreelancer = (reward * 3) / 4;

        payable(freelancerAddress).transfer(rewardForFreelancer);
        for (uint256 i = 0; i < validators.length; i++) {
            if (HasVoted[address(validators[i])]) {
                uint256 validatorReward = (reward / 4) / validators.length;
                validators[i].transfer(
                    validatorReward + ValidatorMapping[address(validators[i])]
                );
            } else {
                uint256 slashPercentage = 10;
                uint256 slashedAmount = (ValidatorMapping[
                    address(validators[i])
                ] * slashPercentage) / 100;
                totalSlashedAmount += slashedAmount;
                validators[i].transfer(
                    ValidatorMapping[address(validators[i])] - slashedAmount
                );
            }
        }
        paymentconfirmed = true;
        TransferRemaining();
    }

    function FreelancerRequestPayment() external onlyFreelancer {
        require(
            ProjectActive && projectFinished,
            "project not active or not finished"
        );
        require(!paymentconfirmed, "payment already done");
        if (average >= 2) {
            uint256 totalSlashedAmount = 0;
            uint256 rewardForFreelancer = (reward * 3) / 4;

            payable(freelancerAddress).transfer(rewardForFreelancer);

            for (uint256 i = 0; i < validators.length; i++) {
                if (HasVoted[address(validators[i])]) {
                    uint256 validatorReward = (reward / 4) / validators.length;
                    validators[i].transfer(
                        validatorReward +
                            ValidatorMapping[address(validators[i])]
                    );
                } else {
                    uint256 slashPercentage = 10;
                    uint256 slashedAmount = (ValidatorMapping[
                        address(validators[i])
                    ] * slashPercentage) / 100;
                    totalSlashedAmount += slashedAmount;
                    validators[i].transfer(
                        ValidatorMapping[address(validators[i])] - slashedAmount
                    );
                }
            }

            paymentconfirmed = true;
            TransferRemaining();
        } else {
            revert("Project disapproved by the validators!");
        }
    }

    function transferIfDisapproved() public clientAndVAlidators {
        uint256 totalSlashedAmount = 0;

        for (uint256 i = 0; i < validators.length; i++) {
            if (HasVoted[address(validators[i])]) {
                uint256 validatorReward = (reward / 4) / validators.length;
                validators[i].transfer(
                    validatorReward + ValidatorMapping[address(validators[i])]
                );
            } else {
                uint256 slashPercentage = 10;
                uint256 slashedAmount = (ValidatorMapping[
                    address(validators[i])
                ] * slashPercentage) / 100;
                totalSlashedAmount += slashedAmount;
                validators[i].transfer(
                    ValidatorMapping[address(validators[i])] - slashedAmount
                );
            }
        }

        paymentconfirmed = true;
        TransferRemaining();
    }

    function ValidatorPoints(
        uint256 __points,
        address _validatorAddress
    ) public ClientAndFreelancer {
        require(__points >= 0, "Points should be non-negative");

        uint256 adjustedPoints = __points > 10 ? 10 : __points;

        bool isValidator = false;

        for (uint256 i = 0; i < validators.length; i++) {
            if (_validatorAddress == validators[i]) {
                points[_validatorAddress] += adjustedPoints;
                isValidator = true;
                break;
            }
        }

        if (!isValidator) {
            revert("Invalid validator address");
        }
    }

    function TransferRemaining() public {
        payable(clientaddress).transfer(address(this).balance);
    }

    function Reset() public onlyClient {
        for (uint256 i = 0; i < validators.length; i++) {
            HasVoted[address(validators[i])] = false;
        }
        ProjectActive = false;
        projectFinished = false;
        paymentconfirmed = false;
        freelancerRequest = false;
        average = 0;
        reward = 0;
        validators = new address payable[](0);
    }

    function getClientAddress() public view returns (address) {
        return clientaddress;
    }

    function viewProject() public view returns (string memory) {
        return article;
    }

    function getBalance() public view returns (uint256) {
        return reward;
    }

    function ValidatorReward() public view returns (uint256) {
        uint256 rewardForOne = (reward / 4) / validators.length;
        return rewardForOne;
    }
}
