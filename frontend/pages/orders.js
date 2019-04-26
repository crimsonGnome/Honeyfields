import PleaseSignIn from '../components/PleaseSignIn';
import OrderList from '../components/OrderList';

const OrdersPage = props => (
  <div>
    <PleaseSignIn>
      <OrderList page={parseFloat(props.query.page) || 1} />
    </PleaseSignIn>
  </div>
);
export default OrdersPage;
