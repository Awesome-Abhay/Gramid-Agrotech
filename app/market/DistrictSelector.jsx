"use client"
import React, { useReducer, useEffect, useState } from 'react';
import mandiData from './assets/mandi.json';
const initialState = {
    selectedDistrict: '',
    selectedMandi: '',
    selectedProduct: '',
    districts: [],
    mandis: [],
    products: [],
    shopPrices: [],
    averagePrice: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DISTRICTS':
            return { ...state, districts: action.payload };
        case 'SET_SELECTED_DISTRICT':
            return { ...state, selectedDistrict: action.payload, selectedMandi: '', selectedProduct: '', products: [], shopPrices: [], averagePrice: null };
        case 'SET_MANDIS':
            return { ...state, mandis: action.payload };
        case 'SET_SELECTED_MANDI':
            return { ...state, selectedMandi: action.payload, selectedProduct: '', shopPrices: [], averagePrice: null };
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_SELECTED_PRODUCT':
            return { ...state, selectedProduct: action.payload };
        case 'SET_SHOP_PRICES':
            return { ...state, shopPrices: action.payload };
        case 'SET_AVERAGE_PRICE':
            return { ...state, averagePrice: action.payload };
        default:
            return state;
    }
};

const DistrictSelector = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const districtNames = mandiData.map((item) => Object.keys(item)[0]);
        dispatch({ type: 'SET_DISTRICTS', payload: districtNames });
    }, []);

    const handleDistrictChange = (event) => {
        const district = event.target.value;
        dispatch({ type: 'SET_SELECTED_DISTRICT', payload: district });

        const districtData = mandiData.find((item) => item[district]);
        if (districtData) {
            const mandiNames = Object.values(districtData[district]).map((mandi) => mandi.name);
            dispatch({ type: 'SET_MANDIS', payload: mandiNames });
        } else {
            dispatch({ type: 'SET_MANDIS', payload: [] });
        }
    };

    const handleMandiChange = (event) => {
        const mandiName = event.target.value;
        dispatch({ type: 'SET_SELECTED_MANDI', payload: mandiName });

        const districtData = mandiData.find((item) => item[state.selectedDistrict]);
        if (districtData) {
            const mandiData = Object.values(districtData[state.selectedDistrict]).find((mandi) => mandi.name === mandiName);
            if (mandiData) {
                dispatch({ type: 'SET_PRODUCTS', payload: mandiData.products });
            } else {
                dispatch({ type: 'SET_PRODUCTS', payload: [] });
            }
        }
    };

    const handleProductChange = (event) => {
        const productName = event.target.value;
        dispatch({ type: 'SET_SELECTED_PRODUCT', payload: productName });

        const districtData = mandiData.find((item) => item[state.selectedDistrict]);
        if (districtData) {
            const mandiData = Object.values(districtData[state.selectedDistrict]).find((mandi) => mandi.name === state.selectedMandi);
            if (mandiData) {
                const shopPrices = Object.entries(mandiData.shop).map(([shopKey, shop]) => ({
                    shopName: shop.name,
                    price: parseFloat(shop.products[productName]?.price),
                    contact: shop.contact,
                    img: shop.img,
                    date: shop.date
                })).filter(shop => shop.price !== undefined);
                dispatch({ type: 'SET_SHOP_PRICES', payload: shopPrices });

                const totalPrices = shopPrices.reduce((total, shop) => total + shop.price, 0);
                const avgPrice = (totalPrices / shopPrices.length).toFixed(2);
                dispatch({ type: 'SET_AVERAGE_PRICE', payload: avgPrice });
            } else {
                dispatch({ type: 'SET_SHOP_PRICES', payload: [] });
                dispatch({ type: 'SET_AVERAGE_PRICE', payload: null });
            }
        }
    };

    return (
        <div className="w-11/12 mx-auto font-sans">
            <div className="flex flex-wrap justify-between mb-5">
                <div className="flex-1 min-w-fit mx-2">
                    <h1 className="text-lg font-bold mb-2 text-gray-800">Select a District</h1>
                    <select value={state.selectedDistrict} onChange={handleDistrictChange} className="w-full p-2 text-base border border-gray-300 rounded bg-gray-100">
                        <option value="">Select a district</option>
                        {state.districts.map((district, index) => (
                            <option key={index} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-fit mx-2">
                    <h1 className="text-lg font-bold mb-2 text-gray-800">Mandis</h1>
                    <select value={state.selectedMandi} onChange={handleMandiChange} className="w-full p-2 text-base border border-gray-300 rounded bg-gray-100">
                        <option value="">Select a mandi</option>
                        {state.mandis.map((mandi, index) => (
                            <option key={index} value={mandi}>{mandi}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 min-w-fit mx-2">
                    <h1 className="text-lg font-bold mb-2 text-gray-800">Products</h1>
                    <select value={state.selectedProduct} onChange={handleProductChange} className="w-full p-2 text-base border border-gray-300 rounded bg-gray-100">
                        <option value="">Select a product</option>
                        {state.products.map((product, index) => (
                            <option key={index} value={product}>{product}</option>
                        ))}
                    </select>
                </div>
            </div>
            {state.selectedProduct && (
                <div className="mt-5 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-5 text-gray-900">Average price: {state.averagePrice}</h2>
                    <div className="flex flex-wrap justify-center gap-5">
                        {state.shopPrices.map((shop, index) => (
                            <div key={index} className="cursor-pointer flex flex-col border border-gray-200 rounded-lg shadow-md text-center overflow-hidden hover:shadow-lg">
                                <div className="w-full h-40 overflow-hidden">
                                    <img src={shop.img} alt={`${shop.shopName} image`} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4 text-left">
                                    <h3 className="text-lg font-semibold mb-2">{shop.shopName}</h3>
                                    <p className="text-sm text-gray-600">Price: <span className="text-black font-medium">{shop.price}</span> 💰 per 50Kg</p>
                                    <p className="text-sm text-gray-600">Contact: {shop.contact} ☎</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DistrictSelector;
