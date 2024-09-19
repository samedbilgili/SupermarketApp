import logo from './images/logo.png';
import Navbar from './components/navbar';
import Market from './components/market';
import { data } from './MockData';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ProductModal from './components/productmodal';
import ShelfModal from './components/shelfModal';
import ProductUpdateModal from './components/productUpdateModal';


function App() {

  //base data state
  const [markets, setMarkets] = useState(data);

  //shows data state
  const [filteredMarkets, setFilteredMarkets] = useState([]);

  //modals show states
  const [isAddingShelf, setIsAddingShelf] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  //search term state
  const [searchTerm, setSearchTerm] = useState("");

  const [editingProduct, setEditingProduct] = useState(null);

  const [addingShelfMarketId, setAddingShelfMarketId] = useState("");

  useEffect(() => {
    if (!!searchTerm) {
      const newFilteredMarkets = markets
        .map((market) => ({
          ...market,
          shelves: market.shelves
            .map((shelf) => ({
              ...shelf,
              products: shelf.products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              ),
            }))
            .filter((shelf) => shelf.products.length > 0),
        }))
        .filter((market) => market.shelves.length > 0);

      setFilteredMarkets(newFilteredMarkets);
    } else {
      setFilteredMarkets(markets);
    }
  }, [searchTerm, markets]);

  const handleAddProduct = (marketId, shelfId, product) => {
    setIsAddingProduct({ marketId, shelfId, product });
  };

  const handleAddProductSubmit = (newProduct) => {
    //{id: '1231231231', name: 'adı', shelfId: 'r1', marketId: 'market-a'}
    setMarkets((prevMarkets) => {
      return prevMarkets.map((market) => {
        if (market.id == newProduct.marketId) {
          return {
            ...market,
            shelves: market.shelves.map((shelf) => {
              if (shelf.id === newProduct.shelfId) {
                return {
                  ...shelf,
                  products: [
                    ...shelf.products,
                    { id: newProduct.id, name: newProduct.name },
                  ],
                };
              }
              return shelf;
            }),
          };
        }
        else {
          return market;
        }
      });
    });
    setIsAddingProduct(false);
  };

  const handleAddShelf = (marketId) => {
    setAddingShelfMarketId(marketId);
    setIsAddingShelf(true);
  };

  const handleAddShelfSubmit = (newShelf) => {
    setMarkets((prevMarkets) => {
      return prevMarkets.map((market) => {
        if (market.id === newShelf.marketId) {
          const newShelfName = `R${market.shelves.length + 1}`;
          return {
            ...market,
            shelves: [
              ...market.shelves,
              {
                id: nanoid(),
                name: newShelfName,
                type: newShelf.type,
                products: [],
              },
            ],
          };
        }
        return market;
      });
    });
    setIsAddingShelf(false);
  };

  const handleEditProduct = (marketId, shelfId, product) => {
    const shelf = markets
      .find((m) => m.id === marketId)
      ?.shelves.find((s) => s.id === shelfId);
    setEditingProduct({
      ...product,
      marketId,
      shelfId,
      shelfType: shelf?.type,
    });
  };

  const handleSaveProduct = (editedProduct) => {

    if (editedProduct.moveMarketId != editedProduct.marketId || editedProduct.moveShelfId != editedProduct.shelfId) {
      handleDeleteProduct(editedProduct.id);
      handleAddProductSubmit({ id: editedProduct.id, name: editedProduct.name, shelfId: editedProduct.moveShelfId, marketId: editedProduct.moveMarketId });
    }

    setMarkets((prevMarkets) => {
      return prevMarkets.map((market) => {
        if (market.id === editedProduct.marketId) {
          return {
            ...market,
            shelves: market.shelves.map((shelf) => {
              if (shelf.id === editedProduct.shelfId) {
                return {
                  ...shelf,
                  products: shelf.products.map((p) =>
                    p.id === editedProduct.id
                      ? { id: editedProduct.id, name: editedProduct.name }
                      : p
                  ),
                };
              }
              return shelf;
            }),
          };
        }
        return market;
      });
    });
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    setMarkets((prevMarkets) => {
      return prevMarkets.map((market) => {
        return {
          ...market,
          shelves: market.shelves.map((shelf) => {
            return {
              ...shelf,
              products: shelf.products.filter((p) => p.id !== productId),
            };
          }),
        };
      });
    });
    setEditingProduct(null);
  };

  const handleDeleteShelf = (shelfId, marketId) => {
    setMarkets((prevMarkets) => {
      return prevMarkets.map((market) => {
        if (market.id == marketId) {
          return {
            ...market,
            shelves: market.shelves.filter((shelf) => shelf.id != shelfId),
          };
        }
        return market;
      });
    });
    setEditingProduct(null);
  };

  return (
    <>
      <Navbar logo={logo} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className='d-flex flex-wrap'>
        {filteredMarkets.map((market) =>
          <Market
            key={market.id}
            market={market}
            handleAddProduct={handleAddProduct}
            handleAddShelf={handleAddShelf}
            onEditProduct={handleEditProduct}
            handleDeleteShelf={handleDeleteShelf}
          />
        )}
      </div>

      {editingProduct &&
        <ProductUpdateModal
          product={editingProduct}
          onSave={handleSaveProduct}
          onDelete={handleDeleteProduct}
          onClose={() => setEditingProduct(null)}
          markets={markets}
        />
      }

      {isAddingProduct &&
        <ProductModal
          onAdd={handleAddProductSubmit}
          onClose={() => setIsAddingProduct(false)}
          shelves={markets.find((m) => m.id === isAddingProduct.marketId)?.shelves || []}
          addingMarketId={isAddingProduct.marketId}
          addingShelfId={isAddingProduct.shelfId}
        />
      }
      {isAddingShelf && (
        <ShelfModal
          onAdd={handleAddShelfSubmit}
          onClose={() => setIsAddingShelf(false)}
          defaultShelfName={`R${markets.find((m) => m.id == addingShelfMarketId).shelves.length + 1}`}
          marketId={addingShelfMarketId}
          markets={markets}
        />
      )}

    </>
  );
}

export default App;
