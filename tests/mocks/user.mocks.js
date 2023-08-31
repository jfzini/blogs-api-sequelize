const mockNewUser = {
  displayName: 'Brett Wiltshire',
  email: 'brett@emails.com',
  password: '123456',
};

const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzcGxheU5hbWUiOiJMZXdpcyBIYW1pbHRvbiIsImVtYWlsIjoibGV3aXNoYW1pbHRvbkBnbWFpbC5jb20iLCJpbWFnZSI6Imh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvMS8xOC9MZXdpc19IYW1pbHRvbl8yMDE2X01hbGF5c2lhXzIuanBnIiwiaWF0IjoxNjkzMzM4MjM4LCJleHAiOjI1NTcyNTE4Mzh9.S5p-D97ne52mFHsXZlLBpP4PMK13UEZnK0sWjmo--eQ';

const mockCreatedUserFromModel = {
  status: 'CREATED',
  data: { token: mockToken },
};

const mockFailedCreatedUserFromModel = {
  status: 'CONFLICT',
  data: { message: 'User already registered' },
};

module.exports = {
  mockNewUser,
  mockToken,
  mockCreatedUserFromModel,
  mockFailedCreatedUserFromModel,
};
