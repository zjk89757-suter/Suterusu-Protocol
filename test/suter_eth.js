const SuterETH = artifacts.require('SuterETH');
const Client = require('../src/client.js');

contract("SuterETH", async (accounts) => {
    let alice;
    let bob;

    it("should allow register", async () => {
        let suter = (await SuterETH.deployed()).contract;
        alice = new Client(web3, suter, accounts[0]);
        await alice.register();
        assert.exists(
            alice.account.keypair,
            "Registration failed"
        );
    });

    it("should allow funding", async () => {
        await alice.deposit(100);
    });

    it("should allow reading balance", async () => {
        let balance = await alice.readBalanceFromContract();
        assert.equal(
            balance,
            100,
            "Wrong balance"
        );
        let localTrackedBalance = alice.account.balance();
        assert.equal(
            balance,
            localTrackedBalance,
            "Contract balance does not match locally tracked balance"
        );
    });

    it("should allow withdrawing", async () => {
        await alice.withdraw(50); 
        let balance1 = await alice.readBalanceFromContract(); 
        let balance2 = alice.account.balance();
        assert.equal(
            balance1,
            50,
            "Wrong contract balance after withdrawing"
        );
        assert.equal(
            balance2,
            50,
            "Wrong locally tracked balance after withdrawing"
        );
    });

});