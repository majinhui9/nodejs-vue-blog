const {
    Rule,
    LinValidator
  } = require('../../core/lin-validator-v2')
  
  
  
  class PositiveArticleIdParamsValidator extends LinValidator {
    constructor() {
      super();
      this.id = [
        new Rule('isInt', '文章ID需要正整数', {min: 1})
      ]
    }
  }
  
  
  module.exports = {
    PositiveArticleIdParamsValidator
  }
  