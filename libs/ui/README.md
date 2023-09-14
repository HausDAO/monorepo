# Component Library (UI) / @daohaus/ui

The UI component library is organized into various component levels: _Atoms_, _Molecules_, _Organisms_, and _Layouts_. This organization allows you to install the entire package or pick the components you need. Even though we bundle many elements together, we also provide the primitives when possible. If a molecule doesn't suit your needs, you can reconstruct it as you wish.

### [Inspect components in Storybook](https://storybook.daohaus.fun/?path=/story/atoms-avatar--small-avatar)

### [View on NPM](https://www.npmjs.com/package/@daohaus/ui)

## Usage

## Running Storybook Locally

Run `nx ui:storybook`

### Installation

```bash
yarn add @daohaus/ui
```

Initially, import the `HausThemeProvider` from the `@daohaus/ui` package in your app's root component, such as `main.tsx`. This wraps the entire application and avails its data to other components

```jsx
// main.tsx

import { HausThemeProvider } from '@daohaus/ui';

ReactDOM.render(
  <StrictMode>
    <HausThemeProvider>
      <HashRouter>
        <HausConnectProvider>
          <Routes />
        </HausConnectProvider>
      </HashRouter>
    </HausThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);
```

### Examples

**There are examples of most component in our [Storybook](https://storybook.daohaus.fun/)**

**How to use Components**

You can import individual components from the `@daohaus/ui` package and utilize them in your app:

```jsx
import { Button } from '@daohaus/ui';

<Button color="secondary" onClick={somAction} IconLeft={<SomeIcon />}>
  Button content
</Button>;
```

**How to override the theme.**

The `theme.ts` file establishes base styles for components, leveraging the Radix [open-source color system](https://www.radix-ui.com/colors). The `<HausThemeContext>` sets state variables for primary, secondary, tertiary, neutral, and utility colors.

[Daefult DAOhaus theme](https://github.com/HausDAO/monorepo/blob/develop/libs/ui/src/theme/theme.ts#L54)

You can override this theme by passing a new theme or parts of the theme to the themeOverrides prop on the HausThemeProvider

**How to use the toast hook**

```jsx
import { useToast } from '@daohaus/ui';

const { successToast } = useToast();

successToast({
  title: 'Toast title',
  description: 'Some content',
});
```

**How to use the media query hook**

```jsx
import { useBreakpoint, widthQuery } from '@daohaus/ui';

const isMobile = useBreakpoint(widthQuery.sm);

<Button full={isMobile} />;
```

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

## Building

Run `nx ui:build` to build the library.
