import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Nasdqup from "./NasdqUp";
import NasdqDown from "./NasdqDown";
import NyseUp from "./NyseUp";
import NyseDown from "./NasdqDown";

export default class Stocks extends Component {
  state = {
    selected: "nasdaqup"
  }


  onTrigerState = (val) => {
    this.setState({
      selected: val
    })
  }

  currentView = () => {
    switch (this.state.selected) {
      case 'nasdaqup':
        return <Nasdqup />
        break;
      case 'nasdaqdown':
        return <NasdqDown />
        break;
      case 'nyseup':
        return <NyseUp />
        break;
      case 'nysedown':
        return <NyseDown />
        break;
      default:
        return null;
        break;
    }
  }

  render() {
    return (
      <Container>
        <Content>
          {this.currentView()}
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.onTrigerState('nasdaqup')} active={this.state.selected === "nasdaqup"}>
              <Icon name="arrow-with-circle-up" type="Entypo" />
              <Text>NASDAQ</Text>
            </Button>
            <Button vertical onPress={() => this.onTrigerState('nasdaqdown')} active={this.state.selected === "nasdaqdown"}>
              <Icon name="arrow-with-circle-down" type="Entypo" />
              <Text>NASDAQ</Text>
            </Button>
            <Button vertical onPress={() => this.onTrigerState('nyseup')} active={this.state.selected === "nyseup"}>
              <Icon color="red" name="arrow-with-circle-up" type="Entypo" />
              <Text>NYSE</Text>
            </Button>
            <Button vertical onPress={() => this.onTrigerState('nysedown')} active={this.state.selected === "nysedown"}>
              <Icon name="arrow-with-circle-down" type="Entypo" />
              <Text>NYSE</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}