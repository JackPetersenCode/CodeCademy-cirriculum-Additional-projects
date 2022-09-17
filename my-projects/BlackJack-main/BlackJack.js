
//create the deck, assign key: value pair for each card, array of arrays of length two (suit and value).
//make functions for hit, stay. Use a while loop to continue to ask for user input until they either bust or stay.
//deal the dealer a hand, maybe create logic to make him either hit or stay when its his turn.
//MAKE A FUNCTION that shuffles the deck.
//when both players' loops have ended (both stay), show the cards and declare the winner.

//const deck = [['heart', 2], ['heart', 3], ['heart', 4], ['heart', 5], ['heart', 6], ['heart', 7], ['heart', 8]
//['heart', 9], ['heart', 10], ['heart', 'J'], ['heart', 'Q'], ['heart', 'K'], ['heart', 'A']]

let yourHand = [];
let cpuHand = [];

const makeDeck = () => {
    const deck = [];
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    suits.forEach(suit => {
        for(let j=2; j<11; j++) {
            deck.push([suit, j]);
        }
    });
    suits.forEach(suit => {
        deck.push([suit, 'J']);
        deck.push([suit, 'Q']);
        deck.push([suit, 'K']);
        deck.push([suit, 'A']);
    });
    return deck;
}

const shuffle = cardDeck => {
    const usedNums = [];
    let newDeck = [];
    for(let i=0; i<cardDeck.length; i++) {
        let rando = Math.floor(Math.random()*52);
        while(usedNums.includes(rando)) {
            rando = Math.floor(Math.random()*52);
        }
        usedNums.push(rando);
        newDeck.push(cardDeck[rando]);
    }
    return newDeck;
}

const deal = (cardDeck) => {
    //let yourHand = [];
    //let cpuHand = [];
    yourHand.push(cardDeck.pop());
    cpuHand.push(cardDeck.pop());
    yourHand.push(cardDeck.pop());
    cpuHand.push(cardDeck.pop());
    console.log('');
    console.log('Your Hand: ');
    console.log(yourHand);
    console.log('');
    console.log('Computer Hand: ');
    console.log(cpuHand[1], '[Back of Card]');
    console.log('');
    //.forEach(card => {console.log(card)}));
    //let userChoice = hitOrStay();
    //while(userChoice !== 'hit' && userChoice !== 'stay') {
    //    userChoice = hitOrStay();
    //}

    //console.log(userChoice);
    return cardDeck;
    //var yourChoice = readline('Do you want to hit or stay?');
}       //console.log(yourChoice);
const hitOrStay = () => {        //console.log(yourChoice);
    const prompt = require('prompt-sync')();
    let userChoice = prompt('hit or stay, guy? ');
    console.log('');
    while(userChoice !== 'hit' && userChoice !== 'stay') {
        userChoice = prompt('try again, guy. hit or stay. ');
    }
    return userChoice;
    //console.log(userChoice);
    //rl.on("close", function() {
    //    console.log("\nBYE BYE !!!");
    //    process.exit(0);
    //});
}
    //for each index in the array, newDeck[index] = cardDeck[]

const numberizeHand = () => {
    let yourTotal = 0;
    yourHand.forEach(card => {
        
        if (card[1] === 'A' && yourTotal < 11) {
            yourTotal += 11;
        }
        else if (card[1] === 'A' && yourTotal > 10) {
            yourTotal += 1
        }
        else if (typeof card[1] !== 'number') {
            yourTotal += 10;
            if (yourTotal > 21 && (yourHand[0][1] === 'A' || yourHand[1][1] === 'A')) {
                yourTotal -= 10;
            }
        } else {
            yourTotal += card[1];
            if (yourTotal > 21 && (yourHand[0][1] === 'A' || yourHand[1][1] === 'A')) {
                yourTotal -=10;
            }
        }
    })
    return yourTotal;
}

const numberizeCompHand = () => {
    let compTotal = 0;
    cpuHand.forEach(card => {
        if (card[1] === 'A' && compTotal < 11) {
            compTotal += 11;
        }
        else if (card[1] === 'A' && compTotal > 10) {
            compTotal += 1
        }
        else if (typeof card[1] !== 'number') {
            compTotal += 10;
            if (compTotal > 21 && (cpuHand[0][1] === 'A' || cpuHand[1][1] === 'A')) {
                compTotal -= 10;
            }
        } else {
            compTotal += card[1];
            if (compTotal > 21 && (cpuHand[0][1] === 'A' || cpuHand[1][1] === 'A')) {
                compTotal -=10;
            }
        }
    })
    return compTotal;
}

const dealOne = () => {
    let card = realDeck.pop();
    yourHand.push(card);
    return card;
}

const declareWinner = (cpuTotal) => {
    if (cpuTotal === yourTotal) {
        console.log('PUSH');
    } else if(yourTotal > cpuTotal) {
        console.log('YOU WIN, GUY.')
    } else if(cpuTotal > yourTotal && cpuTotal <= 21) {
        console.log('CPU WINS, YOU SUCK.')
    } else {
        console.log('CPU BUSTS, YOU WIN.');
    }
    return;
}

const compTurn = () => {
    let compTotal = numberizeCompHand();
    while(compTotal < yourTotal) {
        let card = realDeck.pop();
        cpuHand.push(card);
        compTotal = numberizeCompHand();
    }
    console.log('');
    console.log('CPU Hand: ')
    console.log(cpuHand);
    console.log('')
    console.log(`Computer Total: ${compTotal}`);
    console.log('');
    declareWinner(compTotal);
}

const deck = makeDeck();
const shuffledDeck = shuffle(deck);
const realDeck = deal(shuffledDeck);
let yourTotal = numberizeHand();
//let yourTotal = yourHand[0][1] + yourHand[1][1];
while(yourTotal < 21) {
    let choice = hitOrStay();
    if (choice === 'hit') {
        let newCard = dealOne();
        yourTotal = numberizeHand();
        //yourTotal += newCard[1]
        console.log(yourHand);
    } else {
        break;
    }
}
if (yourTotal <= 21) {
    console.log('');
    console.log(`Your total is: ${yourTotal}`);
    compTurn();
} else {
    console.log(`You busted, guy.`);
    console.log('COMPUTER WINS');
}

/*const compTurn = () => {
    let compTotal = numberizeCompHand();
    while(compTotal < yourTotal) {
        let card = realDeck.pop();
        cpuHand.push(card);
        compTotal = numberizeCompHand();
    }
    console.log(cpuHand);
    console.log(compTotal);
    declareWinner();
}

/*const compTurn = () => {
    let compTotal = numberizeCompHand();
    while(compTotal < yourTotal) {
        let card = realDeck.pop();
        cpuHand.push(card);
        compTotal = numberizeCompHand();
    }
    console.log(cpuHand);
    console.log(compTotal);
}*/

//console.log('yaaaa????');
//const deck = makeDeck();
//const shuffledDeck = shuffle(deck);
//const realDeck = deal(shuffledDeck);