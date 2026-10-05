import type { IProduct } from '@/interfaces/IProduct';
import {create } from 'zustand' ;
import { persist } from "zustand/middleware";
export type orderType= {
    product : IProduct ,
    quantity : number,
}
interface ICartState {
    carts: Record<string, orderType[]>;
    activeCartId: string;
    orders : orderType[],
    switchUser: (userId: string | null) => void,
    addOrder: (order: orderType)=>void,
    increaseQuantity : (order: orderType)=>void,
    decreaseQuantity : (order: orderType)=>void,
    outOfStock : () => boolean,
    removeOrder : (order: orderType)=>void,
    removeAllOrder : ()=>void,
} 
export const useCartState = create<ICartState>()(
    persist(
        (set , get)=>({
            carts: {},
            activeCartId: "guest",
            orders: [] ,
            switchUser: (userId) => {
                const newCartId = userId || "guest";
                set((state) => {
                    const updatedCarts = { ...state.carts };
                    updatedCarts[state.activeCartId] = state.orders;
                    if (!userId) {
                        updatedCarts["guest"] = [];
                    }
                    const newOrders = updatedCarts[newCartId] || [];
                    return {
                        carts: updatedCarts,
                        activeCartId: newCartId,
                        orders: newOrders
                    };
                });
            },
            addOrder:(order)=>{
                set(state => {
                    let newOrders;
                    const OrderInCart= state.orders.find(item =>item.product.documentId === order.product.documentId) ;
                    if(OrderInCart){
                        newOrders = state.orders.map((item : orderType)=>{
                            if(item.product.documentId===order.product.documentId)
                                return { ...item, quantity: item.quantity+order.quantity }
                            else return item 
                        })
                    }
                    else{
                        newOrders = [...state.orders , order]
                    }
                    return {
                        orders : newOrders,
                        carts: { ...state.carts, [state.activeCartId]: newOrders }
                    }
                })
            },
            increaseQuantity:(order)=>{
                set(state => {
                    const newOrders = state.orders.map((item : orderType)=>{
                        if(item.product.documentId===order.product.documentId)
                            return { ...item, quantity: item.quantity+1}
                         else return item 
                        })
                    return {
                        orders : newOrders,
                        carts: { ...state.carts, [state.activeCartId]: newOrders }
                    } 
                })
            } ,
            decreaseQuantity:(order)=>{
                set(state => {
                    const newOrders = state.orders.map((item : orderType)=>{
                        if(item.product.documentId===order.product.documentId){
                            const nQuantity = (item.quantity>1)? item.quantity -1 : 0
                            return { ...item, quantity: nQuantity}
                        }
                        else return item 
                    })
                    return {
                        orders : newOrders,
                        carts: { ...state.carts, [state.activeCartId]: newOrders }
                    } 
                })
            },
            outOfStock : () => get().orders.some(item => item.quantity >= item.product?.stock),
            removeOrder : (order)=>{
                set((state)=>{
                    const newOrders = state.orders.filter((item)=>item.product.documentId !== order.product.documentId)
                    return {
                        orders : newOrders,
                        carts: { ...state.carts, [state.activeCartId]: newOrders }
                    }
                })
            },
            removeAllOrder : ()=>{
                set((state) => ({
                    orders : [],
                    carts: { ...state.carts, [state.activeCartId]: [] }
                }))
            },
        }),
        {
            name: "CartSate"
        }
    )
)