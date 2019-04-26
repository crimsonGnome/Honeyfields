import UpdateEvent from '../components/UpdateEvent';

const Update = ({ query }) => (
  <div>
    <UpdateEvent id={query.id} />
  </div>
);
export default Update;
