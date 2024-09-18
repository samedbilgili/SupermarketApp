import { useState } from "react";

export default function ProductUpdateModal({ product, onSave, onDelete, onClose, markets }) {
    const [editedProduct, setEditedProduct] = useState(product);
    const [moveMarketId, setMoveMarketId] = useState(editedProduct.marketId);
    const [moveShelfId, setMoveShelfId] = useState(editedProduct.shelfId);

    return <div className="modal fade show" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header d-flex align-items-center justify-content-between">
                    <h5 className="modal-title" id="exampleModalLongTitle">Ürün Düzenleme</h5>
                    <button type="button" className="btn btn-dark" onClick={onClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="productId">Ürün ID</label>
                            <input
                                id='productId'
                                type="text"
                                value={editedProduct.id}
                                className="form-control"
                                placeholder='Ürün ID'
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productName">Ürün Adı</label>
                            <input
                                id='productName'
                                type="text"
                                value={editedProduct.name}
                                onChange={(e) =>
                                    setEditedProduct({ ...editedProduct, name: e.target.value })
                                }
                                className="form-control"
                                placeholder='Ürün Adı' />
                        </div>
                        <div className="form-group">
                            <label className="text-white block mb-1">Bulunduğu Reyon Türü</label>
                            <input
                                type="text"
                                value={editedProduct.shelfType}
                                readOnly
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-white block mb-1">Taşınacak Marketi Seçiniz</label>
                            <select
                                id='addingMarket'
                                value={moveMarketId}
                                className="form-control"
                                onChange={(e) => { setMoveMarketId(e.target.value); setMoveShelfId(""); }}
                            >
                                {markets.map((mark) => <option key={mark.id} value={mark.id}>{mark.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-white block mb-1">Taşınacak Reyonuz Seçiniz</label>
                            <select
                                id='addingMarket'
                                value={moveShelfId}
                                className="form-control"
                                onChange={(e) => setMoveShelfId(e.target.value)}
                            >
                                <option value="">Seçiniz</option>
                                {markets.filter((mark) => mark.id == moveMarketId)[0].shelves.filter((shelf) => shelf.type == editedProduct.shelfType).map((shelf) => <option key={shelf.id} value={shelf.id}>{shelf.name}</option>)}
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={() => onDelete(editedProduct.id)} >Ürünü Sil</button>
                    <button type="button" className="btn btn-primary" onClick={() => {
                        if (editedProduct.name == "" || moveMarketId == "" || moveShelfId == "") {
                            alert("Gerekli Alanları Doldurunuz!");
                        }
                        else {
                            onSave({ ...editedProduct, moveMarketId: moveMarketId, moveShelfId: moveShelfId })
                        }
                    }}>Kaydet</button>
                </div>
            </div>
        </div>
    </div>
}