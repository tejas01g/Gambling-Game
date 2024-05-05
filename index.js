const prompt = require("prompt-sync")();

 const ROWS =3;
 const COLS =3

 const SYMBOLS_COUNT={
    "A":2,
    "B":4,
    "C":6,
    "D":8
 }

 const SYMBOL_VALUES={
    "A":5,
    "B":4,
    "C":3,
    "D":2
 }

const deposit = () =>{
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <=0){
            console.log("Invalid deposit amount, try again.");
        }else{
            return numberDepositAmount;
        }
    }
};

const getNumberofLines = () =>{
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberofLines = parseFloat(lines);

        if (isNaN(numberofLines) || numberofLines <=0 || numberofLines > 3){
            console.log("Invalid number of lines, try again.");
        }else{
            return numberofLines;
        }
    }

};

const getBet = (balance,lines) =>{
    while(true){
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <=0 || numberBet > balance / lines){
            console.log("Invalid Bet, try again.");
        }else{
            return numberBet;
        }
    }
};

const spin =() =>{
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]); // Initialize reels[i] as an empty array
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) =>{
    const rows =[];

    for(let i=0; i<ROWS; i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i])
        }
    }

    return rows;
};

const printRows =(rows) =>{
    for (const row of rows){
        let rowString ="";
        for (const[i,symbol] of rows.entries()){
            rowString +=symbol
            if ( i != rows.length-1){
                rowString +=" |"
            }
        }
        console.log(rowString)
    }
}
const getWinnings = (rows,bet,lines) =>{
    let winnings = 0;

    for(let row =0; row < lines; row++){
        const symbols = rows[row];
        let allsame =true;

        for(const symbol of symbols){
            if(symbol !=symbols[0]){
                allsame = false;
                break;
            }
        }

        if(allsame){
            winnings+=bet*SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

const game = () =>{
    let balance = deposit();

    while(true){
        console.log("You have a balance of $" +balance)
    const numberofLines = getNumberofLines();
    const bet = getBet(balance, numberofLines);
    balance -=bet*numberofLines;
    const reels = spin();
    const rows = transpose(reels); 
    console.log(reels);
    console.log(rows);
    printRows(rows);
    const winnings=getWinnings(rows,bet,numberofLines)
    balance+=winnings;
    console.log("You won,$" + winnings.toString());

    if(balance <=0){
        console.log("You ran out of money!");
        break;
    }

    const playAgain = prompt("Do you want to play again(y/n)?");

    if(playAgain!="y") break;
}
};

game();
