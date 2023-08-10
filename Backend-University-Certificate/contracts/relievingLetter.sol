// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';


/**THE BELOW PROGRAM REQUIRES GENERATES A RELIEVING LETTER OWNED BY AN HR CONSORTIUM */

contract relievingLetter is ERC721{
   

    struct tokenDetails{
        
        string IPFShashLink;    //hash of document uploaded on IPFS 
        uint tokenID;           
    } 

    tokenDetails public RL;
   

    mapping(uint256=>tokenDetails) details;

    event tokenCreated(tokenDetails);
    event tokenExists(tokenDetails);
    event tokenVerified(tokenDetails);
    event tokenNotExist();



constructor (/*can initialise msg.sender*/) ERC721("RelievingLetter", 'RL'){

}

function bytesToUint(bytes memory b) public pure returns (uint256){
        uint256 number;
        for(uint i=0;i<b.length;i++){
            number = number + uint8(b[i]);
        }
        return number;
    }

function createToken( string memory _IPFSLink ) public payable {          // create token by HR


RL.IPFShashLink=_IPFSLink;
bytes memory encoded= abi.encodePacked(RL.IPFShashLink);            // encode ipfs hash link
RL.tokenID=bytesToUint(encoded);                                            //convert the encoding into a single uint 256 

// require(!_exists(RL.letterID), emit letterExists(RL.letterID));       // checks if letter already exists by letterID
if(!_exists(RL.tokenID)){
_mint(msg.sender, RL.tokenID);                    // emits Transfer(address(0), to, letterId);
details[RL.tokenID]=RL;                              //mapping(uint256=>letterDetails) details;
emit tokenCreated(RL);

        }                   

else {
    emit tokenExists(RL);
}
}



 function verify_with_ipfsLink(string memory hashLink)public view returns(tokenDetails memory RL_return) { {  // if employee wants to verify if his letter is entered with ipfslink


bytes memory encoded= abi.encodePacked(hashLink);            // encode ipfs hash link
uint256 tokenID=bytesToUint(encoded); 


 if(_exists(tokenID)){
tokenDetails memory RL_verify= details[tokenID];                    //mapping(uint256=>letterDetails) details;

// emit tokenVerified(RL_verify);
return (RL_verify);
              
 }

 if(!_exists(tokenID)) {
tokenDetails memory RL_verify;
RL_verify.IPFShashLink="nil";
RL_verify.tokenID=0;

return(RL_verify);

    // emit tokenNotExist();

 }

 }
 }
}