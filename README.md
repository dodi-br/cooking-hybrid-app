# Cooking hybrid app
A pet project build upon [Ionic 3](https://github.com/driftyco/ionic), [ngrx store](https://github.com/ngrx/store), and [ngrx effects](https://github.com/ngrx/effects).

## Install
```shell
npm install -g cordova
npm install -g ionic
npm install
```

## Run on Android
```shell
ionic plugin add cordova-plugin-uniquedeviceid
ionic plugin add cordova-plugin-x-socialsharing
ionic plugin add de.appplant.cordova.plugin.local-notification
cordova platform add android
ionic resources
ionic run android
```

Inspect running app in Chrome: `chrome://inspect/#devices`
