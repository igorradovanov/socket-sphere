import jest from 'jest-mock';
global.setImmediate = global.setTimeout;
global.io = function () { return ({
    emit: jest.fn(),
    on: jest.fn(),
}); };
