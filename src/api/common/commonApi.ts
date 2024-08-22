import instance from "../apiInstance";

export const getAllCity = async (user: any) => {
    const response = await instance.get(`/cities/getAllCities?countryId=${user?.countryId}`);
 
    return response.data;
};




export const getNearByStores = async (user: any, location: any) => {

};


export const getStoresByMerchantId = async (merchantId: number, temId: any) => {
    const response = await instance.get(`/customers/getStoresByMerchantId?merchantId=${merchantId}&couponId=${temId}`);

    return response;
};