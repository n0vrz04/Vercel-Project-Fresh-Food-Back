class ProductUpdateDTO{
    constructor(row){
        this.name = row.name
        this.image = row.image
        this.oldPrice = row.oldPrice
        this.newPrice = row.newPrice
    }
}

module.exports = ProductUpdateDTO