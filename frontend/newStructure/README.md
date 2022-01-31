# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## Other included plugins

- [Axios](https://axios-http.com/) for http requests
- [Pinia](https://pinia.esm.dev/) for state management
- [Vuelidate](https://vuelidate.js.org/) for form validation
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) 5 for modals, popups, etc

## Linting

The project is linted with ESLint and Stylelint

## Testing

Uses Vue Test Utils and jest with a coverage set to 90%

## Running the project

- `npm run dev` - Runs the project in development mode with hot module reloading.
- `npm run build` - Builds the project ready for production, and outputs the build files to a dist directory.
- `npm run test` - Runs the unit tests.
- `npm run coverage` - Run the unit tests and build a coverage report which can be found in the coverage folder.

## Folder structure

All the app code is contained within the `src` folder. This is then split up into the following folders:

- Assets: Any images, icons etc
- Core: Core app items such as router, global stores, components (header, footer etc) and the main App.vue
- Modules: Self contained parts of the app/pages. For example if the app has a **Home** page, there should be a **home** folder within modules.
  Then within the **home** modules folder it should be broken down into the following.
  - The main view ie `home.vue`
  - A components folder
  - A store folder for any stores that are specific to that part of the app
- Services: Any http services
- Styles: Global styles
- Types: Any types/interfaces
- main.ts: The app entry and initialization
