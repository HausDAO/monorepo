import { CollapsibleCard, H5, ParMd } from '@daohaus/ui';

type SegmentType = {
  actionButton?: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  formArea: React.ReactNode;
  infoArea?: React.ReactNode;
  error?: React.ReactNode;
};

export const CollapsibleFormSegment = ({
  actionButton,
  defaultOpen,
  title,
  description,
  formArea,
  infoArea,
  error,
}: SegmentType) => {
  return (
    <CollapsibleCard
      children={
        <div>
          <H5 className="segment-title">{title}</H5>
          <ParMd className="segment-description">{description}</ParMd>
        </div>
      }
      collapsibleActions={actionButton}
      collapsibleContent={
        <div>
          {formArea}
          {infoArea}
          {error}
        </div>
      }
      defaultOpen={defaultOpen}
      triggerLabel={''}
      width="100%"
    />
  );
};
