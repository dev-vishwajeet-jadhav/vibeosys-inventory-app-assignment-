import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProductListPage() {
  const products = useSelector((state) => state.products.products);

  const calculateTotalCost = (product) => {
    if (!product.materials || product.materials.length === 0) {
      return product.totalCost ?? 0;
    }

    return product.materials.reduce((sum, material) => {
      // material.totalAmount is expected to be: total price + tax amount
      const materialTotal =
        typeof material.totalAmount === 'number'
          ? material.totalAmount
          : 0;
      return sum + materialTotal;
    }, 0);
  };

  return (
    <div className="page">
      <h1 className="page__title">Product Inventory</h1>
      <p className="page__subtitle">
        Overview of finished, semi finished and subsidiary products with their raw
        material costs.
      </p>
      <div className="card table-wrapper">
        <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category of Product</th>
            <th>Total Cost of Product</th>
            <th>Number of Raw Materials</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link
                  className="link-inline"
                  to={`/products/${product.id}/edit`}
                >
                  {product.name}
                </Link>
              </td>
              <td>{product.category}</td>
              <td>{calculateTotalCost(product)}</td>
              <td>{product.materials ? product.materials.length : 0}</td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="4">No products added yet.</td>
            </tr>
          )}
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductListPage;
