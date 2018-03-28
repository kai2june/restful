var bookController = function(Book){

    var get = function(req,res) {
        Book.find(req.query, function(err,book){
            if(err) {
                res.status(500);
                res.send(err);
            }
            else {
                var returnBook = [];
                book.forEach(function(element, index, array){
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    returnBook.push(newBook);
                });
                res.json(returnBook);
            }
        })
    };
    var post = function(req,res){
        var book = new Book(req.body);
        if(!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {
            book.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(201).json(book);
            });
        }
    };
    return {
        get: get,
        post: post
    }
};
module.exports = bookController;
