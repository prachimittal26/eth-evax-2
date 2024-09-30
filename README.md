# intigrate solidity with frontend

This Solidity program is a simple  program that demonstrates how we can connect a solidity smart contract with front end

## Description

This Solidity contract implements a basic token system with public funtions

The contract provides a `mint` function that allows for the creation of tokens. It takes an address parameter and a value parameter, increasing the total token supply and adding the minted tokens to the balance of the given address. Conversely, the `burn` function decreases the token supply and deducts tokens from the specified address. To ensure the balance is sufficient for burning tokens, the function includes conditionals.

There is also a `transfer` function that allows to transfer tokens from one use to another.

By utilizing this contract, you can easily manage the creation and destruction of tokens while maintaining the overall token supply and individual token balances associated with Ethereum addresses.

## Getting Started

### Executing program

1. clone this repositry
2. Inside the project directory, in the terminal type: npm i
3. Open two additional terminals in your VS code
4. In the second terminal type: npx hardhat node
5. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js after thaat copy the contract address
6. in first terminal run npm run dev
7. open http://localhost:3000 in your browser and paste the contract address

now you can use both the functions here

## Authors

Vikas Phulriya
[@Vikas_Phulriya](https://www.linkedin.com/in/vikas-p-657784131/)

