import Event from '../components/Event';

const Update = ({ query }) => (
  <div>
    <Event page={parseFloat(query.page) || 1} />
  </div>
);
export default Update;
