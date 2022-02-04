import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocationConditions, fetchShop } from '../actions';

import PerfectScrollbar from 'react-perfect-scrollbar';
import ScrollContainer from './ScrollContainer';
import Header from './Header';
import ShopContent from './ShopContent/ShopContent';
import ShopInfo from './ShopContent/ShopInfo';
import Menu from 'features/shop/menu/components/Menu';

function Shop() {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const shopData = useSelector((state) => state.shop.shop);
  const menuData = useSelector((state) => state.shop.menu);
  const coords = useSelector((state) => state.frame.location.coords);

  useEffect(() => {
    if (router.isReady && shopData && menuData) {
      const name = shopData.name.replaceAll(' ', '-');
      router.push(`${slug[0]}/${name}`, undefined, { shallow: true });
      // setData({ shopData, menuData });
    }
  }, [router.isReady, shopData, menuData]);

  useEffect(() => {
    if (coords) {
      dispatch(fetchLocationConditions({ id: shopData.id, coords }));
    }
  }, [coords, shopData, dispatch]);

  // if (!router.isReady) {
  //   return null;
  // }

  return (
    <PerfectScrollbar options={{ swipeEasing: false }}>
      <ScrollContainer>
        {shopData && menuData ? (
          <React.Fragment>
            <Header shop={shopData} />
            <ShopContent>
              <ShopInfo shop={shopData} />
              <Menu menu={menuData} />
            </ShopContent>
          </React.Fragment>
        ) : null}
      </ScrollContainer>
    </PerfectScrollbar>
  );
}

export default Shop;
