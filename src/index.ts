import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDatabase } from './mongoDbConnection';
import { Survey } from './contract/survey';
import { Voting } from './contract/voting';
import { Result, ResultElement } from './contract/result';
import { calculateVotingRatio } from './calculation';


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let db: any;

connectToDatabase().then(database => {
  db = database;
});

app.post('/surveys', async (req, res) => {
  const survey: Survey = req.body;
  const allSurveys:Survey[] = await db.collection('Survey').find().toArray();
  const maxId = allSurveys.length;
  survey.surveyId = maxId.toString();
  const result = await db.collection('Survey').insertOne(survey);
  res.status(201).send(survey);
});

app.get('/surveys', async (req, res) => {
  const surveys = await db.collection('Survey').find().toArray();
  res.status(200).send(surveys);
});

app.get('/surveys/:id', async (req, res) => {
  const { id } = req.params;
  const survey = await db.collection('Survey').findOne({ surveyId: id });
  if (survey) {
    res.status(200).send(survey);
  } else {
    res.status(404).send({ message: 'Survey not found' });
  }
});

app.post('/votings', async (req, res) => {
  const voting: Voting = req.body;
  const result = await db.collection('Voting').insertOne(voting);
  console.log(result);
  res.status(201).send(voting);
});

app.get('/surveys/:surveyId/votings', async (req, res) => {
  const { surveyId } = req.params;
  const votings = await db.collection('Voting').find({ surveyId }).toArray();
  res.status(200).send(votings);
});

app.get('/result/:surveyId', async (req, res) => {
  const { surveyId } = req.params;
  const survey: Survey = await db.collection('Survey').findOne({ surveyId });
  const votings: Voting[] = await db.collection('Voting').find({ surveyId }).toArray();
  const elements: ResultElement[] = calculateVotingRatio(survey, votings);
  const result: Result = { surveyId: surveyId, elements };
  
  res.status(200).send(result);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});