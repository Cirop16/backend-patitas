import chai from 'chai';
import sinon from 'sinon';
import usersController from '../src/controllers/users.controller.js';
import { usersService } from '../src/services/index.js';

const expect = chai.expect;

describe('User Controller', () => {
    afterEach(() => {
        sinon.restore();
    });
    it('getAllUsers debe devolver todos los usuarios', async () => {

        const fakeUsers = [ { id: 1, name: 'John Doe', age: 19 }, { id: 2, name: 'Jane Doe' , age: 21 } ];
        sinon.stub(usersService, 'getAll').resolves(fakeUsers); 
        const req = {};
        const res = {send: sinon.spy()};

        await usersController.getAllUsers(req, res);
        
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.firstCall.args[0]).to.deep.equal({ status: 'success', payload: fakeUsers });
    });
});