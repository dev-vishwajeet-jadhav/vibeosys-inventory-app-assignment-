import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../features/products/productsSlice';

const UNIT_OPTIONS = ['ml', 'ltr', 'gm', 'kg', 'mtr', 'mm', 'box', 'units'];
const CATEGORY_OPTIONS = ['Finished', 'Semi finished', 'Subsidiary'];

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    unit: UNIT_OPTIONS[0],
    category: CATEGORY_OPTIONS[0],
    expiry: '',
  });

  const [materials, setMaterials] = useState([]);
  const [errors, setErrors] = useState({});

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const addMaterialRow = () => {
    setMaterials((prev) => [
      ...prev,
      {
        materialId: '',
        name: '',
        unit: UNIT_OPTIONS[0],
        quantity: '',
        price: '',
        totalPrice: 0,
        taxAmount: 0,
        totalAmount: 0,
      },
    ]);
  };

  const removeMaterialRow = (index) => {
    setMaterials((prev) => prev.filter((_, i) => i !== index));
  };

  const recalculateMaterial = (material) => {
    const quantity = parseFloat(material.quantity) || 0;
    const price = parseFloat(material.price) || 0;
    const totalPrice = quantity * price;
    const taxAmount = totalPrice * 0.1; // 10% tax
    const totalAmount = totalPrice + taxAmount;

    return {
      ...material,
      totalPrice,
      taxAmount,
      totalAmount,
    };
  };

  const handleMaterialChange = (index, field, value) => {
    setMaterials((prev) => {
      const updated = [...prev];
      const material = { ...updated[index], [field]: value };
      updated[index] = recalculateMaterial(material);
      return updated;
    });
  };

  const calculateSubtotal = () => {
    return materials.reduce((sum, m) => sum + (m.totalAmount || 0), 0);
  };

  const validate = () => {
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = 'Product name is required.';
    }

    if (!product.expiry) {
      newErrors.expiry = 'Expiry date is required.';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiryDate = new Date(product.expiry);
      if (expiryDate <= today) {
        newErrors.expiry = 'Expiry must be a future date.';
      }
    }

    if (materials.length === 0) {
      newErrors.materials = 'At least one raw material is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const totalCost = calculateSubtotal();

    dispatch(
      addProduct({
        name: product.name.trim(),
        unit: product.unit,
        category: product.category,
        expiry: product.expiry,
        totalCost,
        materials,
      }),
    );

    navigate('/');
  };

  return (
    <div className="page">
      <h1 className="page__title">Add Product</h1>
      <p className="page__subtitle">
        Define a new finished, semi finished or subsidiary product and its required
        raw materials.
      </p>
      <form className="card" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Product Details</legend>
          <div>
            <label>
              Name of Product:
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleProductChange}
              />
            </label>
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>

          <div>
            <label>
              Unit of Measure:
              <select
                name="unit"
                value={product.unit}
                onChange={handleProductChange}
              >
                {UNIT_OPTIONS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Category of Product:
              <select
                name="category"
                value={product.category}
                onChange={handleProductChange}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              Expiry of Product:
              <input
                type="date"
                name="expiry"
                value={product.expiry}
                onChange={handleProductChange}
              />
            </label>
            {errors.expiry && (
              <div className="error-text">{errors.expiry}</div>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Raw Materials</legend>
          {errors.materials && (
            <div className="error-text">{errors.materials}</div>
          )}

          <button type="button" className="btn" onClick={addMaterialRow}>
            + Add Material
          </button>

          {materials.length > 0 && (
            <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Material ID</th>
                  <th>Name of Material</th>
                  <th>Unit of Measure</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price (Qty * Price)</th>
                  <th>Tax Amt (10%)</th>
                  <th>Total Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={material.materialId}
                        onChange={(e) =>
                          handleMaterialChange(index, 'materialId', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={material.name}
                        onChange={(e) =>
                          handleMaterialChange(index, 'name', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <select
                        value={material.unit}
                        onChange={(e) =>
                          handleMaterialChange(index, 'unit', e.target.value)
                        }
                      >
                        {UNIT_OPTIONS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={material.quantity}
                        onChange={(e) =>
                          handleMaterialChange(index, 'quantity', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={material.price}
                        onChange={(e) =>
                          handleMaterialChange(index, 'price', e.target.value)
                        }
                      />
                    </td>
                    <td>{material.totalPrice.toFixed(2)}</td>
                    <td>{material.taxAmount.toFixed(2)}</td>
                    <td>{material.totalAmount.toFixed(2)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn--danger"
                        onClick={() => removeMaterialRow(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}

          <div>
            <strong>Sub Total of Product: </strong>
            {calculateSubtotal().toFixed(2)}
          </div>
        </fieldset>

        <div className="page-actions">
          <button type="submit" className="btn btn--primary">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;
