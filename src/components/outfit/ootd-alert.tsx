'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/src/components/ui/alert-dialog';
import { Button } from '~/src/components/ui/button';

type Props = {
  onDelete: () => void;
  isDeleting: boolean;
};

const OOTDAlert = ({ onDelete, isDeleting }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button loading={isDeleting} className="w-fit">
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="hidden">삭제</AlertDialogTitle>
          <AlertDialogDescription>
            저장한 옷을 삭제할까요?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OOTDAlert;
