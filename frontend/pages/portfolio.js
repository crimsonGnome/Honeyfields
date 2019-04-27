import Portfolio from '../components/Portfolio';

const Portfolios = props => (
  <div>
    <Portfolio
      filter={props.query.filter || null}
      page={parseFloat(props.query.page) || 1}
    />
  </div>
);
export default Portfolios;
