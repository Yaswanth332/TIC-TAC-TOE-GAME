let boxes=document.querySelectorAll(".box")
let resetBtn= document.querySelector("#reset")
let  newGameBtn=document.querySelector('#newBtn');
let msgContaner=document.querySelector('.msg-container')
let msg =document.querySelector('#msg')
let xval=document.querySelector('#xWins')
let Oval=document.querySelector('#oWins')
let draw=document.querySelector('#draws')
let turnO= true;
let num=0;

const winPattern =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [2,4,6],
    [6,7,8],

];
let xnum=1;
let onum=1;
let drnum=1;
const tableInc=(pos)=>
{
    if(pos === 'X')
    {
        xval.innerText=xnum;
        xnum++;
    }
    else if(pos === 'O')
    {
        Oval.innerText=onum;
        onum++;
    }
    else{
        draw.innerText=drnum;
        drnum++;
    }

}
const newGame=()=>{
    turnO=true;
    enableBtn();
    msgContaner.classList.add('hide')
    xval.innerText=Oval.innerText=draw.innerText=0;
}

const reserGame=()=>
{
    turnO=true;
    enableBtn();
    msgContaner.classList.add('hide')

   
}
const enableBtn=()=>
{
    for (let box of boxes)
        {
            box.disabled=false;
            box.innerText='';
        } 
}

const disableBtn=()=>{
    for (let box of boxes)
    {
        box.disabled=true;
    }
}

const showWinner =(winner)=>{
    msg.innerText=`Congratulations!, Winner is ${winner}`
    msgContaner.classList.remove('hide')
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        let winner = checkWinner();
        // Check for a winner first
        if (!winner) {
            checkDraw(); // Check for a draw only if no winner
        }
    });
});

const checkDraw = () => {
    let isDraw = true;

    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }

    if (isDraw) {
        msg.innerText = "It's a Draw!";
        msgContaner.classList.remove("hide");
        tableInc('draw');
        disableBtn();
    }
};

const checkWinner=(()=>
{
    for(let patten of winPattern)
    {
        let pos1=boxes[patten[0]].innerText;
        let pos2=boxes[patten[1]].innerText;
        let pos3=boxes[patten[2]].innerText


        if (pos1 != "" && pos2 != "" && pos3 != "" )
        {
            if (pos1 == pos2 && pos2 == pos3)
            {
                console.log('winner',pos1 );
                disableBtn();
                showWinner(pos1);
                tableInc(pos1);
                return pos1
            }
        }
    }
    
})


newGameBtn.addEventListener('click',newGame);
resetBtn.addEventListener('click',reserGame);


