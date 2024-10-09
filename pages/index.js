import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [tokenName, setTokenName] = useState(undefined);
  const [tokenSymbol, setTokenSymbol] = useState(undefined);
  const [contractAddress, setContractAddress] = useState("");
  const [tokenstoMint, setTokenstoMint] = useState(undefined);
  const [tokenstoBurn, setTokenstoBurn] = useState(undefined);
  const [recipientAddress, setRecipientAddress] = useState(""); // New state for recipient
  const [transferAmount, setTransferAmount] = useState(undefined); // New state for transfer amount
  const [balanceAddress, setBalanceAddress] = useState(""); // New state for balance checking
  const [otherBalance, setOtherBalance] = useState(undefined); // New state for other user's balance
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async (contractAddress) => {
    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getContract(contractAddress);
  };

  const getContract = (contractAddress) => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getInfo = async () => {
    setTokenSymbol(await atm.symbol());
    setTokenName(await atm.name());
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.totalSupply()).toNumber());
    }
  };

  const Minter = async () => {
    if (tokenstoMint <= 0 || tokenstoMint === undefined) {
      alert("Please enter a Valid");
    } else {
      let tx = await atm.mint(tokenstoMint);
      await tx.wait();
      getBalance();
      setTokenstoMint("");
    }
  };

  const Burner = async () => {
    if (tokenstoBurn <= 0 || tokenstoBurn === undefined) {
      alert("Please enter a Valid");
    } else {
      let tx = await atm.burn(tokenstoBurn);
      await tx.wait();
      getBalance();
      setTokenstoBurn("");
    }
  };

  // New: Transfer function to send tokens
  const TransferTokens = async () => {
    if (transferAmount <= 0 || recipientAddress === "") {
      alert("Please enter a valid amount and recipient address");
    } else {
      let tx = await atm.transferTokens(recipientAddress, transferAmount);
      await tx.wait();
      alert("Transfer successful");
      setTransferAmount("");
      setRecipientAddress("");
      getBalance();
    }
  };

  // New: Check balance of a specific address
  const CheckOtherBalance = async () => {
    if (balanceAddress === "") {
      alert("Please enter a valid address");
    } else {
      let balance = await atm.getBalance(balanceAddress);
      setOtherBalance(balance.toString());
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask</p>;
    }

    if (!account) {
      return (
        <div>
          <input
            style={{ width: 300 }}
            placeholder="Enter Contract address of deployed Contract"
            onChange={(e) => setContractAddress(e.target.value)}
          ></input>
          <br />
          <br />
          <button
            onClick={() => {
              if (contractAddress.length === 42) {
                connectAccount(contractAddress);
              } else {
                alert("Please enter valid address");
              }
            }}
          >
            Connect
          </button>
        </div>
      );
    }

    if (balance === undefined) {
      getInfo();
      getBalance();
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Prachi Mittal Welcomes You</h1>
      </header>
      {tokenSymbol !== undefined ? (
        <div>
          <h2>Account Address: {account}</h2>
          <h2>Token Name: {tokenName}</h2>
          <h2>Token Symbol: {tokenSymbol}</h2>
          <h2>Token Supply: {balance}</h2>

          <h1>Token Minter</h1>
          <input
            type="number"
            value={tokenstoMint}
            onChange={(e) => setTokenstoMint(e.target.valueAsNumber)}
            style={{ padding: 10, borderWidth: 2, borderRadius: 10, width: 200 }}
            placeholder="Number Of Tokens to Mint"
          ></input>
          <br />
          <br />
          <button
            style={{ padding: 10, borderWidth: 2, borderRadius: 10, fontWeight: 900, fontSize: 15 }}
            onClick={() => {
              Minter();
            }}
          >
            Mint
          </button>
          <br />
          <br />

          <h1>Token Burner</h1>
          <input
            type="number"
            value={tokenstoBurn}
            onChange={(e) => setTokenstoBurn(e.target.valueAsNumber)}
            style={{ padding: 10, borderWidth: 2, borderRadius: 10, width: 200 }}
            placeholder="Number Of Tokens to Burn"
          ></input>
          <br />
          <br />
          <button
            style={{ padding: 10, borderWidth: 2, borderRadius: 10, fontWeight: 900, fontSize: 15 }}
            onClick={() => {
              Burner();
            }}
          >
            Burn
          </button>
          <br />
          <br />

          {/* New Transfer Section */}
          <h1>Token Transfer</h1>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            style={{ padding: 10, borderWidth: 2, borderRadius: 10, width: 200 }}
            placeholder="Recipient Address"
          ></input>
          <br />
          <br />
          <input
            type="number"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.valueAsNumber)}
            style={{ padding: 10, borderWidth: 2, borderRadius: 10, width: 200 }}
            placeholder="Amount to Transfer"
          ></input>
          <br />
          <br />
          <button
            style={{ padding: 10, borderWidth: 2, borderRadius: 10, fontWeight: 900, fontSize: 15 }}
            onClick={() => {
              TransferTokens();
            }}
          >
            Transfer
          </button>
          <br />
          <br />

          {/* New Balance Check Section */}
          <h1>Check Balance</h1>
          <input
            type="text"
            value={balanceAddress}
            onChange={(e) => setBalanceAddress(e.target.value)}
            style={{ padding: 10, borderWidth: 2, borderRadius: 10, width: 300 }}
            placeholder="Enter Address to Check Balance"
          ></input>
          <br />
          <br />
          <button
            style={{ padding: 10, borderWidth: 2, borderRadius: 10, fontWeight: 900, fontSize: 15 }}
            onClick={() => {
              CheckOtherBalance();
            }}
          >
            Check Balance
          </button>
          <br />
          <br />
          {otherBalance !== undefined && (
            <div>
              <h3>Balance of {balanceAddress}: {otherBalance} Tokens</h3>
            </div>
          )}
        </div>
      ) : (
        initUser()
      )}
    </main>
  );
}
