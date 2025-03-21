'use client';

import { useState } from 'react';
import Image from 'next/image';

import OOTDAlert from '~/src/components/outfit/ootd-alert';
import OOTDCard from '~/src/components/outfit/ootd-card';
import {
  Dialog,
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formatKoreanTime(
              outfitToday.created_at,
              'yyyy년 MM월 dd일 a h시 mm분',
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="relative flex grow">
          <div className="z-10">{outfitToday?.description}</div>

          <Image
            src={outfitToday.image_url}
            alt="OOTD"
            fill
            className="absolute object-cover"
          />
        </div>

        <DialogFooter>
          <OOTDAlert onDelete={handleDelete} isDeleting={isPending} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OOTDDialog;
