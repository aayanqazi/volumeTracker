import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Spinner } from 'native-base';
import Table from "../Table/index";

export default class Currencies extends Component {
  state = {
    data: [],
    error: true,
    nameSort: false,
    priceSort: false,
    chgSort: false,
    volumeSort: false
  }

  componentDidMount() {
    fetch("https://despro.nyc3.digitaloceanspaces.com/crypto/crypto.json")
      .then(arr => arr.json().then(data => {
        this.setState({
          data: data,
          error: false
        })
      }))
      .catch((err) => {
        alert(err);
      })
  }

  nameSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.nameSort)
        return a.symbol > b.symbol ? -1 : 1;
      else {
        return a.symbol > b.symbol ? 1 : -1;
      }
    });
    this.setState({
      data: sortingArray,
      nameSort: !this.state.nameSort
    })
  }

  priceSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.priceSort)
        return parseFloat(b.price_usd) - parseFloat(a.price_usd);
      else {
        return parseFloat(a.price_usd) - parseFloat(b.price_usd);
      }
    });
    this.setState({
      data: sortingArray,
      priceSort: !this.state.priceSort
    })
  }

  chgSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.chgSort)
        return parseFloat((b.percent_change_1h).split('/[^0-9\.]+/')) - parseFloat((a.percent_change_1h).split('/[^0-9\.]+/'));
      else {
        return parseFloat((a.percent_change_1h).split('/[^0-9\.]+/')) - parseFloat((b.percent_change_1h).split('/[^0-9\.]+/'));
      }
    });
    this.setState({
      data: sortingArray,
      chgSort: !this.state.chgSort
    })
  }

  VolumeSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.volumeSort)
        return parseFloat(b.volume_usd_24h) - parseFloat(a.volume_usd_24h);
      else {
        return parseFloat(a.volume_usd_24h) - parseFloat(b.volume_usd_24h);
      }
    });
    this.setState({
      data: sortingArray,
      volumeSort: !this.state.volumeSort
    })
  }

  onSortingArray = (name) => {
    switch (name) {
      case 'NAME':
        this.nameSorting();
        break;
      case 'PRICE':
        this.priceSorting();
        break;
      case '%CHG':
        this.chgSorting();
        break;
      case 'VOL':
        this.VolumeSorting();
        break;
      default:
        alert('NOT FOUND!')
    }
  }


  render() {
    const header = [
      {name:"NAME", center: true, },
      {name:"PRICE", center: false, },
      {name:"%CHG", center: true, },
      {name:"VOL", center: true, }
  ];
    return (      
          this.state.error ? <Spinner /> :
          <Table onSortingArray={this.onSortingArray} data={this.state.data} currencies={true} header={header} heading="Crypto Prices" color="green"/>
    );
  }
}