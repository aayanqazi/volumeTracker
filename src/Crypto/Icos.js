import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Spinner } from 'native-base';
import Table from "../Table/index";

export default class Ico extends Component {
  state = {
    data: [],
    error: true,
    nameSort: false,
    icoSort: false,
    currencySort: false,
    roiSort: false,
    dateSort: false
  }

  componentDidMount() {
    fetch("https://despro.nyc3.digitaloceanspaces.com/crypto/today-icostats.json")
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
        return a.name > b.name ? 1 : -1;
      else {
        return a.name > b.name ? -1 : 1;
      }
    });
    this.setState({
      data: sortingArray,
      nameSort: !this.state.nameSort
    })
  }

  dateSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.dateSort)
      return a.utc > b.utc ? 1 : -1;
      else {
        return a.utc > b.utc ? -1 : 1;
      }
    });
    this.setState({
      data: sortingArray,
      dateSort: !this.state.dateSort
    })
  }

  ICOSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.icoSort)
        return parseFloat((b.ico_price).split('$')[1]) - parseFloat((a.ico_price).split('$')[1]);
      else {
        return parseFloat((a.ico_price).split('$')[1]) - parseFloat((b.ico_price).split('$')[1]);
      }
    });
    this.setState({
      data: sortingArray,
      icoSort: !this.state.icoSort
    })
  }

  currencySorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.currencySort)
        return parseFloat((b.current_price).split('$')[1]) - parseFloat((a.current_price).split('$')[1]);
      else {
        return parseFloat((a.current_price).split('$')[1]) - parseFloat((b.current_price).split('$')[1]);
      }
    });
    this.setState({
      data: sortingArray,
      currencySort: !this.state.currencySort
    })
  }

  roiSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.roiSort)
        return parseFloat((b.roi_24h).split('/[^0-9\.]+/')) - parseFloat((a.roi_24h).split('/[^0-9\.]+/'));
      else {
        return parseFloat((a.roi_24h).split('/[^0-9\.]+/')) - parseFloat((b.roi_24h).split('/[^0-9\.]+/'));
      }
    });
    this.setState({
      data: sortingArray,
      roiSort: !this.state.roiSort
    })
  }

  onSortingArray = (name) => {
    switch (name) {
      case 'NAME':
        this.nameSorting();
        break;
      case 'ICO DATE':
        this.dateSorting();
        break;
      case 'ICO $':
        this.ICOSorting();
        break;
      case 'CUR $':
        this.currencySorting();
        break;
      case 'ROI':
        this.roiSorting();
        break;
      default:
        alert('NOT FOUND!')
    }
  }

  render() {
    const header = [
      {name:"NAME", center: true, },
      {name:"ICO DATE", center: false, },
      {name:"ICO $", center: true, },
      {name:"CUR $", center: true, },
      {name:"ROI", center: true, }
  ];
    return (      
          this.state.error ? <Spinner /> :
          <Table onSortingArray={this.onSortingArray} data={this.state.data} ico={true} header={header} heading="ICOs" color="green"/>
    );
  }
}