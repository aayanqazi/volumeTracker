import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Spinner } from 'native-base';
import Table from "../Table/index";

export default class Call extends Component {
  state = {
    data: [],
    error: true
  }

  componentDidMount() {
    fetch("https://despro.nyc3.digitaloceanspaces.com/stock-data/today-options.json")
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
      {name:"SYMB", center: true, },
      {name:"STRK", center: false, },
      {name:"VOL", center: true, },
      {name:"%CHG", center: true, },
      {name:"VOL/Ol", center: true, }
  ];
    return (      
          this.state.error ? <Spinner /> :
          <Table data={this.state.data.filter(arr=>arr.type==="Call")} call={true} header={header} heading="Call Options" color="green"/>
    );
  }
}