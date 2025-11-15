import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productService, type Product } from "../../services/product";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      setError("");
      setIsLoading(true);

      try {
        const response = await productService.fetchProductById(id);
        setProduct(response);
      } catch (err) {
        setError(`Something went wrong: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return (
    <div>
      <h1>This is ProductDetailPage</h1>

      {!isLoading && product && <h3>{product.name}</h3>}

      {!isLoading && error && <p>{error}</p>}
    </div>
  );
};

export default ProductDetailPage;
