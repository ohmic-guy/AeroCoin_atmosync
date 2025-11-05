// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AeroCoin.sol";

contract AirNFT is ERC721, Ownable {
    AeroCoin public aeroCoin;
    uint256 public tokenIdCounter;

    constructor(address _aeroCoin, address _initialOwner)
        ERC721("AirNFT", "ANFT")
        Ownable(_initialOwner)
    {
        aeroCoin = AeroCoin(_aeroCoin);
        tokenIdCounter = 0;
    }

    function mintNFT(address to) public onlyOwner {
        uint256 newId = ++tokenIdCounter;
        _safeMint(to, newId);
        aeroCoin.reward(to, 10 * 10 ** 18);
    }
}
