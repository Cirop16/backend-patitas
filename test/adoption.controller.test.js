import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Test de integración: Adoptions", () => {

    it("GET /api/adoptions debe devolver todas las adopciones", async () => {
        const response = await request.get("/api/adoptions");
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", "success");
        expect(response.body.payload).to.be.an("array");
    });

    it("GET /api/adoptions/:aid debe devolver una adopción por ID", async () => {
        const adoptionId = "68545bcd6911f0f43d180c23";
        const response = await request.get(`/api/adoptions/${adoptionId}`);
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("status", "success");
        expect(response.body.payload).to.have.property("id").eql(adoptionId);
    });

    it("POST /api/adoptions/:uid/:pid debe crear una nueva adopción", async () => {
        const uid = "6823902ae7a065c2c7a11b31";
        const pid = "682391f7375b10191e009484";

        const nuevaAdopcion = {
            adoptionDate: "2025-06-19",
            comment: "Estoy feliz con mi nuevo compañero"
        };

        const response = await request
            .post(`/api/adoptions/${uid}/${pid}`)
            .send(nuevaAdopcion);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("status", "success");
        expect(response.body.payload).to.include.keys("id", "adoptionDate", "comment");
    });

});