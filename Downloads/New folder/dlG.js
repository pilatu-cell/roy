import { generateANSIOnlyCode } from './ansi.js';
//import {getAnsiFormat} from './db.js'

export async function generateStateDL(
    data,
    country,
    stateCode,
    subfileTag
) {
    const requiredFields = [
        "DCA", "DCB", "DCD", "DBA", "DCS",
        "DAC", "DBD", "DBB", "DBC", "DAY",
        "DAU", "DAG", "DAI", "DAJ", "DAQ"
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
        throw new Error(`Missing required state fields: ${missingFields.join(', ')}`);
    }

    const GROUP_SEPARATOR = String.fromCharCode(30);
    /*const ANSI_FORMAT = getAnsiFormat(stateCode);
    if (ANSI_FORMAT.error) {
        throw new Error(ANSI_FORMAT.error);
    }  */
    

    const fieldOrder = [
        // Identity
        "DCA", "DCB", "DCD", "DBA", "DCS", "DAC", "DAD",

        // Dates
        "DBD", "DBB", "DDH", "DDB",

        // Demographics
        "DBC", "DAY", "DAZ", "DAW", "DAU", "DCL", "DCG",

        // Address
        "DAG", "DAI", "DAJ", "DAK",

        // Document info
        "DAQ", "DCF", "DCK", "DDA", "DDE", "DDF", "DDG"
    ];

    const fields = [];
    for (const code of fieldOrder) {
        if (data[code]) {
            fields.push(`${code}${data[code]}`);
        }
    }

    const ansi = await generateANSIOnlyCode(
        country,
        stateCode,
        subfileTag,
        fields
    );

    console.log(ansi)

    return '@\n' + GROUP_SEPARATOR + '\n' + `ANSI ${ansi}` + '\n' + fields.join('\n');

}
