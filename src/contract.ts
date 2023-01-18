import {ethers} from "ethers";

export const provider = new ethers.providers.Web3Provider(window.ethereum);

export const getContractPolyFactory = async () => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(polyFactoryAddress, polyFactoryAbi, signer);
    return { signer: signer, contract: contract };
};

//

const polyFactoryAddress = "0x0b306bf915c4d645ff596e518faf3f9669b97016";
const polyFactoryAbi = [
    "constructor()",
    "event ApprovalForAll(address indexed account, address indexed operator, bool approved)",
    "event BuildingPuttedToAuction(uint256 buildingId, uint256 price)",
    "event BuildingSold(uint256 buildingId, uint256 price, address previousOwner, address newOwner)",
    "event CancelSold(uint256 buildingId)",
    "event NewBoard(uint256 boardId, string name, uint256 blind, uint256 buyIn)",
    "event NewBuilding(uint256 buildingId, string name)",
    "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
    "event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)",
    "event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)",
    "event URI(string value, uint256 indexed id)",
    "function balanceOf(address account, uint256 id) view returns (uint256)",
    "function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])",
    "function boards(uint256) view returns (string name, uint256 blind, uint256 buyIn, uint256 boardId)",
    "function buildingToBoard(uint256) view returns (uint256)",
    "function buildingToOwner(uint256) view returns (address)",
    "function buildings(uint256) view returns (uint8 nameType, uint256 boardId, uint256 price, bool isBuyable, address owner, uint256 buildingId)",
    "function buyBuilding(uint256 _buildingId) payable",
    "function createBoard(string _name, uint256 _blind, uint256 _buyIn)",
    "function createUniqueNFT(string _type, uint256 _boardId)",
    "function deleteAuction(uint256 _buildingId)",
    "function findBuildingByOwner(address _owner) view returns (tuple(uint8 nameType, uint256 boardId, uint256 price, bool isBuyable, address owner, uint256 buildingId)[])",
    "function findBuildingsByBoardId(uint256 _boardId) view returns (tuple(uint8 nameType, uint256 boardId, uint256 price, bool isBuyable, address owner, uint256 buildingId)[])",
    "function getBoardIds() view returns (uint256)",
    "function getBoards() view returns (tuple(string name, uint256 blind, uint256 buyIn, uint256 boardId)[])",
    "function getBuildingIds() view returns (uint256)",
    "function getBuildingTypeName(uint256 buildingTypeIndex) pure returns (string)",
    "function getBuildings() view returns (tuple(uint8 nameType, uint256 boardId, uint256 price, bool isBuyable, address owner, uint256 buildingId)[])",
    "function getLastBuildingIds() view returns (uint256)",
    "function getOwnerByBuildingId(uint256 buildingId) view returns (address)",
    "function isApprovedForAll(address account, address operator) view returns (bool)",
    "function owner() view returns (address)",
    "function putBuildingToAuction(uint256 _buildingId, uint256 _price)",
    "function renounceOwnership()",
    "function rollDice(uint256 _seed) view returns (uint256)",
    "function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] amounts, bytes data)",
    "function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)",
    "function setApprovalForAll(address operator, bool approved)",
    "function supportsInterface(bytes4 interfaceId) view returns (bool)",
    "function transferOwnership(address newOwner)",
    "function uri(uint256) view returns (string)"
];

