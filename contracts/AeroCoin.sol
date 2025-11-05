// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AeroCoin is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("AeroCoin", "AERO")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 1000 * 10 ** decimals());
    }

    function reward(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
