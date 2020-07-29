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

        let interest = ConvertPercentToDecimal(yearlyInterest, monthlyInterest);
     
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

function ConvertPercentToDecimal(yearlyInterest, monthlyInterest) {
    let interest;
    let iPerYear = yearlyInterest / 100;

    if (monthlyInterest == "")
        interest = iPerYear / 12;
    else
        interest = monthlyInterest / 100;
    return interest;
}

function convertYearToMonth(numberOfMonths, numberOfYears) {
    if (numberOfMonths == "")
        numberOfMonths = numberOfYears * 12;
    else
        numberOfMonths = numberOfMonths * 1;
    return numberOfMonths;
}
