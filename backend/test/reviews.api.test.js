const jwt = require('jsonwebtoken');
const tokenFor = (u) =>
  jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const User = require('../models/User');
const Project = require('../models/project');

describe('Reviews API', () => {
  let client, freelancer, clientToken, project;

  before(async () => {
    client = await User.create({ name: 'C', email: 'c3@test.com', password: 'x', role:'CLIENT' });
    freelancer = await User.create({ name:'F', email: 'f3@test.com', password: 'x', role:'FREELANCER' });
    clientToken = tokenFor(client);
    project = await Project.create({
      userId: client._id, title: 'Proj', description:'', skills:[], budgetMin:1, budgetMax:2, deadline: new Date()
    });
  });

  it('Create review (201)', async () => {
    const res = await request(app)
      .post('/api/reviews')
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ projectId: project._id, toUserId: freelancer._id, rating: 5, comment: 'Great' });
    expect(res.status).to.equal(201);
  });

  it('Get reviews summary for user (200)', async () => {
    const res = await request(app)
      .get(`/api/reviews/for/${freelancer._id}`)
      .set('Authorization', `Bearer ${clientToken}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('avg');
    expect(res.body).to.have.property('count');
  });
});
