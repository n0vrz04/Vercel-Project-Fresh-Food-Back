class BookAddDTO{
    constructor(row){
        this.title = row.title
        this.author = row.author
        this.published_date = row.published_date
        this.isbn = row.isbn
    }
}

module.exports = BookAddDTO