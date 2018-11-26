import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Spinner } from 'native-base';
import Table from "../Table/index";

export default class Currencies extends Component {
  state = {
    data: [],
    error: true
  }

  componentDidMount() {
    fetch("https://despro.nyc3.digitaloceanspaces.com/crypto/crypto.json")
      .then(arr => arr.json().then(data => {
        this.setState({
          data: data,
          error: false
        })
      }))
      .catch((err) => {
        alert(err);
      })
  }

  render() {
    const header = [
      {name:"NAME", center: true, },
      {name:"PRICE", center: false, },
      {name:"%CHG", center: true, },
      {name:"VOL", center: true, }
  ];
    return (      
          this.state.error ? <Spinner /> :
          <Table data={this.state.data} currencies={true} header={header} heading="Crypto Prices" color="green"/>
    );
  }
}