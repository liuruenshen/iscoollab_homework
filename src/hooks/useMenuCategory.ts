import React, { useMemo } from 'react';
import { useMenuQuery } from '../redux/service';
import { Category, DishItem } from '../common.type';

interface MenuCategory {
  category: string;
  items: DishItem[];
}

type MenuCategoryMap = Record<Category, DishItem[]>;

type MealMap = Record<string, DishItem>;

export default function useMenuCategory() {
  const { data = [] } = useMenuQuery();

  const menuCategory = useMemo(() => {
    const mealMap = data.reduce((result, current) => {
      return {
        ...result,
        [current.id]: current,
      };
    }, {} as MealMap);

    const menuCategoryMap = data.reduce((result, current) => {
      return {
        ...result,
        [current.category]: [...(result[current.category] || []), current],
      };
    }, {} as MenuCategoryMap);

    const menuCategoryList = Object.entries(menuCategoryMap).map(
      ([key, value]): MenuCategory => ({ category: key, items: value })
    );

    return { menuCategoryMap, menuCategoryList, mealMap };
  }, [data]);

  return menuCategory;
}
