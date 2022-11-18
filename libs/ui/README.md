# Component Library (UI) / @daohaus/ui

**Component Library (UI)** is a set of React components with TypeScript leveraging [Radix UI](https://www.radix-ui.com/) primitives. This library roughly follows [Atomic Design principles](https://bradfrost.com/blog/post/atomic-web-design/), and are intended to be composed together to build application UI.

This library includes a [Storybook](https://storybook.js.org/) as well and is intended for use by the larger DAOhaus community. Since we "dogfood" our own package development we're continually adding to this library as we surface new components.

This library was generated with [Nx](https://nx.dev).

## Getting Started

**Install**

```sh
yarn add @daohaus/ui
```

## Running Locally

To run this locally, clone the monorepo and use `nx run ui:storybook` to run the Storybook instance. This will start a local server and open a browser window to the Storybook UI. This will run the Storybook instance on `localhost:4400`.

## Usage

DAOhaus UI provides a theme Context Provider as well as a set of UI components that can be imported and used to build app UI.Start by importing the `HausThemeProvider` from the `@daohaus/ui` package at your app's `root` component, such as `main.tsx`:

### HausThemeProvider Context Provider

```jsx
// main.tsx

ReactDOM.render(
  <StrictMode>
    <HausThemeProvider>
      <HashRouter>
        <DHConnectProvider>
          <Routes />
        </DHConnectProvider>
      </HashRouter>
    </HausThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
```

Eventually this will support multiple themes that can be passed into the `<HausThemeProvider/>` but for now it only includes the default theme. Once this is imported, your app will inherit all of the default theme styles and tokens.

### Importing Components

Individual components are exported as named exports from the `@daohaus/ui` package. You can use them in your app by importing them into a component:

```jsx
// Component.tsx

import { Button } from '@daohaus/ui';
```

We have a Storybook with stories for each exported component showcasing the props and variants. All of our components are written with TypeScript so you'll be able to have TypeScript "hints" in your code editor when using them.

## Components Overview

Our component library includes the following, and each of the components has an associated Story for more deatiled usage.

- **Animations**: Our animations commonly used throughout the app.
- **Components**: We roughly follow Atomic Design principles so our components are organized as _Atoms_, _Molecules_, and _Organisms_
  - **Atoms**
    - These are the smallest components that are used to build up a larger component. Each Atom is typically a single UI element such as a `<Label>` component.
  - **Molecules**
    - Molecules are composed of Atoms and other Molecules. Molecules are typically used to build up a larger component. An example is an `<Toast/>` component as it composes other Atoms.
  - **Organisms**
    - These are the largest components. As our component library is largely comprised of building blocks intended to be composed together, we currently have fewer at this level than the others as most Organisms exist in the individual apps.
- **Hooks**
  - Hooks are React Hooks that are used to provide additional functionality to our components. For example, we have a `useMediaQuery` hook that supports responsive design.
- **Theme**
  - Our `theme` and base styles for several components. We have a `HausThemeContext` that composes and scaffolds core theme elements.
- **Types**
  - Common types used throughout the component library.

---
