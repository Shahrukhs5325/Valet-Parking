import instance from "../apiInstance";

export const getAllMerchants = async (user: any) => {
    const response = await instance.get(`/customers/categories/getAllMerchants?clientId=${user?.correlationId ? user?.correlationId : 0}&countryCode=${user?.countryId}`);

    return response;
};




export const getNearByStores = async (user: any, location: any) => {

};


export const getStoresByMerchantId = async (merchantId: number, temId: any) => {
    const response = await instance.get(`/customers/getStoresByMerchantId?merchantId=${merchantId}&couponId=${temId}`);

    return response;
};