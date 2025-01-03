import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

interface Payments {
    id: string;
    invoice_id: string;
    amount: string;
    payment_date: string;
    payment_method: string;
}

interface PaymentsPanelProps {
    payments: Payments[];
    onRefund: (id: string) => void;
}

export function PaymentsPanel({ payments, onRefund }: PaymentsPanelProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6 max-h-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h2>
            <div className="overflow-y-auto">
                {payments.length > 0 ? (
                    <div className="space-y-4 max-h-64">
                        {payments.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-2 rounded-sm"
                            >
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Invoice: {payment.invoice_id} · Amount: {payment.amount}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Date: {payment.payment_date} · Method: {payment.payment_method}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onRefund(payment.id)}
                                        className="px-3 py-1 text-sm text-red-600 bg-red-100 rounded-full"
                                    >
                                        Refund
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No payments at the moment.</p>
                )}
            </div>
            <div className="p-4 text-end">
                <Link href="/finance/payments" className="underline">
                    View All Payments
                </Link>
            </div>
        </div>
    );
}
