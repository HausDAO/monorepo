import styled from 'styled-components';

import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';

////////////////////PARAGRAPH TEXT////////////////////
const Par = styled.p`
  font-family: ${font.family.body};
  font-weight: ${font.weight.reg};
  color: ${({ theme, color }: { color?: string; theme: Theme }) =>
    color || theme.rootFontColor};
`;
const Data = styled.p`
  font-family: ${font.family.data};
  font-weight: ${font.weight.reg};
  color: ${(props) => props.color};
  letter-spacing: 1px;
`;

export const ParXs = styled(Par)`
  font-size: ${font.size.xs};
`;
export const ParSm = styled(Par)`
  font-size: ${font.size.sm};
`;
export const ParMd = styled(Par)`
  font-size: ${font.size.md};
`;
export const ParLg = styled(Par)`
  font-size: ${font.size.lg};
`;
export const ParXl = styled(Par)`
  font-size: ${font.size.xl};
`;
////////////////////HEADER TEXT////////////////////
export const H6 = styled.h6`
  font-size: ${font.size.md};
  font-weight: ${font.weight.black};
  font-family: ${font.family.body};
  color: ${(props) => props.color};
`;
export const H5 = styled.h5`
  font-size: ${font.size.lg};
  font-weight: ${font.weight.bold};
  font-family: ${font.family.body};
  color: ${(props) => props.color};
`;
export const H4 = styled.h4`
  font-size: ${font.size.xl};
  font-weight: ${font.weight.bold};
  font-family: ${font.family.body};
  color: ${(props) => props.color};
`;
export const H3 = styled.h3`
  font-size: ${font.size.xxl};
  font-weight: ${font.weight.reg};
  font-family: ${font.family.body};
  color: ${(props) => props.color};
`;
export const H2 = styled.h2`
  font-size: ${font.size.xxxl};
  font-weight: ${font.weight.light};
  font-family: ${font.family.body};
  color: ${(props) => props.color};
`;
export const H1 = styled.h1`
  font-size: ${font.size.xxxxl};
  font-weight: ${font.weight.light};
  font-family: ${font.family.body};
  color: ${(props) => props.color};
`;
////////////////////DATA TEXT////////////////////
export const DataXs = styled(Data)`
  font-size: ${font.size.xs};
`;
export const DataSm = styled(Data)`
  font-size: ${font.size.sm};
`;
export const DataMd = styled(Data)`
  font-size: ${font.size.md};
`;
export const DataLg = styled(Data)`
  font-size: ${font.size.lg};
`;
export const DataXl = styled(Data)`
  font-size: ${font.size.xl};
`;
///////////////////////FONT-MODS/////////////////////
export const ExtraLight = styled.span`
  font-weight: ${font.weight.extraLight};
`;

export const Light = styled.span`
  font-weight: ${font.weight.light};
`;
export const Bold = styled.span`
  font-weight: ${font.weight.bold};
  color: ${({ theme, color }: { color?: string; theme: Theme }) =>
    color || theme.rootFontColor};
`;

export const ExtraBold = styled.span`
  font-weight: ${font.weight.black};
`;
export const Italic = styled.span`
  font-style: italic;
`;
export const Underline = styled.span`
  text-decoration: underline;
`;
export const StrikeThrough = styled.span`
  text-decoration: line-through;
`;
export const TintSecondary = styled.span`
  color: ${({ theme }: { theme: Theme }) => theme.secondary.step11};
`;
