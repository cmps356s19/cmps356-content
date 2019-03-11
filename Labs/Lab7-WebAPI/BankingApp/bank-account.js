class BankAccount {
    constructor(accountNo, acctType, balance) {
        this.accountNo = accountNo;
        this.acctType = acctType;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
    }

    withdraw(amount) {
        this.balance -= amount;
    }

    toString() {
        return `${this.acctType} Account #${this.accountNo} has ${this.balance} QR balance.`;
    }
}

module.exports = BankAccount;