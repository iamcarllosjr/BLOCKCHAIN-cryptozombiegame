//SPDX-License-Identifier:MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";

contract ZombieFactory is ERC721, Ownable, ERC721Pausable {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("ZombieFactory", "ZFC")
        Ownable(initialOwner)
    {}
  uint256 public maxZombiePerWallet = 3;
  uint256 dnaDigits = 16;
  uint256 dnaModulus = 10 ** dnaDigits;
  uint256 cooldownTime = 1 minutes;

  mapping (uint => address) public zombieToOwner;
  mapping (address => uint) walletMinted;
  mapping (address => Zombie[]) public zombieList;

  struct Zombie {
    string name;
    uint dna;
    uint32 level;
    uint32 readyTime;
    uint16 winCount;
    uint16 lossCount;
  }

  Zombie[] public zombies;

  event NewZombie(uint zombieId, string name, uint dna);

  function _createZombie(address _to, string memory _name, uint _dna) internal {
    zombies.push(Zombie(_name, _dna, 1, uint32(block.timestamp + cooldownTime), 0, 0));

    // Criar uma instância do Zombie
    Zombie memory newZombie = Zombie(_name, _dna, 1, uint32(block.timestamp + cooldownTime), 0, 0);

    // Adicionar o novo Zombie ao array zombieList associado ao endereço '_to'
    zombieList[_to].push(newZombie);
    require(walletMinted[msg.sender] <= maxZombiePerWallet, "Max per Wallet Exceeded");
    uint _tokenId = zombies.length - 1;
    zombieToOwner[_tokenId] = _to;
    walletMinted[msg.sender]++;
    uint256 tokenId = _nextTokenId++;
    _mint(_to, tokenId);

    emit NewZombie(tokenId, _name, _dna);
  }

   function getZombieListByOwner(address _owner) public view returns (Zombie[] memory) {
    return zombieList[_owner];
  }

  function _generateRandomDna(string memory _randDna) private view returns (uint) {
    uint rand = uint(keccak256(abi.encodePacked(_randDna)));
    return rand % dnaModulus;
  }

  function createRandomZombie(address _owner) public {
    uint randDna = _generateRandomDna("NoName");
    randDna = randDna - randDna % 100;
    _createZombie(_owner, "NoName", randDna);
  }

  function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Pausable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }
}
