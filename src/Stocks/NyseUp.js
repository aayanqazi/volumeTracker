import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Spinner } from 'native-base';
import Table from "../Table/index";

export default class NyseUp extends Component {
  state = {
    data: [],
    error: true,
    symbolSort: false,
    companySort: false,
    volume_percentage: false,
    volumeSort: false
  }

  componentDidMount() {
    fetch("https://despro.nyc3.digitaloceanspaces.com/stock-data/today-nyse-up-v2.json")
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
  symbolSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.symbolSort)
        return a.symbol > b.symbol ? 1 : -1;
      else {
        return a.symbol > b.symbol ? -1 : 1;
      }
    });
    this.setState({
      data: sortingArray,
      symbolSort: !this.state.symbolSort
    })
  }

  companySorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.companySort)
        return a.company.toLocaleLowerCase() > b.company.toLocaleLowerCase() ? 1 : -1;
      else {
        return a.company.toLocaleLowerCase() > b.company.toLocaleLowerCase() ? -1 : 1;
      }
    });
    this.setState({
      data: sortingArray,
      companySort: !this.state.companySort
    })
  }

  VolumePercentageSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.volume_percentage)
        return parseInt(a.volume_percentage) > parseInt(b.volume_percentage) ? 1 : -1;
      else {
        return parseInt(a.volume_percentage) > parseInt(b.volume_percentage) ? -1 : 1;
      }
    });
    this.setState({
      data: sortingArray,
      volume_percentage: !this.state.volume_percentage
    })
  }

  VolumeSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.volumeSort)
        return parseInt(a.volume_shares.replace(/,/g, '')) > parseInt(b.volume_shares.replace(/,/g, '')) ? 1 : -1;
      else {
        return parseInt(a.volume_shares.replace(/,/g, '')) > parseInt(b.volume_shares.replace(/,/g, '')) ? -1 : 1;
      }
    });
    this.setState({
      data: sortingArray,
      volumeSort: !this.state.volumeSort
    })
  }
  onSortingArray = (name) => {
    switch (name) {
      case 'SYMBOL':
        this.symbolSorting();
        break;
      case 'COMPANY':
        this.companySorting();
        break;
      case 'VOL%':
        this.VolumePercentageSorting();
        break;
      case 'VOLUME':
        this.VolumeSorting();
        break;
      default:
        alert('NOT FOUND!')
    }
  }

  render() {
    const header = [
      {name:"SYMBOL", center: true, },
      {name:"COMPANY", center: false, },
      {name:"VOL%", center: true, },
      {name:"VOLUME", center: true, }
  ];
    return (      
          this.state.error ? <Spinner /> :
          <Table onSortingArray={this.onSortingArray} data={this.state.data} header={header} heading="NYSE Price &#8593;" color="green"/>
    );
  }
}