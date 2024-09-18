import { useState } from 'react';

export default function ProductModal({ onAdd, onClose, shelves, addingMarketId, addingShelfId }) {

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [shelfId, setShelfId] = useState(addingShelfId);

    return (
        <div className="modal fade show" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center justify-content-between">
                        <h5 className="modal-title" id="exampleModalLongTitle">Ürün Ekleme</h5>
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
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    className="form-control"
                                    placeholder='Ürün ID'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productName">Ürün Adı</label>
                                <input
                                    id='productName'
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="form-control"
                                    placeholder='Ürün Adı' />
                            </div>
                            <div className="form-group">
                                <label className="text-white block mb-1">Eklenecek Reyon</label>
                                <select
                                    value={shelfId}
                                    onChange={(e) => setShelfId(e.target.value)}
                                    className="form-control"
                                    disabled>
                                    <option value="">Seçiniz</option>
                                    {shelves.map((shelf) => (
                                        <option key={shelf.id} value={shelf.id}>
                                            {shelf.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            if (productName == "" || shelfId == "") {
                                alert("Gerekli Alanları Doldurunuz!");
                            } else {
                                onAdd({ id: productId, name: productName, shelfId: shelfId, marketId: addingMarketId })
                            }
                        }}>Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}