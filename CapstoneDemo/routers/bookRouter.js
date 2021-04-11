const express = require('express')
const router = express.Router();
const { getAllBooks, getBook, createBook, deleteBook, updateBook } = require('../controllers/bookController');

router.get('/', getAllBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.delete('/:id', deleteBook);
router.patch('/:id', updateBook);

module.exports = router;