'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
}

export default function DeleteProduct(item: Product) {

    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();


    function handleChange() {
        setModal(!modal);
    }


    async function handleDelete(itemId: number) {
        setIsMutating(true);

        await fetch(`http://localhost:5000/products/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            },
        });

        setIsMutating(false);
        router.refresh();
        setModal(false);
    }

    return (
        <div>

            <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>

            <input type="checkbox" name="" id="" className="modal-toggle" checked={modal} onChange={handleChange} />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure to delete this data?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleChange}>
                            Close
                        </button>
                        {
                            !isMutating ? (
                                <button type="button" onClick={() => handleDelete(item.id)} className="btn btn-primary"
                                >
                                    Delete
                                </button>
                            ) : (
                                <button type="button" className="btn loading"
                                >
                                    Deleting....
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}