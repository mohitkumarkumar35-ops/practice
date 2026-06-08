const express = require("express");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  DeleteCommand
} = require("@aws-sdk/lib-dynamodb");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const client = new DynamoDBClient({
  region: "us-east-1"
});

const ddb = DynamoDBDocumentClient.from(client);

const TABLE = "Employees";

app.get("/employees", async (req, res) => {

  const data = await ddb.send(
    new ScanCommand({
      TableName: TABLE
    })
  );

  res.json(data.Items);
});

app.post("/employees", async (req, res) => {

  await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: req.body
    })
  );

  res.send("created");
});

app.delete("/employees/:id", async(req,res)=>{

  await ddb.send(
    new DeleteCommand({
      TableName: TABLE,
      Key:{
        employeeId:req.params.id
      }
    })
  );

  res.send("deleted");
});

app.get("/health",(req,res)=>{
  res.send("OK");
});

console.log("Before Listen");

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});