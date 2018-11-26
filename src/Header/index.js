
import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class HeaderComponent extends Component {
  render() {
    return (
      <Header hasSegment>
        <Left>
          <Button transparent>
            <Icon name='refresh' type="FontAwesome" />
          </Button>
        </Left>
        <Body>
          <Title>Volume Tracker</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='search' type="FontAwesome" />
          </Button>
        </Right>
      </Header>
    );
  }
}
