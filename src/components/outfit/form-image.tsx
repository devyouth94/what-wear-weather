import React, { useRef } from 'react';
import { type ControllerRenderProps } from 'react-hook-form';
import Image from 'next/image';
import { XIcon } from 'lucide-react';

import { type CreateOOTDForm } from '~/src/components/outfit/ootd-drawer';
import { Card, CardContent } from '~/src/components/ui/card';
import { FormControl, FormItem, FormLabel } from '~/src/components/ui/form';
import { Input } from '~/src/components/ui/input';

type Props = {
  field: ControllerRenderProps<CreateOOTDForm, 'image'>;
};

const FormImage = ({ field }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeImage = (image: File | undefined) => {
    field.onChange(image);

    if (!image && fileInputRef.current) {
      fileInputRef.current!.value = '';
    }
  };

  return (
    <FormItem>
      <FormLabel required>사진</FormLabel>

      {field.value && (
        <Card className="relative">
          <CardContent className="relative aspect-video max-h-[256px] w-full overflow-hidden p-0">
            <Image
              alt="오늘의 옷 사진 미리보기"
              src={URL.createObjectURL(field.value)}
              className="object-contain"
              fill
            />
          </CardContent>

          <button
            onClick={() => handleChangeImage(undefined)}
            className="absolute right-2 top-2 z-10 flex size-6 items-center justify-center rounded-full bg-primary"
          >
            <XIcon className="text-muted" size={14} />
          </button>
        </Card>
      )}

      <FormControl>
        <Input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const image = e.target.files?.[0];
            handleChangeImage(image);
          }}
        />
      </FormControl>
    </FormItem>
  );
};

export default FormImage;
