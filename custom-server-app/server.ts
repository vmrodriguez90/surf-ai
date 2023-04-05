import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "org-ldg7sjSW5Q2dgZf2z52ePRUl",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const response = openai.listEngines();
const port = parseInt(process.env.PORT || '4200', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  }).listen(port)

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
