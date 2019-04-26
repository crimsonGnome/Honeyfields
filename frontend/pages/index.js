import Items from '../components/Items';

const Home = props => (
  <div>
    {props.query.filter ? (
      <Items
        filter={props.query.filter || null}
        page={parseFloat(props.query.page) || 1}
      />
    ) : (
      <Items page={parseFloat(props.query.page) || 1} />
    )}
  </div>
);
export default Home;
