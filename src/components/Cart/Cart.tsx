import React from 'react';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { allOrderSelector } from '../../redux/selector';
import { RootState } from '../../redux/store';
import { OrderItem } from '../../common.type';
import useMenuCategory from '../../hooks/useMenuCategory';
import { changeMealAmount, removeMeal, removeOrder } from '../../redux/slice';
import { useOrderMutation } from '../../redux/service';
import Grid from '../layout/SingleColumnGrid';
import MealOrderBox from '../layout/Shelf';

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

  const navigate = useNavigate();

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
      navigate('/history');
    } catch (e) {
      //
    }
  };

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
      <Grid>
        {orderList.map((item) => (
          <MealOrderBox
            key={item.dishId}
            data-testid={`MealOrderBox-${item.dishId}`}
          >
            <Box
              data-testid={`MealName-${item.dishId}`}
              sx={{ width: '100px' }}
            >
              {mealMap[item.dishId].dish}
            </Box>
            <TextField
              type="number"
              value={item.amount}
              data-testid={`TextField-${item.dishId}`}
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
            data-testid="Submit-Order"
          >
            {'提交訂單'}
          </Button>
        </Footer>
      </Grid>
    </Box>
  );
}
