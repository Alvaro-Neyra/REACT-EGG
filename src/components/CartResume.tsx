import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function CartResume({ total }) {

    const [carrito, setCarrito] = useState(() => {
      const datosGuardados = localStorage.getItem('carrito');
      return datosGuardados ? JSON.parse(datosGuardados) : [];
    });

    useEffect(() => { 
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const borrarCarrito = () => {
      setCarrito([]);
    };

    const handleClick = () => {
        Swal.fire({
            title: "Deseas finalizar la compra?",
            text: "Se compraran todos los productos visibles en el carrito.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si comprar!",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Productos comprados!!",
                text: "Todos los productos han sido comprados exitosamente.",
                icon: "success"
              }).then((result) => {
                if (result.isConfirmed) {
                  // localStorage.removeItem("cart");
                  // window.location.reload();
                  borrarCarrito();
                }
              });
            }
          });
    };

    return (
        <div className="w-[340px] h-[220px] flex flex-col justify-between rounded-md p-[30px] m-[10px] bg-[#f2f2f2]">
            <div className="flex-grow flex flex-col justify-between">
                <h2 className="flex justify-between text-[20px] font-bold">
                    <span>Resumen</span>
                    <span>del</span>
                    <span>pedido</span>
                </h2>
                <div className="flex justify-between items-center">
                    <h3>Total</h3>
                    <strong>${ total }</strong>
                </div>
                <small className="pb-[10px]">
                    Incluye impuesto PAIS y percepción AFIP.
                </small>
            </div>
            <button
                className="w-full h-[40px] bg-[#ff3b3c] text-white font-bold border-0 rounded-md"
                id="buy"
                type="button"
                onClick={handleClick}
            >
                COMPRAR
            </button>
        </div>
    );
}