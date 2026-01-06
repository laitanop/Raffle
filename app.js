let web3;

const notConnected = document.getElementById("not-connected");
const connectBtn = document.getElementById("connectBtn");

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

initWeb3();
