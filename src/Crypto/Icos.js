import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Spinner } from 'native-base';
import Table from "../Table/index";

export default class Ico extends Component {
  state = {
    data: [],
    error: true
  }

  componentDidMount() {
    fetch("https://despro.nyc3.digitaloceanspaces.com/crypto/today-icostats.json")
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
      {name:"ICO DATE", center: false, },
      {name:"ICO $", center: true, },
      {name:"CUR $", center: true, },
      {name:"ROI", center: true, }
  ];
    return (      
          this.state.error ? <Spinner /> :
          <Table data={this.state.data} ico={true} header={header} heading="ICOs" color="green"/>
    );
  }
}