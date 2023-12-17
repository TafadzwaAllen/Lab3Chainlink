import React, { useState } from "react";
import { ethers } from "ethers";
import { Card, Button, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {
  const [storedPrice, setStoredPrice] = useState("");
  const [item, setItem] = useState({ pairs: "" });
  const { pairs } = item;
  const contractAddress = "0xCe85386B1B25c99A26F15341Dd5870173EC25A2E";
  const ABI =  [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getBTCETHchainlinkDataFeedLatestAnswer",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBTCUSDchainlinkDataFeedLatestAnswer",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getETHUSDchainlinkDataFeedLatestAnswer",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLINKUSDchainlinkDataFeedLatestAnswer",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  const smartContract = new ethers.Contract(contractAddress, ABI, provider);

  const getPair = async (pair) => {
    let contractPrice = 0;
    if (pair == "BTC/USD") {
      contractPrice =
        await smartContract?.getBTCUSDchainlinkDataFeedLatestAnswer();
      setStoredPrice("$" + parseInt(contractPrice) / 100000000);
    } else if (pair === "ETH/USD") {
      contractPrice =
        await smartContract.getETHUSDchainlinkDataFeedLatestAnswer();
      setStoredPrice("$" + parseInt(contractPrice) / 100000000);
    } else if (pair === "LINK/USD") {
      contractPrice =
        await smartContract.getLINKUSDchainlinkDataFeedLatestAnswer();
      setStoredPrice("$" + parseInt(contractPrice) / 100000000);
    } else if (pair === "BTC/ETH") {
      contractPrice =
        await smartContract.getBTCETHchainlinkDataFeedLatestAnswer();
      setStoredPrice("ETHER\n" + parseInt(contractPrice) / 1000000000000000000);
    } else {
      console.error("Invalid pair:", pair);
      return;
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setStoredPrice("");
    setItem((prevState) => ({
      ...prevState,
      pairs: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='container'>
      <Image
        width='200px'
        height='200px'
        fluid
        className='mt-5'
        src='https://seeklogo.com/images/C/chainlink-logo-B072B6B9FE-seeklogo.com.png'
      />
      <br />
      <div>
        <Card
          style={{ width: "32rem" }}
          className='mt-5 shadow bg-body rounded'
        >
          <Card.Header a5='h5'>Conversion Pair</Card.Header>
          <Card.Body>
            <div className='col'>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='pairs'>
                  <Form.Check
                    value='BTC/USD'
                    type='radio'
                    onChange={handleChange}
                    aria-label='radio-1'
                    label='BTC/USD'
                    checked={pairs === "BTC/USD"}
                  />
                  <Form.Check
                    value='ETH/USD'
                    type='radio'
                    onChange={handleChange}
                    aria-label='radio-2'
                    label='ETH/USD'
                    checked={pairs === "ETH/USD"}
                  />
                  <Form.Check
                    value='LINK/USD'
                    type='radio'
                    onChange={handleChange}
                    aria-label='radio-3'
                    label='LINK/USD'
                    checked={pairs === "LINK/USD"}
                  />
                  <Form.Check
                    value='BTC/ETH'
                    type='radio'
                    onChange={handleChange}
                    aria-label='radio-4'
                    label='BTC/ETH'
                    checked={pairs === "BTC/ETH"}
                  />
                </Form.Group>
              </Form>
              <div className='mt-5'>
                <Button
                  type='submit'
                  onClick={() => getPair(pairs)}
                  size='sm'
                  variant='outline-primary'
                >
                  Get Answer from Chainlink Oracle
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <div>
          <Card
            style={{ width: "32rem" }}
            className='mt-5 shadow bg-body rounded'
          >
            <Card.Header a5='h5'>Result</Card.Header>
            <Card.Body>
              <div className='col'>
                <h5>
                  {/* {pairs ? `${pairs+'\n' + "=>" + storedPrice}` : "Not any pair selected"} */}
                  {pairs} ={storedPrice}
                 
                </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
