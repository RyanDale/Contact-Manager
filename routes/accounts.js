const express = require('express');
const router = express.Router();

const Account = require('../models/Account');


router.get('/', (req, res) => {
    Account.find().then(accounts => res.json(accounts));
});

router.get('/:id', (req, res) => {
    Account.findById(req.params.id)
        .then(account => res.json(account))
        .catch(() => res.status(404).json({
            success: false
        }));
});

router.post('/', (req, res) => {
    console.log('try post');
    const account = new Account({
        name: req.body.name,
        industry: req.body.industry
    });

    console.log('acct', account);
    account.save().then(account => res.json(account));
});

router.delete('/:id', (req, res) => {
    Account.findById(req.params.id)
        .then(account => account.remove().then(() => res.json({
            success: true
        })))
        .catch(() => res.status(404).json({ success: false }));
});

module.exports = router;
