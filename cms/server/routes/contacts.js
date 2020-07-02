var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Contact = require('../models/contacts');
const { response } = require('express');

var getContacts = function(res) {
    Contact.find()
    .populate('group')
    .exec(function (err, contacts) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            contact: 'Success',
            obj: contacts
        });
    })
}

var saveContact = function (response, contact) {
    if(contact.group && contact.group.length > 0) {
        for (let groupContact of contact.group) {
            groupContact = groupContact._id;
        }
    }
    contact.save(function (err, responseult) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            return response.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        getContacts(response);
    })
}

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Contact.find()
    .population('group')
    .then(contacts => {
        res.status(200).json({
            message: 'Contacts fetched successfully!',
            contacts: contacts
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.get('/:id', (req, res, next) => {
    Contact.findOne({
        "id": req.params.id
    })
    .populate('group')
    .then(contact => {
        res.status(200).json({
            message: 'Contact fetched successfully!',
            contact: contact
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl
    });

    contact.save()
    .then(createdContact => {
        res.status(201).json({
            message: "Contact added successfully!",
            contact: createdContact
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
    Contact.findOne({
        id: req.params.id
    })
    .then(contact => {
        contact.name = req.body.name;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.imageUrl = req.body.imageUrl;
        contact.group = req.body.group;

        Contact.updateOne({
            id: req.params.id
        }, contact)
        .then(result => {
            res.status(204).json({
                message: 'Contact updated successfully!'
            })
        })
        .catch(error => {
            returnError(res, error);
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Contact.findOne({
        id: req.params.id
    })
    .then(contact => {
        Contact.deleteOne({
            id: req.params.id
        })
        .then(result => {
            res.status(204).json({
                message: "Contact deleted successfully!"
            });
        })
        .catch(error => {
            returnError(res, error);
        })
    })
    .catch(error => {
        returnError(res, error);
    });
});

module.exports = router;