import { ComponentMeta } from '@storybook/react';
import { Button, ParMd } from '../../atoms';
import { OuterLayout } from './OuterLayout';

export default {
  title: 'Layouts/OuterLayout',
  component: OuterLayout,
} as ComponentMeta<typeof OuterLayout>;

export const Basic = () => (
  <OuterLayout>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
      className="connect"
    >
      <Button>Switcher Dropdown</Button>
      <Button>Connect</Button>
    </div>
    <ParMd>
      Cannot import DH Connect into storybook, so this is a demo of how this
      OuterLayout component handles connect. For now, OuterLayout renders a div
      with a 100% width. It targets DH connect so that it can apply some
      padding.
    </ParMd>
  </OuterLayout>
);
