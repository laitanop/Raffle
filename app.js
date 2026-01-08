let web3;

let notConnected = document.getElementById("not-connected");
let connectBtn = document.getElementById("connectBtn");
let disconnectBtn = document.getElementById("disconnectBtn");
let playersDiv = document.getElementById("players");
let playersCount = document.getElementById("playersCount");

let accounts = null;
async function initWeb3() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    connectBtn.style.display = "block";
    disconnectBtn.style.display = "none";
    notConnected.style.display = "none";
    return true;
  } else {
    connectBtn.style.display = "none";
    notConnected.style.display = "block";
  }
}

async function connectWallet() {
  try {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
    accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    accounts = accounts[0];
    const formattedAddress = formatAddress(accounts);
    connectBtn.textContent = "connected to: " + formattedAddress;
    disconnectBtn.style.display = "block";
  } catch (error) {
    console.error("Error connecting wallet: ", error);
  }
}

function onClickConnectWallet() {
  connectWallet();
}

connectBtn.addEventListener("click", onClickConnectWallet);

function disconnectWallet() {
  accounts = null;
  web3 = null;
  connectBtn.textContent = "Connect Wallet";
  connectBtn.style.display = "block";

  disconnectBtn.style.display = "none";
}

disconnectBtn.addEventListener("click", disconnectWallet);

async function getContract() {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
  console.log(contract);
  return contract;
}
async function getAllPlayers() {
  try {
    const contract = await getContract();
    const players = await contract.methods.getAllPlayers().call();

    // Update player count
    playersCount.textContent = players.length;

    // Clear existing content
    playersDiv.innerHTML = "";

    if (players.length === 0) {
      playersDiv.innerHTML =
        '<p class="empty-state">No players yet. Be the first to enter!</p>';
    } else {
      // Display each player in a styled card
      players.forEach((player, index) => {
        const playerItem = document.createElement("div");
        playerItem.className = "player-item";
        playerItem.innerHTML = `
          <span class="player-index">#${index + 1}</span>
          <span>${formatAddress(player)}</span>
        `;
        playersDiv.appendChild(playerItem);
      });
    }
  } catch (error) {
    console.error("Error getting all players: ", error);
  }
}

initWeb3();
getContract();
getAllPlayers();
