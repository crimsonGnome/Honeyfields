import CustomOrderForm from '../components/CustomOrderForm';

const CustomOrder = ({ query }) => (
  <div>
    <CustomOrderForm id={query.id} />
  </div>
);
export default CustomOrder;
