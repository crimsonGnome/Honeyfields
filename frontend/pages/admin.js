import AdminSignIn from '../components/AdminSignIn';
import Admin from '../components/Admin';

const AdminPage = props => (
  <div>
    <AdminSignIn>
      <Admin />
    </AdminSignIn>
  </div>
);
export default AdminPage;
