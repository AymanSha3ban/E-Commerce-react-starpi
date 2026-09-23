import type { IProduct } from '@/interfaces/IProduct';
import {create } from 'zustand' ;
import { persist } from "zustand/middleware";
export type orderType= {
    product : IProduct ,
    quantity : number,
}
interface ICartState {
    orders : orderType[],
    addOrder: (order: orderType)=>void,
    increaseQuantity : (order: orderType)=>void,
    decreaseQuantity : (order: orderType)=>void,
    removeOrder : (order: orderType)=>void,
} 
export const useCartState = create<ICartState>()(
    persist(
        (set)=>({
            orders: [] ,
            addOrder:(order)=>{
                set(state => {
                    const OrderInCart= state.orders.find(item =>item.product.documentId === order.product.documentId) ;
                    if(OrderInCart){
                        const OrderWithQuantity = state.orders.map((item : orderType)=>{
                            if(item.product.documentId===order.product.documentId)
                                return { ...item, quantity: item.quantity+order.quantity }
                            else return item 
                        })
                        return {
                            orders : OrderWithQuantity
                        } 
                    }
                    else{
                        return {orders : [...state.orders , order]}
                    }
                })
            },
            increaseQuantity:(order)=>{
                set(state => {
                    const OrderPlusQuantity = state.orders.map((item : orderType)=>{
                        if(item.product.documentId===order.product.documentId)
                            return { ...item, quantity: item.quantity+1}
                         else return item 
                        })
                    return {
                        orders : OrderPlusQuantity
                    } 
                })
            } ,
            decreaseQuantity:(order)=>{
                set(state => {
                    const OrderMinusQuantity = state.orders.map((item : orderType)=>{
                        if(item.product.documentId===order.product.documentId){
                            const nQuantity = (item.quantity>1)? item.quantity -1 : 0
                            return { ...item, quantity: nQuantity}
                        }
                        else return item 
                    })
                    return {
                        orders : OrderMinusQuantity
                    } 
                })
            },
            removeOrder : (order)=>{
                set((state)=>{
                    const filterdOrders = state.orders.filter((item)=>item.product.documentId !== order.product.documentId)
                    return {
                        orders : filterdOrders 
                    }
                })
            },
        }),
        {
            name: "CartSate"
        }
    )
)