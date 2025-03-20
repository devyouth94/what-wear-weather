import OOTDDrawer from '~/src/components/outfit/ootd-drawer';
import { Card, CardContent } from '~/src/components/ui/card';

const OOTDContainer = () => {
  return (
    <Card>
      <CardContent className="p-0">
        <OOTDDrawer />
      </CardContent>
    </Card>
  );
};

export default OOTDContainer;
