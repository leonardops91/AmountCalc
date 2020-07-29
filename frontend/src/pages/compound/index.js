import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';




import logo from '../../assets/logo.png';
import './style.css';

export default function Compound(){
    const [initValue, setInitValue] = useState('');
    const [monthlyValue, setMonthlyValue] = useState('');
    const [monthlyInterest, setmonthlyInterest] = useState('');
    const [yearlyInterest, setyearlyInterest] = useState('');
    const [numberOfMonths, setNumberOfMonths] = useState('');
    const [numberOfYears, setNumberOfYears] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [amountInvested, setAmountInvested] = useState('');


    const data = {
        initValue: initValue.replace("," , "."),
        monthlyValue: monthlyValue.replace("," , "."),
        monthlyInterest: monthlyInterest.replace("," , "."),
        yearlyInterest: yearlyInterest.replace("," , "."),
        numberOfMonths: numberOfMonths.replace("," , "."),
        numberOfYears: numberOfYears.replace("," , ".")
    };

    
    async function handleCompound(e) {
        e.preventDefault();

        try {
            const response = await api.post('/compound', data);
            setTotalAmount(response.data.totalAmount);
            setAmountInvested(response.data.amountInvested);                        
        } catch (error) {
            alert('Erro no envio, tente novamente.');
        };
    }
    function handleReset() {
        setInitValue("");
        setMonthlyValue("");
        setmonthlyInterest("");
        setyearlyInterest("");
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
                <h1>Calculadora de juros compostos</h1>
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
                        value={monthlyInterest}
                        onChange={e => setmonthlyInterest(e.target.value)}  
                        placeholder="Mensal"/><p>%</p></div>
                        <div><input type="double"
                        value={yearlyInterest}
                        onChange={e => setyearlyInterest(e.target.value)}
                        placeholder="Anual"/><p>%</p></div>
                    </div>
                    <h3>Período de permanência</h3>
                    <div className = "input">
                        <div><input type="double"
                        value={numberOfMonths}
                        onChange={e => setNumberOfMonths(e.target.value)}
                        placeholder="Meses"/><p>Meses</p></div>
                        <div><input type="double"
                        value={numberOfYears}
                        onChange={e => setNumberOfYears(e.target.value)}
                        placeholder="Anos"/><p>Anos</p></div>
                    </div>

                    <div className="button">
                        <button type="submit">Calcular</button>
                        {totalAmount > 0 && <button type = "reset" >resetar</button>}
                    </div>
                <section className="result">
                    {totalAmount > 0 &&
                        <div className= "divResult">
                            <span id="amountInvested"><h3>Valor investido:</h3> {Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency: 'BRL'})
                            .format(amountInvested)}</span>
                        </div>
                    }
                    {totalAmount > 0 &&
                        <div className= "divResult">
                            <span id="totalAmount"><h3>Juros recebidos:</h3> {Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency: 'BRL'})
                            .format((totalAmount - amountInvested).toFixed(2))}</span>
                        </div>
                    }
                    {totalAmount > 0 &&
                        <div className= "divResult">
                            <span id="totalAmount"><h3>Amonte total:</h3> {Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency: 'BRL'})
                                .format(totalAmount.toFixed(2))}</span>
                        </div>
                    }
                    
                </section>
                </form>
            </div>
        </div>
    )
}