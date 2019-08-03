# React Redux and Firebase

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Configuration

* Create your account in [Google Firebase Console](https://console.firebase.google.com).
* Create a collection **clients**.
* Create a collection **config** and create the document **settings** with boolean fields (`allowRegistration`, `disableBalanceOnAdd`, `disableBalanceOnEdit`).

* Create a file to add your service account keys, see example below.

```markdown
$ touch src/config/serviceAccount.json
```

* Add you configurations to this file create above, see example this configuration below.

```markdown
{
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  projectId: '<your-cloud-firestore-project>',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-sender-id>'
}
```

## Docs

* [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)
* [NPM Firebase](https://www.npmjs.com/package/firebase)

## Start the project

> Runs the app in the development mode.

```markdown
$ yarn start
```

> Launches the test runner in the interactive watch mode.

```markdown
$ yarn test
```

> Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

```markdown
$ yarn build
```
