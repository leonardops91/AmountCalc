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

        if (monthlyInterest == "") 
            monthlyInterest = yearlyInterestToMonthly(yearlyInterest);
        let interest = convertPercentToDecimal(monthlyInterest);

        let amountOfInitValue = CalculateInitAmount(initValue, interest, numberOfMonths);
        let amountOfMonthlyValue = calculateMonthlyAmount(monthlyValue, interest, numberOfMonths);

        amountInvested = monthlyValue * numberOfMonths + initValue*1;
        totalAmount = amountOfInitValue + amountOfMonthlyValue;
        
        
        return res.json({totalAmount, amountInvested});
    }
}

function convertPercentToDecimal(monthlyInterest) {
    return monthlyInterest / 100;
}

function CalculateInitAmount(initValue, interest, numberOfMonths) {
    return initValue * (Math.pow((1 + interest), numberOfMonths));
}

function calculateMonthlyAmount(monthlyValue, interest, numberOfMonths) {
    if (monthlyValue == "")
        return 0;

    return (monthlyValue * (Math.pow((1 + interest), numberOfMonths) - 1)) / interest;
}

function yearlyInterestToMonthly(yearlyInterest) {
    return (Math.pow(1 + yearlyInterest, 1 / 12) - 1);
}

function convertYearToMonth(numberOfYears) {
    return numberOfYears * 12;
}
