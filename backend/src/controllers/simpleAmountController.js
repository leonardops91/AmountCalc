module.exports = {
    calculate (req, res) {
        let {
            initValue,
            monthlyValue,
            monthlyInterest,
            yearlyInterest,
            numberOfYears,
            numberOfMonths
        } = req.body;
    
        
        let period = convertYearToMonth(numberOfMonths, numberOfYears);

        let interest = convertPercentToDecimal(yearlyInterest, monthlyInterest);
     
        let monthlyAmount = calculateMonthlyAmount(period, monthlyValue, interest);

        let amountInvested = monthlyValue *  period + initValue*1;
        let totalAmount = initValue*1 + (initValue * interest * period) + (monthlyAmount*1); 
    
        return res.json({totalAmount, amountInvested});
    }
};

function calculateMonthlyAmount(period, monthlyValue, interest) {
    let monthlyAmount = 0
    if(monthlyValue == "")
        return monthlyAmount;

    for (let i = 0; i < period; i++) {
        let Amount = monthlyValue * 1 + (monthlyValue * interest * i);
        monthlyAmount += Amount;
    }
    return monthlyAmount;
}

function convertPercentToDecimal(yearlyInterest, monthlyInterest) {
    let iPerYear = yearlyInterest / 100;

    if (monthlyInterest == "")
        return iPerYear / 12;
    else
        return monthlyInterest / 100;
}

function convertYearToMonth(numberOfMonths, numberOfYears) {
    if (numberOfMonths == "")
        return numberOfYears * 12;
    else
        return numberOfMonths * 1;
}
