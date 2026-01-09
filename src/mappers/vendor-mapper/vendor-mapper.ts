// import { VENDOR_DETAILS } from "../../actions/vendorActions";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";
import { IVendor } from "../../types/vendorType";

export const VendorMapper = {
    toDTO(vendor: any): VendorDto {
        return {
            _id: vendor._id?.toString() || "",
            shopName: vendor.shopName,
            email: vendor.email,
            phone: vendor.phone,
            ProfileImage: vendor.ProfileImage,
            city: vendor.city,
            openAt: vendor.openAt,
            closeAt: vendor.closeAt,
            isActive: vendor.isActive,
            isVerified: vendor.isVerified,
            cordinates: vendor.cordinates,
            hasShop: vendor.hasShop,
            images: vendor.images?.map((i:any) => i.url || i) || [] 
        }
    },
    toDTOList(vendors: any[]): VendorDto[] {
        return vendors.map(v => this.toDTO(v));
    }
}
