#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import figlet from 'figlet'
import chalkAnimation from 'chalk-animation'
import { createSpinner } from 'nanospinner'

let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms))
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Who wants to be a Simon Millionare')
    await sleep()
    rainbowTitle.stop()
    console.log(`
    ${chalk.bgBlue("How to play")}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    so get all the questions right


    `)
}
async function askName() {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "what is your name?",
        default() {
            return 'Player'
        },
    })
    playerName = answers.player_name
}
async function question1() {
    const answers = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "I was born on\n",
        choices: [
            'July 1st, 2010',
            'April 9th, 2009',
            'June 1st, 2010',
            "March 23rd, 1999"
        ],

    })
    return handleAnswer(answers.question_1 == 'June 1st, 2010')

}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start()
    await sleep()

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's the answer`})
    } else {
        spinner.error({ text: `you faliure, go and leave ${playerName}`})
        process.exit(1)

    }
}
function winner() {
    console.clear()
    const msg = `Congrats, ${playerName}\n 1 , 000 , 000`
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}
await welcome()
await askName()
await question1()
winner()