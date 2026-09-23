import { useCartState, type orderType } from "@/Store/CartStore"


export default function CartPage() {
    const orders = useCartState(state=>state.orders);
    const increase = useCartState(state=>state.increaseQuantity);
    const decrease = useCartState(state=>state.decreaseQuantity);

    const increaseHandler =(order : orderType)=>{
        increase(order)
    }
    const decreaseHandler =(order : orderType)=>{
        decrease(order)
    }
  return (
    <div>
        {
            orders.map(order=>
                <div>
                    <h1>product: {order.product.title}</h1> 
                    <div 
                        className="flex justify-between p-5"
                    >
                        <p>quantity: {order.quantity}</p>
                        <div className="flex gap-3">
                            <button 
                                className="size-[30px] bg-purple-500 rounded-2xl"
                                onClick={()=>decreaseHandler(order)}
                            >-</button>

                            <button 
                                className="size-[30px] bg-yellow-500 rounded-2xl"
                                onClick={()=>increaseHandler(order)}
                            >+</button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}
