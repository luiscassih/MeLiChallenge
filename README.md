# MeLi Challenge
Challenge excercise for Mercado Libre

`Using Node 14.16.1 LTS`

`Edit .env config and replace with your custom config.`

To start in dev mode:
```
yarn dev
```
To simple build and serve up the app:
```
yarn start
```
To generate a production ready build:
```
yarn build
```
To run tests
```
yarn test
```

## App structure
Structured on a component based best practice, similar to https://github.com/goldbergyoni/nodebestpractices

```
src/
  api/
    <api versions>
      components/
        <each api endpoint component>
          index.ts -- assigned controllers to endpoints
          nameController.ts
      index.ts -- routes in this api versin
    index.ts
  client/
    assets/
      <images, icons>
    components/
      <each page component>
        components/ -- separated nested components used only by this page/component
        index.ts -- Routes used by this component
        nameController.ts -- assigned Views to routes
        nameStyles.scss
        nameView.tsx
      router/
        index.ts -- routes used by express
        router.tsx -- routes used by the react client
    public/
    global.scss
    index.tsx -- React client file, enables isomorphic rendering
test/
.env -- config file for app url and such
```