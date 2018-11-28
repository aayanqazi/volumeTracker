import React, { Component } from 'react';
import { Container, Button, Segment, Content, Text } from 'native-base';
import Stocks from "../Stocks/index";
import Options from "../Options/index";
import Crypto from "../Crypto/index";

export default class Segments extends Component {
  state = {
    selected: "stock"
  }

  onTrigerState = (val) => {
    this.setState({
      selected: val
    })
  }

  getCurrentContent = () => {
    switch (this.state.selected) {
      case 'stock':
        return <Stocks currentTab={this.props.currentTab}/>
        break;
      case 'options':
        return <Options currentTab={this.props.currentTab}/>
        break;
      case 'crypto':
        return <Crypto currentTab={this.props.currentTab}/>
        break;
      default:
        return null;
        break;
    }
  }

  render() {
    return (
      <Container>
        <Segment>
          <Button style={{width: "33.33%",justifyContent:'center'}} onPress={() => this.onTrigerState("stock")} first active={this.state.selected === "stock"}>
            <Text>Stocks</Text>
          </Button>
          <Button style={{width: "33.33%",justifyContent:'center'}} onPress={() => this.onTrigerState("options")} active={this.state.selected === "options"}>
            <Text>Options</Text>
          </Button>
          <Button style={{width: "33.33%",justifyContent:'center'}} onPress={() => this.onTrigerState("crypto")} last active={this.state.selected === "crypto"}>
            <Text>Crypto</Text>
          </Button>
        </Segment>
             {this.getCurrentContent()}
      </Container>
    );
  }
}