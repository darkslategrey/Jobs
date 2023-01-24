// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Jobs {
    struct Job {
        address author;
        address worker;
        string description;
        uint price;
        bool isFinished;
    }

    Job[] jobs;

    event jobAdded(
        address indexed author,
        string desc,
        uint price,
        uint id,
        bool isFinished
    );

    event jobTaken(address indexed worker, uint id);

    event jobIsFinishedAndPaid(
        address indexed author,
        address indexed worker,
        uint id,
        uint pricePaid
    );

    function addJob(string calldata _desc) external payable {
        Job memory job = Job(msg.sender, address(0), _desc, msg.value, false);
        jobs.push(job);

        emit jobAdded(msg.sender, _desc, msg.value, jobs.length, false);
    }

    function takeJob(uint _id) external {}

    function setIsFinishedAndPay(uint _id) external {}
}
