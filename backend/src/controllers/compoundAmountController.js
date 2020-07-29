module.exports = {
    calculate (req, res) {
        let {
            initValue,
            monthlyValue,
            monthlyInterest,
            yearlyInterest,
            numberOfYears,
            numberOfMonths,
            totContribution
        } = req.body;
    
        if (numberOfMonths == "") {
            numberOfMonths = numberOfYears*12;
        }
        let iPerMonth;
        let iPerYear = yearlyInterest/100;
        if (monthlyInterest == "") {
            iPerMonth = (Math.pow(1+iPerYear, 1/12)-1);
        }else{
            iPerMonth = monthlyInterest/100;
        };
        totContribution = initValue;
        let amount = initValue*(Math.pow((1+iPerMonth), numberOfMonths));
        if (monthlyValue != "") {
            let amountOfMonthlyValue = (monthlyValue*(Math.pow((1+iPerMonth), (numberOfMonths))-1))/iPerMonth;
            amount = amount +amountOfMonthlyValue;
            totContribution = monthlyValue * numberOfMonths + initValue*1;
        }
    
        return res.json({amount, totContribution});
    }
}