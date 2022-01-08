import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/AddBoxRounded';
import ListItemIcon from '@mui/material/ListItemIcon';

import { RootState } from '../../redux/store';
import { mealAdded } from '../../redux/slice';
import { OrderItem } from '../../common.type';
import { orderMapSelector, OrderMap } from '../../redux/selector';
import useMenuCategory from '../../hooks/useMenuCategory';

export default function Menu() {
  const dispatch = useDispatch();
  const orderMap = useSelector<RootState, OrderMap>((state) =>
    orderMapSelector(state)
  );

  const { menuCategoryList } = useMenuCategory();

  const addOrder = (dishId: OrderItem['dishId']) => {
    dispatch(
      mealAdded({
        dishId,
        amount: 1,
      })
    );
  };

  return (
    <Box
      sx={{
        width: 200,
        backgroundColor: (theme) => theme.extendBackground?.light,
      }}
    >
      <List
        component="nav"
        sx={{ backgroundColor: (theme) => theme.extendBackground?.light }}
      >
        {menuCategoryList.map((item) => (
          <React.Fragment key={item.category}>
            <ListItemText sx={{ padding: '4px 0 4px 10px' }}>
              {item.category}
            </ListItemText>
            <Collapse in={true} timeout="auto">
              <List component="div" disablePadding>
                {item.items.map((subItem) => (
                  <ListItemButton
                    key={subItem.dish}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      addOrder(subItem.id);
                    }}
                    disabled={!!orderMap[subItem.id]}
                    data-testid={subItem.id}
                  >
                    <ListItemIcon>
                      <AddIcon></AddIcon>
                    </ListItemIcon>
                    {subItem.dish}
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
