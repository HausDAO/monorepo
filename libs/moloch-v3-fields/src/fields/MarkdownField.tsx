import React, { useState } from 'react';
import {
  Buildable,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  Field,
  Label,
  WrappedTextArea,
} from '@daohaus/ui';
import { useFormContext } from 'react-hook-form';
import { BiPencil } from 'react-icons/bi';
import { MdFullscreen, MdFullscreenExit, MdPreview } from 'react-icons/md';

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
  font-size: 1.5rem;
  font-family: inherit;
`;

const DialogMarkDownContainer = styled.div`
  height: 50rem;
  max-width: 100rem;
  min-width: 50rem;
  overflow-y: scroll;
  padding: 10px;
  margin-bottom: 5rem;
  border-radius: 5px;
  background-color: hsl(228, 43.3%, 17.5%);
  font-size: 1.5rem;
  font-family: inherit;
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

const DialogWrappedTextArea = styled(WrappedTextArea)`
  height: 50rem;
  max-width: 100rem;
  min-width: 70rem;
`;

const DialogButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  margin-bottom: -2rem;
`;

export const MarkdownField = (props: Buildable<Field>) => {
  const { watch } = useFormContext();
  const value = watch(props.id);
  // use state for edit or preview view
  const [edit, setEdit] = useState(true);
  const [toggleFullscreen, setToggleFullscreen] = useState(false);

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

        <Dialog open={toggleFullscreen} onOpenChange={setToggleFullscreen}>
          <DialogTrigger asChild>
            <Button
              color="secondary"
              variant={toggleFullscreen ? 'outline' : 'solid'}
              size="sm"
            >
              {toggleFullscreen ? <MdFullscreen /> : <MdFullscreenExit />}
            </Button>
          </DialogTrigger>

          <DialogContent title="Add Safe">
            <DialogButtonWrapper>
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
            </DialogButtonWrapper>
            {edit ? (
              <DialogWrappedTextArea {...props} />
            ) : (
              <>
                <LabelContainer>
                  <Label>Preview</Label>
                </LabelContainer>
                <DialogMarkDownContainer>
                  <ReactMarkdown>{value}</ReactMarkdown>
                </DialogMarkDownContainer>
              </>
            )}
          </DialogContent>
        </Dialog>
      </TabsContainer>
      {edit && !toggleFullscreen ? (
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
