import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, CardItem, Icon, Right, Left } from 'native-base';
import Modal from "react-native-modal";
import Numeral from 'numeral';

export default class ModalBox extends Component {
  state = {
    details: ''
  }
  componentWillMount() {
    const ticker_symbol = this.props.details.symbol;
    if (!this.props.ico && !this.props.currencies) {
      fetch('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + ticker_symbol)
        .then(arr => arr.json())
        .then(val => {
          this.setState({
            details: val
          })
        })
        .catch(err => {
          console.warn("err")
        })
    }
  }

  getDetails = () => {
    const { details } = this.props;
    if (this.props.ico) {
      return (
        <Card>
          <CardItem header style={{ backgroundColor: '#3E50B4' }}>
            <TouchableOpacity style={{ zIndex: 1000, position: 'absolute', left: 15 }} onPress={() => this.props._toggleModal()}>
              <Icon style={{ color: 'white' }} type="FontAwesome" name="close" />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', width: '100%', color: '#FFFFFF', fontWeight: 'bold' }}>{details.name}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Name: ${details.name}`}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`ICO Date: ${details.ico_date}`}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`ICO Price: ${details.ico_price}`}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Current Price: ${details.current_price}`}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price % Change (Last Day): `}
              <Text style={parseInt(details.roi_24h) >= 0 ? { color: 'green' } : { color: 'red' }}>{details.roi_24h}</Text>
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price % Change (Last Week): `}
              <Text style={parseInt(details.roi_last_week) >= 0 ? { color: 'green' } : { color: 'red' }}>{details.roi_last_week}
              </Text>
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price % Change (Last Month): `}
              <Text style={parseInt(details.roi_last_week) >= 0 ? { color: 'green' } : { color: 'red' }}>
                {details.roi_last_month}
              </Text>
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`US Funds Raised: ${details.usd_raised}`}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Total Tokens Sold: ${details.tokens_sold}`}</Text>
          </CardItem>
        </Card>
      )
    }
    if(this.props.currencies){
      return(
        <Card>
          <CardItem header style={{ backgroundColor: '#3E50B4' }}>
            <TouchableOpacity style={{ zIndex: 1000, position: 'absolute', left: 15 }} onPress={() => this.props._toggleModal()}>
              <Icon style={{ color: 'white' }} type="FontAwesome" name="close" />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', width: '100%', color: '#FFFFFF', fontWeight: 'bold' }}>{details.name}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Name: ${details.name}`}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Last Price: $${details.price_usd}`}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Volume Last 24h: ${Numeral(details.volume_usd_24h).format(0,0)}`}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price % Change (Last Hour): `}
              <Text style={parseInt(details.percent_change_1h) >= 0 ? { color: 'green' } : { color: 'red' }}>{details.percent_change_1h+"%"}</Text>
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price % Change (Last Day): `}
              <Text style={parseInt(details.percent_change_24h) >= 0 ? { color: 'green' } : { color: 'red' }}>{details.percent_change_24h+"%"}
              </Text>
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price % Change (Last Week): `}
              <Text style={parseInt(details.percent_change_7d) >= 0 ? { color: 'green' } : { color: 'red' }}>
                {details.percent_change_7d+"%"}
              </Text>
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`US Funds Raised: ${Numeral(details.market_cap_usd).format(0,0)}`}</Text>
          </CardItem>
        </Card>
      )
    }
    return !!this.state.details && this.getStockDetails();
  }

  getStockDetails = () => {
    if (this.state.details && this.state.details.Name) {
      return (<Card>
        <CardItem header style={{ backgroundColor: '#3E50B4' }}>
          <TouchableOpacity style={{ zIndex: 1000, position: 'absolute', left: 15 }} onPress={() => this.props._toggleModal()}>
            <Icon style={{ color: 'white' }} type="FontAwesome" name="close" />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', width: '100%', color: '#FFFFFF', fontWeight: 'bold' }}>{this.state.details.Symbol}</Text>
        </CardItem>
        <CardItem>
          <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Name: ${this.state.details.Name}`}</Text>
        </CardItem>
        <CardItem>
          <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Last Price: $${this.state.details.LastPrice.toFixed(2)}`}</Text>
        </CardItem>
        <CardItem>
          <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price Change: $${this.state.details.Change.toFixed(2)}`}</Text>
        </CardItem>
        <CardItem>
          <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price % Change: ${this.state.details.ChangePercent.toFixed(2)} %`}</Text>
        </CardItem>
        <CardItem>
          <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>Price % Change: {this.state.details.Volume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
        </CardItem>
      </Card>
      )
    }
    else {
      return (
        <Card>
          <CardItem header style={{ backgroundColor: '#3E50B4' }}>
            <TouchableOpacity style={{ zIndex: 1000, position: 'absolute', left: 15 }} onPress={() => this.props._toggleModal()}>
              <Icon style={{ color: 'white' }} type="FontAwesome" name="close" />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', width: '100%', color: '#FFFFFF', fontWeight: 'bold' }}>Sorry !</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Unable to find Stock`}</Text>
          </CardItem>
        </Card>
      )
    }

  }

  render() {
    const { details, open } = this.props;
    if (!details) {
      return null
    }
    return (
      <Modal
        onSwipe={()=>this.props._toggleModal}
        isVisible={open}>
        {this.getDetails()}
      </Modal>
    )
  }
}