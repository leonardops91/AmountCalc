import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';




import logo from '../../assets/logo.png';
import './style.css';

export default function Simple(){
    const [initValue, setInitValue] = useState('');
    const [monthlyValue, setMonthlyValue] = useState('');
    const [intPerMonth, setIntPerMonth] = useState('');
    const [intPerYear, setIntPerYear] = useState('');
    const [numberOfMonths, setNumberOfMonths] = useState('');
    const [numberOfYears, setNumberOfYears] = useState('');
    const [amount, setAmount] = useState('');
    const [totContribution, setTotContribution] = useState('');


    const data = {
        initValue: initValue.replace("," , "."),
        monthlyValue: monthlyValue.replace("," , "."),
        intPerMonth: intPerMonth.replace("," , "."),
        intPerYear: intPerYear.replace("," , "."),
        numberOfMonths: numberOfMonths.replace("," , "."),
        numberOfYears: numberOfYears.replace("," , ".")
    };

    
    async function handleCompound(e) {
        e.preventDefault();



        try {
            const response = await api.post('/simple', data);
            setAmount(response.data.amount);
            setTotContribution(response.data.totContribution);
                        
        } catch (error) {
            alert('Erro no envio, tente novamente.');
        };
    }
    function handleReset() {
        setInitValue("");
        setMonthlyValue("");
        setIntPerMonth("");
        setIntPerYear("");
        setNumberOfMonths("");
        setNumberOfYears("");
    }
    

    return(
        <div className="container">
            <div className="header">
                <img src={logo} alt="Amount calc"/>
                <Link to="/">Página inicial</Link>
            </div>
            <div className="form">
                <h1>Calculadora de juros simples</h1>
                <h3>Aportes:</h3>
                <form id = "values" onSubmit={handleCompound}  onReset={handleReset}>
                    <div className = "input">
                        <div><p style={{borderTopLeftRadius: 8,
                                        borderBottomLeftRadius: 8,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0}}>
                                            R$
                            </p><input type="double" style={{borderTopLeftRadius: 0,
                                                        borderBottomLeftRadius: 0,
                                                        borderTopRightRadius: 8,
                                                        borderBottomRightRadius: 8}}
                                                        value={initValue}
                                                        onChange={e => setInitValue(e.target.value)}
                                                        placeholder="Valor inicial"/></div>
                        <div><p style={{borderTopLeftRadius: 8,
                                        borderBottomLeftRadius: 8,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0}}>
                                            R$
                            </p><input type="double" style={{borderTopLeftRadius: 0,
                                                        borderBottomLeftRadius: 0,
                                                        borderTopRightRadius: 8,
                                                        borderBottomRightRadius: 8}}
                                                        value={monthlyValue}
                                                        onChange={e => setMonthlyValue(e.target.value)} 
                                                        placeholder="Aporte mensal"/></div>
                    </div>
                    <h3>Taxa de juros:</h3>
                    <div className = "input">
                        <div><input type="double"
                        value={intPerMonth}
                        onChange={e => setIntPerMonth(e.target.value)}  
                        placeholder="Taxa de juros mensais"/><p>%</p></div>
                        <div><input type="double"
                        value={intPerYear}
                        onChange={e => setIntPerYear(e.target.value)}
                        placeholder="Taxa de juros anuais"/><p>%</p></div>
                    </div>
                    <h3>Período de permanência</h3>
                    <div className = "input">
                        <div><input type="double"
                        value={numberOfMonths}
                        onChange={e => setNumberOfMonths(e.target.value)}
                        placeholder="Periodo em meses"/><p>Meses</p></div>
                        <div><input type="double"
                        value={numberOfYears}
                        onChange={e => setNumberOfYears(e.target.value)}
                        placeholder="Periodo em anos"/><p>Anos</p></div>
                    </div>

                    <div className="button">
                        <button type="submit">Calcular</button>
                        {amount > 0 && <button type = "reset" >resetar</button>}
                    </div>
                <section className="result">
                    {amount > 0 &&
                        <div className= "divResult">
                            <span id="TotContribution"><h3>Valor investido:</h3> {Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency: 'BRL'})
                            .format(totContribution)}</span>
                        </div>
                    }
                    {amount > 0 &&
                        <div className= "divResult">
                            <span id="Amount"><h3>Juros recebidos:</h3> {Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency: 'BRL'})
                            .format((amount - totContribution).toFixed(2))}</span>
                        </div>
                    }
                    {amount > 0 &&
                        <div className= "divResult">
                            <span id="Amount"><h3>Amonte total:</h3> {Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency: 'BRL'})
                                .format(amount.toFixed(2))}</span>
                        </div>
                    }
                    
                </section>
                </form>
            </div>
        </div>
    )
}