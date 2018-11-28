import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Call from "./Call";
import Put from "./Put";

export default class Options extends Component {
  state = {
    selected: "call"
  }


  onTrigerState = (val) => {
    this.setState({
      selected: val
    })
  }

  currentView = () => {
    switch (this.state.selected) {
      case 'call':
      this.props.currentTab("call");
        return <Call />
        break;
      case 'put':
      this.props.currentTab("put");
        return <Put />
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
            <Button style={{fontSize:15}} vertical onPress={() => this.onTrigerState('call')} active={this.state.selected === "call"}>
              <Text>CALL</Text>
            </Button>
            <Button style={{fontSize:15}} vertical onPress={() => this.onTrigerState('put')} active={this.state.selected === "put"}>
              <Text>PUT</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}