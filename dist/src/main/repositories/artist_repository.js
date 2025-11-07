"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistRepository = void 0;
const client_1 = require("@prisma/client");
class ArtistRepository {
    dbclient;
    constructor() {
        // Initialize PrismaClient to connect to MySQL via DATABASE_URL
        this.dbclient = new client_1.PrismaClient();
        // Note: If you need raw MySQL access later, use:
        // const pool = mysql.createPool(process.env.DATABASE_URL as string)
    }
}
exports.ArtistRepository = ArtistRepository;
//# sourceMappingURL=artist_repository.js.map