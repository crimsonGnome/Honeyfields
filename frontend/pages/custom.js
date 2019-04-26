import Customs from '../components/Customs';

const Home = props => (
  <div>
    {props.query.filter ? (
      <Customs
        filter={props.query.filter}
        page={parseFloat(props.query.page) || 1}
      />
    ) : (
      <Customs page={parseFloat(props.query.page) || 1} />
    )}{' '}
  </div>
);

export default Home;
