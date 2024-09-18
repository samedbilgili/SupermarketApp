import { useEffect, useState } from "react";



export default function Navbar({ logo, searchTerm, setSearchTerm }) {
    let intervaId;

    const [currencies, setCurrencies] = useState({});

    useEffect(() => {
        getCurrencies();
        intervaId = setInterval(getCurrencies, 30000);
    }, []);

    function getCurrencies() {
        try {
            fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_vEoVnhnQA7eSIezZ484cr0hbI66EdvPJSqGkUE0j&currencies=EUR%2CUSD%2CGBP&base_currency=TRY")
                .then(res => res.json())
                .then(res => {
                    const data = Object.fromEntries(Object.entries(res.data).map(([currency, value]) => {
                        return [currency, (1 / value).toFixed(4)];
                    }));

                    setCurrencies(data ?? {})
                });
        } catch (ex) {
            console.log('currencies not updated!');
            console.log(ex);
        }
    }

    return <>
        <nav className=" d-flex justify-content-between">
            <div className="p-2">
                <img src={logo} style={{ height: 50 }} />
            </div>
            <div className="p-2 d-flex">
                <div className="d-flex flex-row justify-content-between text-white align-items-center">
                    <div className="mx-2 currenciesDiv">$ {currencies?.USD ?? '00.0000'}</div>
                    <div className="mx-2 currenciesDiv">£ {currencies?.GBP ?? '00.0000'}</div>
                    <div className="mx-2 currenciesDiv">€ {currencies?.EUR ?? '00.0000'}</div>
                </div>
            </div>
            <div className="p-2 d-flex align-items-center">
                <input className="form-control mr-sm-2" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="search" placeholder="Ürün Ara" />
            </div>
        </nav>
    </>
}
