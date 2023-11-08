const mongoose = require('mongoose');

// 스키마 생성
const TodoSchema = new mongoose.Schema({
    value: String,
    doneAt: Date,
    order: Number,
});

TodoSchema.virtual('todoId').get(function () {
    return this._id.toHexString();
});
TodoSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('todo', TodoSchema);
