"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavoriteShopsResMapper = exports.getFavoriteResMapper = exports.getFavoriteReqMapper = exports.favoriteUpdataReqMapper = void 0;
exports.favoriteUpdataReqMapper = {
    toDto(data) {
        return {
            customerId: data.userId,
            shopId: data.shopId,
            action: data.action
        };
    }
};
exports.getFavoriteReqMapper = {
    toDto(data) {
        return {
            customerId: data.userId
        };
    }
};
exports.getFavoriteResMapper = {
    toDto(data) {
        return {
            _id: data._id,
            vendors: data.vendors
        };
    }
};
exports.getFavoriteShopsResMapper = {
    toDto(data) {
        return data.vendors.map((v) => ({
            _id: v._id.toString(),
            shopName: v.shopName,
            email: v.email,
            phone: v.phone,
            ProfileImage: v.ProfileImage,
            city: v.city,
            openAt: v.openAt,
            closeAt: v.closeAt,
            isActive: v.isActive,
            isVerified: v.isVerified,
            cordinates: v.cordinates,
            hasShop: v.hasShop,
            images: v.images
        }));
    }
};
