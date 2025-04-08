'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { z } from 'zod';

import FormImage from '~/src/components/outfit/form-image';
import { Badge } from '~/src/components/ui/badge';
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
import useCreateOutfitToday from '~/src/queries/use-create-outfit-today';
import useGetCurrentWeather, {
  type GetCurrentWeatherResponse,
} from '~/src/queries/use-get-current-weather';

const temp: Array<{ key: keyof GetCurrentWeatherResponse; value: string }> = [
  { key: 'temp', value: '현재' },
  { key: 'temp_feels', value: '체감' },
  { key: 'temp_min', value: '최저' },
  { key: 'temp_max', value: '최고' },
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
  const { mutate: createOutfitToday, isPending } = useCreateOutfitToday();

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

  const handleSubmit = (data: CreateOOTDForm) => {
    createOutfitToday(data, {
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
        <Button className="w-fit">
          <PlusIcon />
          오늘의 옷을 등록하세요
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[calc(100dvh-var(--height-header))]">
        <DrawerHeader>
          <DrawerTitle>오늘의 옷 등록하기</DrawerTitle>
          <DrawerDescription hidden>
            오늘의 옷을 등록해주세요.
          </DrawerDescription>
        </DrawerHeader>

        <div className="grow overflow-scroll px-4 py-1">
          {currentWeather && (
            <section className="grid grid-cols-4 gap-1">
              {temp.map(({ key, value }) => (
                <Badge key={key} className="grid grid-cols-[25px_auto]">
                  <span className="font-light">{value}</span>
                  <span className="block text-end">
                    {`${currentWeather[key]}°`}
                  </span>
                </Badge>
              ))}
            </section>
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
            loading={isPending || isSubmitting}
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
