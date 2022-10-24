import React, {useEffect, useState, useRef} from 'react';

const Game2 = () => {

    // Initially set values
    const singularNum = useRef(0);
    const decimalNum = useRef(0);
    const isDecimalTrue = useRef(false);
    
    // States
    const [trials, setTrials] = useState(0);
    const [correctOnes, setCorrectOnes] = useState(0);
    const [randomNumber, setRandomNumber] = useState(0);
    let [decimalNumberArray, setDecimalNumberArray] = useState([]);
    let [singularNumberArray, setSingularNumberArray] = useState([]);
    
    // References to elements
    const decimalInput = useRef();
    const singularInput = useRef();
    const decimalArea = useRef();
    const singularArea = useRef();
    
    // Getting random number, separate it to decimal and singular, print the results to display
    const getRandomNumber = () => {
        // const randomNO = Math.floor(Math.random() * 10 ) + 10;
        const randomNO = Math.floor(Math.random() * 100 );

        setRandomNumber(randomNO);

        singularNum.current = randomNO % 10;
        decimalNum.current = (randomNO - singularNum.current) / 10;

        decimalNumberArray = [];
        singularNumberArray = [];

        for (let i = 0; i < singularNum.current; i++) {
            singularNumberArray.push(i);   
        }
        for (let i = 0; i < decimalNum.current; i++) {
            decimalNumberArray.push(i);   
        }
        setSingularNumberArray(singularNumberArray);
        setDecimalNumberArray(decimalNumberArray);
        
        decimalInput.current.focus();
        decimalArea.current.classList.remove("error") ;
        singularArea.current.classList.remove("error") ;
        singularInput.current.value = '';
        decimalInput.current.value = '';
    
        decimalInput.current.focus();
        isDecimalTrue.current = false;
    }

    // Checking if decimal point is correct 
    const checkDecimal = answer => {
        setTrials(prev => prev + 1);

        if (answer ==  decimalNum.current) {
            setCorrectOnes(prev => prev + 1);
            decimalInput.current.value = answer;
            isDecimalTrue.current = true;
            singularInput.current.focus();
            decimalArea.current.classList.remove("error") ;
            decimalInput.current.classList.remove("error") ;
            singularInput.current.classList.remove("error") ;
        } else {
            decimalArea.current.classList.add("error");
            decimalInput.current.classList.add("error");
            singularInput.current.classList.add("error");
        } ;
    }
    
    // Checking if singular point is correct
    const checkSingular = answer => {
        setTrials(prev => prev + 1);
        
        if (answer ==  singularNum.current ) {
            if (decimalInput.current.value !== "") {
                setCorrectOnes(prev => prev + 1);
                singularInput.current.value = answer;
                singularInput.current.value = answer;
                singularArea.current.classList.remove("error");
                decimalInput.current.classList.remove("error") ;
                singularInput.current.classList.remove("error") ;
                setTimeout(() => getRandomNumber(), 500)
            } else {
                setCorrectOnes(prev => prev + 1);
                decimalInput.current.classList.add("error");
                decimalArea.current.classList.add("error");
                decimalInput.current.focus();
            }
        } else {
            singularArea.current.classList.add("error");
            decimalInput.current.classList.add("error");
            singularInput.current.classList.add("error");
        };
    }

    const options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    useEffect(() => {
        getRandomNumber();
    }, [])

    const restartGame = () => {
        setTrials(0); 
        setCorrectOnes(0);
    }

    const result = [trials, correctOnes, Math.round(correctOnes * 100 / trials)];

    if (trials === 20) return (
        <div className="game2 text-center">
            <h1>{result[2] === 100 ? "BARAKALLA!!!" : result[2] > 60 ? "Shunday davom eting!" : "Yanada ko'proq shug'ullaning!"}</h1>
            <h3>Sizning natijalaringiz: </h3>
            <table className="table table-light text-center my-4 p-2 ">
                <thead>
                    <tr>
                        <th>Urunishlar soni</th>
                        <th>To'g'ri javoblar soni</th>
                        <th>To'g'ri javoblarni foizi (%)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {result.map((res, index) => (
                        <td key={index}> {res} </td>
                    ))}
                    <td><button className="btn btn-primary" onClick={restartGame}>Davom etish </button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return ( 
        <div className="game2 text-center">
            <h2>To'liq o'nlikni ajrating va sharlarni sanang.</h2>
            <h4>Sharlarni sanang va ularni yozing.</h4>
            {trials > 0 && <h5>Umumiy urunishlar soni:  {trials}</h5>}
            {correctOnes > 0 && <h5 className='green'>To'g'ri urunishlar soni: {correctOnes} </h5>}
            {trials > 0 && <h5>To'gri javoblar foizi: {Math.round(correctOnes * 100 / trials)} % </h5>}

            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-5" ref={decimalArea}>
                    <h3>O'nlik</h3>
                    {decimalNumberArray.map( e => <div key={e} className='circle purple m-2 d-inline-block'></div>)}
                </div>
                <div className="col-sm-5" ref={singularArea}>
                    <h3>Birlik</h3>
                    {singularNumberArray.map( e => <div key={e} className='circle gold m-2 d-inline-block'></div>)}
                </div>
                <div className="col-sm-1"></div>

            </div>

            <div className="inputs">
                <input type="number" ref={decimalInput} className="decimalInp" 
                    onChange={e => checkDecimal(e.target.value)}/>
                <input type="number" ref={singularInput} className="singularInp"
                    onChange={e => checkSingular(e.target.value)} />
            </div>


            <div className="options">
                {options.map( option => (
                    <button key={option}
                        onClick={() => { isDecimalTrue.current ? checkSingular(option) : checkDecimal(option) }}
                        className='btn btn-primary m-2 px-3' 
                        style={{fontSize: 22, fontWeight: 700}}
                    >   {option}
                    </button>
                ))}
                <button style={{fontSize: 22, fontWeight: 700}} 
                    className='btn btn-success m-2 px-3'
                    onClick={() => {getRandomNumber(); setTrials(prev => prev + 1) }}
                >Keyingi</button>
            </div>
        </div>
     );
}
 
export default Game2;