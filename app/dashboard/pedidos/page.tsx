'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/Contexts/AuthContext";
import apiAdress from "@/utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Order {
  orderId: number;
  status: string;
  orderTotal: string;
  shippingStatus: string;
  installments: string;
  paymentType: string;
  shipments: Shipments[];
}

interface Shipments {
  id: number;
  trackingCode?: string;
  carrier?: string;
}

const statusOptions = ["Cancelado", "Concluído"];
const shippingStatusOptions = ["Em separação", "Cancelado", "Entregue"];

const OrdersDashboard = () => {
  const { accessToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [editedOrders, setEditedOrders] = useState<Record<number, Partial<Order>>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiAdress}/api/orders/all`, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          },
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();    
  }, [accessToken]);

  const handleEdit = (orderId: number) => {
    setEditingOrderId(orderId);
    setEditedOrders((prev) => ({ ...prev, [orderId]: {} }));
  };

  const handleChange = (orderId: number, field: keyof Order, value: any) => {
    setEditedOrders((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  const handleSave = async (orderId: number) => {
    try {
      await axios.put(`${apiAdress}/api/orders/update-order`, {
        orderId,
        orderData: editedOrders[orderId],
      }, {
        headers: {
          "Content-Type": "application/json",
          accessToken: `Bearer ${accessToken}`,
        },
      });
      setOrders((prevOrders) => prevOrders.map(order =>
        order.orderId === orderId ? { ...order, ...editedOrders[orderId] } : order
      ));
      setEditingOrderId(null);
    } catch (error) {
      toast.error("Erro ao atualizar pedido")
      console.error("Erro ao atualizar pedido:", error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Carregando...</div>;

  return (
    <div className="w-full text-center">
      <div className="grid grid-cols-8 bg-pink-400 font-semibold p-2">
        <div>Pedido</div>
        <div>Total</div>
        <div>Status</div>
        <div>Status de Envio</div>
        <div>Forma de Envio</div>
        <div>Código de Rastreio</div>
        <div>Ações</div>
        <div>Detalhes</div>
      </div>
      {orders.map((order) => (
        <div key={order.orderId} className="grid grid-cols-8 bg-pink-200 p-2 border-0 border-b border-pink-300 border-solid items-center">
          <div>{order.orderId}</div>
          <div>R$ {order.orderTotal}</div>
          <div>
            {editingOrderId === order.orderId ? (
              <select
                value={editedOrders[order.orderId]?.status || order.status}
                onChange={(e) => handleChange(order.orderId, "status", e.target.value)}
              >
                {
                  (order.status === "pending" ? <option>Aguardando pagamento</option> :
                    (order.status === "approved" ? <option>Pagamento aprovado</option> :
                      (order.status === "inprocess" ? <option>Pagamento em processo</option> :
                        (order.status === "inmediation" ? <option>Em contestação</option> :
                          (order.status === "rejected" ? <option>Pagamento rejeitado</option> :
                            (order.status === "refunded" || order.status === "chargedback" && <option>Estornado</option>)
                          )
                        )
                      )
                    )
                  )
                }
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            ) : (
              (order.shippingStatus === "delivered" ? "Concluído" :
                (order.status === "pending" ? "Aguardando pagamento" :
                  (order.status === "approved" ? "Pagamento aprovado" :
                    (order.status === "inprocess" ? "Pagamento em processo" :
                      (order.status === "inmediation" ? "Em contestação" :
                        (order.status === "rejected" ? "Pagamento rejeitado" :
                          (order.status === "cancelled" ? "Cancelado" :
                            (order.status === "refunded" || order.status === "chargedback" ? "Estornado" :
                              order.status
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )}
          </div>
          <div>
            {editingOrderId === order.orderId ? (
              <select
                value={editedOrders[order.orderId]?.shippingStatus || order.shippingStatus}
                onChange={(e) => handleChange(order.orderId, "shippingStatus", e.target.value)}
              >
                {
                  (order.shippingStatus === "pending" ? <option>Aguardando envio</option> :
                    (order.shippingStatus === "posted" ? <option>Enviado</option> :
                      (order.shippingStatus === "in_transit" ? <option>Em trânsito</option> :
                        (order.shippingStatus === "returned" && <option>Estornado</option>)
                      )
                    )
                  )
                }
                {shippingStatusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            ) : (
              (order.shippingStatus === "pending" ? "Aguardando envio" :
                (order.shippingStatus === "posted" ? "Enviado" :
                  (order.shippingStatus === "in_transit" ? "Em trânsito" :
                    (order.shippingStatus === "delivered" ? "Entregue" :
                      (order.shippingStatus === "canceled" ? "Cancelado" :
                        (order.shippingStatus === "returned" ? "Estornado" :
                          order.shippingStatus
                        )
                      )
                    )
                  )
                )
              )
            )}
          </div>
          <div>{order?.shipments[0]?.carrier || "-"}</div>
          <div>
            {order.shipments.map((shipment, index) => (
              <div key={index}>
                {editingOrderId === order.orderId ? (
                  <input
                    type="text"
                    value={editedOrders[order.orderId]?.shipments?.[index]?.trackingCode || shipment.trackingCode || ""}
                    onChange={(e) => {
                      const updatedShipments = [...order.shipments];
                      updatedShipments[index] = {
                        ...shipment,
                        trackingCode: e.target.value,
                      };
                      handleChange(order.orderId, "shipments", updatedShipments);
                    }}
                  />
                ) : (
                  shipment.trackingCode || "-"
                )}
              </div>
            ))}
          </div>
          <div>
            {editingOrderId === order.orderId ? (
              <>
                <button onClick={() => handleSave(order.orderId)} className="bg-blue-500 text-white px-2 py-1 mr-2">Salvar</button>
                <button onClick={() => setEditingOrderId(null)} className="bg-gray-500 text-white px-2 py-1">Cancelar</button>
              </>
            ) : (
              <button onClick={() => handleEdit(order.orderId)} className="bg-pink-500 rounded-md text-white px-2 py-1">Editar</button>
            )}
          </div>
          <button onClick={() => router.push(`/dashboard/pedidos/${order.orderId}`)} className="bg-pink-500 rounded-md text-white px-1 py-1 w-fit justify-self-center">Detalhes</button>
          <div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersDashboard;
