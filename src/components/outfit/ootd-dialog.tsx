'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPinIcon } from 'lucide-react';

import OOTDAlert from '~/src/components/outfit/ootd-alert';
import OOTDCard from '~/src/components/outfit/ootd-card';
import { Button } from '~/src/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/src/components/ui/dialog';
import useDeleteOutfitToday from '~/src/queries/use-delete-outfit-today';
import { type GetOutfitTodayResponse } from '~/src/queries/use-get-outfit-today';
import { formatKoreanTime } from '~/src/utils/date';

type Props = {
  outfitToday: NonNullable<GetOutfitTodayResponse>;
};

const OOTDDialog = ({ outfitToday }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteOutfitToday, isPending } = useDeleteOutfitToday();

  const handleDelete = () => {
    deleteOutfitToday(undefined, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <OOTDCard outfitToday={outfitToday} />
      </DialogTrigger>

      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="hidden">
          <DialogTitle>
            {formatKoreanTime(outfitToday.created_at, 'yyyy년 M월 d일')}의 옷
          </DialogTitle>
        </DialogHeader>

        <div className="grid grow grid-cols-1 grid-rows-[auto_120px]">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 z-10 flex items-end justify-between rounded-lg bg-gradient-to-b from-transparent from-70% to-primary/80 p-3 text-muted">
              <p className="flex flex-col items-start">
                <span className="text-4xl font-bold">{`${outfitToday.temp}°`}</span>
                <span className="text-xs">{`최저 ${outfitToday.temp_min}° / 최고 ${outfitToday.temp_max}°`}</span>
              </p>
              <p className="flex flex-col items-end text-xs">
                <span>
                  {formatKoreanTime(outfitToday.created_at, 'yyyy년 M월 d일')}
                </span>
                <span>
                  {formatKoreanTime(outfitToday.created_at, 'a h:mm')}
                </span>
              </p>
            </div>

            <Image
              src={outfitToday.image_url}
              sizes="1080px"
              alt="OOTD"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-1 p-3">
            <p className="flex items-center justify-end gap-0.5">
              <MapPinIcon size={14} />
              <span className="text-xs font-medium">
                {outfitToday.location}
              </span>
            </p>
            <span className="inline-block overflow-scroll break-words">
              {outfitToday.description}
            </span>
          </div>
        </div>

        <DialogFooter className="justify-end p-4 pt-0">
          <DialogClose asChild>
            <Button variant="outline" className="w-fit">
              닫기
            </Button>
          </DialogClose>
          <OOTDAlert onDelete={handleDelete} isDeleting={isPending} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OOTDDialog;
