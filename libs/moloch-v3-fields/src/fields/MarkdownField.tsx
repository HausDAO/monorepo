import React, { useState } from 'react';
import { Buildable, Button, Field, Label, WrappedTextArea } from '@daohaus/ui';
import { useFormContext } from 'react-hook-form';
import { BiPencil } from 'react-icons/bi';
import { MdPreview } from 'react-icons/md';

import ReactMarkdown from 'react-markdown';

import styled from 'styled-components';

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-bottom: -2rem;
`;

const MarkDownContainer = styled.div`
  min-height: 12rem;
  max-height: 12rem;
  overflow-y: scroll;
  padding: 10px;
  margin-bottom: 5rem;
  border-radius: 5px;
  background-color: hsl(228, 43.3%, 17.5%);
`;

const LabelContainer = styled(Label)`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  label {
    margin-right: 10px;
    margin-left: 10px;
  }
  svg {
    transform: translateY(0.1rem);
  }
`;

export const MarkdownField = (props: Buildable<Field>) => {
  const { watch } = useFormContext();
  console.log('watch', watch(props.id));
  const value = watch(props.id);
  // use state for edit or preview view
  const [edit, setEdit] = useState(true);

  return (
    <>
      <TabsContainer>
        <Button
          color="secondary"
          variant={!edit ? 'outline' : 'solid'}
          onClick={() => setEdit(true)}
          size="sm"
        >
          <BiPencil />
        </Button>
        <Button
          color="secondary"
          variant={edit ? 'outline' : 'solid'}
          onClick={() => setEdit(false)}
          size="sm"
        >
          <MdPreview />
        </Button>
      </TabsContainer>
      {edit ? (
        <WrappedTextArea {...props} />
      ) : (
        <>
          <LabelContainer>
            <Label>Preview</Label>
          </LabelContainer>
          <MarkDownContainer>
            <ReactMarkdown>{value}</ReactMarkdown>
          </MarkDownContainer>
        </>
      )}
    </>
  );
};
