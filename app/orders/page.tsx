'use client'
import { useAuth } from "@/Contexts/AuthContext";
import apiAdress from '@/utils/api';
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";

const UserOrders = () => {
  const { accessToken } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiAdress}/api/orders/`, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          },
        });
        // Supondo que a resposta tenha a propriedade "orders"
        setOrders(response.data.orders);
      } catch (error) {
        console.log("Erro ao buscar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-700">
        Carregando...
      </div>
    );
  }

  return (
    // <Suspense fallback={<div>Carregando no Orders Page...</div>}>
      <div className="container mx-auto p-4">
        <h3 className="text-2xl text-gray-800 font-bold mb-6">Acompanhamento de Pedidos</h3>
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
          
              <div
                key={order.orderId}
                className="border border-solid  border-pink-200 rounded-lg shadow-md p-6 transition hover:shadow-xl bg-pink-50 "
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-700">
                      Pedido #{order.orderId}
                    </h4>
                    <p className="text-gray-500">
                      Status do pedido:{" "}
                      <span
                        className={`font-medium ${
                          order.status === "delivered"
                            ? "text-green-500"
                            : order.status === "ongoing"
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}
                      >
                        {order.status === "pending" ? "Aguardando pagamento" :
                          (order.status === "approved" ? "Pagamento aprovado" :
                            (order.status === "inprocess" ? "Pagamento em processo" :
                              (order.status === "inmediation" ? "Em contestação" :
                                (order.status === "rejected" ? "Pagamento rejeitado" :
                                  (order.status === "refunded" || order.status === "chargedback" ? "Estornado" : order.status) 
                                )
                              )
                            )
                          )
                        }
                      </span>
                    </p>
                    <p className="text-gray-500">
                      Status da entrega:{" "}
                      <span
                        className={`font-medium ${
                          order.status === "delivered"
                            ? "text-green-500"
                            : order.status === "ongoing"
                            ? "text-yellow-500"
                            : "text-gray-500"
                        }`}
                      >
                        {(order.shipingStatus === "pending" ? "Aguardando envio" :
                          (order.shipingStatus === "posted" ? "Enviado" :
                            (order.shipingStatus === "in_transit" ? "Em trânsito" :
                              (order.shipingStatus === "delivered" ? "Entregue" :
                                (order.shipingStatus === "canceled" ? "Cancelado" :
                                  (order.shipingStatus === "returned" ? "Estornado" :
                                    order.shipingStatus
                                  )
                                )
                              )
                            )
                          )
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-700">
                      Total: R$ {order.orderTotal}
                    </p>
                    
                    <div className="flex flex-row gap-6">
                    {order.shipments?.map((shipment: any, index: number) => (
                      <div key={index}> 
                        <p className="text-sm text-gray-500">
                        Pedido envio via: {shipment?.carrier || '-'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Código de rastreio: {shipment.tracking_url ? <Link href={shipment.tracking_url}> {shipment?.trackingCode || 'Rastrear Pedido'}</Link>: "-"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Estimativa de entrega: {new Date(shipment?.estimatedDeliveryTime).toLocaleDateString() || ""}
                        </p>
                        {shipment?.deliveredAt ? 
                          <p className="text-sm text-gray-500">
                          Pedido entregue em: {new Date(shipment?.deliveredAt).toLocaleString()}
                        </p> : shipment?.shipedAt ?
                        <p className="text-sm text-gray-500">
                          Pedido enviado em: {new Date(shipment?.shipedAt).toLocaleDateString()}
                        </p> : "Aguardando envio"
                        }
                      </div>
                    ))}
                    </div>

                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600">
                    Pagamento: {order.paymentType} | Parcelas: {order.installments}
                  </p>
                </div>

                <div>
                  <h5 className="text-lg font-semibold text-gray-700 mb-2">
                    Itens do Pedido:
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.orderitems.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center p-3 border border-gray-100 rounded-md shadow-sm"
                      >
                        <div className="w-16 h-16 bg-gray-200 flex-shrink-0 rounded-md mr-4 flex items-center justify-center">
                          {/* Placeholder: inicial do nome do produto */}
                          <span className="text-2xl font-bold text-gray-500">
                            {item.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-700">
                            {item.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            Marca: {item.brand}
                          </span>
                          <span className="text-sm text-gray-500">
                            Cor: {item.color}
                          </span>
                          <span className="text-sm text-gray-500">
                            Quantidade: {item.quantity}
                          </span>
                          <span className="text-sm text-gray-500">
                            Preço: R$ {item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order.status === "delivered" && (
                  <div className="mt-4">
                    <button
                      onClick={() => {}}
                      className="bg-yellow-500 hover:bg-yellow-600 transition-colors text-white px-4 py-2 rounded-md"
                    >
                      ⭐ Avaliar Pedido
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            Você ainda não fez pedidos.
          </div>
        )}
      </div>
    // </Suspense>
  );
};

export default UserOrders;
