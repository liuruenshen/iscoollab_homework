import React from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { allOrderSelector } from '../../redux/selector';
import { RootState } from '../../redux/store';
import { OrderItem } from '../../common.type';
import useMenuCategory from '../../hooks/useMenuCategory';
import { changeMealAmount, removeMeal, removeOrder } from '../../redux/slice';
import { useOrderMutation } from '../../redux/service';

const Grid = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '10px',
  padding: '20px',
  boxSizing: 'border-box',
}));

const MealOrderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  backgroundColor: theme.extendBackground.light,
  borderRadius: '4px',
  padding: '10px',
  margin: '20px 0 0 0 ',
}));

const Footer = styled(Box)(() => ({
  padding: '10px',
  margin: '20px 0 0 0 ',
  display: 'flex',
  justifyContent: 'flex-end',
}));

export default function Cart() {
  const orderList = useSelector<RootState, OrderItem[]>((state) =>
    allOrderSelector(state)
  );
  const dispatch = useDispatch();

  const { mealMap } = useMenuCategory();

  const [updateOrder] = useOrderMutation();

  const updateMealAmount = (data: OrderItem) => {
    if (data.amount < 1) {
      dispatch(removeMeal(data.dishId));
    } else {
      dispatch(changeMealAmount({ id: data.dishId, changes: data }));
    }
  };

  const submitOrder = async () => {
    try {
      await updateOrder({ items: orderList });
      dispatch(removeOrder());
    } catch (e) {
      //
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid>
        {orderList.map((item) => (
          <MealOrderBox key={item.dishId}>
            <Box sx={{ width: '100px' }}>{mealMap[item.dishId].dish}</Box>
            <TextField
              type="number"
              value={item.amount}
              onChange={(event) => {
                updateMealAmount({
                  dishId: item.dishId,
                  amount: Number(event.target.value),
                });
              }}
            ></TextField>
          </MealOrderBox>
        ))}
        <Footer>
          <Button
            variant="contained"
            onClick={submitOrder}
            disabled={!orderList.length}
          >
            {'提交訂單'}
          </Button>
        </Footer>
      </Grid>
    </Box>
  );
}
