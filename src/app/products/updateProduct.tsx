'use client';

import { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
}


export default function UpdateProduct(product: Product) {

    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [isMutating, setIsMutating] = useState(false);
    const router = useRouter();


    function handleChange() {
        setModal(!modal);
    }


    async function handleUpdate(e: SyntheticEvent) {
        e.preventDefault();

        setIsMutating(true);

        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                title: title,
                price: price
            })
        });

        setIsMutating(false);
        router.refresh();
        setModal(false);
    }

    return (
        <div>

            <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>

            <input type="checkbox" name="" id="" className="modal-toggle" checked={modal} onChange={handleChange} />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>

                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Title</label>

                            <input type="text" name="" id="" className="input w-full input-bordered" placeholder="product name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label font-bold">Price</label>

                            <input type="text" name="" id="" className="input w-full input-bordered" placeholder="product name"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>

                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>
                                Close
                            </button>
                            {
                                !isMutating ? (
                                    <button type="submit" className="btn btn-primary"
                                    >
                                        Update
                                    </button>
                                ) : (
                                    <button type="button" className="btn loading"
                                    >
                                        Updating....
                                    </button>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}