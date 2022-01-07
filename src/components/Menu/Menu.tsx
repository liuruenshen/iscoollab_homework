import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/AddBoxRounded';
import ListItemIcon from '@mui/material/ListItemIcon';

import { useMenuQuery } from '../../redux/service';
import { RootState } from '../../redux/store';
import { orderAdded } from '../../redux/slice';
import { Category, DishItem, OrderItem } from '../../common.type';
import { orderMapSelector, OrderMap } from '../../redux/selector';

interface MenuCategory {
  category: string;
  items: DishItem[];
}

type MenuCategoryMap = Record<Category, DishItem[]>;

export default function Menu() {
  const dispatch = useDispatch();
  const orderMap = useSelector<RootState, OrderMap>((state) =>
    orderMapSelector(state)
  );

  const { data = [] } = useMenuQuery();

  const menuCategory: MenuCategory[] = useMemo(() => {
    const dataMap = data.reduce((result, current) => {
      return {
        ...result,
        [current.category]: [...(result[current.category] || []), current],
      };
    }, {} as MenuCategoryMap);

    return Object.entries(dataMap).map(
      ([key, value]): MenuCategory => ({ category: key, items: value })
    );
  }, [data]);

  const addOrder = (dishId: OrderItem['dishId']) => {
    dispatch(
      orderAdded({
        dishId,
        amount: 1,
      })
    );
  };

  return (
    <Box
      sx={{
        width: 200,
        backgroundColor: (theme) => theme.extendBackground.light,
      }}
    >
      <List
        component="nav"
        sx={{ backgroundColor: (theme) => theme.extendBackground.light }}
      >
        {menuCategory.map((item) => (
          <>
            <ListItemText
              key={item.category}
              sx={{ padding: '4px 0 4px 10px' }}
            >
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
                  >
                    <ListItemIcon>
                      <AddIcon></AddIcon>
                    </ListItemIcon>
                    {subItem.dish}
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
    </Box>
  );
}
