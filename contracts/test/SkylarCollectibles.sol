pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SkylarCollectibles is ERC721URIStorage, VRFConsumerBase{
AggregatorV3Interface internal priceFeed;
bytes32 internal keyHash;
uint256 internal fee;
address public vrfCoordinator;
address public LinkToken;

struct Collectible
{
    int256 alchemistJournal;
    uint256 magnifier;
    uint256 bacterium;
    uint256 alcohol;
    uint256 goldenPen;
    uint256 secondChance;
    uint256 badge;

    string name;
    
}

Collectible[] public collectibles;
mapping(bytes32 => string) public requestToCollectibleName;
mapping(bytes32 => address) public requestToSender;
event requestedCollectible(bytes32 indexed requestId);


constructor (address _VRFCoordinator, address _linkToken, bytes32 _keyhash, address _priceFeed) 
public 
VRFConsumerBase(_VRFCoordinator, _linkToken) 
ERC721("SkylarCollectibles", "SC")
    {    
        vrfCoordinator = _VRFCoordinator;
        priceFeed = AggregatorV3Interface(_priceFeed);
        LinkToken = _linkToken;
        keyHash = _keyhash;
        fee = 0.1 * 10**18; //0.1 Link

    }    

    function requestNewRandomCollectible (string memory name)
    public returns (bytes32){
        require(LINK.balanceOf(address(this)) >= fee,
        "NOT ENOUGH LINK - fill contract with"
        );
        bytes32 requestId = requestRandomness(keyHash, fee);
        requestToCollectibleName[requestId] = name;
        requestToSender[requestId] = msg.sender;
        emit requestedCollectible(requestId);
        return requestId;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory){
        return tokenURI(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory  _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId), 
            "Transfer caller is not owner or approved"
         
         );

        _setTokenURI(tokenId, _tokenURI);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber)
    internal
    override
    {
        uint256 newId = collectibles.length;
        int256 problemSolving = (getLatestPrice()/ 1000000000);
        uint256 conceptualization = randomNumber * 100;
        uint256 creativity = uint256 (keccak256(abi.encode(randomNumber, 1))) % 100;
        uint256 criticaThinking = uint256 (keccak256(abi.encode(randomNumber, 2))) % 100;
        uint256 empathy = uint256 (keccak256(abi.encode(randomNumber, 3))) % 100;
        uint256 flexibility = uint256 (keccak256(abi.encode(randomNumber, 4))) % 100;
        uint256 grit = 0;

        Collectible memory collectible = Collectible(
            problemSolving,
            conceptualization,
            creativity,
            criticaThinking,
            empathy,
            grit,
            flexibility,
            requestToCollectibleName[requestId]);
            collectibles.push(collectible);
            _safeMint(requestToSender[requestId], newId);

    }

     


    function getNumberOfCollectibles() public view returns (uint256){
        return collectibles.length;
     }

    function getLatestPrice() public view returns (int) 
    {
            (
                uint80 roundID, int price, uint256 startedAt,uint256 updatedAt, uint80 answeredInRound
            )  =  priceFeed.latestRoundData();
            return price;
           
    }

}


