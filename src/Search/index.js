import React, { Component } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, Body, Right, Left } from 'native-base';
import axios from "axios";

export default class Search extends Component {
  state = {
    ticker_symbol: ''
  }
  onSubmit = () => {
    axios.get(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${this.state.ticker_symbol}`)
    .then(val=>{
      var arr = val.replace('myFunction(','');
      console.warn(arr)
    })
      .catch(err=>{
      console.warn(err)
    })
  }
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon onPress={()=>this.props.navigation.goBack()} name="arrow-back" />
            <Input onChangeText={event => this.setState({
              ticker_symbol: event
            })} placeholder="Ticker Or Company" />
            <Icon onPress={this.onSubmit} name="ios-search" />
          </Item>
        </Header>
      </Container>
    )
  }
}