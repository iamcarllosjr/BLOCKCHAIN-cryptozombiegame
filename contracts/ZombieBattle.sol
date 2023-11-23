//SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;

import "./ZombieHelper.sol";

contract ZombieBattle is ZombieHelper {

    constructor(address initialOwner) ZombieHelper(initialOwner) {}

  uint randNonce = 0;
  uint attackVictoryProbability = 70;

  function randMod(uint _modulus) internal returns(uint) {
    randNonce++;
    return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % _modulus;
  }

  function attack(uint _zombieId, uint _targetId) external onlyOwnerOf(_zombieId) {
    require(_targetId != _zombieId, "Voce NAO pode atacar a si mesmo");
    Zombie storage myZombie = zombies[_zombieId];
    Zombie storage enemyZombie = zombies[_targetId];
    uint rand = randMod(60);
    if (rand <= attackVictoryProbability) {
      myZombie.level++;
      myZombie.winCount++;
      enemyZombie.lossCount++;
      feedAndMultiply(_zombieId, enemyZombie.dna, "zombie");
    } else {
      myZombie.lossCount++;
      enemyZombie.winCount++;
      enemyZombie.level++;

    }
  }
}