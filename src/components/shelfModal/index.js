import { useState } from 'react';
import { shelfTypes } from '../../MockData';

export default function ShelfModal({ onAdd, onClose, defaultShelfName, marketId, markets }) {

    const [shelfName, setShelfName] = useState(defaultShelfName);
    const [shelfType, setShelfType] = useState("");
    const [market, setMarket] = useState(marketId);

    return (
        <div className="modal fade show" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center justify-content-between">
                        <h5 className="modal-title" id="exampleModalLongTitle">Reyon Ekleme</h5>
                        <button type="button" className="btn btn-dark" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="shelfName">Reyon Adı</label>
                                <input
                                    id='shelfName'
                                    type="text"
                                    value={shelfName}
                                    className="form-control"
                                    placeholder='Ürün ID'
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="shelfType">Reyon Türü</label>
                                <select
                                    id='shelfType'
                                    value={shelfType}
                                    onChange={(e) => setShelfType(e.target.value)}
                                    className="form-control"
                                >
                                    <option value="">Seçiniz</option>
                                    {shelfTypes.map((shelf) => <option value={shelf} key={shelf}>{shelf}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="text-white block mb-1" htmlFor='addingMarket'>Eklenecek Market</label>
                                <select
                                    id='addingMarket'
                                    value={market}
                                    className="form-control"
                                    disabled
                                >
                                    <option value="">Seçiniz</option>
                                    {markets.map((market)=>  <option value={market.id}>{market.name}</option>)}                                   
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            if (shelfType == "") {
                                alert("Lütfen Reyon Tipi Seçiniz!");
                            } else {
                                onAdd({ name: shelfName, type: shelfType, marketId: marketId });
                                onClose();
                            }
                        }}>Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}