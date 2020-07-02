var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Document = require('../models/document');
const { response } = require('express');
// const documents = require('../models/documents');

var getDocuments = function(res) {
    Document.find()
    .exec(function (err, documents) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            document: 'Success',
            obj: documents
        });
    })
}

var deleteDocuments = function(res) {
    Document.remove()
    .exec(function (err, documents) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        getDocuments(documents);
    })
}

var saveDocument = function (response, document) {
    document.save(function (err, responseult) {
        response.setHeader('Content-Type', 'application/json');
        if (err) {
            return response.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        getDocuments(response);
    })
}

function returnError(res, error) {
    res.status(500).json({
        message: 'An error occured',
        error: error
    });
}

router.get('/', (req, res, next) => {
    Document.find()
    .then(documents => {
        res.status(200).json({
            message: 'Documents fetched successfully!',
            documents: documents
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.get('/:id', (req, res, next) => {
    Document.findOne({
        "id": req.params.id
    })
    .populate('group')
    .then(document => {
        res.status(200).json({
            message: 'Document fetched successfully!',
            document: document
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.post('/', (req, res, next) => {
    const maxDocumentId = sequenceGenerator.nextId("documents");

    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
    });

    document.save()
    .then(createdDocument => {
        res.status(201).json({
            message: "Document added successfully!",
            document: createdDocument
        });
    })
    .catch(error => {
        returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
    Document.findOne({
        id: req.params.id
    })
    .then(document => {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;

        Document.updateOne({
            id: req.params.id
        }, document)
        .then(result => {
            res.status(204).json({
                message: 'Document updated successfully!'
            })
        })
        .catch(error => {
            returnError(res, error);
        });
    });
});

router.delete("/:id", (req, res, next) => {
    Document.findOne({
        id: req.params.id
    })
    .then(document => {
        document.deleteOne({
            id: req.params.id
        })
        .then(result => {
            res.status(204).json({
                message: "Document deleted successfully!"
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