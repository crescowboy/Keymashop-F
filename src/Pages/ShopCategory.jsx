import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [visibleProducts, setVisibleProducts] = useState(16); // Número de productos visibles inicialmente
  const productsToShow = all_product.filter(item => props.category === item.category).slice(0, visibleProducts);
  const totalProductsInCategory = all_product.filter(item => props.category === item.category).length;

  const loadMore = () => {
    const remainingProducts = all_product.filter(item => props.category === item.category).length - visibleProducts;
    const productsToAdd = Math.min(12, remainingProducts); // Calcula la cantidad de productos que se pueden agregar
  
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + productsToAdd); // Añade la cantidad calculada de productos
  };
  

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
        <span>Showing 1-{visibleProducts}</span> out of {totalProductsInCategory} products
        </p>
        <div className='shopcategory-sort'>
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {productsToShow.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
      {visibleProducts < all_product.filter(item => props.category === item.category).length && (
        <div className="shopcategory-loadmore" onClick={loadMore}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
