import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  defaultDarkTheme,
  defaultLightTheme,
  HausThemeProvider,
} from '../src/theme';

export const parameters = {
  options: {
    storySort: {
      order: ['Atoms', 'Molecules', 'Organisms', 'Layouts', '*', 'WIP'],
    },
  },
  backgrounds: {
    default: 'Dark',
    values: [
      {
        name: 'Dark',
        value: defaultDarkTheme.rootBgColor,
      },
      {
        name: 'Light',
        value: defaultLightTheme.rootBgColor,
      },
    ],
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'Dark',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['Dark', 'Light'],
    },
  },
};

const handleBGReplace = (context) => ({
  ...context,
  globals: {
    ...context.globals,
    backgrounds: {
      value:
        context?.globals?.theme === 'Dark'
          ? defaultDarkTheme.rootBgColor
          : defaultLightTheme.rootBgColor,
    },
  },
});

const withThemeProvider = (Story, context) => {
  const isDark = context.globals.theme === 'Dark' ? true : false;
  const updatedContext = handleBGReplace(context);
  return (
    <HausThemeProvider startDark={isDark}>
      <Story {...updatedContext} />
    </HausThemeProvider>
  );
};

const WithFormProvider = (Story, context) => {
  const methods = useForm({ mode: 'onTouched' });
  const { watch } = methods;

  const values = watch();

  useEffect(() => {
    if (values) {
      console.log('Form Values', values);
    }
  }, [values]);

  return (
    <FormProvider {...methods}>
      <Story {...context} />
    </FormProvider>
  );
};

export const decorators = [withThemeProvider, WithFormProvider];
