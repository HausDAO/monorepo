import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Buildable, Field } from '../../../types/formAndField';
import { Avatar, Button, Icon } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper';
import {
  CancelIcon,
  FileInputContents,
  ImageDisplayWrapper,
} from './FileInput.styles';

export const FileInput = ({
  id,
  buttonText,
  accept,
  displayAvatarImage = false,
  ...props
}: Buildable<Field> & {
  buttonText: string;
  accept: string;
  displayAvatarImage: boolean;
}) => {
  const upload = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { register, setValue } = useFormContext();

  const handleBrowse = () => {
    upload.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    setImageUrl(URL.createObjectURL(fileList[0]));
    const formData = new FormData();
    formData.append('image', fileList[0], fileList[0].name);
    setValue(id, formData);
  };

  const handleResetImage = () => {
    setValue(id, undefined);
    setImageUrl(null);
  };

  return (
    <FieldWrapper {...props} id={id}>
      <FileInputContents>
        <Button
          onClick={() => {
            handleBrowse();
          }}
        >
          {buttonText}
        </Button>
        <input
          {...props}
          {...register(id)}
          id={id}
          type="file"
          multiple={false}
          style={{ display: 'none' }}
          ref={upload}
          onChange={handleImageChange}
        />
        {displayAvatarImage && imageUrl && (
          <ImageDisplayWrapper>
            <Avatar src={imageUrl} size="xl" />
            <div onClick={handleResetImage}>
              <Icon>
                <CancelIcon />
              </Icon>
            </div>
          </ImageDisplayWrapper>
        )}
      </FileInputContents>
    </FieldWrapper>
  );
};
