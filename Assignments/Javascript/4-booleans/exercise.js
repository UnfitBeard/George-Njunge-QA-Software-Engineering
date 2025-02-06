import bcrypt from 'bcrypt'

function verifyPassword(inputPassword, storedHashedPassword){
    if (bcrypt.compare(inputPassword, storedHashedPassword) == true) {
        return true;
    } else {
        return false;
    }
}

function verifyMFA(inputMFACode, correctMFACode) {
    if (inputMFACode == correctMFACode) {
        return true;
    }else {
        return false;
    }
}

function checkBalance(balance, withdrawalAmount) {
    if (balance >= withdrawalAmount) {
        return true;
    } else {
        return true;
    }
}

function checkDailyLimit(withdrawalAmount , dailyLimit) {
    if (withdrawalAmount <= dailyLimit) {
        return true;
    }else {
        return false;
    }
}

function processWithdrawal(user, inputPassword, inputMFACode, withdrawalAmount) {
    if (!verifyPassword(inputPassword, user.hashedPassword)) {
        return "Transaction Failed: Incorrect password."
    }
    if (!verifyMFA(inputMFACode, user.correctMFACode)) {
        return "Transaction Failed: MFA failed."
    }
    if (!checkBalance(balance, withdrawalAmount)) {
        return "Transaction Failed: Insufficient balance."
    }
    if (!checkDailyLimit(withdrawalAmount , user.dailyLimit)) {
        return "Transaction Failed: Amount exceeds daily limit."
    }

    if (!user.balance == withdrawalAmount) {
        return `Transaction Successful! New Balance: "+ ${user.balance}`
    }
}



//Importance of storing passwords in hashed format
console.log("To prevent hackers from accessing the passwords when data breaches occur. Its not easy to retrieve the original password")

//How implementing MFA enhances the security of the transaction process
console.log(`users are required to authenticate more than one time meaning that when the one authentication factor is compromised the unauthorized user/attacker cannot omplete the transaction without the additional verification steps, significantly reducing the risk of fraud`)
//Types of attacks it helps prevent
console.log("Phishing - malicious actors trying to trick users into revealing their credentials")
console.log("Brute Force Attacks - makes it harder for attackers to try multiple password combinations")
console.log("Man in the middle Attacks - prevent an attacker from intercepting log in credentials during transmission by requiring additional verification")

//necessity of balance verification 
console.log("To avoid fraudulent behaviour - prevent discrepancies in customer accounts")
console.log("regulatory compliance - helps in audits and financial reporting to ensure regulation are being adhered to")
console.log("Customer trust and satisfaction - prevents issues like incorrect debits or credits")
console.log("Avoid financial losses - losing money due to incorrect balance calculations")

//Importance of a daily transactional limit
console.log("Protection against errors - limits prevent accidental large transfers")
console.log("Fraud prevention and security - prevent financial losses due to fraud, hacking or unauthorized transactions.")
console.log("Regulatory Compliance - many regulations require banks to impose limits to prevent money laundering and financial crimes")

//Improvement
console.log("I would use machine learning model that uses anomaly detection to flag unusual transactions and with real time scoring to assess a fraud risk and act based on threshholds")
console.log("Features implemented will be Fraud Detetction API using a third party detection software like IBM Trusteer, Feedzai or custom ML models")
console.log("Additional data to be tracked include :Transaction location, amount, frequency, time, device info, account activity, blacklist databases, known fraud patterns")

    