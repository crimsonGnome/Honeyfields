import Portfolio from '../components/Portfolio';

const Portfolios = props => (
  <div>
    {props.query.filter ? (
      <Portfolio
        filter={props.query.filter}
        page={parseFloat(props.query.page) || 1}
      />
    ) : (
      <Portfolio page={parseFloat(props.query.page) || 1} />
    )}{' '}
  </div>
);
export default Portfolios;
