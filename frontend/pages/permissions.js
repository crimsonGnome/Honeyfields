import AdminSignIn from '../components/AdminSignIn';
import Permissions from '../components/Permissions';

const PermissionsPage = props => (
  <div>
    <AdminSignIn>
      <Permissions />
    </AdminSignIn>
  </div>
);
export default PermissionsPage;
