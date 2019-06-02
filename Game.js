import React from 'react';
import { View, Text,StyleSheet,Button} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
    static propTypes={
        randomNumCount:PropTypes.number.isRequired,
        initialSec:PropTypes.number.isRequired,
        onPlayAgain:PropTypes.func.isRequired,
    };
    gameStatus='PLAYING';
    state={
        selectedIds:[],
        remainingSec:this.props.initialSec,
    };
    randomNumbers=Array
    .from({length: this.props.randomNumCount})
    .map(()=>1+Math.floor(10*Math.random()));
    target=this.randomNumbers
        .slice(0,this.props.randomNumCount-2)
        .reduce((acc,curr)=>acc+curr,0);
    shuffledRandomNumbers=shuffle(this.randomNumbers);

    componentDidMount()
    {
        this.intervalId=setInterval(()=>{
            this.setState((prevState)=>{
                return {remainingSec:prevState.remainingSec-1};
            },()=>{
                if(this.state.remainingSec===0){
                    clearInterval(this.intervalId);
                }
            
            });
        },1000);
        
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    isNumberSelected=(numberIndex)=>{
        return this.state.selectedIds.indexOf(numberIndex)>=0;
    }

    selectNumber=(numberIndex)=>{
        this.setState((prevState)=>({
            selectedIds:[...prevState.selectedIds,numberIndex],
        }))
    }
    componentWillUpdate(nextProps,nextState){
        if(nextState.selectedIds!==this.state.selectedIds || nextState.remainingSec===0){
            this.gameStatus=this.calcGameStatus(nextState);
            if(this.gameStatus!=='PLAYING'){
                clearInterval(this.intervalId);
            }
        }
    }
    calcGameStatus=(nextState)=>{
        const sumSelected=nextState.selectedIds.reduce((acc,curr)=>{
            return acc+this.shuffledRandomNumbers[curr];
        },0);
        //console.log(sumSelected);
        if(this.state.remainingSec===0){
            return 'LOST';}
        if(sumSelected< this.target){return 'PLAYING';}
        if(sumSelected==this.target){return 'WON';}
        if(sumSelected>this.target){return 'LOST';}
    }
    render() {
        const gameStatus=this.gameStatus;
        
    
    return (
        
        <View style={styles.container}>
            <Text>{gameStatus}</Text>
            <Text>{this.state.remainingSec}</Text>
            <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
            <View style={styles.randomContainer}>
                {this.shuffledRandomNumbers.map((randomNumber,index)=>(
                    <RandomNumber
                    key={index} 
                    id={index}
                    number={randomNumber}
                    isDisabled={this.isNumberSelected(index) || gameStatus !=='PLAYING'}
                    onPress={this.selectNumber}/>
                ))}
           
            </View>
            {this.gameStatus!=='PLAYING' && ( 
            <Button title="PLAY AGAIN" 
            onPress={this.props.onPlayAgain }/>)}
        </View>
        

        
        
       
    );
}
}
const styles = StyleSheet.create({
    container:
    {
        flex:1,
        paddingTop:30,
        backgroundColor:'blue',
        
        
        
    },
    randomContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
    },
    target:
    {
        fontSize:40,
        //backgroundColor:'white',
        marginHorizontal:50,
        textAlign:'center',
    },
    STATUS_PLAYING:{
        backgroundColor:'white',
    },
    STATUS_WON:{
        backgroundColor:'green',
    },
    STATUS_LOST:{
        backgroundColor:'red',
    },
    
    
})
export default Game;