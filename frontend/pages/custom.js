import Customs from '../components/Customs';

const Home = props => (
  <div>
    <Customs
      filter={props.query.filter || null}
      page={parseFloat(props.query.page) || 1}
    />
  </div>
);

export default Home;
