import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  state = {
    message: 'Hey there',
    messageField: 'Write your message here',
  };

  clickSend = () => {
    this.setState(previousState => ({ message: previousState.messageField }));
  };

  onChangeText = text => {
    this.setState({ messageField: text })
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>{ this.state.message }</Text>
        <TextInput
          style={ styles.input }
          onChangeText={ this.onChangeText }>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '20%'
  },
  button: {
    height: '80%',
    width: '80%'
  },
  text: {
    fontSize: 42,
    marginBottom: 20
  },
  input: {
    fontSize: 28,
    marginBottom: 20
  }
});
