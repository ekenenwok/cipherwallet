// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";
import {FHE, externalEuint64, euint64} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";
import {ERC7984} from "@openzeppelin/confidential-contracts/token/ERC7984/ERC7984.sol";

/// @title CipherWalletToken
/// @notice A confidential ERC7984 token for the CipherWallet dashboard.
/// Balances and transfer amounts are encrypted end-to-end using Zama's FHEVM.
/// Only the token holder can decrypt their own balance.
contract CipherWalletToken is ZamaEthereumConfig, ERC7984, Ownable2Step {
    constructor(
        address owner,
        uint64 initialAmount,
        string memory name_,
        string memory symbol_,
        string memory contractURI_
    ) ERC7984(name_, symbol_, contractURI_) Ownable(owner) {
        euint64 encryptedAmount = FHE.asEuint64(initialAmount);
        _mint(owner, encryptedAmount);
    }

    /// @notice Mint new confidential tokens to an address. Owner only.
    /// @dev Uses an encrypted input so the minted amount stays private on-chain.
    function mint(address to, externalEuint64 amount, bytes memory inputProof) public onlyOwner {
        euint64 encryptedAmount = FHE.fromExternal(amount, inputProof);
        _mint(to, encryptedAmount);
    }

    /// @notice Burn confidential tokens from an address. Owner only.
    function burn(address from, externalEuint64 amount, bytes memory inputProof) public onlyOwner {
        euint64 encryptedAmount = FHE.fromExternal(amount, inputProof);
        _burn(from, encryptedAmount);
    }
}
