import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import useMenuCategory from '../../hooks/useMenuCategory';
import { useHistoryQuery, useCleanHistoryMutation } from '../../redux/service';
import Grid from '../layout/SingleColumnGrid';
import HistoryBox from '../layout/Shelf';
import InlineRow from '../layout/InlineRow';
import Footer from '../layout/Footer';

export default function History() {
  const { data: historyList = [], refetch } = useHistoryQuery();
  const [cleanHistory] = useCleanHistoryMutation();

  const { mealMap } = useMenuCategory();

  useEffect(() => {
    refetch();
  }, []);

  const doCleanHistory = async () => {
    try {
      await cleanHistory();
      refetch();
    } catch (e) {
      //
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
      <Grid>
        {historyList.map((item) => (
          <HistoryBox key={item.id} data-testid={`HistoryBox-${item.id}`}>
            <InlineRow flexWrap={'wrap'}>
              <Box sx={{ padding: '0 0 8px 0' }}>
                <Chip
                  data-testid={`Date-${item.id}`}
                  label={`${new Date(item.date).toDateString()}`}
                ></Chip>
              </Box>
              {item.items.map((subItem) => (
                <Box key={subItem.dishId} sx={{ padding: '0 0 8px 0' }}>
                  <Chip
                    data-testid={`Dish-Info-${item.id}-${subItem.dishId}`}
                    label={`${mealMap && mealMap[subItem.dishId]?.dish} x ${
                      subItem.amount
                    }`}
                  ></Chip>
                </Box>
              ))}
            </InlineRow>
          </HistoryBox>
        ))}
        <Footer>
          <Button
            variant="contained"
            onClick={doCleanHistory}
            disabled={!historyList.length}
            data-testid="Clean-History"
          >
            {'清除記錄'}
          </Button>
        </Footer>
      </Grid>
    </Box>
  );
}
