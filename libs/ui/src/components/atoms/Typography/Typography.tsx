import styled from 'styled-components';

////////////////////PARAGRAPH TEXT////////////////////
const Par = styled.p<{ color?: string }>`
  font-family: ${({ theme }) => theme.font.family.body};
  font-weight: ${({ theme }) => theme.font.weight.reg};
  color: ${({ theme, color }) => color || theme.rootFontColor};
`;
const Data = styled.p`
  font-family: ${({ theme }) => theme.font.family.data};
  font-weight: ${({ theme }) => theme.font.weight.reg};
  color: ${(props) => props.color};
  letter-spacing: 1px;
`;

export const ParXs = styled(Par)`
  font-size: ${({ theme }) => theme.font.size.xs};
`;
export const ParSm = styled(Par)`
  font-size: ${({ theme }) => theme.font.size.sm};
`;
export const ParMd = styled(Par)`
  font-size: ${({ theme }) => theme.font.size.md};
`;
export const ParLg = styled(Par)`
  font-size: ${({ theme }) => theme.font.size.lg};
`;
export const ParXl = styled(Par)`
  font-size: ${({ theme }) => theme.font.size.xl};
`;
////////////////////HEADER TEXT////////////////////
export const H6 = styled.h6`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.black};
  font-family: ${({ theme }) => theme.font.family.header};
  color: ${(props) => props.color};
`;
export const H5 = styled.h5`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-family: ${({ theme }) => theme.font.family.header};
  color: ${(props) => props.color};
`;
export const H4 = styled.h4`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-family: ${({ theme }) => theme.font.family.header};
  color: ${(props) => props.color};
`;
export const H3 = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.reg};
  font-family: ${({ theme }) => theme.font.family.header};
  color: ${(props) => props.color};
`;
export const H2 = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xxxl};
  font-weight: ${({ theme }) => theme.font.weight.light};
  font-family: ${({ theme }) => theme.font.family.header};
  color: ${(props) => props.color};
`;
export const H1 = styled.h1`
  font-size: ${({ theme }) => theme.font.size.xxxxl};
  font-weight: ${({ theme }) => theme.font.weight.light};
  font-family: ${({ theme }) => theme.font.family.header};
  color: ${(props) => props.color};
`;
////////////////////DATA TEXT////////////////////
export const DataXs = styled(Data)`
  font-size: ${({ theme }) => theme.font.size.xs};
`;
export const DataSm = styled(Data)`
  font-size: ${({ theme }) => theme.font.size.sm};
`;
export const DataMd = styled(Data)`
  font-size: ${({ theme }) => theme.font.size.md};
`;
export const DataLg = styled(Data)`
  font-size: ${({ theme }) => theme.font.size.lg};
`;
export const DataXl = styled(Data)`
  font-size: ${({ theme }) => theme.font.size.xl};
`;
///////////////////////FONT-MODS/////////////////////
export const ExtraLight = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.extraLight};
`;

export const Light = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.light};
`;
export const Bold = styled.span<{ color?: string }>`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme, color }) => color || theme.rootFontColor};
`;

export const ExtraBold = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.black};
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
  color: ${({ theme }) => theme.secondary.step11};
`;
