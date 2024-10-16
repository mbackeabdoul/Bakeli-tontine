import React, { useState } from 'react';
import profil from '../images/profile.png';
import { Pagination, Form } from 'react-bootstrap'; // Ajout de Form ici
import { AiOutlineFolder, AiOutlineEye } from 'react-icons/ai'; // Import des icônes d'archives et de prévisualisation

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

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setFormData(user); // Initialiser le formulaire avec les données de l'utilisateur sélectionné
  };
 const [currentPage, setCurrentPage] = useState(1);
  const membresParPage = 5;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedUser(formData); // Simuler la mise à jour de l'utilisateur sélectionné avec les nouvelles données
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
              <p className="text-muted small">Nombre de cotisation: 23</p>
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

      <Row className="my-4">
        <Col md={6}>
          <h5 className="table-title">Juin</h5>
          <Card className="mb-4 no-extra-card">
            <Card.Body>
              <Table
                responsive
                borderless
                className="custom-table"
              >
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
                    <td>
                      <span className="text-success">Validé</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Emma Watson</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td>
                      <span className="text-primary">En attente</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Jhon Robert</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td>
                      <span className="text-success">Validé</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Anne Hathaway</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td>
                      <span className="text-primary">En attente</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ravi Shankar</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td>
                      <span className="text-success">Validé</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Emma Stone</td>
                    <td>25.000 FCFA</td>
                    <td>01-06-2022</td>
                    <td>
                      <span className="text-success">Validé</span>
                    </td>
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
              <Table
                responsive
                borderless
                className="custom-table"
              >
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
                      <ProgressBar
                        now={100}
                        label={`100%`}
                        variant="success"
                        className="custom-progress"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Jhon Robert</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar
                        now={100}
                        label={`100%`}
                        variant="success"
                        className="custom-progress"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Emma Stone</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar
                        now={64}
                        label={`64%`}
                        variant="info"
                        className="custom-progress"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Emma Watson</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar
                        now={57}
                        label={`57%`}
                        variant="info"
                        className="custom-progress"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Anne Hathaway</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar
                        now={50}
                        label={`50%`}
                        variant="info"
                        className="custom-progress"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Ravi Shankar</td>
                    <td>01-06-2022</td>
                    <td>
                      <ProgressBar
                        now={50}
                        label={`50%`}
                        variant="info"
                        className="custom-progress"
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
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

  const renderUsersPage = () => (
    <Container fluid>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        {/* <h1 className="h2">Utilisateurs</h1> */}
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
          <Button
            variant="primary"
            onClick={toggleAddForm}
          >
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.startDate}</td>
                  <td>{user.threshold}</td>
                  <td>
                    <ProgressBar
                      now={user.progress}
                      label={`${user.progress}%`}
                    />
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === 'Terminé' ? 'bg-success' : 'bg-warning'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <Eye
                      size={18}
                      className="me-2"
                      style={{ cursor: 'pointer' }}
                    />
                    <Edit
                      size={18}
                      className="me-2"
                      style={{ cursor: 'pointer' }}
                    />
                    <Trash2
                      size={18}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <AddUserForm
        show={showAddForm}
        onHide={toggleAddForm}
        onAdd={addUser}
      />
    </Container>
  );

  const renderCotisationsPage = () => (
    <Container fluid>
      {/* <h1 className="mb-4 text-start">Cotisations</h1> */}
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
              <ProgressBar
                now={77}
                label={`77% du seuil`}
                variant="success"
              />
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.startDate}</td>
                  <td>200.000 FCFA</td>
                  <td>100.000 FCFA</td>
                  <td>
                    <Eye
                      size={18}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );

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

      <style jsx>{`
        .settings-card {
          background-color: #f8f9fa;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .d-flex {
          display: flex;
          justify-content: space-between;
        }

        .left-section {
          width: 40%;
          padding-right: 2rem;
        }

        .right-section {
          width: 60%;
        }

        .section-title {
          font-size: 1rem;
          font-weight: bold;
          color: white;
          margin-bottom: 1rem;
          padding: 0.5rem;
          text-align: center;
        }

        .green-background {
          background: #20df7f;
          border-radius: 5px;
          color: #093545;
        }

        .text-left {
          text-align: right; /* Alignement à gauche pour tout le texte */
        }

        .profile-pic {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }

        .user-name {
          font-size: 1.1rem;
          font-weight: bold;
          margin-top: 0.5rem;
          color: #083a50;
        }

        .user-role {
          color: #6c757d;
        }

        .edit-profile-btn {
          background-color: #093545;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 8px;
          color: white;
        }

        .separator {
          width: 1px;
          background-color: #ddd;
          margin: 0 2rem;
          height: auto;
        }
      `}</style>
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
      <Container fluid className="user-details-container">
        <h3 className="page-title">Utilisateurs</h3>
        <Card className="user-details-card">
          <Row className='m-0'>
            <h5>Information Générale</h5>
            <Col md={3} className="user-list p-0">
              <h5>Membres</h5>
              <ul className="list-unstyled">
                {users.map((user, index) => (
                  <li
                    key={index}
                    className={selectedUser.email === user.email ? 'active' : ''}
                    onClick={() => handleUserClick(user)}
                  >
                    {user.prenom} {user.nom}
                  </li>
                ))}
              </ul>
            </Col>
            <Col md={9} className="user-info">
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
                      <Form.Label className="text-start">Date de naissance</Form.Label>
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
                      <Form.Label className="text-start">Organisation</Form.Label>
                      <Form.Control
                        type="text"
                        name="organisation"
                        value={formData.organisation}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" className="update-button">
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
      <Container fluid className="archives-container">
        <h3 className="page-title">Archives</h3>
        <Card className="archives-card">
          <Row>
            <Col md={12}>
              <h5>10 Membres Archivés</h5>
              <Table striped bordered hover>
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
                      <Button variant="link" title="Archiver">
                        <AiOutlineFolder />
                      </Button>
                      <Button variant="link" title="Prévisualiser">
                        <AiOutlineEye />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Emma Watson</td>
                    <td>01/01/2022</td>
                    <td>
                      <Button variant="link" title="Archiver">
                        <AiOutlineFolder />
                      </Button>
                      <Button variant="link" title="Prévisualiser">
                        <AiOutlineEye />
                      </Button>
                    </td>
                  </tr>
                  {/* Ajoutez d'autres lignes selon besoin */}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="d-flex justify-content-center">
              {/* <Button variant="success">Archives</Button> */}
              {/* Pagination */}
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
    { nom: "Selena Roy", dateDebut: "01/01/2022" },
    { nom: "Emma Watson", dateDebut: "01/01/2022" },
    { nom: "John Robert", dateDebut: "01/01/2022" },
    { nom: "Anne Hathaway", dateDebut: "01/01/2022" },
    { nom: "Ravi Shankar", dateDebut: "01/01/2022" },
    { nom: "Emma Stone", dateDebut: "01/01/2022" },
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
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <i className="bi bi-ban"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                Previous
              </button>
            </li>
            {Array.from({ length: Math.ceil(membres.length / membresParPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === Math.ceil(membres.length / membresParPage) ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
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
        return  UserDetailsPage();
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
        <aside className="sidebar">
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
    <ChevronDown size={16} className={`dropdown-icon ${isSettingsOpen ? 'open' : ''}`} />
  </div>
</li>
{isSettingsOpen && (
  <ul className="dropdown-content">
    <li onClick={() => handleItemClick('Paramètres généraux')}>Paramètres généraux</li>
    <li onClick={() => handleItemClick('Utilisateurs Paramètre')}>Utilisateurs</li>
    <li onClick={() => handleItemClick('Archivés')}>Archivés</li>
    <li onClick={() => handleItemClick('Membres bloqués')}>Membres bloqués</li>
  </ul>
)}
</ul>
        </aside>
  
        <div className="main-section">
          <nav className="navbar">
            <h1 className="navbar-title">{activeItem}</h1>
            <div className="user-info">
              {/* Existing Notification and User Dropdown */}
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
  
          <main className="main-content">
            {renderContent()}
          </main>
        </div>
      </div>
  
      <style jsx>{`
        .admin-dashboard {
          display: flex;
          height: 100vh;
        }
  
        .dashboard-content {
          display: flex;
          flex-direction: row;
          width: 100%;
        }
  
        .sidebar {
          width: 250px;
          background-color: #1e293b;
          color: white;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
  
        .main-section {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
  
        .dropdown {
          position: relative;
        }
  
        .dropdown-header {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
  
        .dropdown-content {
          margin-top: 0.5rem;

          background-color: #374151;
          border-radius: 5px;
          list-style: none;
          padding: 0;
          position: absolute;
          margin-top:20
          width: 100%;
        }
  
        .dropdown-content li {
          padding: 0.5rem;
          cursor: pointer;
          color: white;
          margin: bottom
        }
  
        .dropdown-content li:hover {
          background-color: #475569;
        }
  
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
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
          padding: 1px 5px;
          font-size: 0.75rem;
        }
  
        .user-details {
          display: flex;
          align-items: center;
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

        .pie-legend {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          margin-right: 15px;
        }

        .legend-color {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          margin-right: 5px;
        }

        .legend-label {
          font-size: 14px;
          color: #333;
        }
           /* ... (autres styles) ... */
  .dropdown-icon {
    transition: transform 0.3s ease;
  }
  .dropdown-icon.open {
    transform: rotate(180deg);
  }
  .dropdown-content {
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #2c3e50;
  }
  .dropdown-content li {
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    cursor: pointer;
  }
  .dropdown-content li:hover {
    background-color: #34495e;
  }

 .user-details-container {
  padding: 20px;
  background-color: #f8f9fa;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
  color: #000;
  box-shadow: none; /* Pas d'ombre pour le titre */
}

.user-details-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: none;
}

.user-list {
  border-right: 1px solid #e0e0e0;
  padding-right: 20px;
}

.user-list h5 {
  color: #333;
  margin-bottom: 15px;
}

.user-list ul {
  list-style-type: none;
  padding-left: 0;
}

.user-list li {
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-list li.active,
.user-list li:hover {
  background-color: #00bfa6;
  color: #fff;
}

.user-info h5 {
  margin-bottom: 20px;
  color: #333;
}

.update-button {
  background-color: #093545; /* Couleur de fond du bouton */
  border: none; /* Supprimer la bordure */
  padding: 10px 20px; /* Espacement interne */
  color: #FFFFFF; /* Couleur du texte */
  float: right; /* Positionner le bouton à droite */
  border-radius: 8px; /* Arrondi des coins du bouton */
  cursor: pointer; /* Changer le curseur au survol */
}


.update-button:hover {
  background-color: #008f7a;
}


      `}</style>
    </div>
  );
}  
