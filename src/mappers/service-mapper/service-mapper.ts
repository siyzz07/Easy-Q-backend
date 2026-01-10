import { ServiceResponseDTO } from "../../dto/service-dto/service-dto";

export const ServiceMapper = {
  toDTO(service: any): ServiceResponseDTO {
    return {
      id: service._id?.toString() || "",
      serviceName: service.serviceName,
      shopId: service.shopId?.toString() || "",
      duration: service.duration,
      description: service.description,
      price: service.price,
      image: service.image,
      isActive: service.isActive,
      availableStaff: service.availableStaff
    };
  },
  toDTOList(services: any[]): ServiceResponseDTO[] {
    return services.map(s => this.toDTO(s));
  }
}
