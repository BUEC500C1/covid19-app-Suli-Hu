import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {
  Marker,
  Callout,
  CalloutSubview,
  ProviderPropType,
} from 'react-native-maps';
import CustomCallout from './CustomCallout';
import customData from '../convertcsv.json';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class Callouts extends React.Component {
  constructor(props) {
    super(props);
    data = this.apiCall();
    this.state = {
      cnt: 0,
      // region: {
      //   latitude: LATITUDE,
      //   longitude: LONGITUDE,
      //   latitudeDelta: LATITUDE_DELTA,
      //   longitudeDelta: LONGITUDE_DELTA,
      // },
      data:[],

      markers: [
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE - SPACE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE - SPACE / 2,
          },
        },
        {
          coordinate: {
            latitude: Number(customData[10].latitude),
            longitude: 20.168331,
          },
        },
      ],
    };
  }


  componentDidMount()
  {
    this.apiCall();
  }

  async apiCall(){
    let resp = await fetch('https://api.covid19api.com/summary')
    let respJson = await resp.json()

    this.setState({data:respJson.Countries})
    for (var i = 0; i < this.state.data.length; i++)
    {
      for (var j = 0; j< customData.length; j++)
      {
        if (this.state.data[i].CountryCode == customData[j].country)
        {
          this.state.markers.push(
          {
              coordinate: {
              latitude: Number(customData[j].latitude),
              longitude: Number(customData[j].longitude),
            },
          }
          );
        }
      }
    }
    // console.warn('NewConfirmed ' + respJson.Global.NewConfirmed)
    // console.warn('TotalConfirmed ' + respJson.Global.TotalConfirmed)
    // console.warn(this.state.data[2].NewConfirmed)
    // console.warn(customData[3].country)
    // console.warn(this.state.data.length)
    //return respJson;
  }

  show() {
    this.marker1.showCallout();
  }

  hide() {
    this.marker1.hideCallout();
  }

  render() {
    // var { region, markers } = this.state;
    // console.warn(this.state.markers[20])
    // console.warn(typeof(this.state.markers[20]))
    var rowss = [];
    if (this.state.data.length>0){
      for (var i = 0; i < 240; i++) {
        for (var j = 0; j < 240; j++){
            if (customData[i].country == this.state.data[j].CountryCode){
              rowss.push(
              <Marker coordinate={{latitude : Number(customData[i].latitude),
                longitude : Number(customData[i].longitude)}}>
                <Callout style={styles.plainView}>
                <View><Text style={{textAlign:'center'}}>New Cases {"\n"}{this.state.data[j].NewConfirmed}{"\n"}
                Total Cases {"\n"}{this.state.data[j].TotalConfirmed}
                </Text></View></Callout></Marker>);
            }
          }

        }
      }
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          // initialRegion={region}
          zoomTapEnabled={false}
        >
        {rowss}
        <View style={styles.buttonContainer}>
        </View>
        <View style={styles.buttonContainer}>
        </View>
        </MapView>
      </View>

    );
  }
}

Callouts.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  customView: {
    width: 140,
    height: 140,
  },
  plainView: {
    width: 80,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 200,
    backgroundColor: 'transparent',
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default Callouts;
