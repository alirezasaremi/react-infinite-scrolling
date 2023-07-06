export default function ProductItem(props) {
  return (
    <>
      <div>
        <img src={props.product.thumbnail} alt={props.product.title} />
      </div>
      <div>
        <h3>{props.product.title}</h3>
        <p>{props.product.description}</p>
        <p>Price: {props.product.price}$</p>
        <p>Category: {props.product.category}</p>
        <p>Stock: {props.product.stock}</p>
      </div>
    </>
  );
}
