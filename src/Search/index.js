import React, { Component } from "react";
import { Container, Header, Item, Input, Icon, Button, Text, Body, Right, Left } from 'native-base';

export default class Search extends Component {
  state = {
    ticker_symbol: ''
  }
  onSubmit = () => {
    let formdata = new FormData();
    formdata.append("input", 'APPL')
    fetch('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp',{
      method: 'GET',
      body:formdata,
    }).then(val=>console.warn(val)).catch(err=>{
      console.warn(err)
    }).catch(err=>{
      
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