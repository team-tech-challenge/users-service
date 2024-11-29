import http from "http";
import newman from "@config/newman";
import express from "@config/express";
import connection from "@config/connectionFactory";

const server = new http.Server(express());
const port = Number(process.env.PORT);
const host = Number(process.env.HOST);

connection.database.sync().then(() => {
	server.listen(port, host, () => {
		console.log(`Server running on ${port}`);
		newman();
	});
});
