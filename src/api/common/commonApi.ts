import instance from "../apiInstance";

export const getAllCity = async (user: any) => {
    const response = await instance.get(`/cities/getAllCities?countryId=${user?.countryId}`);

    return response;
};


export const getNearByStores = async (user: any, location: any) => {
    const response = await instance.get(`/customers/getNearByStores?latitude=${location?.coords?.latitude ? location?.coords?.latitude : ""}&longitude=${location?.coords?.longitude ? location?.coords?.longitude : ""}&distance=${150}&clientId=${user?.correlationId ? user?.correlationId : "1"}&countryCode=${user?.countryId}`);
    return response;
};

export const getStoresByCityName = async (user: any, cityName: any) => {
    const response = await instance.get(`/customers/getStoresByCityName?countryId=${user?.countryId}&cityName=${cityName}`);
    return response;
};

// export const getStoresByMerchantId = async (merchantId: number, temId: any) => {
//     const response = await instance.get(`/customers/getStoresByMerchantId?merchantId=${merchantId}&couponId=${temId}`);

//     return response;
// };