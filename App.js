import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,Alert } from 'react-native';
import {Button} from 'native-base'

import { FontAwesome} from '@expo/vector-icons'

//get array of length 25
var itemArray =new Array(25).fill('empty');
var counter=0;

export default class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state={
      randomNumber:"",
      disabled: false, // disabling the touch of scratch
    }
  }

  //when app loads up

  componentDidMount(){
     this.setState({randomNumber:this.generateRandomNumber()})
    //TODO :call generate random number
  }

  generateRandomNumber = () =>{
    // generate random number

    let randomNumber=Math.floor(Math.random()*25)
    this.setState({randomNumber:randomNumber,
     isScratched:true
    });
    //console.log(randomNumber)
    return randomNumber;
  }

  scratchItem =(itemNumber) =>{
    //decide Lucky or Unlucky
    
    
    if (this.state.randomNumber === itemNumber) {
      itemArray[itemNumber]="lucky"
      } 
      else {
      itemArray[itemNumber]="unlucky"
     }
     this.forceUpdate();
     if(counter===5)
     {
       Alert.alert("You have exceeded maximum 5 number of attempt \nPlease tap on \"Show all coupons\" or \"Reset\" button.")
       this.setState({disabled:true})
     }
     else if(counter < 5 && 
      itemArray[itemNumber] === "lucky")
      {
        Alert.alert("Congratulations! You won a lottery!\n Press Reset to play again.");
        this.setState({disabled:true})
      }
      else{
        counter+=1;
      }
      console.log(counter)
      this.forceUpdate();

  }

  scratchItemIcon=(itemNumber)=>{
    //Icon based on Lucky or Unlucy

    if(itemArray[itemNumber] === "lucky"){
      return "dollar"
    }
    else if(itemArray[itemNumber]==="unlucky"){
      return "frown-o"
    } 
    return "circle"
  }

  scratchItemColor = (itemNumber) =>
  {
    //find right color 
    if(itemArray[itemNumber] === "lucky"){
      return "green"
    }
    else if(itemArray[itemNumber]==="unlucky"){
      return "red"
    } 
    return "black"
  }

  showAllItem =()=>{
    //reveal all icons
    //Step 1:everyone unlucky--lucky replace with unlucky
    itemArray.fill('unlucky');
    itemArray[this.state.randomNumber]='lucky';

    this.forceUpdate();

  }

  resetGame =()=>{
    //button recent Game
    this.setState({randomNumber:this.generateRandomNumber(),
    isScratched:true,
    disabled:false},
    ()=>{
      itemArray.fill("empty");
      counter=0
      this.forceUpdate();
    }
    )
  }

  createComponents = (start, end) => {
    let component = [];
    let index = [];
    for (let i = start; i < end; i++) 
      index.push(i);
      
    index.map(i => {
      component.push(
          <TouchableOpacity 
            key= {i}
            style={styles.item}
            onPress={() => {this.scratchItem(i)}}
            disabled = {this.state.disabled}>
            <FontAwesome 
              key = {i}
              name={this.scratchItemIcon(i)}
              size={40}
              color={this.scratchItemColor(i)}
            />
          </TouchableOpacity>
      );
    });
    return component;
  }
  //V1:Dimensions(get()):ht and wt of Window of Phone
  render(){

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
          <Text style={styles.topText}>Scratch-Win Game </Text>
      </View>
      <View style={styles.grid}>
        {/* <View style={styles.itemrow}>
           <TouchableOpacity
            style={styles.item}
            onPress={ ()=>{
              this.scratchItem(0)
            }}
           >
             <FontAwesome
               name={this.scratchItemIcon(0)}
               size={50}
               color={this.scratchItemColor(0)}
               
             />
           </TouchableOpacity>
        </View> */}

      
         <View style={styles.itemRow}>
            {this.createComponents(0,5)}
         </View>
        <View style={styles.itemRow}>
            {this.createComponents(5,10)}
        </View>
          <View style={styles.itemRow}>
            {this.createComponents(10,15)}
          </View>
          <View style={styles.itemRow}>
            {this.createComponents(15,20)}
          </View>
          <View style={styles.itemRow}>
            {this.createComponents(20,25)}
          </View>
      </View>
       <Button
        onPress={()=>{this.showAllItem()}}
        full
        success
        style={styles.button}
       >
         <Text style={styles.buttonText}>Show All Coupons</Text>
      </Button>
       <Button
       onPress={()=>{this.resetGame()}}
        full
        primary
        style={styles.button}
       >
         <Text style={styles.buttonText}>Reset </Text>
       </Button>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid:{

  },
  itemRow:{
    flexDirection:"row",
  },
  item:{
    alignItems:"center",
    padding:10,
    borderWidth:2,
    borderColor:"#000",
    minWidth:5
  },
  button:{
    marginVertical:15,
  },
  buttonText:{
    color:"#fff",
    fontSize:18

  },
  topBar:{
    backgroundColor:"#8B78e6",
    height:50,
    justifyContent:"center",
    // width:"100%",
    width:Dimensions.get("window").width,
    marginVertical:20
  },
  topText:{
    color:"#FFF",
    textAlign:"center"
  }


});
