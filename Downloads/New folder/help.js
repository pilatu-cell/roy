import express from 'express';
import  {GoogleSearch}  from 'google-search-results-nodejs';


const app = express();
app.use(express.json());

const search = new GoogleSearch('26c72007d7767efec9aefc00dc07d7af0a0b26dc90e642e8831aada31ce3ceeb');


app.post('/search', async (req, res)=>{

    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try{
        search.json(
            {
              engine: 'google',
              q: query,
              location: 'Austin, Texas',
              hl: 'en',
              gl: 'us',
            },
            (data)=>{
                // Extract top 3 organic results
                const breakfast_details = (data.organic_results || [])
                  .slice(0, 3)
                  .map((result) => ({
                    source: result.source || '',
                    Response: result.snippet,
                    link: result.link,
                  }));

                  return res.status(200).json({ breakfast_details});
          }
          )


    }catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(1, ()=>{
    console.log('Server is running on port 1');
})
