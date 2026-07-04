import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployCipherWalletToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying CipherWalletToken with account:", deployer);

  const initialAmount = 1000000;
  const tokenName = "CipherWallet Token";
  const tokenSymbol = "CWT";
  const contractURI = "https://cipherwallet.vercel.app/metadata.json";

  const deployed = await deploy("CipherWalletToken", {
    from: deployer,
    args: [deployer, initialAmount, tokenName, tokenSymbol, contractURI],
    log: true,
    waitConfirmations: 1
  });

  console.log("CipherWalletToken deployed at:", deployed.address);
};

export default deployCipherWalletToken;
deployCipherWalletToken.tags = ["CipherWalletToken"];
