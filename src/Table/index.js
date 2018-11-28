import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Numeral from 'numeral';
import moment from "moment";
import Detail from "../ModalBox";


export default class Table extends Component {
  state = {
    modal: false,
    data: null
  }

  renderRow(val, index) {
    if (this.props.call) {
      return (
        <TouchableOpacity key={index} style={style.row}>
          <View style={style.data}>
            <Text style={style.textColor}>{val.symbol}</Text>
          </View>
          <View style={style.centerRow}>
            <Text style={style.textColor}>{val.strike}</Text>
          </View>
          <View style={style.data}>
            <Text style={style.textColor}>{val.volume}</Text>
          </View>
          <View style={style.data}>
            <Text style={style.textColor}>{val.iv}</Text>
          </View>
          <View style={style.data}>
            <Text style={style.textColor}>{val.vol_oi_ratio}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    if (this.props.currencies) {
      return (
        <TouchableOpacity key={index} style={style.row}>
          <View style={style.data}>
            <Text style={style.textColor}>{val.symbol}</Text>
          </View>
          <View style={style.centerRow}>
            <Text style={style.textColor}>{`$${Numeral(val.price_usd).format('0,0.00000')}`}</Text>
          </View>
          <View style={style.data}>
            <Text style={[style.textColor, parseInt(val.percent_change_1h) >= 0 ? { color: 'green' } : { color: 'red' }]}>{val.percent_change_1h}</Text>
          </View>
          <View style={style.data}>
            <Text style={style.textColor}>{Numeral(val.volume_usd_24h).format('0,0')}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    if (this.props.ico) {
      return (
        <TouchableOpacity onPress={() => this._toggleModal(val)} key={index} style={style.row}>
          <View style={style.data}>
            <Text style={style.textColor}>{val.name}</Text>
          </View>
          <View style={style.centerRow}>
            <Text style={style.textColor}>{val.ico_date}</Text>
          </View>
          <View style={style.data}>
            <Text style={style.textColor}>{val.ico_price}</Text>
          </View>
          <View style={style.data}>
            <Text style={style.textColor}>{val.current_price}</Text>
          </View>
          <View style={style.data}>
            <Text style={[style.textColor, parseInt(val.roi_24h) >= 0 ? { color: 'green' } : { color: 'red' }]}>{val.roi_24h}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => this._toggleModal(val)} key={index} style={style.row}>
        <View style={style.data}>
          <Text style={style.textColor}>{val.symbol}</Text>
        </View>
        <View style={style.centerRow}>
          <Text style={style.textColor}>{val.company}</Text>
        </View>
        <View style={style.data}>
          <Text style={style.textColor}>{val.volume_percentage}</Text>
        </View>
        <View style={style.data}>
          <Text style={style.textColor}>{val.volume_shares}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderHeaderRow = (val, ind) => {
    return (
      <View key={ind} style={[val.center ? style.data : style.centerRow]}>
        <Text style={[style.textColor, style.textHeadline]}>{val.name}</Text>
      </View>
    )
  }


  _toggleModal = (item) => {
    if (this.state.modal) {
      this.setState({ modal: !this.state.modal, data: null });
    }
    else {
      this.setState({ modal: !this.state.modal, data: item });
    }
  }


  renderHeader = () => {
    return (
      <View style={style.row}>
        {this.props.header.map((val, index) => {
          return this.renderHeaderRow(val, index);
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ paddingVertical: 20, justifyContent: "center", alignItems: "center" }}>
          <Text style={[style.heading, { color: this.props.color }]}>
            {this.props.heading}
          </Text>
          <View style={{ paddingVertical: 10, alignItems: "center", justifyContent: "center" }}>
            <Text style={[style.subheading, { color: this.props.color }]}>
              Data Last Updated:
          </Text>
            <Detail
              open={this.state.modal}
              details={this.state.data}
              _toggleModal={this._toggleModal}
              {...this.props}
            />
            {
              this.props.data && this.props.data.length > 0 &&
              <Text style={[style.subheading, { color: this.props.color }]}>
                {this.props.currencies ? new Date(moment.unix(this.props.data[0].last_updated).utc().format()).toString() :
                  new Date(this.props.data[0].utc).toString()
                }
              </Text>
            }
          </View>
        </View>
        {this.renderHeader()}
        {
          this.props.data.map((val, index) => {
            return this.renderRow(val, index);
          })
        }
      </View>
    );
  }
}

const style = StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: "center",
    color: 'black',
    borderBottomWidth: 2,
    borderColor: 'black',
    paddingVertical: 5
  },
  data: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: "center",
    alignItems: "center",
  },
  centerRow: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: "center",
  },
  textColor: {
    color: "black",
    textAlign: 'center'
  },
  textHeadline: {
    fontWeight: 'bold'
  },
  heading: {
    fontSize: 20,
    color: "green",
    fontWeight: "600"
  },
  subheading: {
    fontSize: 15,
    color: "green",
    textAlign: 'center'
  }
})