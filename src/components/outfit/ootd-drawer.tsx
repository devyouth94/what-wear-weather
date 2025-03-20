'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { z } from 'zod';

import FormImage from '~/src/components/outfit/form-image';
import { Button } from '~/src/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/src/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/src/components/ui/form';
import { Textarea } from '~/src/components/ui/textarea';
import { useGeolocation } from '~/src/contexts/geolocation-provider';
import useCreateOutfit from '~/src/queries/use-create-outfit';
import useGetCurrentWeather, {
  type GetCurrentWeatherResponse,
} from '~/src/queries/use-get-current-weather';
import { compressImage } from '~/src/utils/image';

const temp: Array<{ key: keyof GetCurrentWeatherResponse; value: string }> = [
  { key: 'temp', value: '현재온도' },
  { key: 'temp_feels', value: '체감온도' },
  { key: 'temp_min', value: '최저온도' },
  { key: 'temp_max', value: '최고온도' },
];

const formSchema = z.object({
  image: z.instanceof(File),
  description: z
    .string()
    .transform((value) => value.trim())
    .optional(),
});

export type CreateOOTDForm = z.infer<typeof formSchema>;

const OOTDDrawer = () => {
  const { isLoading: isGeolocationLoading } = useGeolocation();
  const { data: currentWeather, isLoading } = useGetCurrentWeather();
  const { mutate: createOutfit } = useCreateOutfit();

  const [open, setOpen] = useState(false);

  const form = useForm<CreateOOTDForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
    },
  });

  const { control, handleSubmit: onSubmit, formState, reset } = form;
  const { isValid, isSubmitting } = formState;

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open) {
      reset();
    }
  };

  const handleSubmit = async (data: CreateOOTDForm) => {
    const compressedImage = await compressImage(data.image);

    const formData = new FormData();

    formData.append('weather', JSON.stringify(currentWeather));
    formData.append('image', compressedImage);
    if (data.description) {
      formData.append('description', data.description);
    }

    createOutfit(formData, {
      onSuccess: () => handleOpenChange(false),
    });
  };

  return (
    <Drawer
      shouldScaleBackground={false}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DrawerTrigger asChild disabled={isGeolocationLoading || isLoading}>
        <Button>
          <PlusIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[calc(100dvh-var(--height-header))]">
        <DrawerHeader>
          <DrawerTitle>오늘의 옷</DrawerTitle>
          <DrawerDescription>오늘의 옷을 등록해주세요.</DrawerDescription>
        </DrawerHeader>

        <div className="px-4">
          {currentWeather && (
            <div className="border-box *:border-box">
              <div>
                <div>위치: {currentWeather.location}</div>
                <div>날씨: {currentWeather.weather}</div>
              </div>

              <div className="flex items-center justify-between gap-2">
                {temp.map((item) => (
                  <div key={item.key} className="flex flex-col items-center">
                    <span>{item.value}</span>
                    <span>{currentWeather[item.key]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Form {...form}>
            <form
              id="ootd-form"
              onSubmit={onSubmit(handleSubmit)}
              className="mt-4 space-y-4"
            >
              <FormField
                control={control}
                name="image"
                render={({ field }) => <FormImage field={field} />}
              />

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>설명</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DrawerFooter className="w-full">
          <Button
            form="ootd-form"
            type="submit"
            loading={isSubmitting}
            disabled={!isValid}
          >
            등록
          </Button>

          <DrawerClose asChild>
            <Button type="button" variant="outline">
              닫기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OOTDDrawer;
