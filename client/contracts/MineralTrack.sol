pragma solidity^0.4.13;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address public owner;

    // log owner events
    event TransferOwner(address _newOwner);
    
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
    * @param _newOwner The address to transfer ownership to. 
    */
    function transferOwnership(address _newOwner) onlyOwner public {
        if (_newOwner != address(0)) {
            owner = _newOwner;
            TransferOwner(_newOwner);
        }
    }
}

/**
 * @title MineralTrack
 * @dev The MineralTrack contract inherits an owner modifier, 
 * and manages document fingerprint data for the owner's address.
 */
contract MineralTrack is Ownable {
    
    /**
    * @dev The finerprints mapping stores an hash of the document fingerprints 
    * which contains mineral data mapped to the specific owner's address.
    */
    mapping (address => bytes32) public fingerprints;
    
    event FingerprintStored(bytes32 _hashedData);
    
    /**
    * @dev The MineralTrack constructor initializes the document fingerprints mapping.
    */
    function MineralTrack() public {}
    
    /**
    * @dev Allows the current owner to store a hash of the document fingerprints.
    * @param _hashedData The hash of the document fingerprints. 
    */
    function setFingerprint(bytes32 _hashedData) onlyOwner public {
        fingerprints[owner] = _hashedData;
        FingerprintStored(_hashedData);
    }
    
    /**
    * @dev Allows retrieval of fingerprint data relating to a specified owner's address.
    * @param _participant The address of the specified owner's fingerprint data.
    * @return _fingerprint The hash of the document fingerprints.
    */
    function getFingerprint(address _participant) public constant returns (bytes32 _fingerprint) {
        return fingerprints[_participant];
    }
}
