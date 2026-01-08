let web3;

let notConnected = document.getElementById("not-connected");
let connectBtn = document.getElementById("connectBtn");
let disconnectBtn = document.getElementById("disconnectBtn");
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
    const formattedAddress =
      accounts.substring(0, 4) + ".." + accounts.substring(accounts.length - 3);
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

initWeb3();
