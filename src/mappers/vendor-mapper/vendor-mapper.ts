// import { VENDOR_DETAILS } from "../../actions/vendorActions";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";
import { IVendor, IImage } from "../../types/vendorType";

export const VendorMapper = {
    toDTO(vendor: IVendor): VendorDto {
        return {
            _id: vendor._id?.toString() || "",
            shopName: vendor.shopName || "",
            email: vendor.email || "",
            phone: vendor.phone || "",
            ProfileImage: vendor.ProfileImage || "",
            city: vendor.city || "",
            openAt: vendor.openAt || "",
            closeAt: vendor.closeAt || "",
            isActive: vendor.isActive || false,
            isVerified: vendor.isVerified || "pending",
            location: vendor.location || undefined,
            hasShop: vendor.hasShop || false,
            images: vendor.images?.map((i: IImage) =>  i) || [], 
            workingDays: vendor.workingDays || [],
            state: vendor.state || "",
            rating: vendor.rating || 0,
            proofImage: vendor.proofImage || ""
        }
    },
    toDTOList(vendors: IVendor[]): VendorDto[] {
        return vendors.map(v => this.toDTO(v));
    }
}
