module.exports = {
    calculate (req, res) {
        let {
            initValue,
            monthlyValue,
            intPerMonth,
            intPerYear,
            numberOfYears,
            numberOfMonths
        } = req.body;
    
        let monthlyAmount;
    
        if (numberOfMonths == "")
            numberOfMonths = numberOfYears*12;
        else
            numberOfMonths = numberOfMonths*1;
        
        let iPerMonth;
        let iPerYear = intPerYear/100;
    
        if (intPerMonth == "")
            iPerMonth = iPerYear/12;
        else
            iPerMonth = intPerMonth/100;
    
        if (monthlyValue == "")
            monthlyValue = 0;
        
        let totMonthlyAmount = 0;
        for (let i = 0; i < numberOfMonths; i++) {
            monthlyAmount = monthlyValue*1 + (monthlyValue * iPerMonth * i);
            totMonthlyAmount += monthlyAmount;
        }
        
        totContribution = monthlyValue * numberOfMonths + initValue*1;
        let amount = (initValue*1 + (initValue * iPerMonth * numberOfMonths)) + (totMonthlyAmount*1); 
    
        return res.json({amount, totContribution});
    }
};