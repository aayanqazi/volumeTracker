import React, { Component } from "react";
import { Container, View, Header, Item, Input, Icon, Button, Text, Body, Right, Left, Content } from 'native-base';
import axios from "axios";

export default class Search extends Component {
  state = {
    ticker_symbol: '',
    data: '',
    error: false
  }
  onSubmit = () => {
    axios.get(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${this.state.ticker_symbol}`)
      .then(val => {
        var arr = JSON.parse(val.data.slice(0, -1).replace('(function () { })(', ''));
        axios.get(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=${arr[0].Symbol}`)
          .then(val2 => {
            var arr2 = JSON.parse(val2.data.slice(0, -1).replace('(function () { })(', ''));
            if (undefined != arr2.Name) {
              this.setState({
                data: arr2,
                error: false,
              })
            }
            else {
              this.setState({
                error: true,
                data: ''
              })
            }
          })
          .catch(err => {
            this.setState({
              error: true,
              data: ''
            })
          })
      })
      .catch(err => {
        this.setState({
          error: true,
          data: ''
        })
      })
  }
  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon onPress={() => this.props.navigation.goBack()} name="arrow-back" />
            <Input onChangeText={event => this.setState({
              ticker_symbol: event
            })} placeholder="Ticker Or Company" />
            <Icon onPress={this.onSubmit} name="ios-search" />
          </Item>
        </Header>
        {
          (!this.state.error && this.state.data) ?
            <Content>
              <View style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                  Name: <Text style={{ fontSize: 20, fontWeight: 'normal' }}>
                    {this.state.data.Name}
                  </Text>
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                  Last Price: <Text style={{ fontSize: 20, fontWeight: 'normal' }}>
                    {this.state.data.LastPrice.toFixed(2)}
                  </Text>
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                  Price Change: <Text style={{ fontSize: 20, fontWeight: 'normal' }}>
                    {this.state.data.Change.toFixed(2)}
                  </Text>
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                  Price % Change: <Text style={{ fontSize: 20, fontWeight: 'normal' }}>
                    {this.state.data.ChangePercent.toFixed(2)} %
                  </Text>
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                  Volume: <Text style={{ fontSize: 20, fontWeight: 'normal' }}>
                    {this.state.data.Volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </Text>
              </View>
            </Content> : <Content>
              {this.state.error && <View style={{justifyContent:'center', alignItems:'center',marginTop: 20}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Unable to find stock
                </Text>
              </View>}
            </Content>
        }
      </Container>
    )
  }
}