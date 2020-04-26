import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
} from 'react-native';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
// import DisplayLatLng from './examples/DisplayLatLng';
// import ViewsAsMarkers from './examples/ViewsAsMarkers';
// import EventListener from './examples/EventListener';
// import MarkerTypes from './examples/MarkerTypes';
// import DraggableMarkers from './examples/DraggableMarkers';
// import PolygonCreator from './examples/PolygonCreator';
// import PolylineCreator from './examples/PolylineCreator';
// import GradientPolylines from './examples/GradientPolylines';
// import AnimatedViews from './examples/AnimatedViews';
// import AnimatedMarkers from './examples/AnimatedMarkers';
import Callouts from './examples/Callouts';
// import Overlays from './examples/Overlays';
// import DefaultMarkers from './examples/DefaultMarkers';
// import CustomMarkers from './examples/CustomMarkers';
// import CachedMap from './examples/CachedMap';
// import LoadingMap from './examples/LoadingMap';
// import MapBoundaries from './examples/MapBoundaries';
// import TakeSnapshot from './examples/TakeSnapshot';
// import FitToSuppliedMarkers from './examples/FitToSuppliedMarkers';
// import FitToCoordinates from './examples/FitToCoordinates';
// import LiteMapView from './examples/LiteMapView';
// import CustomTiles from './examples/CustomTiles';
// import WMSTiles from './examples/WMSTiles';
// import ZIndexMarkers from './examples/ZIndexMarkers';
// import StaticMap from './examples/StaticMap';
// import MapStyle from './examples/MapStyle';
// import LegalLabel from './examples/LegalLabel';
// import SetNativePropsOverlays from './examples/SetNativePropsOverlays';
// import CustomOverlay from './examples/CustomOverlay';
// import MapKml from './examples/MapKml';
// import BugMarkerWontUpdate from './examples/BugMarkerWontUpdate';
// import ImageOverlayWithAssets from './examples/ImageOverlayWithAssets';
// import ImageOverlayWithURL from './examples/ImageOverlayWithURL';
// import AnimatedNavigation from './examples/AnimatedNavigation';
// import OnPoiClick from './examples/OnPoiClick';
// import TestIdMarkers from './examples/TestIdMarkers';
// import IndoorMap from './examples/IndoorMap';
// import CameraControl from './examples/CameraControl';
// import MassiveCustomMarkers from './examples/MassiveCustomMarkers';
// import GeojsonMap from './examples/Geojson';

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

function makeExampleMapper(useGoogleMaps) {
  if (useGoogleMaps) {
    return example => [
      example[0],
      [example[1], example[3]].filter(Boolean).join(' '),
    ];
  }
  return example => example;
}

type Props = {};
export default class App extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      Component: null,
      useGoogleMaps: ANDROID,
    };
  }

  renderExample([Component, title]) {
    return (
      <TouchableOpacity
        key={title}
        style={styles.button}
        onPress={() => this.setState({ Component })}
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  }

  renderBackButton() {
    return (
      <TouchableOpacity
        style={styles.back}
        onPress={() => this.setState({ Component: null })}
      >
        <Text style={styles.backButton}>&larr;</Text>
      </TouchableOpacity>
    );
  }

  renderGoogleSwitch() {
    return (
      <View style= {[styles.center, {top: 390}]}>
        <Text style={{color:'ivory'}}>Use Google Map</Text>
        <Switch
          onValueChange={value => this.setState({ useGoogleMaps: value })}
          style={styles.googleSwitch}
          value={this.state.useGoogleMaps}
        />
      </View>
    );
  }

  renderExamples(examples) {
    const { Component, useGoogleMaps } = this.state;

    return (
      <View style={styles.container}>
        {Component && (
          <Component
            provider={useGoogleMaps ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          />
        )}
        {Component && this.renderBackButton()}
        {!Component && (
          <ScrollView
            style={StyleSheet.absoluteFill}
            contentContainerStyle={styles.scrollview}
            showsVerticalScrollIndicator={false}
          >
           <Text style={{color:'ivory',fontSize: 30}}> Keep Calm and Wash Hands </Text>
            {IOS && this.renderGoogleSwitch()}
            {examples.map(example => this.renderExample(example))}
          </ScrollView>
        )}
      </View>
    );
  }

  render() {
    return this.renderExamples(
      [
        // [<component>, <component description>, <Google compatible>, <Google add'l description>]

        [Callouts, 'Daily Map', true],

      ]
        // Filter out examples that are not yet supported for Google Maps on iOS.
        .filter(
          example =>
            ANDROID || (IOS && (example[2] || !this.state.useGoogleMaps))
        )
        .map(makeExampleMapper(IOS && this.state.useGoogleMaps))
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#3366CC',
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 120,
  },
  button: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgba(160,160,160,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: { fontWeight: 'bold', fontSize: 30 },
  googleSwitch: { marginTop: 10, left:30},
});
