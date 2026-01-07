let web3;

let notConnected = document.getElementById("not-connected");
let connectBtn = document.getElementById("connectBtn");

async function initWeb3() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    connectBtn.style.display = "block";
    notConnected.style.display = "none";
    return true;
  } else {
    connectBtn.style.display = "none";
    notConnected.style.display = "block";
  }
}

async function connectWallet() {
  try {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    accounts = accounts[0];
    const formattedAddress =
      accounts.substring(0, 4) + ".." + accounts.substring(accounts.length - 3);
    connectBtn.textContent = "connected to: " + formattedAddress;
  } catch (error) {
    console.error("Error connecting wallet: ", error);
  }
}

function onClickConnectWallet() {
  connectWallet();
}

connectBtn.addEventListener("click", onClickConnectWallet);

initWeb3();
