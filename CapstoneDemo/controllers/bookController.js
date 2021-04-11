const { Book } = require('../models');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json({ books })
  } catch (error) {
    res.status(400).json({ msg: 'Something went wrong! :('})
  }
}

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (book) {
      res.json(book)
    } else {
      res.status(400).json({ msg: 'There is no such book!'})
    }
  } catch (err) {
    res.status(400).json({ msg: 'An error occured' });
  }
}

const createBook = async (req, res) => {
  try {
    const { name, year, genre, author } = req.body;
    const newBook = Book.build({ name, year, genre, author });
    await newBook.save()
    res.json(newBook);
  } catch (err) {
    res.status(400).json({ msg: 'An error occured' });
  }
}

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (book) {
      await book.destroy();
      res.json(book);
    } else {
      res.status(400).json({ msg: 'There is no such book!'})
    }
  } catch (err) {
    res.status(400).json({ msg: 'An error occured' });
  }
}

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, genre, author, year } = req.body;
    const book = await Book.findByPk(id);
    if (book) {
      const updatedBook = await book.update({ name, genre, author, year });
      res.json(updatedBook);
    } else {
      res.status(400).json({ msg: 'There is no such book!'})
    }    
  } catch (err) {
    res.status(400).json({ msg: 'An error occured' });
  }
}



module.exports = {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook
}