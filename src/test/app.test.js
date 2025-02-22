const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); 
const { expect } = chai;

chai.use(chaiHttp);

describe("API Tests", () => {
  it("should return FAQs", (done) => {
    chai.request(app)
      .get("/api/faqs")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});
