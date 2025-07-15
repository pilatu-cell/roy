import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import {getStateCode} from './db.js'
import {generateDLBarcode} from './barcode.js'
import {generateStateDL} from './dlG.js';
import {generateFakeDCF} from './dcf.js'
import {getDLExpirationDate, generateIcn} from './Exp_Icn.js'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/barcodes', express.static(path.join(__dirname, 'public/barcodes')));


app.post('/getDlBarcode', async (req, res)=>{
    const{
        DCA, DCB, DCD, 
        DBA, DCS, DAC, 
        DAD, DBD, DBB, 
        DBC, DAY, DAU, 
        DAG, DAI, DAJ, 
        DAK, DAQ, country, state
    }=req.body;
    const SubfileTag='DL'
    const ExpDate=getDLExpirationDate(DBD, 6);
    const DAW = req.body.DAW || '';
    const getMyStateCode = await getStateCode(country, state);
    const stateCode= getMyStateCode.state_code;
    if(getStateCode.error){
        return res.status(400).json({error: getStateCode.error});
    }
    const dd= generateFakeDCF(stateCode);
    
    const Data = {
        // Required fields
        DCA,
        DCB,
        DCD,
        DBA: ExpDate,
        DCS,
        DAC,
        DAD,
        DBD,
        DBB,
        DBC,
        DAY,
        DAU,
        DAG,
        DAI,
        DAJ,
        DAK,
        DAQ,
        DAJ:stateCode,
        DCF: dd,
        DCG: country,
        DAW,

       // DCK: ICN,
        //DAZ,

        /*
        // ✅ Additional fields seen in barcode
                       // e.g., BLK
                 // Internal document control number
        DCL: RaceEthnicity,           // e.g., "W" for White
        DDA: ComplianceType,          // e.g., "F-ully", "R-estricted", "N-oncompliant", "D-river's License Only", "U-nknown"
        DAK: CardRevisionDate,        // e.g., "02232020"                 // e.g., "171"*/
      };
      
    
      const aamvaData = await generateStateDL(Data, country, stateCode, SubfileTag);
    
    try {
        const {downloadUrl} = await generateDLBarcode(aamvaData);
        res.status(200).json({url: downloadUrl});
    } catch (error) {
        console.error('Error generating barcode:', error.message);
        res.status(500).send({error: 'Failed to generate barcode'});
    }

})



app.listen(30, ()=>{
    console.log('Server is running on port 30');
})


