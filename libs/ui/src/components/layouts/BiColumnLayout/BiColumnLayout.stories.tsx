import { ComponentMeta, ComponentStory } from '@storybook/react';
import { widthQuery } from '../../../theme/global/breakpoints';
import styled from 'styled-components';
import { Card } from '../../atoms';
import { MainLayout } from '../MainLayout';
import { BiColumnLayout } from './BiColumnLayout';

export default {
  title: 'Layouts/BiColumnLayout',
  component: BiColumnLayout,
} as ComponentMeta<typeof BiColumnLayout>;

const Template: ComponentStory<typeof BiColumnLayout> = (args) => (
  <MainLayout>
    <BiColumnLayout {...args} />
  </MainLayout>
);

const LeftCard = styled(Card)`
  width: 100%;
  min-width: 54rem;
  max-width: 64rem;
  height: 47rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const RightCard = styled(Card)`
  width: 100%;
  min-width: 38rem;
  max-width: 45rem;
  height: 77rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

export const BaseBiColumnLayout = Template.bind({});

BaseBiColumnLayout.args = {
  title: 'Bi-Column Layout',
  subtitle: 'Two column layout',
  right: <RightCard>Right</RightCard>,
  left: <LeftCard>Left</LeftCard>,
};
