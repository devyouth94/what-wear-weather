'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterIcon } from 'lucide-react';
import { z } from 'zod';

import { Button } from '~/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/src/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '~/src/components/ui/form';
import { Slider } from '~/src/components/ui/slider';
import { useOutfitFilter } from '~/src/contexts/my-outfit-filter-provider';

const formSchema = z.object({
  temp: z.object({
    min: z.number(),
    max: z.number(),
  }),
});

export type MyOutfitFilterForm = z.infer<typeof formSchema>;

const MyOutfitFilter = () => {
  const { filter, onChangeFilter, onResetFilter } = useOutfitFilter();

  const form = useForm<MyOutfitFilterForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temp: {
        min: filter.temp_min || -30,
        max: filter.temp_max || 40,
      },
    },
  });

  const { control, handleSubmit: onSubmit, reset } = form;

  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open) {
      reset();
    }
  };

  const handleReset = () => {
    reset();
    onResetFilter();
  };

  const handleSubmit = (data: MyOutfitFilterForm) => {
    const { temp } = data;

    onChangeFilter({
      temp_min: temp.min,
      temp_max: temp.max,
    });

    setOpen(false);
  };

  return (
    <div className="border-box flex justify-end p-2">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <FilterIcon />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>필터</DialogTitle>
          </DialogHeader>

          <div className="grow">
            <Form {...form}>
              <form id="filter-form" onSubmit={onSubmit(handleSubmit)}>
                <FormField
                  control={control}
                  name="temp"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>온도</FormLabel>

                        <div className="grid grid-cols-[30px_auto_30px] items-center gap-2">
                          <span>{field.value.min}</span>
                          <FormControl>
                            <Slider
                              min={-30}
                              max={40}
                              step={1}
                              defaultValue={[-30, 40]}
                              value={[field.value.min, field.value.max]}
                              onValueChange={(value) => {
                                field.onChange({
                                  min: value[0],
                                  max: value[1],
                                });
                              }}
                            />
                          </FormControl>
                          <span className="text-right">{field.value.max}</span>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              </form>
            </Form>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={handleReset}>
              초기화
            </Button>
            <Button form="filter-form" type="submit">
              적용
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyOutfitFilter;
