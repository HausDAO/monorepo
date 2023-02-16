import { Tag, TagColors } from '@daohaus/ui';
import { TagContainer } from './DaoOverview.styles';

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
