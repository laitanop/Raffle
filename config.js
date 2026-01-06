// Contract Address - Replace with your deployed contract address
export const CONTRACT_ADDRESS = "0x16A182E8D9dD486c9759E525263f225Ad3AA9F2e";

export const NETWORK_CONFIG = {
  chainId: "0xAA36A7",
  chainName: "Sepolia Testnet",

  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
};

export const CONTRACT_ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "subscriptionId", type: "uint256", internalType: "uint256" },
      { name: "gasLane", type: "bytes32", internalType: "bytes32" },
      { name: "interval", type: "uint256", internalType: "uint256" },
      { name: "entranceFee", type: "uint256", internalType: "uint256" },
      { name: "callbackGasLimit", type: "uint32", internalType: "uint32" },
      { name: "vrfCoordinator", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "acceptOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkUpkeep",
    inputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    outputs: [
      { name: "upkeepNeeded", type: "bool", internalType: "bool" },
      { name: "", type: "bytes", internalType: "bytes" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "enterRaffle",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getAllPlayers",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEntranceFee",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getInterval",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastTimeStamp",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMinPlayers",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getNumberOfPlayers",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPlayer",
    inputs: [{ name: "index", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRaffleState",
    inputs: [],
    outputs: [
      { name: "", type: "uint8", internalType: "enum Raffle.RaffleState" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRecentWinner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "performUpkeep",
    inputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "rawFulfillRandomWords",
    inputs: [
      { name: "requestId", type: "uint256", internalType: "uint256" },
      { name: "randomWords", type: "uint256[]", internalType: "uint256[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "s_vrfCoordinator",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IVRFCoordinatorV2Plus",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setCoordinator",
    inputs: [
      { name: "_vrfCoordinator", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "to", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CoordinatorSet",
    inputs: [
      {
        name: "vrfCoordinator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferRequested",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RaffleEntered",
    inputs: [
      {
        name: "player",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RequestedRaffleWinner",
    inputs: [
      {
        name: "requestId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "WinnerPicked",
    inputs: [
      {
        name: "winner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OnlyCoordinatorCanFulfill",
    inputs: [
      { name: "have", type: "address", internalType: "address" },
      { name: "want", type: "address", internalType: "address" },
    ],
  },
  {
    type: "error",
    name: "OnlyOwnerOrCoordinator",
    inputs: [
      { name: "have", type: "address", internalType: "address" },
      { name: "owner", type: "address", internalType: "address" },
      { name: "coordinator", type: "address", internalType: "address" },
    ],
  },
  { type: "error", name: "Raffle__NotEnoughEthSent", inputs: [] },
  { type: "error", name: "Raffle__NotEnoughTimePassed", inputs: [] },
  { type: "error", name: "Raffle__RaffleNotOpen", inputs: [] },
  { type: "error", name: "Raffle__TransferFailed", inputs: [] },
  { type: "error", name: "Raffle__UpkeepNotNeeded", inputs: [] },
  { type: "error", name: "ZeroAddress", inputs: [] },

  // Add all your contract functions here
];
