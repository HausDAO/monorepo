import { Tag } from '@daohaus/ui';
import styled from 'styled-components';
import { randFromArray } from '../utils/settingsHelper';

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
`;

type TagListProps = {
  tags: string[];
};

type TagColors = 'blue' | 'green' | 'pink' | 'violet' | 'yellow' | 'red';

const tagColors: TagColors[] = [
  'violet',
  'green',
  'blue',
  'pink',
  'yellow',
  'red',
];

export const TagList = ({ tags }: TagListProps) => {
  return (
    <TagContainer>
      {tags.filter(Boolean).map((tag) => (
        <Tag tagColor={randFromArray(tagColors)} key={tag}>
          {tag}
        </Tag>
      ))}
    </TagContainer>
  );
};
