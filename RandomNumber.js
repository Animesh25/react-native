import React from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
class RandomNumber extends React.Component {
    static propTypes={
        id:PropTypes.number.isRequired,
        number:PropTypes.number.isRequired,
        isDisabled:PropTypes.bool.isRequired,
        onPress:PropTypes.func.isRequired,
    };

    handlePress=()=>{
        if(this.props.isDisabled){return;}
        this.props.onPress(this.props.id)
    };
  render() {
    return (
        
        <TouchableOpacity onPress={this.handlePress}>
            <Text style={[styles.targetMini,
             this.props.isDisabled && styles.selectedStyle]}>
             {this.props.number}</Text>
        </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
    targetMini:
    {
        
        fontSize:27,
        
        backgroundColor:'white',
        justifyContent:'space-around',
        marginHorizontal:15,
        marginVertical:25,
        width:100,
        textAlign:'center',
        
    },
    selectedStyle:{
        opacity:0.3,
    },
})
export default RandomNumber;


