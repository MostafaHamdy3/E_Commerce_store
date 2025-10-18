import React, { memo, useCallback } from "react";
import { I18nManager, Image, Platform, Text, TouchableOpacity, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { resetInactivity, selectAuth } from "../store/authSlice";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useTheme } from "../theme/ThemeContext";
import Delete from "../assets/svgs/trash.svg";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  isDeleted?: boolean;
}

type productCardProps = {
  product: Product;
  isAllTab?: boolean;
};

const ProductCard = ({ product, isAllTab }: productCardProps) => {
  const dispatch = useDispatch();
  const { getThemeColor } = useTheme();
  const { mutate: deleteProductMutate, isPending: isDeleting } =
    useDeleteProduct();

  const { isSuperAdmin } = useSelector(selectAuth);

  const onDeleteProduct = useCallback(() => {
    if (isDeleting) return;
    dispatch(resetInactivity());
    deleteProductMutate(product.id);
  }, [isDeleting, dispatch, deleteProductMutate, product.id]);

  if (product.isDeleted) return null;

  return (
    <View className={container}>
      {isSuperAdmin && isAllTab && (
        <TouchableOpacity className={trashContainer} onPress={onDeleteProduct}>
          <Delete color={getThemeColor('error')} />
        </TouchableOpacity>
      )}
      <Image
        source={{ uri: product.thumbnail }}
        className="w-36 h-36 mb-2"
        resizeMode="cover"
      />
      <Text className={productText}>{product.title}</Text>
    </View>
  );
};

const MemoizedProductCard = memo(ProductCard);

const container = `w-[48%] bg-bgContainer rounded-lg p-4 mb-4 items-center ${Platform.OS === 'ios' ? 'shadow-sm' : 'shadow-md'}`;
const trashContainer = `absolute bg-bgScreen p-2 rounded-full ${I18nManager.isRTL ? 'self-start' : 'self-end'} mt-2 mx-3 z-10`;
const productText = "text-center text-mainColor font-enMd text-md leading-5";

MemoizedProductCard.displayName = 'ProductCard';

export default MemoizedProductCard;
