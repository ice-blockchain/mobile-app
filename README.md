# Ice Blockchain Mobile App

React Native App for the mining of ice coins

## Project Structure

```
- src: Main container of all the code inside the application
    - api: Methods to communicate with the backend
    - assets: Assets folder to store all the images, icons, fonts, etc
    - components: Folder to store common components that are used throughout the app (such as Button, Switch, Avatar etc)
    - hooks: Common hooks
    - navigation: App navigation components. Those are stacks, tabs and so on
    - screens: Screen components. Each screen contains `index.tsx` with the main screen markdown plus optional `components` `assets` `hooks` subfolders with the corresponding content
    - services: Abstraction layer over some common services (e.g. keychain, analytics, logging and so on)
    - store: Redux configuration files (store, middlewares etc) and business logic modules. Each module might consist of selectors, actions, sagas, reducers and hooks
    - translations: Everything related to the app l10n
    - utils: Reusable functions which are helpful for accomplishing routine tasks
    - App.tsx: Main component that starts the whole app
- ios android: Folders, containing native iOS and Android projects and everything related
- index.js: Entry point of the application as per React-Native standards
```

## Run the App locally

- Follow the [steps to setup the environment](https://reactnative.dev/docs/environment-setup)

- Install dependencies

  ```
  yarn install

  ## Optional: for iOS only
  npx pod-install
  ```

- Set the App environment

  ```
  yarn configure:staging
  ## or
  yarn configure:production
  ```

  > [!NOTE]
  > The commands above take the app env files from the [mobile-app-secrets](https://github.com/ice-blockchain/mobile-app-secrets) folder that should be downloaded beforehand and placed on the same level as the mobile-app project

- Run the App
  ```
  yarn run:android
  ## or
  yarn run:ios
  ```

## Localization rules

We’re keeping translations in `src/translations/locales/**.json`.
The translation types are generated with `yarn generate-translation-types` script (should be applied after any locale modification).
The types are generated based on `en.json` - that is the main locale and the fallback for other locales.

## Download the App

Download the App at https://ice.io
