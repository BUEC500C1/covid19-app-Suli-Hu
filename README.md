# Ccovid-19 Map Application

After server started, users can run this app on any iOS device. If you would like to run this applications for test please clone the whole project and get in to example, then run `$npm i` and `$npm start`.  When you see the  server started, for Android device please run `$npm npm run run:android` and `$nmp run build:ios` + `$npm run run:ios` for iOS device. Please make sure your simulator is properly installed. If you choose to run on your simulator, it will automatically started and open the app. The following will take iOS part as an example. 
<p align="center">
  <img width="300" height="600" src="/pic1.PNG">
  <img width="300" height="600" src="/pic2.PNG">
</p>
<p align="center">
  <img width="300" height="600" src="https://github.com/BUEC500C1/covid19-app-Suli-Hu/blob/master/gif1.gif">
</p>
## Experence with React-Native-Map
Thanks to this open source [react-native-map](https://github.com/react-native-community/react-native-maps) , Covid-19 Map was build based on `examples` project. I cloned the source code and tried to locally test `example` program, but some pod files need to be modified.

1. In `path/to/example/ios/Podfile.lock` the parameter of Google Map need to be `3.5.0`.
2. For first time or to make sure there are no more outdated files,  run `$pod install` inside `ios` directory. Dependencies will be automatically installed. Then run those npm instructions on the top,  the example will be opened in simulator.
3. A valid Google Map Api key is required to use google map.

There are several use cases inside example app. The feature `Custom Callout` can put markers for given geocoordinators on the map, with short text description bubbles. This is the base of Covid-19 Map.


## Experence with Covid-19 API
After Reactive-Native-Map is settled, I exercised the [Covid-19 Api](https://covid19api.com) in step 4. The [summary](https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#00030720-fae3-4c72-8aea-ad01ba17adf8) api can fetch daily-updated data for every country and region with name or country code. However, there is no geocoordinate information aligned to the country. So I got to google api website and downloaded a Country Geocoordinates CSV file and transferred to Json format. Then fetch covid-19 api once and store data in variable `this.state.data`, which can be succesfully printed on console warning.
![step4](step4.jpg)


## Syncornization
I decide to use the Callout function in the [react_native_maps](https://github.com/react-native-community/react-native-maps), because it is a very simple way to show information on the maps. Each country will have a pin and the users can click the pin to show number of the newly confirmed cases and total confirmed cases. And we also put the world summary in the warning box.

The covid-19 api cannot provide countries' coordinates and covid-19 information at the same time Therefore to minimize the number of times we read from api, I use a Json file with country code and coordinates of each country can import it as customData. Then by using a double for loop, I can find the coordinates for each country and uses the json we get from the covid-19 api to write information to each coordinates.
