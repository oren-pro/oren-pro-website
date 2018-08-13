import { login, logout } from '../../actions/auth';

test('should generate login action object', () => {
    const uid = 'abc123';
    const action = login(uid);
    expect(action). toEquale({
        type: 'LOGIN',
        uid
    });
});

test('should generate logout action object', () => {
    const action = logout();
    expect(action). toEquale({
        type: 'LOGOUT'
    });
});