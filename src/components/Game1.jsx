import React, { useEffect, useState, useRef} from 'react';

import img1 from '../img/apple-removebg-preview.png';
import img2 from '../img/apricot-removebg-preview.png';
import img3 from '../img/capsicum-green-removebg-preview.png';
import img4 from '../img/cucumber-removebg-preview.png';
import img5 from '../img/egg-removebg-preview.png';
import img6 from '../img/egg-plant-removebg-preview.png';
import img7 from '../img/figs-removebg-preview.png';
import img8 from '../img/raspberry-removebg-preview.png';
import img9 from '../img/pear-removebg-preview.png';
import img10 from '../img/raw-brocoli-removebg-preview.png';
import img11 from '../img/strawberry-removebg-preview.png';

const Game1 = () => {
    const allImg = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];
    
    const equals = useRef();
    const notEquals = useRef();
    const leftAnswerField = useRef();
    const rightAnswerField = useRef();

    const correctImgs = useRef([]);
    const wrongImgs = useRef([[], []]);

    const [rightSide, setRightSide] = useState(0);

    const getRandomNumber = () => {
        setRightSide(Math.random);
    }
    
    const getTrueRandomImg = () => {
        correctImgs.current = [];
        wrongImgs.current = [[], []];

        for (let i = 0; i < 3; i++) {
            const rForCorrect = Math.floor( Math.random() * 11);
            correctImgs.current.push(allImg[rForCorrect]);
            
            const rForWrong1 = Math.floor( Math.random() * 11);
            const rForWrong2 = Math.floor( Math.random() * 11);
            wrongImgs.current[0].push(allImg[rForWrong1]);
            wrongImgs.current[1].push(allImg[rForWrong2]);
        }
    }


    useEffect(() => {
        getRandomNumber();
        getTrueRandomImg();
    }, []);

    const checkAnswer = (e, answer) => {
        e.preventDefault();
        answer.current.removeAttribute("draggable");
        
        if (rightSide > 0.5 && answer == equals) {
            leftAnswerField.current.appendChild(equals.current);
            answer.current.classList.toggle('appended');
        } else if (rightSide > 0.5 && answer == notEquals) {
            rightAnswerField.current.appendChild(notEquals.current)
            answer.current.classList.toggle('appended');
        } else if (rightSide < 0.5 && answer == equals) {
            rightAnswerField.current.appendChild(notEquals.current);
            answer.current.classList.toggle('appended');
        } else if (rightSide < 0.5 && answer == notEquals) {
            rightAnswerField.current.appendChild(equals.current);
            answer.current.classList.toggle('appended');
        }
        
    }



    return ( 
        <div className="game1 text-center">
            <h2>Rasmlarni taqqoslang va ular orasiga "=" yoki "≠" belgisini to'g'ri joylashtiring.</h2>
            {rightSide}

            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-6 d-flex">
                        <div className="imgArea">
                            {rightSide > 0.5 ? 
                                correctImgs.current.map(img => <img src={img} />)
                                :
                                wrongImgs.current[0].map(img => <img src={img} />)                
                            }
                        </div>
                        <div className="leftHandAnswerField answer" 
                            onDragOver={e => e.preventDefault()}
                            ref={leftAnswerField}></div>
                        <div className="imgArea">
                            {
                                rightSide > 0.5 ? 
                                    correctImgs.current.reverse().map(img => <img src={img} />)
                                :
                                    wrongImgs.current[1].map(img => <img src={img} />)                
                            }
                        </div>
                    </div>
                    <div className="col-sm-6 d-flex">
                        <div className="imgArea">
                            {
                                rightSide > 0.5 ? 
                                    wrongImgs.current[0].map(img => <img src={img} />)                
                                :
                                    correctImgs.current.map(img => <img src={img} />)
                            }
                        </div>
                        <div className="leftHandAnswerField answer"
                            onDragOver={e => e.preventDefault()}
                            ref={rightAnswerField}></div>
                        <div className="imgArea">
                            {
                                rightSide > 0.5 ? 
                                    wrongImgs.current[1].map(img => <img src={img} />)                
                                :
                                    correctImgs.current.reverse().map(img => <img src={img} />)
                            }
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn answer" ref={equals} 
                draggable onDragEnd={e => checkAnswer(e, equals)}
            >=</button>
            <button className="btn answer" ref={notEquals}
                draggable onDragEnd={e => checkAnswer(e, notEquals)}
            >≠</button>

        </div>
     );
}
 
export default Game1;