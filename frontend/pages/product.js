import SingleItem from '../components/SingleItem';

const Update = ({ query }) => (
  <div>
    <SingleItem id={query.id} />
  </div>
);
export default Update;
