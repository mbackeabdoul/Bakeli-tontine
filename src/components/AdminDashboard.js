import React, { useState } from 'react';
import profil from '../images/profil.jpg';
// import './AdminDashboard.css';
import {
  Dropdown,
  Card,
  Container,
  Row,
  Col,
  Table,
  ProgressBar,
  Button,
} from 'react-bootstrap';
import {
  Bell,
  ChevronDown,
  TrendingUp,
  Users,
  Wallet,
  Settings,
  DollarSign,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import AddUserForm from './AddUserForm';
import './AdminDashboard.css';

const lineChartData = [
  { name: 'Janvier', value: 0 },
  { name: 'Février', value: 40 },
  { name: 'Mars', value: 35 },
  { name: 'Avril', value: 38 },
  { name: 'Mai', value: 45 },
  { name: 'Juin', value: 38 },
  { name: 'Juillet', value: 60 }
];

const pieChartData = [
  { name: 'En cours', value: 49.48, color: '#1e293b' },
  { name: 'Archivé', value: 23.62, color: '#ffa4a4' },
  { name: 'Terminé', value: 18, color: '#10b981' },
  { name: 'Bloqué', value: 9.04, color: '#fcd34d' },
];

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: 'pointer' }}
  >
    {children}
  </div>
));


export default function AdminDashboard() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [showAddForm, setShowAddForm] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'Selena Roy', startDate: '01/01/2022', threshold: '300.000 FCFA', progress: 100, status: 'Terminé' },
    { id: 2, name: 'Emma Watson', startDate: '01/01/2022', threshold: '300.000 FCFA', progress: 57, status: 'En cours' },
    { id: 3, name: 'Jhon Robert', startDate: '01/01/2022', threshold: '300.000 FCFA', progress: 100, status: 'Terminé' },
    { id: 4, name: 'Anne Hathaway', startDate: '01/01/2022', threshold: '300.000 FCFA', progress: 50, status: 'En cours' },
  ]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const addUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setShowAddForm(false);
  };



  const renderDashboard = () => (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Card className="summary-card">
            <Card.Body>
              <h5>Juin</h5>
              <p className="amount">225.000 FCFA</p>
              <p className="text-muted small">Nombre de cotisation: 27</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="summary-card">
            <Card.Body>
              <h5>Mai</h5>
              <p className="amount">100.000 FCFA</p>
              <p className="text-muted small">Nombre de cotisation: 23</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="summary-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="icon-wrapper me-3">
                  <DollarSign size={24} className="icon" />
                </div>
                <div className="flex-grow-1">
                  <h5>Caisse</h5>
                  <p className="amount">3.500.000 FCFA / 5.000.000 FCFA</p>
                  <ProgressBar now={70} variant="success" className="mt-2" />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="chart-card equal-height">
            <Card.Body className="p-0">
              <h4 className="chart-title fs-6">
                Evolution des cotisations en fonction du temps
              </h4>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#10b981' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="chart-card equal-height">
            <Card.Body className="p-0">
              <h4 className="chart-title">Statistiques</h4>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      label={({ percent }) =>
                        `${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="pie-legend">
                {pieChartData.map((entry, index) => (
                  <div key={index} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span className="legend-label">
                      {entry.name}: {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className='my-4'>
        <Col md={6}>
          <h5 className="table-title">Juin</h5>
          <Card className="mb-4 no-extra-card">
            <Card.Body>
              <Table responsive borderless className="custom-table">
                <thead className="bg-success text-white">
                  <tr>
                    <th>Membres</th>
                    <th>Montant</th>
                    <th>Date</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Selena Roy</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td><span className="text-success">Validé</span></td>
                  </tr>
                  <tr>
                    <td>Emma Watson</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td><span className="text-primary">En attente</span></td>
                  </tr>
                  <tr>
                    <td>Jhon Robert</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td><span className="text-success">Validé</span></td>
                  </tr>
                  <tr>
                    <td>Anne Hathaway</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td><span className="text-primary">En attente</span></td>
                  </tr>
                  <tr>
                    <td>Ravi Shankar</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td><span className="text-success">Validé</span></td>
                  </tr>
                  <tr>
                    <td>Emma Stone</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td><span className="text-success">Validé</span></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <h5 className="table-title">Top progression</h5>
          <Card className="mb-4 no-extra-card">
            <Card.Body>
              <Table responsive borderless className="custom-table">
                <thead className="bg-success text-white">
                  <tr>
                    <th>Membres</th>
                    <th>Date début</th>
                    <th>Progression</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Selena Roy</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar now={100} label={`100%`} variant="success" className="custom-progress" />
                    </td>
                  </tr>
                  <tr>
                    <td>Jhon Robert</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar now={100} label={`100%`} variant="success" className="custom-progress" />
                    </td>
                  </tr>
                  <tr>
                    <td>Emma Stone</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar now={64} label={`64%`} variant="info" className="custom-progress" />
                    </td>
                  </tr>
                  <tr>
                    <td>Emma Watson</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar now={57} label={`57%`} variant="info" className="custom-progress" />
                    </td>
                  </tr>
                  <tr>
                    <td>Anne Hathaway</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar now={50} label={`50%`} variant="info" className="custom-progress" />
                    </td>
                  </tr>
                  <tr>
                    <td>Ravi Shankar</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar now={50} label={`50%`} variant="info" className="custom-progress" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  const renderUsersPage = () => (
    <Container fluid>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Utilisateurs</h1>
      </div>
      <Row className="mb-3">
        <Col md={4}>
          <Card className="bg-success text-white">
            <Card.Body>
              <h5>Membres Actif</h5>
              <p>94 Membres</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="">
            <Card.Body>
              <h5>Membres Bloqués</h5>
              <p>6 Membres</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="">
            <Card.Body>
              <h5>Total Effectif</h5>
              <p>100 Membres</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Liste des membres</h5>
          <Button variant="primary" onClick={toggleAddForm}>
            Ajouter
          </Button>
        </Card.Header>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Membres</th>
                <th>Date début</th>
                <th>Seuil</th>
                <th>Progression</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.startDate}</td>
                  <td>{user.threshold}</td>
                  <td>
                    <ProgressBar now={user.progress} label={`${user.progress}%`} />
                  </td>
                  <td>
                    <span className={`badge ${user.status === 'Terminé' ? 'bg-success' : 'bg-warning'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <Eye size={18} className="me-2" style={{cursor: 'pointer'}} />
                    <Edit size={18} className="me-2" style={{cursor: 'pointer'}} />
                    <Trash2 size={18} style={{cursor: 'pointer'}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <AddUserForm show={showAddForm} onHide={toggleAddForm} onAdd={addUser} />
    </Container>
  );


const renderCotisationsPage = () => (
  <Container fluid>
    <h1 className="mb-4 text-start">Cotisations</h1>
    <Row>
      <Col md={4}>
        <Card className="summary-card mb-4">
          <Card.Body>
            <h5>Juin</h5>
            <p className="amount">225.000 FCFA</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="summary-card mb-4">
          <Card.Body>
            <h5>Mai</h5>
            <p className="amount">100.000 FCFA</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="summary-card mb-4">
          <Card.Body>
            <h5>Total Caisse</h5>
            <p className="amount">3.500.000 FCFA</p>
            <ProgressBar now={77} label={`77% du seuil`} variant="success" />
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Card>
      <Card.Body>
        <Table responsive>
          <thead className="bg-success text-white">
            <tr>
              <th>Membres</th>
              <th>Date début</th>
              <th>Montant cotisé</th>
              <th>Montant restant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.startDate}</td>
                <td>200.000 FCFA</td>
                <td>100.000 FCFA</td>
                <td>
                  <Eye size={18} style={{cursor: 'pointer'}} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  </Container>
);
const renderContent = () => {
  switch(activeItem) {
    case 'Dashboard':
      return renderDashboard();
    case 'Utilisateurs':
      return renderUsersPage();
    case 'Cotisations':
      return renderCotisationsPage();
    case 'Paramètres':
      return <Settings />;
    default:
      return <div>Contenu non disponible</div>;
  }
};

  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <h1 className="navbar-title text">Dashboard dAdmin </h1>
        <div className="user-info">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="notification-dropdown">
              <div className="notification-icon-wrapper">
                <Bell size={20} className="notification-icon" />
                <span className="notification-badge">1</span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="notification-menu">
              <Dropdown.Item>
                <div className="notification-item">
                  <span className="notification-title">Nouvelle cotisation</span>
                  <span className="notification-time">Il y a 2 heures</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item>
                <div className="notification-item">
                  <span className="notification-title">Nouveau membre</span>
                  <span className="notification-time">Il y a 3 heures</span>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className="user-details">
            <img src={profil} alt="User" className="user-avatar" />
            <div className="user-info-text">
              <span className="user-name">Ndiaga SALL</span>
              <span className="user-role">Administrator</span>
            </div>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="user-dropdown">
                <ChevronDown size={16} className="dropdown-icon" />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Paramètres</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">Déconnexion</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
      <aside className="sidebar">
  <div className="sidebar-header">
    <Wallet size={24} />
    <span> Bakéli Tontine</span>
  </div>
  <ul>
    {[
      { icon: TrendingUp, label: 'Dashboard' },
      { icon: Users, label: 'Utilisateurs' },
      { icon: Wallet, label: 'Cotisations' },
      { icon: Settings, label: 'Paramètres', hasSubmenu: true },
    ].map(({ icon: Icon, label, hasSubmenu }) => (
      <li
        key={label}
        className={`${activeItem === label ? 'active' : ''} ${
          hasSubmenu ? 'has-submenu' : ''
        }`}
        onClick={() => handleItemClick(label)}
      >
        <Icon size={20} />
        <span>{label}</span>
        {hasSubmenu && <ChevronDown size={16} className="submenu-icon" />}
      </li>
    ))}
  </ul>
</aside>

        

        <main className="main-content">
          {renderContent()}
        </main>
      </div>
      <style jsx>{`
        .admin-dashboard {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #f8f9fa;
        }

        .navbar {
          background-color: white;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: #1abc9c;
          color: white;
          border-radius: 50%;
          padding: 2px 5px;
          font-size: 0.75rem;
        }

        .summary-card {
          height: 70%;
          border: none;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .chart-card {
          border: none;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .equal-height {
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }

        .chart-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          background-color: #10b981;
          padding: 0.5rem 1rem;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          margin: 0;
        }

        .custom-progress {
          height: 1rem;
          border-radius: 5px;
        }

        .table-title {
          font-size: 1rem;
          font-weight: bold;
          color: #6c757d;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};
