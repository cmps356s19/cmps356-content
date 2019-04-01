### Globally install parcel-bundler once
npm install -g parcel-bundler

### Install packages
npm install

### Transpile and run the app
parcel src/index.html

### Build for production
parcel build src/index.html --public-url ./

### Note
// Tell parcel to use the browser's built in async/await
  "browserslist": [
    "last 1 Chrome version"
  ]
  