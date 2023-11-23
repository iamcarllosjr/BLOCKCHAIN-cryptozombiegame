//SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;

import "./ZombieFeeding.sol";

//Zumbis ganharão novas habilidades depois de certo nivel
//Trocar de nome e trocar de DNA

contract ZombieHelper is ZombieFeeding {
    uint256 levelUpFee = 0.001 ether;

    constructor(address initialOwner) ZombieFeeding(initialOwner) {}

    function setLevelUpFee(uint256 _fee) external onlyOwner {
        levelUpFee = _fee;
    }

    function withdraw() external payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "balance not enough");
    }

    modifier aboveLevel(uint256 _level, uint256 _zombieId) {
        //Buscando dentro do array da struct zombies o id do zombie e seu atributo level.
        require(zombies[_zombieId].level >= _level);
        _;
    }

    function changeName(uint256 _zombieId, string memory _newName)
        external
        aboveLevel(2, _zombieId) onlyOwnerOf(_zombieId)
    {
        zombies[_zombieId].name = _newName;
    }

    function changeDna(uint256 _zombieId, uint256 _newDna)
        external
        aboveLevel(20, _zombieId) onlyOwnerOf(_zombieId)
    {
        zombies[_zombieId].dna = _newDna;
    }

    function getZombiesByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](walletMinted[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < zombies.length; i++) {
            if (zombieToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }
}
