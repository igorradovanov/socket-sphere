import jest from 'jest-mock';
global.setImmediate = global.setTimeout;
global.io = () => ({
    emit: jest.fn(),
    on: jest.fn(),
});