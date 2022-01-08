import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

import useMenuCategory from '../../hooks/useMenuCategory';
import { useHistoryQuery } from '../../redux/service';
import Grid from '../layout/SingleColumnGrid';
import HistoryBox from '../layout/Shelf';
import InlineRow from '../layout/InlineRow';

export default function History() {
  const { data: historyList = [], refetch } = useHistoryQuery();

  const { mealMap } = useMenuCategory();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
      <Grid>
        {historyList.map((item) => (
          <HistoryBox key={item.id}>
            <InlineRow flexWrap={'wrap'}>
              <Box sx={{ padding: '0 0 8px 0' }}>
                <Chip label={`${new Date(item.date).toDateString()}`}></Chip>
              </Box>
              {item.items.map((subItem) => (
                <Box key={subItem.dishId} sx={{ padding: '0 0 8px 0' }}>
                  <Chip
                    label={`${mealMap && mealMap[subItem.dishId]?.dish} x ${
                      subItem.amount
                    }`}
                  ></Chip>
                </Box>
              ))}
            </InlineRow>
          </HistoryBox>
        ))}
      </Grid>
    </Box>
  );
}
