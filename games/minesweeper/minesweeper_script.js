const gridsize = document.getElementById('gridsize')
const numberofbombs = document.getElementById('numberofbombs')



const play = () => {
    user_dim_size = gridsize
    user_mines = numberofbombs
    major_sweepage = Sweeper_Board(user_dim_size, user_mines)    
    //#create map
    //#place bombs
    //#dig recursively
    //#repeat until you hit a bomb or spot next to a bomb
    while (major_sweepage.swept.length < user_dim_size**2 - user_mines) {
        let row1 = apiTable.insertRow()
        let row = document.getElementById("row")
        let col = document.getElementById("col")
        if ((row < 0 || row > user_dim_size) || (col < 0 || col > user_dim_size)) {
            row1.insert("try again, guy.")
            continue
        }
        let gravy = major_sweepage.sweep(row, col)
        if (!gravy) {
            break
        }
    }
    if (gravy) {
        let cell1 = row1.insertCell(1)
        cell1.innerHTML = `<h1>FINALLY.</h1>`
        cell0.innerHTML = major_sweepage
    }
    else {
        cell1.innerHTML = `<h1>Terrible job</h1>`
        cell0.innerHTML = major_sweepage
    }
}
play()