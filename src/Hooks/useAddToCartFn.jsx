import toast from 'react-hot-toast';
import { CartContext } from '../Context/CartContext';
import { useContext } from 'react';

export function useAddToCartFn() {
     let { addToCart } = useContext( CartContext );


      async function AddToCart(id) {
      let response =  await addToCart(id)
      console.log(response.data);
    
      if (response.data.status == "success") {
        toast.success(response.data.message,{
          duration:2000,
          position: 'top-center',
        })
      }
      else {
        toast.error(response.data.message)
      }
      }

  return { AddToCart };
}