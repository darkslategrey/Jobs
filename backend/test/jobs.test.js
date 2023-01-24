const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Jobs", () => {
  async function deployJobsFixture() {
    const [owner, account_1, account_2, account_3] = await ethers.getSigners();

    const Jobs = await ethers.getContractFactory("Jobs");
    const jobs = await Jobs.deploy();

    return { jobs, owner, account_1, account_2, account_3 };
  }

  it("Can add a job", async () => {
    const { jobs, owner } = await loadFixture(deployJobsFixture);
    const desc = "Faire les courses";
    await expect(jobs.addJob(desc, { value: 10 }))
      .to.emit(jobs, "jobAdded")
      .withArgs(owner.address, desc, 10, 1, false);
  });
});
