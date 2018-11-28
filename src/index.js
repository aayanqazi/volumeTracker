
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Header from "./Header/index";
import { Container } from 'native-base';
import Segments from "./Segment/index";

export default class App extends Component {
  state = {
    currentTab : 'nasdaqup'
  }

  currentTab = (val) =>{
    if(this.state.currentTab !== val)
    this.setState({
      currentTab: val
    })
  }

  render() {
    alert(this.state.currentTab)
    return (
      <Container>
        <Header />
        <Segments currentTab={this.currentTab}/>
      </Container>
    );
  }
}
