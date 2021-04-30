// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract SocialMusic {
    
    address[] usersList;
    
    struct User {
        string name;
        string state;
        uint age;
        string[] recommendations;
        address[] following;
    }

    mapping(address => User) users;
    mapping(address => bool) userExists;

    function addSong(string memory _songName) public {
        require(bytes(_songName).length > 0 && bytes(_songName).length <= 100, "Songname is empty or too long.");
        users[msg.sender].recommendations.push(_songName);
    }

    function setup(string memory _name, uint _age, string memory _state) public {
        bytes memory nameBytes = bytes(_name);
        require(nameBytes.length > 0, "Name is empty.");
        users[msg.sender] = User(_name, _state, _age, users[msg.sender].recommendations, users[msg.sender].following);
        userExists[msg.sender] = true;
        usersList.push(msg.sender);
    }
    function follow(address _user) public {
        require(_user != address(0), "Address should not be initial address value");
        users[msg.sender].following.push(_user);
    }

    function hasAccount(address _address) public view returns (bool) {
        return userExists[_address];
    }

    function getUsersList() public view returns (address[] memory) {
        return usersList;
    }

    function getYourSongs(address _address) public view returns (string[] memory) {
        return users[_address].recommendations;
    }

    function getUsersYouFollow(address _address) public view returns (address[] memory) {
        return users[_address].following;
    }
}
