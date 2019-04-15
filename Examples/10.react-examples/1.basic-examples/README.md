### Globally install parcel-bundler once
npm install -g parcel-bundler

#mac Users
npm install -g parcel-bundler
### Install packages
npm install

### Transpile and run the app
parcel src/index.html

npm install -g babel-core

### Build for production
parcel build src/index.html --public-url ./

### Important notes
// Tell parcel to use the browser's built in async/await by adding this to package.js:
  "browserslist": [
    "last 1 Chrome version"
  ]

//To avoid parcel errors, you need to uncheck WebStorm "safe write"
    in Preferences > Appearance & Behavior > System Settings
See https://parceljs.org/hmr.html#safe-write for further details.
