import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const deleteIcon = <FontAwesomeIcon icon={faTrash} />

export default function Market({ market, handleAddProduct, handleAddShelf, onEditProduct, handleDeleteShelf }) {
    return <>
        <div className="col-md-6 col-12 p-3">
            <div className="col-md-12 d-flex align-items-center justify-content-center market-header">
                <p className="m-0 p-3">
                    {market.name}
                </p>
            </div>
            <div className="col-md-12">
                <table className="table market-table">
                    <thead>
                        <tr>
                            <td>Reyon</td>
                            <td>Tür</td>
                            <td>Ürünler</td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleAddShelf(market.id)}>Reyon Ekle</button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {market.shelves.map((shelf) =>
                            <tr key={shelf.id}>
                                <td>
                                    {shelf.name} <a className="m-1 p-1" style={{color:'pink'}} onClick={() => handleDeleteShelf(shelf.id, market.id)}>{deleteIcon}</a>
                                </td>
                                <td>
                                    {shelf.type}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-start align-items-start flex-wrap">
                                        {shelf.products.map((product) =>
                                            <div className="btn productBtn m-1" key={product.id} onClick={() => onEditProduct(market.id, shelf.id, product)}>
                                                {product.name}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <button className="btn addProductBtn" onClick={() => handleAddProduct(market.id, shelf.id)}>Ürün Ekle</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    </>
}
