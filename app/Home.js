import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Share,
  Button,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView
} from 'react-native';
import { Constants, Location, Permissions, Audio} from 'expo';

export default class App extends Component {
  state = {
    hasLocationPermissions: false,
    locationResult: null,
  };

  static navigationOptions = {
      title: 'Home',
  }; 

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: location });
  };

  openExternalApp = () => {
    var url =
      'https://www.google.co.in/maps/search/hospital/@' +
      this.state.locationResult.coords.latitude +
      ',' +
      this.state.locationResult.coords.longitude +
      ',13z';
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  shareLocation = () => {
    Share.share(
      {
        message:
          'Help!! I am stuck and in imminent danger. Find me at this last known location of mine: ' +
          'https://maps.google.com/?q=' +
          this.state.locationResult.coords.latitude +
          ',' +
          this.state.locationResult.coords.longitude,
        title: 'SOS',
        url:
          'https://maps.google.com/?q=' +
          this.state.locationResult.coords.latitude +
          ',' +
          this.state.locationResult.coords.longitude,
      },
      {
        dialogTitle: 'Share SOS message',
      }
    )
      .then()
      .catch(err => console.log(err));
  };

  render() {
    return (
      <ScrollView style={styles.container}>
          {this.state.locationResult === null ? (
            <Text>Finding your current location...</Text>
          ) : this.state.hasLocationPermissions === false ? (
            <Text>Location permissions are not granted.</Text>
          ) : (
            <View style={{ width: 210 }}>
              <TouchableOpacity onPress={this.shareLocation}>
                <Image
                  source={require('./assets/sosIcon.png')}
                  style={{ width: 210, height: 200 }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                Tap here to send SOS message with your location to your contacts.
              </Text>
              <TouchableOpacity onPress={this.openExternalApp}>
                <Image
                  source={require('./assets/hospital.png')}
                  style={{ width: 210, height: 200, marginTop:40 }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, textAlign: 'center' }}>
                Tap to locate nearby hospitals.
              </Text>
            </View>
          )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#009688',
  },
});
