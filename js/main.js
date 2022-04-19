

function getFetch(){

const userInput = document.querySelector('#barcode').value

const url = (`https://world.openfoodfacts.org/api/v0/product/${userInput}.json`)

if(userInput.length !==12){
    alert(`${userInput} is a viable product`)
    return;
}

fetch(url)
    .then(res => {
        return res.json()
    })

    .then(data => {
        console.log(data)
        const items = new ProductInfo(data.product)
        items.showInfo()
        items.listIngredients()
    })

    .catch(err => {
        console.log(`error ${err}`)
    })
}

class ProductInfo{
    constructor(productData){
        this.name = productData.product_name
        this.image = productData.image_url
        this.ingredients = productData.ingredients
    }

    showInfo(){
        document.querySelector('#product-name').innerText = this.name
        document.querySelector('#product-img').src = this.image
    }

    listIngredients(){
        let tableRef = document.getElementById('ingredient-table')
            for(let i = 1; i < tableRef.rows.length;){
                tableRef.deleteRow(i);
            }

        if(!(this.ingredients == null)){
            for(let key in this.ingredients){
                let newRow = tableRef.insertRow(-1)
                let newICell = newRow.insertCell(0)
                let newVCell = newRow.insertCell(1)
                let newIText = document.createTextNode(
                    this.ingredients[key].text
                )

                let vegStatus = !(this.ingredients[key].vegetarian) ? 'unkownn' : this.ingredients[key].vegetarian
                let newVText = document.createTextNode(vegStatus)
                newICell.appendChild(newIText)
                newVCell.appendChild(newVText)

                if(vegStatus === 'no'){
                    newICell.classList.add('non-veg-item')
                }else if(vegStatus === 'unknown' || vegStatus === 'maybe'){
                    newVCell.classList.add('unknown-maybe-item')
                }
            }
        }
    }
}