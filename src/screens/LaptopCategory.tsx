import React, { useCallback, useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";

import { useDispatch } from "react-redux";

import { useLaptopsQuery } from "../hooks/useCateogryProductsQuery";
import ProductCard from "../components/ProductCard";
import NoInternetConnection from "../components/NoInternetConnection";
import { resetInactivity } from "../store/authSlice";
import { saveQueryCache } from "../utils/queryPersistence";
import { useTheme } from "../theme/ThemeContext";

const LaptopCategory = () => {
  const dispatch = useDispatch();
  const { getThemeColor } = useTheme();
  const {
    data,
    isLoading,
    refetch: refetchCategory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLaptopsQuery();

  useEffect(() => {
    if (data?.pages) {
      saveQueryCache();
    }
  }, [data?.pages?.length]);

  const handleRefresh = () => {
    dispatch(resetInactivity());
    refetchCategory();
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
    () => data?.pages.flatMap((page) => page.products) || [],
    [data?.pages]
  );

  const renderItem = useCallback(
    ({ item }: { item: any }) => <ProductCard product={item} />,
    []
  );

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  if (isLoading) {
    return (
      <View className={"flex-1 justify-center items-center bg-bgScreen"}>
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
      <View className={"flex-1 bg-bgScreen p-4"}>
        <FlatList
          data={allProducts}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={isLoading && !!data}
              onRefresh={handleRefresh}
              colors={[getThemeColor('primaryColor')]}
              tintColor={getThemeColor('primaryColor')}
            />
          }
          ListHeaderComponent={<View style={{ height: 16 }} />}
          onScroll={handleScroll}
          scrollEventThrottle={200}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
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

export default LaptopCategory;
