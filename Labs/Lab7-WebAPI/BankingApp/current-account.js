let BankAccount = require('./bank-account')

class CurrentAccount extends BankAccount {

    constructor(accountNo, acctType, balance, monthlyFee) {
        super(accountNo, acctType, balance);
        this.monthlyFee = monthlyFee;
    }

    deductFee() {
        if (this.balance >= this.monthlyFee) {
            super.withdraw(this.monthlyFee);
            //console.log(`Balance is ${super.balance} Fee is ${this.monthlyFee}`);
        }
    }

    toString() {
        return `${super.toString()} Minimum Balance ${this.monthlyFee}`;
    }
}

module.exports = CurrentAccount;