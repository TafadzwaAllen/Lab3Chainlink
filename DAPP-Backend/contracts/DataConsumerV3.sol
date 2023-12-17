// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.7;
 
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
 
contract DataConsumerV3 {
 
    AggregatorV3Interface internal dataFeedBTCUSD;
    AggregatorV3Interface internal dataFeedETHUSD;
    AggregatorV3Interface internal dataFeedLINKUSD;
    AggregatorV3Interface internal dataFeedBTCETH;

 
    // Network: Sepolia
    // Aggregator: BTC/USD
    // Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
 
    constructor() {
        dataFeedBTCUSD = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43);
        dataFeedETHUSD = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        dataFeedLINKUSD = AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF);
        dataFeedBTCETH = AggregatorV3Interface(0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22);

    }
 
    // return the latest answer for the conversion from Chainlink
 
    function getBTCUSDchainlinkDataFeedLatestAnswer() view public returns (int) {
        (,int answer,,,) =  dataFeedBTCUSD.latestRoundData();
 
        return answer;
    }
    
    function getETHUSDchainlinkDataFeedLatestAnswer() view public returns (int) {
        (,int answer,,,) =  dataFeedETHUSD.latestRoundData();
 
        return answer;
    }
    function getLINKUSDchainlinkDataFeedLatestAnswer() view public returns (int) {
        (,int answer,,,) =  dataFeedLINKUSD.latestRoundData();
 
        return answer;
    }
    function getBTCETHchainlinkDataFeedLatestAnswer() view public returns (int) {
        (,int answer,,,) =  dataFeedBTCETH.latestRoundData();
 
        return answer;
    }
}