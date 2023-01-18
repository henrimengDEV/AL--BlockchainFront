import "./dice.css"
import React, {useRef} from "react";
import {getContractDiceContract} from "../../../contract";
import {convertBigNumberToNumber} from "../file-utils";

const Dice = () => {
    const diceRef = useRef(null);

    return (
        <div className="dice" ref={diceRef}>
            <ol className="die-list even-roll" data-roll="1" id="die-1">
                <li className="die-item" data-side="1">
                    <span className="dot"></span>
                </li>
                <li className="die-item" data-side="2">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </li>
                <li className="die-item" data-side="3">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </li>
                <li className="die-item" data-side="4">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </li>
                <li className="die-item" data-side="5">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </li>
                <li className="die-item" data-side="6">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </li>
            </ol>

            <div>
                <button id="roll-button" onClick={rollDice}>Roll Dice</button>
            </div>
        </div>
    )

    async function rollDice() {
        const random = await getRandomDice()
        console.log(random)
        const dice = diceRef.current.querySelectorAll(".die-list");
        dice.forEach((die) => {
            toggleClasses(die);
            die.dataset.roll = random
        });
    }

    function toggleClasses(die: any) {
        die.classList.toggle("even-roll");
    };

    async function getRandomDice() {
        return await getContractDiceContract()
            .then(({contract: contract}) => {
                return contract.rollDice()
                    .then(response => convertBigNumberToNumber(response.value))
            })
    }
}

export default Dice