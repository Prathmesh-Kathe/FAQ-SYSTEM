const sinon = require('sinon');
const { expect } = require('chai');
const faqModel = require('../models/faqModel'); 
const faqController = require('../controllers/faqController');

describe('FAQ Controller', () => {
  it('should get all FAQs', async () => {
    const faqData = [{ question: 'What is Node?', answer: 'A JavaScript runtime.' }];
    sinon.stub(faqModel, 'getAllFAQs').returns(Promise.resolve(faqData));

    const result = await faqController.getAllFAQs();
    expect(result).to.deep.equal(faqData);
    faqModel.getAllFAQs.restore();
  });
});
