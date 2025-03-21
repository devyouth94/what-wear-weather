import OOTDDialog from '~/src/components/outfit/ootd-dialog';
import OOTDDrawer from '~/src/components/outfit/ootd-drawer';
import { Card, CardContent } from '~/src/components/ui/card';
import useGetOutfitToday from '~/src/queries/use-get-outfit-today';

const OOTDContainer = () => {
  const { data: outfitToday, isLoading } = useGetOutfitToday();

  if (isLoading) {
    return <Card>Loading...</Card>;
  }

  return (
    <Card>
      {outfitToday === null && (
        <CardContent className="p-6">
          <OOTDDrawer />
        </CardContent>
      )}

      {outfitToday && (
        <CardContent className="relative aspect-video overflow-hidden p-0">
          <OOTDDialog outfitToday={outfitToday} />
        </CardContent>
      )}
    </Card>
  );
};

export default OOTDContainer;
