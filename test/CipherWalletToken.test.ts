import { expect } from "chai";
import { ethers, fhevm } from "hardhat";

describe("CipherWalletToken", function () {
  let token: any;
  let owner: any;
  let recipient: any;
  let other: any;

  const INITIAL_AMOUNT = 1000000;
  const TRANSFER_AMOUNT = 500;

  beforeEach(async function () {
    [owner, recipient, other] = await ethers.getSigners();

    token = await ethers.deployContract("CipherWalletToken", [
      owner.address,
      INITIAL_AMOUNT,
      "CipherWallet Token",
      "CWT",
      "https://cipherwallet.vercel.app/metadata.json"
    ]);
  });

  describe("Deployment", function () {
    it("should set the correct name", async function () {
      expect(await token.name()).to.equal("CipherWallet Token");
    });

    it("should set the correct symbol", async function () {
      expect(await token.symbol()).to.equal("CWT");
    });

    it("should set the correct owner", async function () {
      expect(await token.owner()).to.equal(owner.address);
    });

    it("should mint initial amount to owner", async function () {
      const encryptedBalance = await token.confidentialBalanceOf(owner.address);
      const clearBalance = await fhevm.userDecryptEuint(
        "euint64",
        encryptedBalance,
        await token.getAddress(),
        owner
      );
      expect(clearBalance).to.equal(INITIAL_AMOUNT);
    });
  });

  describe("Minting", function () {
    it("should allow owner to mint new tokens", async function () {
      const encryptedInput = await fhevm
        .createEncryptedInput(await token.
