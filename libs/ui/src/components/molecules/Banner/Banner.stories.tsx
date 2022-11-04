import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Banner } from './Banner';

export default {
  title: 'Molecules/Banner',
  component: Banner,
} as ComponentMeta<typeof Banner>;

const Template: ComponentStory<typeof Banner> = (args) => {
  return <Banner {...args} />;
};

export const BaseBanner = Template.bind({});
BaseBanner.args = {};

export const BannerWithCustomText = Template.bind({});
BannerWithCustomText.args = {
  bannerText: 'Hello from Rowdy',
};
