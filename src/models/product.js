class Product{
    constructor(row){
        this.id = row.id,
        this.name = row.name,
        this.image_data = row.image_data,
        this.oldprice = row.oldprice,
        this.newprice = row.newprice,
        this.deleted = row.deleted
    }
    

    static mapAll(dbRows){
        
        const rows = []

        for(const row of dbRows){
            const product = new Product(row)
            rows.push(product)

            
        }
        return rows
    }

    static mapOne(row){
        const product = new Product(row)

        return row
    }
}

module.exports = Product