import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Currencies from "./Currencies";
import Icos from "./Icos";

export default class Crypto extends Component {
  state = {
    selected: "currencies"
  }


  onTrigerState = (val) => {
    this.setState({
      selected: val
    })
  }

  currentView = () => {
    switch (this.state.selected) {
      case 'currencies':
      this.props.currentTab("currencies");
        return <Currencies />
        break;
      case 'ico':
      this.props.currentTab("ico");
        return <Icos />
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
            <Button style={{fontSize:15}} vertical onPress={() => this.onTrigerState('currencies')} active={this.state.selected === "currencies"}>
              <Text>CURRENCIES</Text>
            </Button>
            <Button style={{fontSize:15}} vertical onPress={() => this.onTrigerState('ico')} active={this.state.selected === "ico"}>
              <Text>ICOs</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}