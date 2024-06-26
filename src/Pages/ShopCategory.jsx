import React, { useContext, useState, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [visibleProducts, setVisibleProducts] = useState(22); // Número de productos visibles inicialmente
  const [containerHeight, setContainerHeight] = useState(500); // Altura inicial del contenedor de productos
  const [filter, setFilter] = useState('default'); // Estado para el filtro
  
  useEffect(() => {
    // Actualizar la altura del contenedor una vez que los productos se carguen completamente
    if (all_product.filter(item => props.category === item.category).length > 0) {
      setContainerHeight(document.getElementById('shopcategory-products').clientHeight);
    }
  }, [all_product, props.category]);
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const productsInCategory = all_product.filter(item => props.category === item.category);

  // Filtrar productos según el filtro seleccionado
  const filteredProducts = productsInCategory.filter(item => {
    if (filter === '10-20') {
      return item.new_price >= 10 && item.new_price <= 20;
    }
    if (filter === '20-30') {
      return item.new_price >= 20 && item.new_price <= 30;
    }
    if (filter === '30-40') {
      return item.new_price >= 30 && item.new_price <= 40;
    }
    // Agregar más filtros aquí si es necesario
    return true;
  });

  const productsToShow = filteredProducts.slice(0, visibleProducts);
  const totalProductsInCategory = filteredProducts.length;

  const loadMore = () => {
    const remainingProducts = totalProductsInCategory - visibleProducts;
    const productsToAdd = Math.min(12, remainingProducts); // Calcula la cantidad de productos que se pueden agregar
  
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + productsToAdd); // Añade la cantidad calculada de productos
  };

  return (
    <div className='shop-category' style={{ minHeight: containerHeight }}>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{totalProductsInCategory < 22 ? totalProductsInCategory : visibleProducts}</span> out of {totalProductsInCategory} products
        </p>
        <div>
          <select className='shopcategory-sort' name="priceFilter" id="priceFilter" onChange={handleFilterChange}>
            <option value="default">Sort by</option>
            <option value="10-20">10 - 20 $</option>
            <option value="20-30">20 - 30 $</option>
            <option value="30-40">30 - 40 $</option>
          </select>
          {/* <img src={dropdown_icon} alt="" /> */}
        </div>
      </div>
      <div id="shopcategory-products" className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          productsToShow.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          ))
        ) : (
          <div className="msgContainer"> <div className='msgContainer-msg'>No hay productos disponibles...</div>
          </div>
        )}
      </div>
      {visibleProducts < totalProductsInCategory && (
        <div className="shopcategory-loadmore" onClick={loadMore}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
