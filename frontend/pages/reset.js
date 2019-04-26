import ResetPage from '../components/ResetPage';

const Reset = props => (
  <div>
    <p>Reset Your Password {props.query.resetToken}</p>
    <ResetPage resetToken={props.query.resetToken} />
  </div>
);
export default Reset;
