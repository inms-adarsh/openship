import React, { Component } from 'react'
import SampleContract from '../build/contracts/SampleContract.json'
import getWeb3 from './utils/getWeb3'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const ITEMS = [
  '32d06f49e0d244f46479cfde52ce44b120a5378b1bdec9433050ab51897f5ba8',
]

import {
  setWeb3,
  addContract,
  setUserWalletAdress
 } from './actions';

import NavigationComponent from './components/NavigationComponent';
import { BuyView, ShipView } from './components';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
 
  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.props.setWeb3(results.web3);
      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    //  require Truffle to create Contract
    const contract = require('truffle-contract');

    //  create Contrat from JSON
    let contract = contract(SampleContract);

    //  set web3 as Contract interface / provider
    contract.setProvider(this.props.web3.currentProvider);


    -    simpleStorage.setProvider(this.props.web3.currentProvider) 
    // const contract = require('truffle-contract')
    // const itemContract = contract(SimpleStorageContract)
    // itemContract.setProvider(this.props.web3.currentProvider)
    //
    // // Get account
    // if (window.location.indexOf("ethship.mikerooke.net") !== -1) {
    //   this.props.setUserWalletAdress('35a20fb66a2dd8c6ae8efeb93f19b268e4f303fe12e9d199b2083f6f91828742');
    // } else {
    //   this.props.web3.eth.getAccounts((error, accounts) => {
    //     console.log(accounts[0]);
    //     this.props.setUserWalletAdress(accounts[0]);
    //   });
    // }
    //
    // // Get items
    // ITEMS.forEach((itemAddr) => {
    //   itemContract.at(itemAddr).then((instance) => {
    //     this.props.addContract(instance);
    //   })
    // });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <NavigationComponent />
            <div>
              <Route path='/buy' component={BuyView} />
              <Route path='/ship' component={ShipView} />
            </div>
          </div>
        </Router>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  web3: state.webThreeReducer.web3,
})

const mapDispatchToProps = dispatch => ({
  setWeb3: (web3) => dispatch(setWeb3(web3)),
  addContract: (contract) => dispatch(addContract(contract)),
  setUserWalletAdress: (adress) => dispatch(setUserWalletAdress(adress)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);