import React, { useCallback, useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";

import { useDispatch } from "react-redux";

import { useProductsQuery } from "../hooks/useProductsQuery";
import ProductCard from "../components/ProductCard";
import { checkInternetConnection } from "../services/connection";
import NoInternetConnection from "../components/NoInternetConnection";
import { resetInactivity } from "../store/authSlice";
import { saveQueryCache } from "../utils/queryPersistence";
import { useTheme } from "../theme/ThemeContext";

const Products = () => {
  const dispatch = useDispatch();
  const { getThemeColor } = useTheme();
  const {
    data: productsData,
    isLoading: productsLoading,
    refetch: refetchProducts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductsQuery();

  useEffect(() => {
    checkInternetConnection();
  }, []);

  useEffect(() => {
    if (productsData?.pages) {
      saveQueryCache();
    }
  }, [productsData?.pages?.length]);

  const handleRefresh = () => {
    dispatch(resetInactivity());
    refetchProducts();
  };

  const handleScroll = useCallback(() => {
    dispatch(resetInactivity());
  }, [dispatch]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allProducts = useMemo(
    () => productsData?.pages.flatMap((page) => page.products.filter((p) => !p.isDeleted)) || [],
    [productsData?.pages]
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => <ProductCard product={item} isAllTab={true} />,
    []
  );

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  if (productsLoading) {
    return (
      <View className={indicatorContainer}>
        <ActivityIndicator
          size="large"
          color={getThemeColor('primaryColor')}
        />
      </View>
    );
  }

  return (
    <>
      <NoInternetConnection />
      <View className={productContainer}>
        <FlatList
          data={allProducts}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={productsLoading && !!productsData}
              onRefresh={handleRefresh}
              colors={[getThemeColor('primaryColor')]}
              tintColor={getThemeColor('primaryColor')}
            />
          }
          onScroll={handleScroll}
          scrollEventThrottle={200}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View style={{ height: 16 }} />}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          maxToRenderPerBatch={30}
          initialNumToRender={10}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                size="small"
                color={getThemeColor('primaryColor')}
                style={{ marginVertical: 16 }}
              />
            ) : null
          }
        />
      </View>
    </>
  );
};

export const productContainer = "flex-1 bg-bgScreen p-4";
export const indicatorContainer = "flex-1 justify-center items-center bg-bgScreen";

export default Products;
