// import { VENDOR_DETAILS } from "../../actions/vendorActions";
import { VendorDto } from "../../dto/vendor-dto/vendor-dto";
import { IVendor } from "../../types/vendorType";

export const VendorMapper = {
    toDTO(vendor: any): VendorDto {
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
            images: vendor.images?.map((i:any) =>  i) || [], 
            workingDays: vendor.workingDays || [],
            state:vendor.state,
            rating:vendor.rating,
            proofImage:vendor.proofImage
        }
    },
    toDTOList(vendors: any[]): VendorDto[] {
        return vendors.map(v => this.toDTO(v));
    }
}
