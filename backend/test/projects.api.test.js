/*const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Project = require('../models/project');

function tokenFor(u) { return jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); }

describe('Projects API', () => {
  let client, clientToken, projectId;

  before(async () => {
    client = await User.create({ name:'Client', email:'client@test.com', password:'x', role:'CLIENT' });
    clientToken = tokenFor(client);
  });

  it('CREATE project (201)', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({
        title: 'Site',
        description: 'desc',
        skills: ['React'],
        budgetMin: 100, budgetMax: 500,
        deadline: '2026-01-01'
      });
    expect(res.status).to.equal(201);
    projectId = res.body._id;
  });

  it('READ list (200)', async () => {
    const res = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${clientToken}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('UPDATE project (200)', async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ title: 'Site Updated' });
    expect(res.status).to.equal(200);
    expect(res.body.title).to.equal('Site Updated');
  });

  it('DELETE project (200)', async () => {
    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${clientToken}`);
    expect(res.status).to.equal(200);
    const still = await Project.findById(projectId);
    expect(still).to.equal(null);
  });
});
*/
const jwt = require('jsonwebtoken');
const tokenFor = (u) =>
  jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const User = require('../models/User');
const Project = require('../models/project');

describe('Projects API', () => {
  let clientToken, projectId;

  before(async () => {
    const client = await User.create({ name:'Client', email:'client@test.com', password:'x', role:'CLIENT' });
    clientToken = tokenFor(client);
  });

  it('CREATE (201)', async () => {
    const res = await request(app).post('/api/projects')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ title:'Site', description:'desc', skills:['React'], budgetMin:100, budgetMax:500, deadline:'2026-01-01' });
    expect(res.status).to.equal(201);
    projectId = res.body._id;
  });

  it('READ list (200)', async () => {
    const res = await request(app).get('/api/projects')
      .set('Authorization', `Bearer ${clientToken}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});

