import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, CardItem, Icon, Right, Left } from 'native-base';
import Modal from "react-native-modal";


export default class ModalBox extends Component {

  getDetails = () => {
    const { details } = this.props;
    console.warn(details)
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
              <Text style={parseInt(details.roi_24h) >= 0 ? {color:'green'}:{color:'red'}}>{details.roi_24h}</Text>
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price % Change (Last Week): `}
              <Text style={parseInt(details.roi_last_week) >= 0 ? {color:'green'}:{color:'red'}}>{details.roi_last_week}
              </Text>
            </Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Price % Change (Last Month): `}
            <Text style={parseInt(details.roi_last_week) >= 0 ? {color:'green'}:{color:'red'}}>
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
    return (
      <Card>
        <CardItem header style={{ backgroundColor: '#3E50B4' }}>
          <TouchableOpacity style={{ zIndex: 1000, position: 'absolute', left: 15 }} onPress={() => this.props._toggleModal()}>
            <Icon style={{ color: 'white' }} type="FontAwesome" name="close" />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', width: '100%', color: '#FFFFFF', fontWeight: 'bold' }}>{details.symbol}</Text>
        </CardItem>
        <CardItem>
          <Text style={{ textAlign: 'center', color: '#000', width: '100%' }}>{`Name: ${details.company}`}</Text>
        </CardItem>
      </Card>
    )
  }

  render() {
    const { details, open } = this.props;
    if (!details) {
      return null
    }
    return (
      <Modal
        onSwipe={this.props._toggleModal}
        isVisible={open}>
        {this.getDetails()}
      </Modal>
    )
  }
}