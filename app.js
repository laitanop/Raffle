let web3;

let notConnected = document.getElementById("not-connected");
let connectBtn = document.getElementById("connectBtn");
let disconnectBtn = document.getElementById("disconnectBtn");
let playersDiv = document.getElementById("players");
let playersCount = document.getElementById("playersCount");
let raffleStateValue = document.getElementById("raffleStateValue");
let raffleStateIcon = document.getElementById("raffleStateIcon");
let raffleEnterBtn = document.getElementById("raffle-enter-btn");
let winnerTitle = document.getElementById("winner-title");
let accounts = null;
async function initWeb3() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    connectBtn.style.display = "block";
    disconnectBtn.style.display = "none";
    notConnected.style.display = "none";
    raffleEnterBtn.style.display = "none";
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
    const btnText = connectBtn.querySelector(".btn-text");
    if (btnText) {
      btnText.textContent = "Connected: " + formattedAddress;
    } else {
      connectBtn.textContent = "Connected: " + formattedAddress;
    }
    disconnectBtn.style.display = "block";
    raffleEnterBtn.style.display = "block";
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
  const btnText = connectBtn.querySelector(".btn-text");
  if (btnText) {
    btnText.textContent = "Connect Wallet";
  } else {
    connectBtn.textContent = "Connect Wallet";
  }
  connectBtn.style.display = "block";

  disconnectBtn.style.display = "none";
  raffleEnterBtn.style.display = "none";
}

disconnectBtn.addEventListener("click", disconnectWallet);

async function getContract() {
  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

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
      playersDiv.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🎲</span>
          <p class="empty-text">No players yet</p>
          <p class="empty-subtext">Be the first to enter the raffle!</p>
        </div>
      `;
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
async function getRaffleState() {
  try {
    const contract = await getContract();
    const raffleState = await contract.methods.getRaffleState().call();

    // Convert to number for comparison (handles both string and number returns)
    const stateNum = parseInt(raffleState);

    let stateText, stateIcon, stateClass;

    if (stateNum === 0) {
      // State 0: Raffle In Progress
      stateText = "Raffle In Progress";
      stateIcon = "🎟️";
      stateClass = "state-open";
    } else if (stateNum === 1) {
      // State 1: Raffle Not Started
      stateText = "Raffle Not Started";
      stateIcon = "⏸️";
      stateClass = "state-closed";
    } else {
      // State 2+: Calculating Winner
      stateText = "Calculating Winner";
      stateIcon = "⏳";
      stateClass = "state-calculating";
    }

    raffleStateValue.textContent = stateText;
    raffleStateValue.className = `raffle-state-value ${stateClass}`;
    raffleStateIcon.textContent = stateIcon;
    raffleStateIcon.className = `raffle-state-icon ${stateClass}`;
  } catch (error) {
    console.error("Error getting raffle state: ", error);
    raffleStateValue.textContent = "Error Loading";
    raffleStateValue.className = "raffle-state-value state-error";
    raffleStateIcon.textContent = "⚠️";
    raffleStateIcon.className = "raffle-state-icon state-error";
  }
}

async function onClickEnterRaffle() {
  try {
    let contract = await getContract();

    const entranceFee = await contract.methods.getEntranceFee().call();

    // Convert entrance fee from Wei to Ether for display (optional)
    const entranceFeeEth = web3.utils.fromWei(entranceFee, "ether");
    console.log("Entrance Fee:", entranceFeeEth, "ETH");
    const tx = await contract.methods.enterRaffle().send({
      from: accounts,
      value: entranceFee, // Send the entrance fee in Wei
      gas: 300000, // Adjust gas limit as needed
    });
    await getAllPlayers();
  } catch (error) {}
}

raffleEnterBtn.addEventListener("click", onClickEnterRaffle);

async function getRecentWinner() {
  let contract = await getContract();
  let recentWinner = await contract.methods.getRecentWinner().call();

  winnerTitle.textContent = "Recent Winner: " + recentWinner;
}

initWeb3();
getContract();
getAllPlayers();
getRaffleState();
getRecentWinner();
