import styled from 'styled-components';
import { Tag, TagColors } from '@daohaus/ui';

export const TagListContainer = styled.div`
  margin-top: 2.8rem;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
`;

const tagColors: TagColors[] = [
  'violet',
  'green',
  'blue',
  'pink',
  'yellow',
  'red',
];

type TagListProps = {
  tags: string[];
};

export const TagList = ({ tags }: TagListProps) => {
  return (
    <TagContainer>
      {tags.filter(Boolean).map((tag) => (
        <Tag
          tagColor={tagColors[(tagColors.length * Math.random()) | 0]}
          key={tag}
        >
          {tag}
        </Tag>
      ))}
    </TagContainer>
  );
};
