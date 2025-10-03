const jwt = require('jsonwebtoken');
const tokenFor = (u) =>
  jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
const request = require('supertest');
const { expect } = require('chai');
const app = require('../server');
const User = require('../models/User');
const Project = require('../models/project');
// in test helpers or at top of each test file




describe('Milestones API', () => {
  let client, freelancer, clientToken, freelancerToken, projectId, milestoneId;
  

  
  before(async () => {
    client = await User.create({ name:'Client', email:'c2@test.com', password:'x', role:'CLIENT' });
    freelancer = await User.create({ name:'Free', email:'f2@test.com', password:'x', role:'FREELANCER' });
    clientToken = tokenFor(client);
    freelancerToken = tokenFor(freelancer);

    const p = await Project.create({
      userId: client._id, title:'Gig', description:'desc',
      skills:['Node'], budgetMin:50, budgetMax:200, deadline: new Date(Date.now()+86400000)
    });
    projectId = p._id;
  });

  it('CLIENT creates milestone (201)', async () => {
    const res = await request(app)
      .post(`/api/milestones/${projectId}`)
      .set('Authorization', `Bearer ${clientToken}`)
      .send({ title: 'Design', amount: 60 });
    expect(res.status).to.equal(201);
    milestoneId = res.body._id;
  });

  it('FREELANCER submits milestone (200)', async () => {
    const res = await request(app)
      .patch(`/api/milestones/${milestoneId}/submit`)
      .set('Authorization', `Bearer ${freelancerToken}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('SUBMITTED');
  });

  it('CLIENT approves milestone (200)', async () => {
    const res = await request(app)
      .patch(`/api/milestones/${milestoneId}/approve`)
      .set('Authorization', `Bearer ${clientToken}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('APPROVED');
  });

  it('CLIENT pays milestone (200)', async () => {
    const res = await request(app)
      .post(`/api/milestones/${milestoneId}/pay`)
      .set('Authorization', `Bearer ${clientToken}`);
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal('PAID');
    expect(res.body.paymentStatus).to.equal('CAPTURED');
  });
});
