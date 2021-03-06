module.exports = {
    calculate (req, res) {
        let {
            initValue,
            monthlyValue,
            monthlyInterest,
            yearlyInterest,
            numberOfYears,
            numberOfMonths,
            amountInvested
        } = req.body;
        
        if(numberOfMonths == "")
            numberOfMonths = convertYearToMonth(numberOfYears);

        let interest;
        if (monthlyInterest == "") 
            interest = yearlyInterestToMonthly(yearlyInterest);
        else
            interest = monthlyInterest/100;

        let amountOfInitValue = calculateInitAmount(initValue, interest, numberOfMonths);
        let amountOfMonthlyValue = calculateMonthlyAmount(monthlyValue, interest, numberOfMonths);

        amountInvested = monthlyValue * numberOfMonths + initValue*1;
        totalAmount = amountOfInitValue + amountOfMonthlyValue;
        

        return res.json({totalAmount, amountInvested});
    }
}

function calculateInitAmount(initValue, interest, numberOfMonths) {
    return initValue * (Math.pow((1 + interest), numberOfMonths));
}

function calculateMonthlyAmount(monthlyValue, interest, numberOfMonths) {
    if (monthlyValue == "")
        return 0;

    return (monthlyValue * (Math.pow((1 + interest), numberOfMonths) - 1)) / interest;
}

function yearlyInterestToMonthly(yearlyInterest) {
    return (Math.pow((1 + (yearlyInterest/100)), 1 / 12) - 1);
}

function convertYearToMonth(numberOfYears) {
    return numberOfYears * 12;
}
