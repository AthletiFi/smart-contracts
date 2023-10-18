// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @custom:security-contact bugs@athleti.fi
// deployed contract address: Goerli - 0xf9dca77200dbecd5d7987d93327e83ef6a37e94b
contract VSASummer23NFT is ERC721, ERC721Enumerable, ERC721Pausable, Ownable, ERC721Burnable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("AthletiFi Player Cards - VSA Summer '23", "VSA23")
        Ownable(initialOwner)
    {
        _nextTokenId = 1;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://scarlet-electric-boar-374.mypinata.cloud/ipfs/QmNVykS89MYdw5ctcKY85B3MgwEEv6vwfYWxUm7gpVPYXu/";
    }


    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        address tokenOwner = address(0);
        bool tokenExists = true;
        
        // Try to get the owner of the token
        try this.ownerOf(tokenId) returns (address result) {
            tokenOwner = result;
        } catch {
            tokenExists = false;
        }

        require(tokenExists, "ERC721Metadata: URI query for nonexistent token");

        string memory base = _baseURI();
        return string(abi.encodePacked(base, Strings.toString(tokenId), "/metadata.json"));
    }


    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
