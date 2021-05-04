import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logo from '../../assets/logo.png';
import './style.css';
// import getForm from '../../services/GetForm';

export default function Compound(){
    const [initValue, setInitValue] = useState('');
    const [monthlyValue, setMonthlyValue] = useState('');
    const [monthlyInterest, setMonthlyInterest] = useState('');
    const [yearlyInterest, setYearlyInterest] = useState('');
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
        setMonthlyInterest("");
        setYearlyInterest("");
        setNumberOfMonths("");
        setNumberOfYears("");
    }
    // return getForm();
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
                        <div><label htmlFor="initValue" style={{borderTopLeftRadius: 8,
                                        borderBottomLeftRadius: 8,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        width: 50
                                        }}>
                                            R$
                            </label><input type="number" id="initValue"
                                                        style={{borderTopLeftRadius: 0,
                                                            borderBottomLeftRadius: 0,
                                                            borderTopRightRadius: 8,
                                                            borderBottomRightRadius: 8
                                                        }}
                                                        value={initValue}
                                                        onChange={e => setInitValue(e.target.value)}
                                                        placeholder="Valor inicial"/></div>
                                                        <p>e/ou</p>
                        <div><label htmlFor="monthlyValue" 
                                        style={{borderTopLeftRadius: 8,
                                        borderBottomLeftRadius: 8,
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        width: 50
                                        }}>
                                            R$
                            </label><input type="number" id="monthlyValue"
                                                        style={{borderTopLeftRadius: 0,
                                                            borderBottomLeftRadius: 0,
                                                            borderTopRightRadius: 8,
                                                            borderBottomRightRadius: 8,
                                                            
                                                        }}
                                                        value={monthlyValue}
                                                        onChange={e => setMonthlyValue(e.target.value)} 
                                                        placeholder="Aporte mensal"/></div>
                    </div>
                    <h3>Taxa de juros:</h3>
                    <div className = "input">
                        <div><input type="number"
                        id="monthlyInterest"
                        value={monthlyInterest}
                        onChange={e => setMonthlyInterest(e.target.value)}  
                        placeholder="Mensal"/> <label htmlFor="monthlyInterest">% ao mês</label> </div>
                        <p>ou</p>
                        <div><input type="number"
                        id="yearlyInterest"
                        value={yearlyInterest}
                        onChange={e => setYearlyInterest(e.target.value)}
                        placeholder="Anual"/><label htmlFor="yearlyInterest">% ao ano</label></div>
                    </div>
                    <h3>Período de permanência</h3>
                    <div className = "input">
                        <div><input type="number"
                        id="numberOfMonths"
                        value={numberOfMonths}
                        onChange={e => setNumberOfMonths(e.target.value)}
                        placeholder="Meses"/><label htmlFor="numberOfMonths">Meses</label></div>
                        <p>ou</p>
                        <div><input type="number"
                        id="numberOfYears"
                        value={numberOfYears}
                        onChange={e => setNumberOfYears(e.target.value)}
                        placeholder="Anos"/><label htmlFor="numberOfYears">Anos</label></div>
                    </div>

                    <div className="button">
                        <button type="submit">Calcular</button>
                        {totalAmount > 0 && <button type = "reset" >Reiniciar</button>}
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