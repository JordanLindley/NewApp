import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    message: '',
    userMessage: '',
  };

  clickSend = () => {
    this.setState(previousState => ({
      userMessage: previousState.messageField,
      messageField: ''
    }));
  };

  onChangeText = text => {
    this.setState({ messageField: text })
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ [styles.text, styles.message] }>{ this.state.message }</Text>
        <Text style={ [styles.text, styles.userMessage] }>{ this.state.userMessage }</Text> 
        <TextInput
          style={ styles.input }
          onChangeText={ this.onChangeText }
          placeholder="Write your message here"
          underlineColorAndroid='rgba(0,0,0,0)'>
          { this.state.messageField }
        </TextInput>
        <Button
          style={ styles.button }
          title="Send"
          color="#EF7177"
          onPress={ this.clickSend }/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212020',
    alignItems: 'center',
    paddingTop: '20%',
    paddingEnd: '5%',
    paddingStart: '5%',
  },
  button: {
    height: '80%',
    width: '80%'
  },
  text: {
    fontSize: 42,
    color: '#EEFEFE',
    marginBottom: 20
  },
  message: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  input: {
    width: '100%',
    marginStart: 20,
    marginEnd: 20,
    fontSize: 28,
    color: '#EEFEFE',
    backgroundColor: '#343435',
    marginBottom: 20,
    borderColor: '#EF7177',
    borderWidth: 3,
    paddingStart: '5%',
    paddingEnd: '5%',
  }
});
