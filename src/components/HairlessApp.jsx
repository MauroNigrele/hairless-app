
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm"

const formData = {
    pizzaAmount: '',
    birraAmount: '',
    discountAmount: '',
    roundAmount: 100,
    pizzaUsers: 0,
    birraUsers: 0,
}

export const HairlessApp = () => {

    const [pizzaUserFee, setPizzaUserFee] = useState(0);
    const [birraUserFee, setBirraUserFee] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [tipAmount, setTipAmount] = useState(0);

    const roundFee = (value) => {
        return Math.ceil(value / roundAmount) * roundAmount;
    }

    const resetTotals = () => {
        setTotalAmount(0);
        setBirraUserFee(0);
        setPizzaUserFee(0);
    }

    const calculateAmounts = () => {
        
        resetTotals();

        if ((+pizzaAmount + +birraAmount < 1) 
            || (+pizzaUsers + +birraUsers < 1)
        || (+birraAmount > 1 && +birraUsers < 1)
            || (+pizzaAmount > 1 && +pizzaUsers + +birraUsers < 1)
        ){
            // console.log(' SKIP, not enough data ');
            return;
        }

        let partialDiscount = parseInt(discountAmount / 2);
        let pizzaFee  = 0;
        let birraFee = 0;

        // Pizza Calculation
        if( +pizzaUsers > 0 || +birraUsers > 0) {
            pizzaFee = roundFee((+pizzaAmount - partialDiscount) / (+pizzaUsers + +birraUsers));
            if(+pizzaUsers > 0) {
                setPizzaUserFee(pizzaFee);
            }
        }
        // Birra Calculation
        if( +birraUsers > 0 ) {
            birraFee = roundFee((+birraAmount - partialDiscount) / +birraUsers ) + pizzaFee;
            setBirraUserFee(birraFee);
        }
        let totalExpenses = +pizzaAmount + +birraAmount; 
        let totalFee = +pizzaUsers * pizzaFee + +birraUsers * birraFee + +discountAmount;
        // let tip = totalFee - totalExpenses;        
        
        setTotalAmount(totalFee);
        setTipAmount(totalFee - totalExpenses)

    }

    const onInputChangeCallback = (event) => {
        const value = event.target.value;
        if (+value < 0 || isNaN(value)) {
            return;
        }
        onInputChange(event);
    }

    const onFocus = (event) => {
        event.target.select();
    }

    const {
        pizzaAmount,
        birraAmount,
        discountAmount,
        roundAmount,
        pizzaUsers,
        birraUsers,
        formState,
        onInputChange,
    } = useForm(formData);

    useEffect(() => {
        calculateAmounts();
    }, [formState]);



    return (
        <main>
            <div className="modal modal-sheet position-static d-block p-4 py-md-5">

                <div className="modal-dialog" role="document">
                    <div className="modal-content rounded-4 shadow">

                        <div className="modal-header mb-3 p-3 bg-secondary-subtle rounded-top-4" >
                            {/* <p style={{ fontSize: 50 }} >&#128000;</p>
                            <p style={{ fontSize: 50 }} >&#128001;</p> */}
                            {/* <span style={{ fontSize: 32 }} >&#9917;</span> */}
                            <span style={{ fontSize: 42 }} >&#128116;</span>
                            {/* <span style={{ fontSize: 32 }} >&#127866;</span>
                            <span style={{ fontSize: 32 }} >&#127829;</span> */}
                            <h1 className="fw-bold mb-0 fs-2 pe-4">3º Tiempo App</h1>
                        </div>

                        <div className="modal-body p-5 pt-0">
                            <form>
                                {/* <form onSubmit={ onFormSubmit }> */}

                                {/* <h2 className="fs-5 fw-bold text-end">Gastos</h2>
                                <hr className="my-3" /> */}
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-1" style={{ fontSize: 30 }} >&#127829;</span>
                                    <span className="input-group-text p-2" style={{ fontSize: 22 }} >$</span>
                                    <div className="form-floating">
                                        <input
                                            name="pizzaAmount"
                                            value={pizzaAmount}
                                            onChange={onInputChangeCallback}
                                            onFocus={onFocus}
                                            type="number"
                                            className="form-control"
                                            id="pizzaAmount"
                                            placeholder="0"
                                        />
                                        <label htmlFor="pizzaAmount">de Pizza</label>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text p-1" style={{ fontSize: 30 }} >&#127867;</span>
                                    <span className="input-group-text p-2" style={{ fontSize: 22 }} >$</span>
                                    {/* <span className="input-group-text p-1" style={{ fontSize: 30 }} >&#127866;</span> */}
                                    <div className="form-floating">
                                        <input
                                            name="birraAmount"
                                            value={birraAmount}
                                            onChange={onInputChangeCallback}
                                            onFocus={onFocus}
                                            type="number"
                                            className="form-control"
                                            id="birraAmount"
                                            placeholder="0"
                                        />
                                        <label htmlFor="birraAmount">de Birrita</label>
                                    </div>
                                </div>


                                <div className="input-group mb-3">
                                    <span className="input-group-text p-1" style={{ fontSize: 30 }} >&#128001;</span>
                                    <span className="input-group-text p-2" style={{ fontSize: 22 }} >$</span>
                                    <div className="form-floating">
                                        <input
                                            name="discountAmount"
                                            value={discountAmount}
                                            onChange={onInputChangeCallback}
                                            onFocus={onFocus}
                                            type="number"
                                            className="form-control"
                                            id="discountAmount"
                                            placeholder="0" />
                                        <label htmlFor="discountAmount">que dejaron ...</label>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text p-1" style={{ fontSize: 30 }} >&#128184;</span>
                                    <span className="input-group-text p-2" style={{ fontSize: 22 }} >$</span>
                                    <div className="form-floating">
                                        <input
                                            name="roundAmount"
                                            value={roundAmount}
                                            onChange={onInputChangeCallback}
                                            onFocus={onFocus}
                                            type="number"
                                            className="form-control"
                                            id="roundAmount"
                                            placeholder="0" />
                                        <label htmlFor="roundAmount">Redondeo</label>
                                    </div>
                                </div>

                                {/* <div className="form-floating mb-3">
                                    <input
                                        name="adelantoAmount"
                                        type="number"
                                        className="form-control rounded-3"
                                        id="adelantoInput"
                                        placeholder="0" />
                                    <label htmlFor="adelantoInput">$ Dejaron</label>
                                </div> */}

                                {/* <h2 className="fs-5 fw-bold text-end">Gente:</h2>
                                <hr className="my-3" /> */}
                                
                                <div className="input-group mb-3">
                                    <span className="input-group-text p-1 bg-dark" style={{ fontSize: 26 }} > &#129492;</span>
                                    {/* <span className="input-group-text p-1" style={{ fontSize: 26 }} > &#128110;</span> */}
                                    <span className="input-group-text p-1" style={{ fontSize: 26 }} >&#127829;</span>
                                    {/* <span className="input-group-text p-1" style={{ fontSize: 26 }} >&#127829;+&#129371;</span> */}
                                    <input
                                        name="pizzaUsers"
                                        value={pizzaUsers}
                                        onChange={onInputChangeCallback}
                                        onFocus={onFocus}
                                        type="number"
                                        className="form-control"
                                        placeholder="0" />
                                    {/* <span className="input-group-text">Beben</span> */}
                                    <span className="input-group-text p-1" style={{ fontSize: 26 }} >&#127829;&#127866;</span>
                                    <input
                                        name="birraUsers"
                                        value={birraUsers}
                                        onChange={onInputChangeCallback}
                                        onFocus={onFocus}
                                        type="number"
                                        className="form-control"
                                        placeholder="0" />
                                    {/* <span className="input-group-text p-1" style={{ fontSize: 26 }} >&#128184;</span>
                                    <input
                                        name="roundAmount"
                                        value={roundAmount}
                                        onChange={onInputChangeCallback}
                                        type="number"
                                        className="form-control"
                                        placeholder="100" /> */}
                                </div>
                                <hr className="my-3" />
                                {
                                    //  (totalAmount < 1) &&  
                                    //  <div className="mb-3 d-flex align-items-center p-2 pe-2 text-warning-emphasis bg-warning-subtle border border-warning rounded-pill">
                                    //     <span className="text-center">:: Cargar los datos ::</span>
                                    // </div>   
                                }

                                {
                                    (totalAmount > 0 && pizzaUserFee > 0) &&     
                                    <div className="input-group mb-3 d-flex align-items-center p-2 pe-2 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-3">
                                        <span className="">
                                        {
                                            (+pizzaUsers > 1) 
                                            ? `Los ${pizzaUsers} que solo comieron pagan $ ${pizzaUserFee}`
                                            : `El que solo comio paga $ ${pizzaUserFee}` 
                                        }
                                        </span>
                                    </div>
                                }
                                {
                                    (totalAmount > 0 && birraUserFee > 0) &&
                                    <div className="input-group mb-3 d-flex align-items-center p-2 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3">
                                        <span className="">
                                        {
                                            (+birraUsers > 1) 
                                            ? `Los ${birraUsers} que escabiaron pagan $ ${birraUserFee}`
                                            : `El que comio y escabio paga $ ${birraUserFee}`
                                        }
                                        </span>
                                    </div>
                                }

                                {
                                    (totalAmount > 0) &&
                                    <div className="input-group mb-3 d-flex align-items-center p-2 pe-2 text-danger bg-danger-subtle border border-danger rounded-3">
                                        <span className="">
                                            <strong>{`Deberías juntar $ ${totalAmount} ( $ ${tipAmount} de Propina).`}</strong>
                                        </span>
                                    </div>
                                }

                                {/* <button className="w-100 mb-4 btn btn-lg rounded-10 btn-primary" type="submit">Calcular</button> */}
                                <small className="100 text-body-secondary text-end">Made with ♥  by el dolape sin calculadora inc.</small>


                            </form>
                        </div>
                    </div>
                </div>


            </div>





        </main>
    )

}