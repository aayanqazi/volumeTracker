import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Spinner } from 'native-base';
import Table from "../Table/index";

export default class NasdqUp extends Component {
  state = {
    data: [],
    error: true
  }

  componentDidMount() {
    fetch("https://despro.nyc3.digitaloceanspaces.com/stock-data/today-nasdaq-up-v2.json")
      .then(arr => arr.json().then(data => {
        console.log(data)
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
      {name:"SYMBOL", center: true, },
      {name:"COMPANY", center: false, },
      {name:"VOL%", center: true, },
      {name:"VOLUME", center: true, }
  ];
    return (      
          this.state.error ? <Spinner /> :
          <Table data={this.state.data} header={header} heading="NASDAQ Price &#8593;" color="green"/>
    );
  }
}