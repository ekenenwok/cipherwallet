import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@fhevm/hardhat-plugin";
import "hardhat-deploy";
import { vars } from "hardhat/config";

const MNEMONIC = vars.has("MNEMONIC") ? vars.get("MNEMONIC") : "test test test test test test test test test test test junk";
const INFURA_API_KEY = vars.has("INFURA_API_KEY") ? vars.get("INFURA_API_KEY") : "";
const ETHERSCAN_API_KEY = vars.has("ETHERSCAN_API_KEY") ? vars.get("ETHERSCAN_API_KEY") : "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + INFURA_API_KEY,
      chainId: 11155111,
      accounts: {
        mnemonic: MNEMONIC
      }
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};

export default config;
