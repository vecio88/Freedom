// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >= 0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Freedom.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TestFreedom is IERC721Receiver{ 
    
    Freedom freedom = Freedom(DeployedAddresses.Freedom());
    uint expectedCanzoneId = 1;
    uint[] expectedBrani; 
    uint expectedAscolti = 1;

    fallback() external payable{}

    receive() external payable{}

     function testinviaEther() public{
        bool paid = freedom.inviaEther(payable (address(this)), 5 ether);
        Assert.equal(paid, true, "impossibile ritirare ether");
    }

    function testAddCanzone() public {
        uint returnedId = freedom.addCanzone("URI");
        Assert.equal(returnedId, expectedCanzoneId, "impossibile inserire il brano");
    }
    function testExist() public{
        bool existNFT = freedom.exists(expectedCanzoneId);
        Assert.equal(existNFT, true, "il tuo brano non esiste");
    }
    function testGetPropriBrani() public{
        expectedBrani.push(expectedCanzoneId);
        uint[] memory returnedBrani = freedom.getPropriBrani();
        Assert.equal(returnedBrani, expectedBrani , "impossibile trovare i tuoi brani");
    }
    function testGetLastTokenId() public{
        uint returnedLastId = freedom.getLastTokenId();
        Assert.equal(returnedLastId, expectedCanzoneId, "impossibile recuperare l'ultimo token");
    }
    function testAddAscolti() public{
        bool add = freedom.addAscolti(expectedCanzoneId);
        Assert.equal(add, true, "impossibile inserire gli ascolti del brano");
    }
    function testGetAscolti() public{
        uint returnedAscolti = freedom.getAscolti(expectedCanzoneId);
        Assert.equal(returnedAscolti, expectedAscolti, "impossibile trovare gli ascolti del tuo brano");
    }
    function testRitiraEther() public{
        bool paid = freedom.ritiraEther();
        Assert.equal(paid, true, "impossibile ritirare ether");
    }

    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }
  
}