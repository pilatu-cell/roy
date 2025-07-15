import {getAnsiReq} from './db.js';
import{client} from './rediscache.js'

export async function generateANSIOnlyCode(
    country,
    stateCode,
    subfileTag,
    fields
) {
    let cachedAnsiProp;

    try {
        const cacheKey = `ansiProp:${stateCode}`;
        const cached = await client.get(cacheKey);
        
        if (cached) {
            console.log('Using cached ANSI properties for state:', stateCode);
            cachedAnsiProp = JSON.parse(cached);
            console.log(cachedAnsiProp)
        } else {
            console.log('Fetching ANSI properties for state:', stateCode);
            cachedAnsiProp = await getAnsiReq(country, stateCode);
            console.log(cachedAnsiProp)
            if (cachedAnsiProp.error) {
                throw new Error(cachedAnsiProp.error);
            }
            await client.set(cacheKey, JSON.stringify(cachedAnsiProp), 'EX', 3600);
        }
    } catch (error) {
        console.error('Error fetching ANSI properties:', error);
        throw error;
    }

    const iin = cachedAnsiProp.iin;
    const aamvaMajorVersion = cachedAnsiProp.aamva_major_version;
    const aamvaVersion = cachedAnsiProp.aamva_version;
    const jurisdictionVersion = cachedAnsiProp.jurisdiction_version;
    const state_code = cachedAnsiProp.state_code;

    const entryCount = fields.length;
    const entryCountStr = String(entryCount).padStart(2, '0');

    const baseHeader = `ANSI ${iin}${aamvaMajorVersion}${aamvaVersion}${subfileTag}`;
    const subfileHeader = `${jurisdictionVersion}${aamvaVersion}${entryCountStr}${state_code}`;
    const placeholder = 'XXXXYYYY'; // offset and length
    const subfileStart = subfileTag;

    const tempHeader = baseHeader + subfileHeader + placeholder + subfileStart;
    const offset = tempHeader.indexOf(subfileStart, baseHeader.length);
    const offsetStr = String(offset).padStart(4, '0');
    const lengthStr = String(subfileTag.length).padStart(4, '0');

    const finalHeader = baseHeader + subfileHeader + offsetStr + lengthStr + subfileStart;
    console.log('Final ANSI Header:', finalHeader);

    return finalHeader;
}
