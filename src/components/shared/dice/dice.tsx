import "./dice.css"
import React, {useRef, useState} from "react";
import {getContractDiceContract} from "../../../contract";
import {convertBigNumberToNumber} from "../file-utils";
import {useAppStateBoolean} from "../../../app/hooks";
import {Button} from "primereact/button";

const Dice = (props: { onHide: () => void, onPlay: (value: number) => void}) => {
    const diceRef = useRef(null);
    const [hasPlayed, toggleHasPlayed] = useAppStateBoolean(false);
    const [isLoading, toggleIsLoading] = useAppStateBoolean(false);

    return (
        <div className="Dice">
            <Button
                label="Back"
                icon="pi pi-angle-left"
                className="p-button-text"
                style={{position: 'absolute', top: '3rem', left: '3rem'}}
                onClick={props.onHide}
            />
            <div className="dice">
                <ol ref={diceRef} className="die-list" data-roll="1" id="die-1">
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
                    {
                        hasPlayed
                            ? <Button
                                label="Back"
                                onClick={props.onHide}
                            />
                            : <Button
                                label="Roll Dice"
                                loading={isLoading}
                                style={{opacity: '1'}}
                                onClick={rollDice}
                            />
                    }
                </div>
            </div>
        </div>
    )

    async function rollDice() {
        toggleIsLoading()
        let random = await getRandomDice()
        if (random === 0) random = 3

        // let random = Math.floor(Math.random() * 6 + 1)

        const dice: HTMLElement = diceRef.current;
        toggleClasses(dice);
        toggleHasPlayed()
        dice.dataset.roll = random
        props.onPlay(random)
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