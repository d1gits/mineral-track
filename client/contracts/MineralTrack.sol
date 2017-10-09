pragma solidity^0.4.13;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address public owner;

    // log owner events
    event TransferOwner(address newOwner);

    /**
    * @dev The Ownable constructor sets the original `owner` of the contract to the sender
    * account.
    */
    function Ownable() public {
        owner = msg.sender;
    }

    /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert();
        }
        _;
    }

    /**
    * @dev Allows the current owner to transfer control of the contract to a newOwner.
    * @param newOwner The address to transfer ownership to.
    */
    function transferOwnership(address newOwner) onlyOwner public {
        if (newOwner != address(0)) {
            owner = newOwner;
            TransferOwner(newOwner);
        }
    }
}

/**
 * @title MineralTrack
 * @dev The MineralTrack contract inherits an owner modifier,
 * and manages document fingerprint data for the owner's address.
 */
contract MineralTrack is Ownable {


    mapping (bytes32 => address) public fingerprints;

    event FingerprintStored(bytes32 fingerprint, address sender);
    event TranferFingerprintOwner(bytes32 fingerprint, address sender);


    function MineralTrack() public {}

    modifier onlyFingerprintOwner(bytes32 fingerprint) {
      require(fingerprints[fingerprint] == msg.sender);
      _;
    }

    modifier unclaimedFingerprint(bytes32 fingerprint) {
      require(fingerprints[fingerprint] != 0x0);
      _;
    }


    function transferFingerprint(bytes32 fingerprint, address newOwner) onlyFingerprintOwner(fingerprint) public {
        fingerprints[fingerprint] = newOwner;
        TranferFingerprintOwner(fingerprint, newOwner);
    }


    function setFingerprint(bytes32 fingerprint) unclaimedFingerprint(fingerprint) public {
          fingerprints[fingerprint] = msg.sender;
          FingerprintStored(fingerprint, msg.sender);
    }

    function getFingerprintOwner(bytes32 fingerprint) public constant returns (address owner) {
        return fingerprints[fingerprint];
    }
}
