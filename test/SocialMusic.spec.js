const SocialMusic = artifacts.require("SocialMusic");

const chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;

chai.use(chaiBN);
chai.use(chaiAsPromised);

contract("Social Music", async accounts => {
    const [initialAddress] = accounts;

    let instance;

    beforeEach(async () => {
        instance = await SocialMusic.deployed();
    });

    it('should set userExists after setup', async () => {
        await instance.setup('testname', 25, 'Test descr');

        const result = await instance.hasAccount();

        expect(result).to.be.true;
    });
});

