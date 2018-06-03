import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'
import { ApolloProvider, Query, Subscription } from "react-apollo";
import { WebSocketLink, getMainDefinition } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { split, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { createNetworkInterface } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const baseUrl = 'https://c9126c1c.ngrok.io';
const client = new ApolloClient({ uri: `${ baseUrl }/graphql`})

export default class App extends Component {
  state = {
    message: '',
  };

  clickSend = () => {
    // create message
    this.setState(previousState => ({
      messageField: ''
    }));
  };

  onChangeText = text => {
    this.setState({ messageField: text })
  }

  render() {
    return (
      <ApolloProvider client={ client }>
        <Query query={ gql`
          query {
            userMessages(id:"5b02348f9aa3a96cb0bca110") {
              id
              content
              sender {
                name
                id
              }
              receiver {
                name
                id
              }
              created
            }
          }`}
        >{({ loading, error, data }) => {
          if (error) return (
            <View>
              <Text>
                { `Error! ${ error.message }` }
              </Text>
            </View>
          );
          if (loading) return (
            <View>
              <Text>
                { 'Loading...' }
              </Text>
            </View>
          );

          const { userMessages } = data;
          console.log(userMessages);
          return (
            <View style={ styles.container }>
              <ScrollView>
                { userMessages.map(m =>
                    m.sender.id === '5b02348f9aa3a96cb0bca110'
                    ? <Text key={m.id}style={ [styles.text, styles.userMessage] }>{ m.content }</Text> 
                    : <Text key={m.id}style={ [styles.text, styles.message] }>{ m.content }</Text>)}
              </ScrollView>
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
        }}
        </Query>
      </ApolloProvider>
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
    fontSize: 16,
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
