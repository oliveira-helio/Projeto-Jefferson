'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/UseAuth/useAuth";
import apiAdress from '@/utils/variables/api';
import { UserAddressType } from "@/types/UserTypes";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface Order {
  orderId: number;
  status: string;
  orderTotal: string;
  shippingStatus: string;
  installments: string;
  paymentType: string;
  createdAt: string;
  orderitems: {
    name: string;
    color: string;
    brand: string;
    price: number;
    quantity: number;
  }[],
  deliveryaddress: UserAddressType,
  shipments: Shipment[]
};

interface Shipment {
  id: number;
  trackingCode?: string;
  carrier?: string;
  estimatedDeliveryDate?: string;
  shippedAt?: string;
  deliveredAt?: string;
  // Pode incluir outros campos, como status de envio (se não estiver em orders)
  shippingStatus?: string;
}

const statusOptions = ["Aguardando pagamento", "Pagamento aprovado", "Pagamento em processo", "Em contestação", "Pagamento rejeitado", "Cancelado", "Estornado", "concluído"];
const shippingStatusOptions = ["Aguardando Envio", "Em separação", "Enviado", "Em trânsito", "Entregue", "Cancelado"];


const OrdersDashboard = () => {
  const { accessToken } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const params = useParams();
  const orderId = params?.orderId;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiAdress}/api/orders/details/${orderId}`, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          },
        });
        setOrder(response.data.order);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [accessToken, orderId]);

  useEffect(() => {
    console.log('order:', order);
  }
  , [order]);
    



  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Carregando...</div>;

  if (!order) return;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Gestão de Pedidos e Envios</h1>
        <button
          onClick={() => router.push('/dashboard/pedidos')}
          className="bg-pink-500 hover:bg-pink-600 transition text-white p-2 rounded mb-2"
        >
          Voltar
        </button>
      </div>
      <div className="border border-gray-200 rounded-lg shadow-md p-6 mb-6 bg-pink-100 text-slate-800">
        {/* Cabeçalho do Pedido */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Pedido #{order.orderId}</h2>
            <p className="text-slate-800">Total: R$ {order.orderTotal}</p>
            <p className="text-slate-800">
              Status do Pedido: <span className="font-medium">{
                (order.shipments[0].shippingStatus === "delivered" ? "Concluído" :
                  (order.status === "pending" ? "Aguardando pagamento" :
                    (order.status === "approved" ? "Pagamento aprovado" :
                      (order.status === "in_process" ? "Pagamento em processo" :
                        (order.status === "charged_back" || order.status === "in_mediation" ? "Em contestação" :
                          (order.status === "rejected" ? "Pagamento rejeitado" :
                            (order.status === "cancelled" ? "Cancelado" :
                              (order.status === "refunded" ? "Estornado" :
                                (order.status === "expired" ? "Expirado" :
                                  order.status
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              }
              </span>
            </p>
            <p className="text-slate-800">Status de Envio: <span className="font-medium">{
              (order.shippingStatus === "created" ? "Etiqueta criada" :
                (order.shippingStatus === "pending" ? "Aguardando envio" :
                  (order.shippingStatus === "released" ? "Liberado para envio" :
                    (order.shippingStatus === "generated" ? "Etiqueta gerada" :
                      (order.shippingStatus === "received" ? "Liberado para retirada" :
                        (order.shippingStatus === "posted" ? "Enviado" :
                          (order.shippingStatus === "delivered" ? "Entregue" :
                            (order.shippingStatus === "cancelled" ? "Cancelado" :
                              (order.shippingStatus === "undelivered" ? "Falha na entrega" :
                                (order.shippingStatus === "returned" ? "Estornado" :
                                  (order.shippingStatus === "paused" ? "Envio pausado" :
                                    (order.shippingStatus === "suspended" ? "Envio suspenso" :
                                      order.shippingStatus
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )}</span>
            </p>
            <p className="text-slate-800">Data do Pedido: <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Endereço de Entrega</h2>
            <p className="text-slate-800"> {order.deliveryaddress.street}, {order.deliveryaddress.number} </p>
            <p className="text-slate-800"> Cep: {order.deliveryaddress.cep} - {order.deliveryaddress.neighborhood}</p>
            {order.deliveryaddress.complement !== "" ?
              <p className="text-slate-800"> Complemento: {order.deliveryaddress.complement}</p>
              : null
            }
            <p className="text-slate-800"> Cep: {order.deliveryaddress.city} - {order.deliveryaddress.state}</p>
          </div>
        </div>

        {/* Itens do Pedido */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Itens do Pedido:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order.orderitems.map((item, index) => (
              <div key={index} className="p-3 border border-gray-100 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-slate-800 text-sm">Marca: {item.brand}</p>
                <p className="text-slate-800 text-sm">Cor: {item.color}</p>
                <p className="text-slate-800 text-sm">Quantidade: {item.quantity}</p>
                <p className="text-slate-800 text-sm">Preço: R$ {item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Se houver informações de envio */}
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Informações de Envio:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {order.shipments.map((shipment, index) => (

            <div key={index} className="mt-4">
              <h3 className="text-lg font-semibold text-slate-800">Volume {index + 1}:</h3>
              {shipment.id && (
                <div className="border-t pt-4 mb-2">
                  <p className="text-slate-800">Transportadora: {shipment.carrier || "-"}</p>
                  <p className="text-slate-800">Código de Rastreamento: {shipment.trackingCode || "-"}</p>
                  <p className="text-slate-800">Data prevista para entrega: {shipment.estimatedDeliveryDate ? new Date(shipment.estimatedDeliveryDate).toLocaleDateString() : "-"}</p>
                  <p className="text-slate-800">Data de Envio: {shipment.shippedAt ? new Date(shipment.shippedAt).toLocaleString() : "-"}</p>
                  <p className="text-slate-800">Data de Entrega: {shipment.deliveredAt ? new Date(shipment.deliveredAt).toLocaleString() : "-"}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersDashboard;
