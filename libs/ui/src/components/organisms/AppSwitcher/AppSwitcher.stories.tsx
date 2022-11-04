import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AppSwitcher } from './AppSwitcher';
import { ReactComponent as Daohaus } from '../../../assets/Daohaus.svg';
import { ReactComponent as Summoner } from '../../../assets/Summoner.svg';
import { ReactComponent as Docs } from '../../../assets/Docs.svg';
import { ReactComponent as Hub } from '../../../assets/Hub.svg';

export default {
  title: 'Organisms/AppSwitcher',
  component: AppSwitcher,
} as ComponentMeta<typeof AppSwitcher>;

const Template: ComponentStory<typeof AppSwitcher> = (args) => (
  <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
    <AppSwitcher {...args} />
  </div>
);

export const DaoHausAppSwitcher = Template.bind({});

DaoHausAppSwitcher.args = {
  trigger: {
    name: 'Hub',
    url: 'https://hub.daohaus.fun/',
    icon: Hub,
  },
  apps: [
    {
      name: 'Summoner',
      url: 'https://summon.daohaus.fun/',
      icon: Summoner,
    },
    {
      name: 'Docs',
      url: 'https://storybook.daohaus.fun/',
      icon: Docs,
    },
    {
      name: 'DAOHaus',
      url: 'https://daohaus.club/',
      icon: Daohaus,
    },
  ],
};
