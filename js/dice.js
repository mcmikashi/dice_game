$( document ).ready(function() {

    /* initilaisation des constante button du dom */
    const btnNewGame = $('#new-game')
    const btnRoll = $('#roll-dice')
    const btnHold = $('#hold-dice')

    /* initilaisation des constante text et icon du dom */
    const activePlayerOne = $('#active-player-one')
    const activePlayerTwo = $('#active-player-two')
    const totaleScorePlayerOne = $('#totale-score-player-one')
    const totaleScorePlayerTwo = $('#totale-score-player-two') 
    const currentScorePlayerOne = $('#current-score-player-one')
    const currentScorePlayerTwo = $('#current-score-player-two') 
    const iconDice = $('#zone-dice')
    /* initilaisation des variable du jeux */

    let curPlayerOne = null
    let curPlayerTwo = null
    let ttPlayerOne = null
    let ttPlayerTwo = null
    let curActivePlayer = null

    /* function qui active le joueur */
    function activedPlayer() {
        iconDice.html("<i class='bi bi-app'></i>")
        switch (curActivePlayer) {
            case 1:
                curActivePlayer=2
                curPlayerOne = 0
                currentScorePlayerOne.text(curPlayerOne)
                activePlayerTwo.html('<i class="bi bi-circle-fill"></i>')
                activePlayerOne.html('')
                break
            case 2:
                curActivePlayer=1
                curPlayerTwo = 0
                currentScorePlayerTwo.text(curPlayerTwo)
                activePlayerOne.html('<i class="bi bi-circle-fill"></i>')
                activePlayerTwo.html('')
                break
            default:
                curActivePlayer=1
                totaleScorePlayerOne.text(ttPlayerOne)
                totaleScorePlayerTwo.text(ttPlayerTwo)
                currentScorePlayerOne.text(curPlayerOne)
                currentScorePlayerTwo.text(curPlayerTwo)
                activePlayerOne.html('<i class="bi bi-circle-fill"></i>')
                activePlayerTwo.html('')
                break;
        
            }

    }

    /* function qui envoie un chiffre aléatoire entre min inclut et max exclu */
    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /* function qui envoie aléatoire renvoie le dée */
    function rollDice() {
        diceNumber = getRandomNum(1,7)
        iconDice.html(`<i class='bi bi-dice-${diceNumber}'></i>`)
        if (diceNumber>1) {
            if (curActivePlayer==1) {
                curPlayerOne += diceNumber
                currentScorePlayerOne.text(curPlayerOne)
            }else if(curActivePlayer==2){
                curPlayerTwo += diceNumber
                currentScorePlayerTwo.text(curPlayerTwo)
            }
        }else if (diceNumber===1) {
            activedPlayer()
        }

    }
    function checkWinner() {
        if (ttPlayerOne>=100 || ttPlayerTwo>=100) {
            if (ttPlayerOne>=100) {
                alert(`Player1 win the game with${ttPlayerOne}\nPlayer2 lose the game with${ttPlayerTwo}`)
    
            }else if (ttPlayerTwo>=100) {
                alert(`Player1 win the game with${ttPlayerOne}\nPlayer2 lose the game with${ttPlayerTwo}`)
            }
            let replay = confirm("Did you want to replay ?");
            if (replay) {
                startGame()
              } else {
                btnHold.attr( "disabled", true )
                btnRoll.attr( "disabled", true )
              }
        }
    }
    /* fonctionne qui envoie le current sur le totale selon le paramettre */
    function holdScore() {
        if (curActivePlayer==1) {
            ttPlayerOne += curPlayerOne
            totaleScorePlayerOne.text(ttPlayerOne)
            checkWinner()
            activedPlayer()
        }else{
            ttPlayerTwo += curPlayerTwo
            totaleScorePlayerTwo.text(ttPlayerTwo)
            checkWinner()
            activedPlayer()
            }
        }
    function startGame() {
        curPlayerOne = 0
        curPlayerTwo = 0
        ttPlayerOne = 0
        ttPlayerTwo = 0
        curActivePlayer = null
        activedPlayer()
        btnHold.attr( "disabled", false )
        btnRoll.attr( "disabled", false )
    }
    /* creation des évenement */
    btnNewGame.click(startGame)
    btnRoll.click(rollDice)
    btnHold.click(holdScore)
});