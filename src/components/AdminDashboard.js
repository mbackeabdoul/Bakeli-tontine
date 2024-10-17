import React, { useState, useEffect} from 'react';
import profil from '../images/profile.png';
import { Pagination, Form } from 'react-bootstrap'; // Ajout de Form ici
import { AiOutlineFolder, AiOutlineEye } from 'react-icons/ai'; // Import des icônes d'archives et de prévisualisation
import { IoEyeSharp } from 'react-icons/io5';
import { MdBlockFlipped } from 'react-icons/md';
import { IoArchiveOutline } from 'react-icons/io5';
import { MdCircle } from "react-icons/md";
// import { MdBlock } from "react-icons/md";



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
  Trash2,
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
  { name: 'Juillet', value: 60 },
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState({
    nom: 'Selena',
    prenom: 'Roy',
    dateNaissance: '1998-02-10',
    profession: 'Designer',
    email: 'Selenaroy98@gmail.com',
    telephone: '+221 77 250 11 22',
    adresse: 'HLM Grand Yoff, Dakar',
    organisation: 'Volkeno',
    motDePasse: '********',
    confirmMotDePasse: '********',
  });

  const [formData, setFormData] = useState(selectedUser);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setFormData(user);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const membresParPage = 5;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedUser(formData);
    alert('Mise à jour réussie !');
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Selena Roy',
      startDate: '01/01/2022',
      threshold: '300.000 FCFA',
      progress: 100,
      status: 'Terminé',
    },
    {
      id: 2,
      name: 'Emma Watson',
      startDate: '01/01/2022',
      threshold: '300.000 FCFA',
      progress: 57,
      status: 'En cours',
    },
    {
      id: 3,
      name: 'Jhon Robert',
      startDate: '01/01/2022',
      threshold: '300.000 FCFA',
      progress: 100,
      status: 'Terminé',
    },
    {
      id: 4,
      name: 'Anne Hathaway',
      startDate: '01/01/2022',
      threshold: '300.000 FCFA',
      progress: 50,
      status: 'En cours',
    },
  ]);

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === 'Paramètres') {
      setIsSettingsOpen(!isSettingsOpen);
    } else {
      setIsSettingsOpen(false);
    }
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
              <p className="text-muted">Nombre de cotisation: 23</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="summary-card">
            <Card.Body>
              <div className="d-flex align-items-center">
                <div className="icon-wrapper me-3">
                  <DollarSign
                    size={24}
                    className="icon"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5>Caisse</h5>
                  <p className="amount">3.500.000 FCFA / 5.000.000 FCFA</p>
                  <ProgressBar
                    now={70}
                    variant="success"
                    className="mt-2"
                  />
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
                <ResponsiveContainer
                  width="100%"
                  height={280}
                >
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
                <ResponsiveContainer
                  width="100%"
                  height={280}
                >
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="pie-legend">
                {pieChartData.map((entry, index) => (
                  <div
                    key={index}
                    className="legend-item"
                  >
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

  <div className="row my-4">
  {/* Tableau Juin */}
  <div className="col-md-6">
    <h5 className="table-title">Juin</h5>
    <div className="card mb-4 no-extra-card p-0">
      <div className="card-body">
        <table className="table custom-table">
          <thead>
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
              <td><span className="text-grey">En attente</span></td>
            </tr>
            {/* <tr>
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
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  {/* Tableau Top Progression */}
  <div className="col-md-6">
    <h5 className="table-title">Top progression</h5>
    <div className="card mb-4 no-extra-card">
      <div className="card-body">
        <table className="table custom-table">
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
                <div className="progress-bar-container">
                  <div className="progress-v success" style={{ width: "100%" }}>100%</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Jhon Robert</td>
              <td>01-06-2022</td>
              <td>
                <div className="progress-bar-container">
                  <div className="progress-v success" style={{ width: "100%" }}>100%</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Emma Stone</td>
              <td>01-06-2022</td>
              <td>
                <div className="progress-bar-container">
                  <div className="progress-v info" style={{ width: "64%" }}>64%</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Emma Watson</td>
              <td>01-06-2022</td>
              <td>
                <div className="progress-bar-container">
                  <div className="progress-v info" style={{ width: "57%" }}>57%</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Anne Hathaway</td>
              <td>01-06-2022</td>
              <td>
                <div className="progress-bar-container">
                  <div className="progress-v info" style={{ width: "50%" }}>50%</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>Ravi Shankar</td>
              <td>01-06-2022</td>
              <td>
                <div className="progress-bar-container">
                  <div className="progress-v info" style={{ width: "50%" }}>50%</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

      <Row className="mt-4">
        <Col>
          <div className="pagination-container">
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );

  const renderUsersPage = () => { 
    const users = [
      {
        id: 1,
        name: 'Selena Roy',
        startDate: '01/01/2022',
        threshold: '300.000 FCFA',
        progress: 100,
        status: 'Terminé',
      },
      {
        id: 2,
        name: 'Emma Watson',
        startDate: '01/01/2022',
        threshold: '300.000 FCFA',
        progress: 57,
        status: 'En cours',
      },
      {
        id: 3,
        name: 'Jhon Robert',
        startDate: '01/01/2022',
        threshold: '300.000 FCFA',
        progress: 100,
        status: 'Terminé',
      },
      {
        id: 4,
        name: 'Anne Hathaway',
        startDate: '01/01/2022',
        threshold: '300.000 FCFA',
        progress: 50,
        status: 'En cours',
      },
      {
        id: 5,
        name: 'Ravi Shankar',
        startDate: '01/01/2022',
        threshold: '300.000 FCFA',
        progress: 50,
        status: 'En cours',
      },
      {
        id: 6,
        name: 'Emma Stone',
        startDate: '01/01/2022',
        threshold: '300.000 FCFA',
        progress: 64,
        status: 'En cours',
      },
    ];

    return (
      <div className="users-page">
  <div class="row mb-3">
  <div class="col-md-4">
    <div class="card card-vert">
      <div class="card-body d-flex justify-content-center gap-3">
        <div>
          <h5 class="text-white">Membres Actifs</h5>
          <p class="text-white">94 Membres</p>
        </div>
          <MdCircle />

        {/* <i class="fas fa-user-check icon-active"></i>  */}
      </div>
    </div>
  </div>

  <div class="col-md-4">
    <div class="card">
      <div class="card-body d-flex justify-content-center gap-3">
        <div>
          <h5>Membres Bloqués</h5>
          <p>6 Membres</p>
        </div>
        {/* <MdBlockFlipped /> */}

        {/* <MdBlock /> */}
        {/* <i class="fas fa-user-slash icon-bloque"></i>. */}
      </div>
    </div>
  </div>

  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h5>Total Effectif</h5>
        <p>100 Membres</p>
      </div>
      <AddUserForm show={showAddForm} onHide={toggleAddForm} onAdd={addUser} />
    </div>
  </div>
</div>


        <Row className="d-flex justify-content-end">
          <Button
            className="buttonrow"
            onClick={toggleAddForm}
          >
            Ajouter
          </Button>
        </Row>
        {/* <h2>Utilisateurs</h2> */}
        <div className="users-table my-2">
          <table>
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.startDate}</td>
                  <td>{user.threshold}</td>
                  <td>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: `${user.progress}%`,
                          backgroundColor:
                            user.status === 'Terminé' ? '#10b981' : '#2c3e50',
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">{user.progress}%</span>
                  </td>
                  <td>
                    <span
                      className={`status ${
                        user.status === 'Terminé' ? 'completed' : 'in-progress'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="actions">
                    <Eye size={18} />
                    <IoArchiveOutline size={18} />
                    <MdBlockFlipped size={18} />
                  </td>
                </tr>
                
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button className="prev">Previous page</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button className="next">Next page</button>
        </div>
      </div>
    );
  };

  const renderCotisationsPage = () => {
    const users = [
      { id: 1, name: 'Selena Roy', startDate: '01/01/2022' },
      { id: 2, name: 'Emma Watson', startDate: '01/01/2022' },
      { id: 3, name: 'Jhon Robert', startDate: '01/01/2022' },
      { id: 4, name: 'Anne Hathaway', startDate: '01/01/2022' },
    ];
  
    return (
      <div className="container-fluid">
        {/* Cartes récapitulatives */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card summary-card text-center" style={{ border: 'none', backgroundColor: '#f8f9fa' }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#093545' }}>Juin</h5>
                <p className="amount" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#093545' }}>225.000 FCFA</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card summary-card text-center" style={{ border: 'none', backgroundColor: '#f8f9fa' }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#093545' }}>Mai</h5>
                <p className="amount" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#093545' }}>100.000 FCFA</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card summary-card text-center" style={{ border: 'none', backgroundColor: '#f8f9fa' }}>
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#093545' }}>Total Caisse</h5>
                <p className="amount" style={{ fontSize: '20px', fontWeight: 'bold', color: '#093545' }}>3.500.000 FCFA</p>
                <div className="progress" style={{ height: '8px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '77%', backgroundColor: '#28a745' }}
                    aria-valuenow="77"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >                   
                  </div>
                </div>
                <p className='text-end fs-6'>
                <span style={{color : '#093545' }}> 77% du seuil</span>
                </p>

              </div>
            </div>
          </div>
        </div>
  
        <div className="card custom-card">
        <div className="card-body p-0">
          <table className="table table-responsive custom-table">
            <thead className="custom-thead">
              <tr>
                <th>Membres</th>
                <th>Date début</th>
                <th>Montant cotisé</th>
                <th>Montant restant</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.startDate}</td>
                  <td>200.000 FCFA</td>
                  <td>100.000 FCFA</td>
                  <td>
                    <AiOutlineEye size={18} style={{ cursor: 'pointer' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
  };

  const renderParametersPage = () => (
    <Container fluid>
      <h3 className="mb-4 text-start">Paramètres Généraux</h3>

      <Row>
        <Col md={12}>
          <Card className="settings-card">
            <Card.Body className="d-flex">
              <div className="left-section">
                <h5 className="section-title">Profil</h5>
                <img
                  src={profil}
                  alt="Profil"
                  className="img-fluid rounded-circle mb-3 profile-pic"
                />
                <h6 className="user-name">Ndiaga Sall</h6>
                <p className="user-role">Admin</p>
                <Button
                  variant="primary"
                  className="edit-profile-btn"
                >
                  Éditer profil
                </Button>
              </div>
              <div className="separator"></div> {/* Séparateur vertical */}
              <div className="right-section">
                <h5 className="section-title green-background text-start">
                  Informations Générales
                </h5>
                <Table
                  borderless
                  className="text-left"
                >
                  <tbody>
                    <tr>
                      <td>Prénom</td>
                      <td>Ndiaga</td>
                    </tr>
                    <tr>
                      <td>Nom</td>
                      <td>Sall</td>
                    </tr>
                    <tr>
                      <td>Statut</td>
                      <td>Administrateur</td>
                    </tr>
                    <tr>
                      <td>E-mail</td>
                      <td>ndiaga@gmail.com</td>
                    </tr>
                  </tbody>
                </Table>
                <h6 className="section-title green-background text-start">
                  Statistiques
                </h6>
                <Table
                  borderless
                  className="text-left me-3"
                >
                  <tbody>
                    <tr>
                      <td>Nombre de membres ajoutés</td>
                      <td>25</td>
                    </tr>
                    <tr>
                      <td>Nombre de membres archivés</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Nombre de membres bloqués</td>
                      <td>4</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

  const UserDetailsPage = () => {
    const users = [
      {
        nom: 'Selena',
        prenom: 'Roy',
        dateNaissance: '1998-02-10',
        profession: 'Designer',
        email: 'Selenaroy98@gmail.com',
        telephone: '+221 77 250 11 22',
        adresse: 'HLM Grand Yoff, Dakar',
        organisation: 'Volkeno',
        motDePasse: '********',
        confirmMotDePasse: '********',
      },
      {
        nom: 'Emma',
        prenom: 'Watson',
        dateNaissance: '1990-04-15',
        profession: 'Actrice',
        email: 'emmawatson@gmail.com',
        telephone: '+33 6 77 99 11 22',
        adresse: 'Paris, France',
        organisation: 'Cinéma',
        motDePasse: '********',
        confirmMotDePasse: '********',
      },
      // Ajoutez plus d'utilisateurs si nécessaire
    ];

    return (
      <Container
        fluid
        className="user-details-container"
      >
        <h3 className="page-title">Utilisateurs</h3>
        <Card className="user-details-card">
          <Row className="m-0">
            <h5>Information Générale</h5>
            <Col
              md={3}
              className="user-list p-0"
            >
              <h5>Membres</h5>
              <ul className="list-unstyled">
                {users.map((user, index) => (
                  <li
                    key={index}
                    className={
                      selectedUser.email === user.email ? 'active' : ''
                    }
                    onClick={() => handleUserClick(user)}
                  >
                    {user.prenom} {user.nom}
                  </li>
                ))}
              </ul>
            </Col>
            <Col
              md={9}
              className="user-info"
            >
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-start">Nom</Form.Label>
                      <Form.Control
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-start">Prénom</Form.Label>
                      <Form.Control
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-start">
                        Date de naissance
                      </Form.Label>
                      <Form.Control
                        type="date"
                        name="dateNaissance"
                        value={formData.dateNaissance}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-start">Profession</Form.Label>
                      <Form.Control
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-start">E-mail</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-start">Téléphone</Form.Label>
                      <Form.Control
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-start">Adresse</Form.Label>
                      <Form.Control
                        type="text"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-start">
                        Organisation
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="organisation"
                        value={formData.organisation}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="update-button"
                >
                  Mettre à jour
                </Button>
              </Form>
            </Col>
          </Row>
          {/* Pagination */}
          <Pagination className="">
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </Card>
      </Container>
    );
  };

  const ArchivesPage = () => {
    return (
      <Container
        fluid
        className="archives-container"
      >
        <h3 className="page-title">Archives</h3>
        <Card className="archives-card">
          <Row>
            <Col md={12}>
              <h5>10 Membres Archivés</h5>
              <Table
                striped
                bordered
                hover
              >
                <thead>
                  <tr className="bg-success">
                    <th>Membres</th>
                    <th>Date début</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Selena Roy</td>
                    <td>01/01/2022</td>
                    <td>
                      <Button
                        variant="link"
                        title="Prévisualiser"
                      >
                        <AiOutlineEye />
                      </Button>
                      <Button
                        variant="link"
                        title="Archiver"
                      >
                        <IoArchiveOutline />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Emma Watson</td>
                    <td>01/01/2022</td>
                    <td>
                      <Button
                        variant="link"
                        title="Prévisualiser"
                      >
                        <AiOutlineEye />
                      </Button>
                      <Button
                        variant="link"
                        title="Archiver"
                      >
                        <IoArchiveOutline />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col
              md={12}
              className="d-flex justify-content-center"
            >
              <Pagination>
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Next />
              </Pagination>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  };

  const MembresBloques = () => {
    const membres = [
      { nom: 'Selena Roy', dateDebut: '01/01/2022' },
      { nom: 'Emma Watson', dateDebut: '01/01/2022' },
      { nom: 'John Robert', dateDebut: '01/01/2022' },
      { nom: 'Anne Hathaway', dateDebut: '01/01/2022' },
      { nom: 'Ravi Shankar', dateDebut: '01/01/2022' },
      { nom: 'Emma Stone', dateDebut: '01/01/2022' },
    ];

    const indexOfLastMembre = currentPage * membresParPage;
    const indexOfFirstMembre = indexOfLastMembre - membresParPage;
    const currentMembres = membres.slice(indexOfFirstMembre, indexOfLastMembre);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <div className="card">
        <div className="card-header bg-light">
          <h5 className="card-title mb-0">6 Membres Bloqués</h5>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead className="bg-success text-white">
              <tr>
                <th>Membres</th>
                <th>Date début</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMembres.map((membre, index) => (
                <tr key={index}>
                  <td>{membre.nom}</td>
                  <td>{membre.dateDebut}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-2">
                      <IoEyeSharp />

                      {/* <i className="bi bi-eye"></i> */}
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      {/* <i className="bi bi-ban"></i> */}
                      <MdBlockFlipped />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({
                length: Math.ceil(membres.length / membresParPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(membres.length / membresParPage)
                    ? 'disabled'
                    : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return renderDashboard();
      case 'Gestion des Utilisateurs': // Cas pour le sidebar
        return renderUsersPage();
      case 'Cotisations':
        return renderCotisationsPage();
      case 'Paramètres':
        return renderParametersPage();
      case 'Paramètres généraux': // Cas pour Paramètres généraux
        return renderParametersPage();
      case 'Utilisateurs Paramètre': // Cas pour Utilisateurs du dropdown Paramètres
        return UserDetailsPage();
      case 'Archivés':
        return ArchivesPage();
      case 'Membres bloqués':
        return MembresBloques();
      default:
        return <div>Contenu non disponible</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>

          <div className="sidebar-header">
            <Wallet size={24} />
            <span>Bakéli Tontine</span>
          </div>
          <ul>
            {[
              { icon: TrendingUp, label: 'Dashboard' },
              { icon: Users, label: 'Gestion des Utilisateurs' },
              { icon: Wallet, label: 'Cotisations' },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className={activeItem === label ? 'active' : ''}
                onClick={() => handleItemClick(label)}
              >
                <Icon size={20} />
                <span>{label}</span>
              </li>
            ))}
            <li className={`dropdown ${isSettingsOpen ? 'active' : ''}`}>
              <div
                onClick={() => handleItemClick('Paramètres')}
                className="dropdown-header"
              >
                <Settings size={20} />
                <span>Paramètres</span>
                <ChevronDown
                  size={16}
                  className={`dropdown-icon ${isSettingsOpen ? 'open' : ''}`}
                />
              </div>
            </li>
            {isSettingsOpen && (
              <ul className="dropdown-content">
                <li onClick={() => handleItemClick('Paramètres généraux')}>
                  Paramètres généraux
                </li>
                <li onClick={() => handleItemClick('Utilisateurs Paramètre')}>
                  Utilisateurs
                </li>
                <li onClick={() => handleItemClick('Archivés')}>Archivés</li>
                <li onClick={() => handleItemClick('Membres bloqués')}>
                  Membres bloqués
                </li>
              </ul>
            )}
          </ul>
        </aside>

        <div className="main-section">
          <nav className="navbar">
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            ☰
          </button>
            <h1 className="navbar-title">{activeItem}</h1>
            <div className="user-info">
              {/* Existing Notification and User Dropdown */}
              <Dropdown>
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="notification-dropdown"
                >
                  <div className="notification-icon-wrapper">
                    <Bell
                      size={20}
                      className="notification-icon"
                    />
                    <span className="notification-badge">1</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  align="end"
                  className="notification-menu"
                >
                  <Dropdown.Item>
                    <div className="notification-item">
                      <span className="notification-title">
                        Nouvelle cotisation
                      </span>
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
                <img
                  src={profil}
                  alt="User"
                  className="user-avatar"
                />
                <div className="user-info-text">
                  <span className="user-name">Ndiaga SALL</span>
                  <span className="user-role">Administrator</span>
                </div>
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="user-dropdown"
                  >
                    <ChevronDown
                      size={16}
                      className="dropdown-icon"
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Paramètres</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="text-danger">
                      Déconnexion
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </nav>

          <main className="main-content">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}
