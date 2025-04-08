import OOTDDialog from '~/src/components/outfit/ootd-dialog';
import OOTDDrawer from '~/src/components/outfit/ootd-drawer';
import { Card, CardContent } from '~/src/components/ui/card';
import useGetOutfitToday from '~/src/queries/use-get-outfit-today';

const OOTDContainer = () => {
  const { data: outfitToday } = useGetOutfitToday();

  return (
    <Card className="aspect-[4/3] w-full">
      {outfitToday === null && (
        <CardContent className="flex h-full items-center justify-center">
          <OOTDDrawer />
        </CardContent>
      )}

      {outfitToday && (
        <CardContent className="relative h-full">
          <OOTDDialog outfitToday={outfitToday} />
        </CardContent>
      )}
    </Card>
  );
};

export default OOTDContainer;
