const db = require('../server/lib/objection');
const User = require('../server/models/User.cjs');
const Label = require('../server/models/Label.cjs');

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe('Label model', () => {
  it('Create label for user and check', async () => {
    // Create a test user
    const user = await User.query().insert({
      email: 'test@example.com',
      password: 'password123',
      first_name: 'Test',
      last_name: 'User',
    });
    // Create a label for this user
    const label = await Label.query().insert({ name: 'bug', user_id: user.id });
    // Check label exists and has correct name and user_id
    expect(label).toBeDefined();
    expect(label.name).toBe('bug');
    expect(label.user_id).toBe(user.id);
    // Fetch labels for user
    const labels = await Label.query().where('user_id', user.id);
    expect(labels.length).toBeGreaterThan(0);
    expect(labels[0].name).toBe('bug');
  });
});
