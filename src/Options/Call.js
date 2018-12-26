import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Spinner } from 'native-base';
import Table from "../Table/index";

export default class Call extends Component {
  state = {
    data: [],
    error: true,
    symbolSort: false,
    srkSort: false,
    volume_percentage: false,
    chgSort: false,
    volumeSort: false
  }

  componentDidMount() {
    fetch("https://despro.nyc3.digitaloceanspaces.com/stock-data/today-options.json")
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

  strkSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.srkSort)
        return a.strike - b.strike;
      else {
        return b.strike - a.strike;
      }
    });
    this.setState({
      data: sortingArray,
      srkSort: !this.state.srkSort
    })
  }

  chgSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.chgSort)
      return parseFloat(a.iv) - parseFloat(b.iv);
      else {
        return parseFloat(b.iv) - parseFloat(a.iv);
      }
      });
    this.setState({
      data: sortingArray,
      chgSort: !this.state.chgSort
    })
  }

  VolumePercentageSorting = () =>{
    let sortingArray = this.state.data.sort((a, b) => {
      if (this.state.volume_percentage)
        return a.volume - b.volume;
      else {
        return b.volume - a.volume;
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
        return parseFloat(b.vol_oi_ratio) - parseFloat(a.vol_oi_ratio);
      else {
        return parseFloat(a.vol_oi_ratio) - parseFloat(b.vol_oi_ratio);
      }
    });
    this.setState({
      data: sortingArray,
      volumeSort: !this.state.volumeSort
    })
  }

  onSortingArray = (name) => {
    switch (name) {
      case 'SYMB':
        this.symbolSorting();
        break;
      case 'STRK':
        this.strkSorting();
        break;
      case 'VOL':
        this.VolumePercentageSorting();
        break;
      case '%CHG':
        this.chgSorting();
        break;
      case 'VOL/Ol':
        this.VolumeSorting();
        break;
      default:
        alert('NOT FOUND!')
    }
  }

  render() {
    const header = [
      {name:"SYMB", center: true, },
      {name:"STRK", center: false, },
      {name:"VOL", center: true, },
      {name:"%CHG", center: true, },
      {name:"VOL/Ol", center: true, }
  ];
    return (      
          this.state.error ? <Spinner /> :
          <Table onSortingArray={this.onSortingArray} data={this.state.data.filter(arr=>arr.type==="Call")} call={true} header={header} heading="Call Options" color="green"/>
    );
  }
}