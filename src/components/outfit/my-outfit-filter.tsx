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
import { RadioGroup, RadioGroupItem } from '~/src/components/ui/radio-group';
import { Slider } from '~/src/components/ui/slider';
import { MONTH_OPTIONS, SORT_OPTIONS } from '~/src/constants/filter';
import { useOutfitFilter } from '~/src/contexts/my-outfit-filter-provider';

const formSchema = z.object({
  sort: z.enum(['asc', 'desc']),
  temp: z.object({
    min: z.number(),
    max: z.number(),
  }),
  month: z.number(),
});

export type MyOutfitFilterForm = z.infer<typeof formSchema>;

const MyOutfitFilter = () => {
  const { filter, onChangeFilter, onResetFilter } = useOutfitFilter();

  const form = useForm<MyOutfitFilterForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sort: filter.sort || 'desc',
      temp: {
        min: filter.temp_min || -30,
        max: filter.temp_max || 40,
      },
      month: filter.month || 0,
    },
  });

  const { control, handleSubmit: onSubmit, reset } = form;

  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    const isEmptyFilter = Object.keys(filter).length === 0;

    if (!open && isEmptyFilter) {
      reset();
    }
  };

  const handleReset = () => {
    reset();
    onResetFilter();
  };

  const handleSubmit = (data: MyOutfitFilterForm) => {
    const { sort, temp, month } = data;

    onChangeFilter({
      sort,
      temp_min: temp.min,
      temp_max: temp.max,
      month,
    });

    setOpen(false);
  };

  return (
    <div className="flex justify-end p-3">
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <FilterIcon />
          </Button>
        </DialogTrigger>

        <DialogContent className="h-fit">
          <DialogHeader>
            <DialogTitle>필터</DialogTitle>
          </DialogHeader>

          <div className="grow">
            <Form {...form}>
              <form
                id="filter-form"
                onSubmit={onSubmit(handleSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={control}
                  name="sort"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>정렬</FormLabel>

                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="grid grid-cols-2 gap-2"
                          >
                            {SORT_OPTIONS.map((item) => (
                              <FormItem
                                key={item.value}
                                className="flex items-center gap-1 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={item.value} />
                                </FormControl>
                                <FormLabel>{item.label}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={control}
                  name="temp"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>온도</FormLabel>

                        <div className="grid grid-cols-[30px_auto_30px] items-center gap-2">
                          <span>{`${field.value.min}°`}</span>
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
                          <span className="text-right">{`${field.value.max}°`}</span>
                        </div>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={control}
                  name="month"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>월</FormLabel>

                        <FormControl>
                          <RadioGroup
                            value={field.value.toString()}
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            className="grid grid-cols-4 gap-1"
                          >
                            {[0, ...MONTH_OPTIONS].map((item) => (
                              <FormItem
                                key={item}
                                className="flex items-center gap-1 space-y-0 py-2"
                              >
                                <FormControl>
                                  <RadioGroupItem value={item.toString()} />
                                </FormControl>
                                <FormLabel>
                                  {item !== 0 ? `${item}월` : '전체'}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
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
