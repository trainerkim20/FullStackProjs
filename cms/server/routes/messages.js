var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Message = require('../models/message');
const { response } = require('express');
// const documents = require('../models/documents');

var getMessages = function(res) {
    Message.find()
    .exec(function (err, messages) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: messages
        });
    })
}

var deleteMessage = function(res) {
    Message.remove()
    .exec(function (err, messages) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        getMessages(messages);
    })
}

var saveMessage = function (response, message) {
    message.save(function (err, responseult) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            return response.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        getMessages(response);
    })
}

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Message.find()
    .then(messages => {
        res.status(200).json({
            message: 'Messages fetched successfully!',
            messages: messages
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.get('/:id', (req, res, next) => {
    Message.findOne({
        "id": req.params.id
    })
    .populate('group')
    .then(message => {
        res.status(200).json({
            message: 'Message fetched successfully!',
            message: message
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("message");

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender,
    });

    message.save()
    .then(createdMessage => {
        res.status(201).json({
            message: "Message added successfully!",
            message: createdMessage
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
    Message.findOne({
        id: req.params.id
    })
    .then(message => {
        message.subject = req.body.subject,
        message.msgText = req.body.msgText,
        message.sender = req.body.sender,

        Message.updateOne({
            id: req.params.id
        }, document)
        .then(result => {
            res.status(204).json({
                message: 'Message updated successfully!'
            })
        })
        .catch(error => {
            returnError(res, error);
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Message.findOne({
        id: req.params.id
    })
    .then(message => {
        message.deleteOne({
            id: req.params.id
        })
        .then(result => {
            res.status(204).json({
                message: "Message deleted successfully!"
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